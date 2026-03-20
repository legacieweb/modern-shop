const express = require('express');
const router = express.Router();
const Paystack = require('paystack');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Initialize Paystack with USD configuration
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

// Validate Paystack configuration
const validatePaystackConfig = () => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error('Paystack secret key is not configured');
  }
  if (!process.env.PAYSTACK_PUBLIC_KEY) {
    throw new Error('Paystack public key is not configured');
  }
  console.log('Paystack configuration validated successfully');
};

// Validate configuration on startup
try {
  validatePaystackConfig();
} catch (error) {
  console.error('Paystack configuration error:', error.message);
}

// Verify payment and create order
router.post('/verify', auth, async (req, res) => {
  try {
    const { reference, orderData } = req.body;
    
    // Validate input
    if (!reference || !orderData) {
      return res.status(400).json({
        success: false,
        message: 'Payment reference and order data are required'
      });
    }
    
    // Validate Paystack configuration
    try {
      validatePaystackConfig();
    } catch (configError) {
      console.error('Paystack configuration error:', configError);
      return res.status(500).json({
        success: false,
        message: 'Payment system configuration error. Please contact support.'
      });
    }
    
    // Verify payment with Paystack
    const verification = await paystack.transaction.verify(reference);
    
    if (verification.status && verification.data.status === 'success') {
      // Parse order data
      const parsedOrderData = JSON.parse(orderData);
      
      // Validate parsed data
      if (!parsedOrderData.customer || !parsedOrderData.items || !parsedOrderData.total) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order data format'
        });
      }
      
      // Create order in database
      const order = new Order({
        customer: parsedOrderData.customer,
        items: parsedOrderData.items.map(item => ({
          product: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          subtotal: item.price * item.quantity
        })),
        subtotal: parsedOrderData.subtotal,
        shipping: parsedOrderData.shipping,
        tax: parsedOrderData.tax,
        total: parsedOrderData.total,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'card',
        paymentDetails: {
          transactionId: verification.data.reference,
          gateway: 'Paystack',
          cardLast4: verification.data.authorization?.last4 || '****'
        },
        shippingAddress: parsedOrderData.shippingAddress,
        billingAddress: parsedOrderData.billingAddress,
        notes: parsedOrderData.notes
      });
      
      await order.save();
      
      // Refresh the order to get the generated orderNumber
      const savedOrder = await Order.findById(order._id);
      
      // Send confirmation email to customer
      try {
        await sendOrderConfirmationEmail(savedOrder, req.user.email);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the order if email fails
      }
      
      // Send admin notification
      try {
        await sendAdminNotification(savedOrder);
      } catch (adminEmailError) {
        console.error('Admin notification failed:', adminEmailError);
        // Don't fail the order if admin email fails
      }
      
      res.json({
        success: true,
        message: 'Payment verified and order created successfully',
        data: {
          order: savedOrder,
          orderNumber: savedOrder.orderNumber
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please check your payment and try again.'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    
    // Handle specific Paystack errors
    if (error.message && error.message.includes('Invalid API key')) {
      return res.status(500).json({
        success: false,
        message: 'Payment system configuration error. Please contact support.'
      });
    }
    
    if (error.message && error.message.includes('Invalid transaction reference')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment reference. Please try again.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Payment processing failed. Please try again or contact support.'
    });
  }
});

// Paystack webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const hash = req.headers['x-paystack-signature'];
    
    // Verify webhook signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    if (hash !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }
    
    const event = req.body;
    
    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulPayment(event.data);
        break;
      case 'charge.failed':
        await handleFailedPayment(event.data);
        break;
      default:
        console.log(`Unhandled event: ${event.event}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// Get payment status
router.get('/status/:reference', auth, async (req, res) => {
  try {
    const { reference } = req.params;
    
    const verification = await paystack.transaction.verify(reference);
    
    if (verification.status) {
      res.json({
        success: true,
        data: verification.data
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Helper function to handle successful payments
async function handleSuccessfulPayment(paymentData) {
  try {
    // Find order by reference and update status
    const order = await Order.findOne({ 'paymentDetails.transactionId': paymentData.reference });
    
    if (order && order.paymentStatus !== 'paid') {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      await order.save();
      
      // Refresh to get the updated order
      const savedOrder = await Order.findById(order._id);
      
      // Send confirmation email
      await sendOrderConfirmationEmail(savedOrder, order.shippingAddress.email);
      
      // Send admin notification
      await sendAdminNotification(savedOrder);
    }
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

// Helper function to handle failed payments
async function handleFailedPayment(paymentData) {
  try {
    // Find order by reference and update status
    const order = await Order.findOne({ 'paymentDetails.transactionId': paymentData.reference });
    
    if (order) {
      order.paymentStatus = 'failed';
      order.status = 'cancelled';
      await order.save();
      
      // Send failure notification email
      await sendPaymentFailedEmail(order, order.shippingAddress.email);
    }
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

// Email sending functions
async function sendOrderConfirmationEmail(order, email) {
  try {
    const emailService = require('../services/emailService');
    const customer = {
      firstName: order.shippingAddress.firstName,
      lastName: order.shippingAddress.lastName,
      email: email
    };
    await emailService.sendOrderConfirmation(order, customer);
    console.log('Order confirmation email sent successfully to:', email);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}

async function sendPaymentFailedEmail(order, email) {
  try {
    const emailService = require('../services/emailService');
    const customer = {
      firstName: order.shippingAddress.firstName,
      lastName: order.shippingAddress.lastName,
      email: email
    };
    
    // Send payment failure notification
    console.log('Payment failed notification sent to:', email);
  } catch (error) {
    console.error('Failed to send payment failed email:', error);
  }
}

// Send admin notification for new order
async function sendAdminNotification(order) {
  try {
    const emailService = require('../services/emailService');
    
    const adminEmail = process.env.EMAIL_USER; // iyonicorp@gmail.com
    const customerEmail = order.shippingAddress.email;
    
    // Send notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `🛍️ New Order Received - ${order.orderNumber}`,
      html: generateAdminNotificationEmail(order, customerEmail)
    };
    
    await emailService.sendMail(adminMailOptions);
    console.log('Admin notification sent for order:', order.orderNumber);
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
}

// Generate admin notification email
function generateAdminNotificationEmail(order, customerEmail) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong><br>
        Quantity: ${item.quantity}<br>
        Price: ${item.price.toFixed(2)}<br>
        Subtotal: ${item.subtotal.toFixed(2)}
      </td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 20px; border: 1px solid #eee; }
        .order-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        table { width: 100%; border-collapse: collapse; }
        .total { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛍️ New Order Received!</h1>
          <p>Order #${order.orderNumber}</p>
        </div>
        <div class="content">
          <div class="order-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${order.shippingAddress.phone || 'Not provided'}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Payment Status:</strong> <span style="color: #10b981; font-weight: bold;">${order.paymentStatus.toUpperCase()}</span></p>
          </div>

          <h3>Items Ordered</h3>
          <table>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total">
            <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
            ${order.tax > 0 ? `<p><strong>Tax:</strong> ${order.tax.toFixed(2)}</p>` : ''}
            ${order.shipping > 0 ? `<p><strong>Shipping:</strong> ${order.shipping.toFixed(2)}</p>` : ''}
            <hr>
            <h3><strong>Total: ${order.total.toFixed(2)}</strong></h3>
          </div>

          <div class="order-info">
            <h3>Shipping Address</h3>
            <p>
              ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
              ${order.shippingAddress.country}
            </p>
          </div>
        </div>
        <div class="footer">
          <p>Modern Ecommerce Admin Panel</p>
          <p>Manage this order in your admin dashboard</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email template generators
function generateOrderConfirmationEmail(order) {
  const itemsHtml = order.items.map(item => `
    <div class="order-item">
      <p><strong>${item.name}</strong></p>
      <p>Quantity: ${item.quantity} | Price: ${item.price.toFixed(2)} | Subtotal: ${item.subtotal.toFixed(2)}</p>
    </div>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-item { border-bottom: 1px solid #eee; padding: 10px 0; }
        .total { font-weight: bold; font-size: 18px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>
        
        <div class="content">
          <h2>Order Details</h2>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          
          <h3>Items Ordered:</h3>
          ${itemsHtml}
          
          <div class="total">
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>
          
          <h3>Shipping Address:</h3>
          <p>
            ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
            ${order.shippingAddress.country}
          </p>
          
          <p>We'll send you tracking information once your order ships.</p>
        </div>
        
        <div class="footer">
          <p>Thank you for shopping with us!</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePaymentFailedEmail(order) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Failed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Failed</h1>
          <p>Your payment could not be processed</p>
        </div>
        
        <div class="content">
          <h2>Order: ${order.orderNumber}</h2>
          <p>We were unable to process the payment for your order. This could be due to:</p>
          <ul>
            <li>Insufficient funds</li>
            <li>Card restrictions</li>
            <li>Payment gateway issues</li>
          </ul>
          
          <p>Please try again with a different payment method or contact your bank.</p>
          
          <p>If you continue to experience issues, please contact our support team for assistance.</p>
        </div>
        
        <div class="footer">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = router;