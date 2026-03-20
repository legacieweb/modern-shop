const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');
require('dotenv').config();

// Sample orders data
const sampleOrders = [
  {
    orderNumber: 'ORD-1234567890-0001',
    customer: '67a04d6f8b3f4d2c1a8e9f01', // Sample user ID
    status: 'confirmed',
    paymentStatus: 'paid',
    items: [
      {
        product: '67a04d6f8b3f4d2c1a8e9f00', // Sample product ID
        name: 'Sample Product 1',
        price: 29.99,
        quantity: 2,
        variant: { size: 'M', color: 'Blue' },
        subtotal: 59.98
      }
    ],
    subtotal: 59.98,
    tax: 4.80,
    shipping: 10.00,
    discount: 0,
    total: 74.78,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1234567890'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1234567890'
    },
    paymentMethod: 'card',
    paymentDetails: {
      method: 'card',
      last4: '4242',
      brand: 'visa'
    },
    trackingNumber: 'TRK1234567890',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    history: [
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        note: 'Order confirmed and payment received'
      }
    ]
  },
  {
    orderNumber: 'ORD-1234567890-0002',
    customer: '67a04d6f8b3f4d2c1a8e9f01',
    status: 'shipped',
    paymentStatus: 'paid',
    items: [
      {
        product: '67a04d6f8b3f4d2c1a8e9f00',
        name: 'Sample Product 2',
        price: 49.99,
        quantity: 1,
        variant: { size: 'L', color: 'Red' },
        subtotal: 49.99
      }
    ],
    subtotal: 49.99,
    tax: 4.00,
    shipping: 0, // Free shipping
    discount: 5.00,
    total: 48.99,
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      phone: '+1987654321'
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      phone: '+1987654321'
    },
    paymentMethod: 'paypal',
    paymentDetails: {
      method: 'paypal',
      email: 'jane.smith@paypal.com'
    },
    trackingNumber: 'TRK9876543210',
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    history: [
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        note: 'Order confirmed and payment received'
      },
      {
        status: 'shipped',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        note: 'Order shipped via UPS'
      }
    ]
  },
  {
    orderNumber: 'ORD-1234567890-0003',
    customer: '67a04d6f8b3f4d2c1a8e9f01',
    status: 'delivered',
    paymentStatus: 'paid',
    items: [
      {
        product: '67a04d6f8b3f4d2c1a8e9f00',
        name: 'Sample Product 3',
        price: 79.99,
        quantity: 1,
        variant: { size: 'XL', color: 'Black' },
        subtotal: 79.99
      }
    ],
    subtotal: 79.99,
    tax: 6.40,
    shipping: 0, // Free shipping
    discount: 0,
    total: 86.39,
    shippingAddress: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'US',
      phone: '+1555123456'
    },
    billingAddress: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'US',
      phone: '+1555123456'
    },
    paymentMethod: 'card',
    paymentDetails: {
      method: 'card',
      last4: '8888',
      brand: 'mastercard'
    },
    trackingNumber: 'TRK5555666677',
    estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Delivered yesterday
    history: [
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        note: 'Order confirmed and payment received'
      },
      {
        status: 'shipped',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        note: 'Order shipped via FedEx'
      },
      {
        status: 'delivered',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        note: 'Package delivered successfully'
      }
    ]
  }
];

async function addSampleOrders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Insert sample orders
    const insertedOrders = await Order.insertMany(sampleOrders);
    console.log(`Successfully inserted ${insertedOrders.length} sample orders`);

    // Display inserted orders
    insertedOrders.forEach((order, index) => {
      console.log(`Order ${index + 1}:`);
      console.log(`  Order Number: ${order.orderNumber}`);
      console.log(`  Status: ${order.status}`);
      console.log(`  Total: $${order.total}`);
      console.log(`  Email: ${order.shippingAddress.email}`);
      console.log('---');
    });

    console.log('\nYou can now test the tracking functionality with these order numbers:');
    console.log('- ORD-1234567890-0001 (Confirmed) - john.doe@example.com');
    console.log('- ORD-1234567890-0002 (Shipped) - jane.smith@example.com');
    console.log('- ORD-1234567890-0003 (Delivered) - bob.johnson@example.com');

  } catch (error) {
    console.error('Error adding sample orders:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the function
addSampleOrders();