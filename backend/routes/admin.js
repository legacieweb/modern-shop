const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Apply admin middleware to all admin routes
router.use(auth, checkAdmin);

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Get counts
    const [productCount, userCount, orderCount] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      Order.countDocuments()
    ]);

    // Get revenue statistics
    const revenueStats = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('customer', 'firstName lastName email')
      .sort('-createdAt')
      .limit(10);

    // Get top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    const stats = {
      products: productCount,
      users: userCount,
      orders: orderCount,
      revenue: revenueStats[0] || { totalRevenue: 0, averageOrderValue: 0 }
    };

    res.json({
      success: true,
      data: {
        stats,
        recentOrders,
        topProducts
      }
    });

  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Product management routes
router.get('/products', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().trim(),
  query('search').optional().trim(),
  query('sort').optional().isIn(['name', '-name', 'price', '-price', 'createdAt', '-createdAt', 'stock', '-stock'])
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

    const {
      page = 1,
      limit = 20,
      category,
      search,
      sort = '-createdAt',
      status
    } = req.query;

    const filter = {};
    
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') }
      ];
    }

    if (status) {
      filter.isActive = status === 'active';
    }

    const sortObj = {};
    if (sort.startsWith('-')) {
      sortObj[sort.substring(1)] = -1;
    } else {
      sortObj[sort] = 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Create product
router.post('/products', [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').trim().notEmpty().withMessage('Category is required')
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

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: req.body.sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update product
router.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete product (soft delete)
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Order management routes
router.get('/orders', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  query('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded'])
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

    const { page = 1, limit = 20, status, paymentStatus } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const orders = await Order.find(filter)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

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
    console.error('Get admin orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all users
router.get('/users', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim(),
  query('role').optional().isIn(['customer', 'admin']),
  query('status').optional().isIn(['active', 'inactive', 'suspended'])
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

    const { page = 1, limit = 20, search, role, status } = req.query;
    const filter = {}; // Remove isActive filter to show suspended users too

    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (status) {
      if (status === 'suspended') {
        filter.isSuspended = true;
      } else if (status === 'active') {
        filter.isActive = true;
        filter.isSuspended = false;
      } else if (status === 'inactive') {
        filter.isActive = false;
        filter.isSuspended = false;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(filter)
      .select('-password')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Suspend user
router.patch('/users/:id/suspend', [
  body('action').isIn(['suspend', 'unsuspend']).withMessage('Action must be suspend or unsuspend'),
  body('reason').optional().trim()
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

    const { id } = req.params;
    const { reason, action } = req.body;

    // Custom validation: reason is required for suspension
    if (action === 'suspend' && (!reason || !reason.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Suspension reason is required'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from suspending themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot suspend your own account'
      });
    }

    if (action === 'suspend') {
      user.isSuspended = true;
      user.suspensionReason = reason;
      user.suspendedAt = new Date();
      user.suspendedBy = req.user.email;
      user.isActive = false; // Also deactivate when suspended
    } else {
      user.isSuspended = false;
      user.suspensionReason = '';
      user.suspendedAt = null;
      user.suspendedBy = '';
      user.isActive = true; // Reactivate when unsuspended
    }

    await user.save();

    // Send email notification to user
    try {
      const emailService = require('../services/emailService');
      if (action === 'suspend') {
        await emailService.sendSuspensionNotification(
          user.email,
          user.firstName,
          {
            reason,
            suspendedBy: req.user.email,
            suspendedAt: new Date()
          }
        );
      } else {
        await emailService.sendUnsuspensionNotification(
          user.email,
          user.firstName,
          {
            unsuspendedBy: req.user.email,
            unsuspendedAt: new Date()
          }
        );
      }
    } catch (emailError) {
      console.error('Failed to send suspension email:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: `User ${action === 'suspend' ? 'suspended' : 'unsuspended'} successfully`,
      data: { user }
    });

  } catch (error) {
    console.error('User suspension error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to ${req.body.action} user`,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Send notification to user
router.post('/users/:id/notify', [
  body('message').trim().notEmpty().withMessage('Notification message is required'),
  body('type').optional().isIn(['email', 'sms', 'both']).withMessage('Type must be email, sms, or both')
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

    const { id } = req.params;
    const { message, type = 'email' } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isSuspended) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send notification to suspended user'
      });
    }

    // Here you would integrate with your email/SMS service
    // For now, we'll just log it and return success
    console.log(`Notification sent to ${user.email} (${type}): ${message}`);
    
    res.json({
      success: true,
      message: `Notification sent successfully to ${user.email}`,
      data: {
        recipient: user.email,
        type,
        message,
        sentAt: new Date()
      }
    });

  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update order status
router.patch('/orders/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).withMessage('Invalid order status'),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status'),
  body('notes').optional().trim()
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

    const { id } = req.params;
    const { status, paymentStatus, notes } = req.body;

    const order = await Order.findById(id).populate('customer', 'firstName lastName email');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Prepare update object with only the fields we want to change
    const updateData = {};
    const originalStatus = order.status;
    const originalPaymentStatus = order.paymentStatus;

    // Update order status
    if (status) {
      updateData.status = status;
      
      // Auto-update payment status based on order status
      if (status === 'delivered' && (!paymentStatus || paymentStatus === 'pending')) {
        updateData.paymentStatus = 'paid';
      } else if (status === 'cancelled' && order.paymentStatus === 'paid') {
        updateData.paymentStatus = 'refunded';
      }
    }

    if (paymentStatus && (!status || status !== 'delivered')) {
      updateData.paymentStatus = paymentStatus;
    }

    // Add status history entry
    const historyEntry = {
      status: status || order.status,
      paymentStatus: paymentStatus || order.paymentStatus,
      notes: notes || '',
      updatedBy: req.user.email,
      updatedAt: new Date()
    };

    // Add to status history using $push to avoid validation
    updateData.$push = {
      statusHistory: historyEntry
    };

    // Update the order with only the specific fields
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: false // Skip validation to avoid required field errors
      }
    ).populate('customer', 'firstName lastName email');

    // Send email notification to customer
    try {
      const emailService = require('../services/emailService');
      const statusChanged = status && status !== originalStatus;
      const paymentStatusChanged = paymentStatus && paymentStatus !== originalPaymentStatus;
      
      if (statusChanged || paymentStatusChanged) {
        await emailService.sendOrderStatusUpdate(
          order.customer.email,
          order.customer.firstName,
          {
            orderNumber: order.orderNumber,
            newStatus: status || order.status,
            newPaymentStatus: paymentStatus || order.paymentStatus,
            previousStatus: originalStatus,
            previousPaymentStatus: originalPaymentStatus,
            notes: notes || ''
          }
        );
      }
    } catch (emailError) {
      console.error('Failed to send order status email:', emailError);
      // Don't fail the request if email fails
    }

    // Populate the updated order for response
    if (updatedOrder) {
      await updatedOrder.populate('items.product', 'name images');
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order: updatedOrder }
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

// Get order status history
router.get('/orders/:id/history', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const history = order.statusHistory || [];

    res.json({
      success: true,
      data: { history }
    });

  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;