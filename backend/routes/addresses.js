const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware
router.use(auth);

// Get user's saved addresses
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('savedAddresses');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        addresses: user.savedAddresses || []
      }
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch addresses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Save new address
router.post('/', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('street').trim().notEmpty().withMessage('Street address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('zipCode').trim().notEmpty().withMessage('ZIP code is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('phone').optional().trim(),
  body('type').isIn(['shipping', 'billing']).withMessage('Type must be shipping or billing'),
  body('isDefault').optional().isBoolean()
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

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const addressData = {
      _id: require('mongoose').Types.ObjectId(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // If this is set as default, remove default from other addresses of the same type
    if (req.body.isDefault) {
      user.savedAddresses = user.savedAddresses.map(addr => {
        if (addr.type === req.body.type) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
    }

    // Add new address
    user.savedAddresses.push(addressData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address saved successfully',
      data: {
        address: addressData
      }
    });
  } catch (error) {
    console.error('Save address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save address',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update address
router.put('/:addressId', [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('street').optional().trim().notEmpty().withMessage('Street address cannot be empty'),
  body('city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  body('state').optional().trim().notEmpty().withMessage('State cannot be empty'),
  body('zipCode').optional().trim().notEmpty().withMessage('ZIP code cannot be empty'),
  body('country').optional().trim().notEmpty().withMessage('Country cannot be empty'),
  body('phone').optional().trim(),
  body('isDefault').optional().isBoolean()
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

    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const addressIndex = user.savedAddresses.findIndex(addr => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    const address = user.savedAddresses[addressIndex];

    // If setting as default, remove default from other addresses of the same type
    if (req.body.isDefault) {
      user.savedAddresses = user.savedAddresses.map(addr => {
        if (addr.type === address.type && addr._id.toString() !== addressId) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
    }

    // Update address
    user.savedAddresses[addressIndex] = {
      ...address,
      ...req.body,
      updatedAt: new Date()
    };

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: {
        address: user.savedAddresses[addressIndex]
      }
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update address',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete address
router.delete('/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const addressExists = user.savedAddresses.some(addr => addr._id.toString() === addressId);
    
    if (!addressExists) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    user.savedAddresses = user.savedAddresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete address',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;