const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// Create new order
router.post('/', [
  auth,
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('shippingAddress.firstName').trim().notEmpty().withMessage('First name is required'),
  body('shippingAddress.lastName').trim().notEmpty().withMessage('Last name is required'),
  body('shippingAddress.email').isEmail().withMessage('Valid email is required'),
  body('shippingAddress.street').trim().notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
  body('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').trim().notEmpty().withMessage('ZIP code is required'),
  body('shippingAddress.country').trim().notEmpty().withMessage('Country is required'),
  body('paymentMethod').isIn(['card', 'paypal', 'stripe', 'bank_transfer', 'cash_on_delivery']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { items, shippingAddress, paymentMethod, paymentDetails } = req.body;

    // Validate products and calculate totals
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product} not found or inactive`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        variant: item.variant,
        subtotal: itemSubtotal
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const discount = 0; // Can be calculated based on promotions
    const total = subtotal + tax + shipping - discount;

    // Create order
    const order = new Order({
      customer: req.user.id,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      shippingAddress,
      billingAddress: shippingAddress, // Same as shipping for now
      paymentMethod,
      paymentDetails
    });

    await order.save();

    // Populate order with customer details
    await order.populate('customer', 'firstName lastName email');

    // Send order confirmation email
    try {
      const customer = await User.findById(req.user.id);
      await emailService.sendOrderConfirmation(order, customer);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get user's orders
router.get('/my-orders', auth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ customer: req.user.id })
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Order.countDocuments({ customer: req.user.id });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get single order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.customer._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { order }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get order by order number (Public endpoint for tracking)
router.get('/by-number/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { email } = req.query;

    const order = await Order.findOne({ orderNumber })
      .populate('customer', 'firstName lastName email phone')
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // For public tracking, verify email matches shipping address email
    if (email && order.shippingAddress.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'Invalid email for this order'
      });
    }

    // Create tracking events from order history and status
    const trackingEvents = [];
    
    // Add initial order confirmation
    trackingEvents.push({
      status: 'Order Confirmed',
      timestamp: order.createdAt,
      location: 'Online Store',
      description: 'Your order has been confirmed and payment received'
    });

    // Add status-specific events
    if (order.status === 'confirmed' || order.status === 'processing') {
      trackingEvents.push({
        status: 'Processing',
        timestamp: order.createdAt,
        location: 'Warehouse',
        description: 'Your order is being prepared for shipping'
      });
    }

    if (order.status === 'shipped') {
      trackingEvents.push({
        status: 'Shipped',
        timestamp: order.updatedAt,
        location: 'Shipping Facility',
        description: 'Your order has been shipped and is on its way'
      });
      
      trackingEvents.push({
        status: 'In Transit',
        timestamp: order.updatedAt,
        location: 'Distribution Center',
        description: 'Your package is in transit to your location'
      });
    }

    if (order.status === 'delivered') {
      trackingEvents.push({
        status: 'Delivered',
        timestamp: order.updatedAt,
        location: 'Your Address',
        description: 'Your package has been delivered successfully'
      });
    }

    // Return limited order information for tracking
    const trackingData = {
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt,
      totalAmount: order.total,
      shippingAddress: order.shippingAddress,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.variant?.size || 'Standard'
      })),
      trackingEvents
    };

    res.json({
      success: true,
      data: { order: trackingData }
    });

  } catch (error) {
    console.error('Get order by number error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update order status (admin only)
router.patch('/:id/status', [
  auth,
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).withMessage('Invalid status')
], async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(id).populate('customer', 'firstName lastName email');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    if (note) {
      order.adminNotes = note;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Cancel order
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    order.status = 'cancelled';
    if (reason) {
      order.notes = reason;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;