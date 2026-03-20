const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOrderConfirmation(order, customer) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: this.generateOrderConfirmationHTML(order, customer),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      return false;
    }
  }

  async sendPasswordReset(email, resetToken) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: this.generatePasswordResetHTML(resetToken),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(customer) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: 'Welcome to Modern Ecommerce!',
      html: this.generateWelcomeHTML(customer),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  generateOrderConfirmationHTML(order, customer) {
    const itemsHTML = order.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          ${item.variant?.color ? `Color: ${item.variant.color}<br>` : ''}
          ${item.variant?.size ? `Size: ${item.variant.size}<br>` : ''}
          Quantity: ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          $${item.subtotal.toFixed(2)}
        </td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .order-info { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          .total { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase, ${customer.firstName}!</p>
          </div>
          <div class="content">
            <div class="order-info">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            </div>

            <h3>Items Ordered</h3>
            <table>
              <thead>
                <tr>
                  <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total">
              <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
              ${order.tax > 0 ? `<p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>` : ''}
              ${order.shipping > 0 ? `<p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>` : ''}
              ${order.discount > 0 ? `<p><strong>Discount:</strong> -$${order.discount.toFixed(2)}</p>` : ''}
              <hr>
              <h3><strong>Total: $${order.total.toFixed(2)}</strong></h3>
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
            <p>Thank you for shopping with Modern Ecommerce!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generatePasswordResetHTML(resetToken) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>You have requested to reset your password for your Modern Ecommerce account.</p>
            <p>Click the button below to reset your password:</p>
            <p><a href="${resetUrl}" class="button">Reset Password</a></p>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Modern Ecommerce Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateWelcomeHTML(customer) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Modern Ecommerce</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Modern Ecommerce!</h1>
          </div>
          <div class="content">
            <h2>Hello ${customer.firstName}!</h2>
            <p>Welcome to Modern Ecommerce! We're thrilled to have you join our community of shoppers.</p>
            <p>As a member, you'll enjoy:</p>
            <ul>
              <li>Access to exclusive deals and promotions</li>
              <li>Fast and secure checkout</li>
              <li>Order tracking and history</li>
              <li>Wishlist functionality</li>
              <li>Personalized recommendations</li>
            </ul>
            <p><a href="${process.env.CLIENT_URL}" class="button">Start Shopping</a></p>
            <p>Happy shopping!</p>
            <p>The Modern Ecommerce Team</p>
          </div>
          <div class="footer">
            <p>Modern Ecommerce Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateOrderStatusUpdateHTML(firstName, orderData) {
    const statusChanged = orderData.newStatus !== orderData.previousStatus;
    const paymentChanged = orderData.newPaymentStatus !== orderData.previousPaymentStatus;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Status Update</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .status-box { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .status-changed { background: #e8f5e8; border-left: 4px solid #28a745; }
          .payment-changed { background: #fff3cd; border-left: 4px solid #ffc107; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
            <p>Your order has been updated!</p>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Your order <strong>${orderData.orderNumber}</strong> has been updated.</p>
            
            ${statusChanged ? `
              <div class="status-box status-changed">
                <h3>📦 Order Status Changed</h3>
                <p><strong>Previous:</strong> ${orderData.previousStatus}</p>
                <p><strong>New:</strong> ${orderData.newStatus}</p>
              </div>
            ` : ''}
            
            ${paymentChanged ? `
              <div class="status-box payment-changed">
                <h3>💳 Payment Status Changed</h3>
                <p><strong>Previous:</strong> ${orderData.previousPaymentStatus}</p>
                <p><strong>New:</strong> ${orderData.newPaymentStatus}</p>
              </div>
            ` : ''}
            
            ${orderData.notes ? `
              <div class="status-box">
                <h3>📝 Additional Notes</h3>
                <p>${orderData.notes}</p>
              </div>
            ` : ''}
            
            <p>You can track your order progress by logging into your account.</p>
            <p>Thank you for your patience!</p>
          </div>
          <div class="footer">
            <p>Modern Ecommerce Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateSuspensionHTML(firstName, suspensionData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Account Suspension Notice</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .warning-box { background: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Account Suspension Notice</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            
            <div class="warning-box">
              <h3>Your account has been suspended</h3>
              <p><strong>Reason:</strong> ${suspensionData.reason}</p>
              <p><strong>Suspended by:</strong> ${suspensionData.suspendedBy}</p>
              <p><strong>Date:</strong> ${new Date(suspensionData.suspendedAt).toLocaleString()}</p>
            </div>
            
            <p>Your account access has been temporarily suspended due to the above reason. During this period:</p>
            <ul>
              <li>You will not be able to log in to your account</li>
              <li>Your existing orders will remain processing</li>
              <li>You cannot place new orders</li>
            </ul>
            
            <p>If you believe this action was taken in error or if you have questions, please contact our support team immediately.</p>
            
            <p>We appreciate your understanding.</p>
          </div>
          <div class="footer">
            <p>Modern Ecommerce Support Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateUnsuspensionHTML(firstName, unsuspensionData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Account Reactivation Notice</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #eee; }
          .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Account Reactivated!</h1>
            <p>Good news!</p>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            
            <div class="success-box">
              <h3>Your account has been reactivated</h3>
              <p><strong>Reactivated by:</strong> ${unsuspensionData.unsuspendedBy}</p>
              <p><strong>Date:</strong> ${new Date(unsuspensionData.unsuspendedAt).toLocaleString()}</p>
            </div>
            
            <p>Your account access has been restored and you can now:</p>
            <ul>
              <li>✅ Log in to your account</li>
              <li>✅ Browse and purchase products</li>
              <li>✅ Access your order history</li>
              <li>✅ Manage your profile and settings</li>
            </ul>
            
            <p>Welcome back! We're glad to have you with us again.</p>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>Modern Ecommerce Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendOrderStatusUpdate(email, firstName, orderData) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Status Update - ${orderData.orderNumber}`,
      html: this.generateOrderStatusUpdateHTML(firstName, orderData),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order status update email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending order status update email:', error);
      return false;
    }
  }

  async sendSuspensionNotification(email, firstName, suspensionData) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Account Suspension Notice',
      html: this.generateSuspensionHTML(firstName, suspensionData),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Suspension notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending suspension email:', error);
      return false;
    }
  }

  async sendUnsuspensionNotification(email, firstName, unsuspensionData) {
    const mailOptions = {
      from: `"Modern Ecommerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Account Reactivation Notice',
      html: this.generateUnsuspensionHTML(firstName, unsuspensionData),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Unsuspension notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending unsuspension email:', error);
      return false;
    }
  }
  async sendMail(mailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', mailOptions.to);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}

module.exports = new EmailService();