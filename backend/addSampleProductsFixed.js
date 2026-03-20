const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Helper function to convert object to specifications array
const objectToSpecifications = (obj) => {
  return Object.entries(obj).map(([name, value]) => ({ name, value: value.toString() }));
};

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    comparePrice: 249.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundTech",
    sku: "ST-WBH-001",
    stock: 50,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        alt: "Wireless Bluetooth Headphones"
      }
    ],
    features: [
      "Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Comfortable over-ear design",
      "Built-in microphone"
    ],
    specifications: objectToSpecifications({
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20kHz",
      "Bluetooth Version": "5.0",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours"
    }),
    rating: {
      average: 4.5,
      count: 128
    },
    isFeatured: true,
    isActive: true,
    discountPercentage: 20
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and 7-day battery life. Track your health and fitness goals.",
    price: 299.99,
    comparePrice: 399.99,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "FitTech",
    sku: "FT-SFW-002",
    stock: 35,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        alt: "Smart Fitness Watch"
      }
    ],
    features: [
      "Heart Rate Monitoring",
      "GPS Tracking",
      "7-day battery life",
      "Water Resistant",
      "Sleep Tracking"
    ],
    specifications: objectToSpecifications({
      "Display": "1.4-inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart Rate, GPS, Accelerometer",
      "Compatibility": "iOS & Android"
    }),
    rating: {
      average: 4.3,
      count: 89
    },
    isFeatured: true,
    isActive: true,
    discountPercentage: 25
  },
  {
    name: "Professional Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting, 16000 DPI sensor, and ergonomic design for professional gamers.",
    price: 79.99,
    comparePrice: 99.99,
    category: "Electronics",
    subcategory: "Gaming",
    brand: "GamePro",
    sku: "GP-GM-003",
    stock: 75,
    images: [
      {
        url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        alt: "Professional Gaming Mouse"
      }
    ],
    features: [
      "16000 DPI Optical Sensor",
      "Customizable RGB Lighting",
      "Ergonomic Design",
      "Programmable Buttons",
      "High-Precision Tracking"
    ],
    specifications: objectToSpecifications({
      "DPI": "16000",
      "Sensor Type": "Optical",
      "Buttons": "8 programmable",
      "RGB Zones": "4",
      "Weight": "95g"
    }),
    rating: {
      average: 4.7,
      count: 156
    },
    isFeatured: false,
    isActive: true,
    discountPercentage: 20
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Soft, breathable, and environmentally friendly. Available in multiple colors.",
    price: 29.99,
    comparePrice: 39.99,
    category: "Clothing",
    subcategory: "T-Shirts",
    brand: "EcoWear",
    sku: "EW-CT-004",
    stock: 100,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        alt: "Organic Cotton T-Shirt"
      }
    ],
    features: [
      "100% Organic Cotton",
      "Sustainable Production",
      "Soft and Comfortable",
      "Machine Washable",
      "Available in Multiple Colors"
    ],
    specifications: objectToSpecifications({
      "Material": "100% Organic Cotton",
      "Care": "Machine Wash Cold",
      "Fit": "Regular",
      "Available Sizes": "S, M, L, XL, XXL",
      "Colors": "White, Black, Navy, Gray"
    }),
    rating: {
      average: 4.4,
      count: 73
    },
    isFeatured: false,
    isActive: true,
    discountPercentage: 25
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Perfect for outdoor activities.",
    price: 24.99,
    comparePrice: 34.99,
    category: "Home & Garden",
    subcategory: "Kitchen",
    brand: "HydroLife",
    sku: "HL-SWB-005",
    stock: 80,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        alt: "Stainless Steel Water Bottle"
      }
    ],
    features: [
      "Double-Wall Insulation",
      "24h Cold Retention",
      "12h Hot Retention",
      "BPA-Free",
      "Leak-Proof Design"
    ],
    specifications: objectToSpecifications({
      "Capacity": "500ml",
      "Material": "Stainless Steel",
      "Insulation": "Double-wall vacuum",
      "Dimensions": "25cm x 7cm",
      "Weight": "350g"
    }),
    rating: {
      average: 4.6,
      count: 94
    },
    isFeatured: true,
    isActive: true,
    discountPercentage: 29
  },
  {
    name: "Leather Laptop Bag",
    description: "Professional leather laptop bag with multiple compartments. Perfect for business professionals and students.",
    price: 149.99,
    comparePrice: 199.99,
    category: "Bags",
    subcategory: "Laptop Bags",
    brand: "LeatherCraft",
    sku: "LC-LB-006",
    stock: 25,
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        alt: "Leather Laptop Bag"
      }
    ],
    features: [
      "Genuine Leather",
      "Fits 15.6-inch Laptops",
      "Multiple Compartments",
      "Adjustable Strap",
      "Professional Design"
    ],
    specifications: objectToSpecifications({
      "Material": "Genuine Leather",
      "Laptop Size": "Up to 15.6 inches",
      "Dimensions": "40cm x 30cm x 8cm",
      "Compartments": "3 main + 2 small",
      "Strap": "Adjustable and removable"
    }),
    rating: {
      average: 4.8,
      count: 67
    },
    isFeatured: false,
    isActive: true,
    discountPercentage: 25
  },
  {
    name: "Yoga Mat Premium",
    description: "Premium yoga mat with superior grip and cushioning. Non-slip surface and eco-friendly materials. Perfect for all yoga practices.",
    price: 59.99,
    comparePrice: 79.99,
    category: "Sports",
    subcategory: "Yoga",
    brand: "ZenFit",
    sku: "ZF-YM-007",
    stock: 60,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506629905687-69d006b86b7b?w=500",
        alt: "Premium Yoga Mat"
      }
    ],
    features: [
      "Superior Grip",
      "Extra Cushioning",
      "Non-slip Surface",
      "Eco-friendly Materials",
      "Easy to Clean"
    ],
    specifications: objectToSpecifications({
      "Thickness": "6mm",
      "Dimensions": "183cm x 61cm",
      "Material": "TPE (Eco-friendly)",
      "Weight": "1.2kg",
      "Colors": "Purple, Blue, Pink, Black"
    }),
    rating: {
      average: 4.5,
      count: 112
    },
    isFeatured: true,
    isActive: true,
    discountPercentage: 25
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    price: 39.99,
    comparePrice: 59.99,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "ChargeTech",
    sku: "CT-WPC-008",
    stock: 90,
    images: [
      {
        url: "https://images.unsplash.com/photo-1609592873147-3cea545b97f4?w=500",
        alt: "Wireless Phone Charger"
      }
    ],
    features: [
      "Fast Charging",
      "Qi-compatible",
      "LED Indicator",
      "Overcharge Protection",
      "Sleek Design"
    ],
    specifications: objectToSpecifications({
      "Input": "5V/2A, 9V/1.67A",
      "Output": "10W max",
      "Compatibility": "Qi-enabled devices",
      "Charging Distance": "≤8mm",
      "Efficiency": "≥73%"
    }),
    rating: {
      average: 4.2,
      count: 145
    },
    isFeatured: false,
    isActive: true,
    discountPercentage: 33
  }
];

async function addSampleProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${insertedProducts.length} products`);

    // Update categories
    const categories = [...new Set(sampleProducts.map(p => p.category))];
    console.log('Categories:', categories);

    console.log('Sample products added successfully!');
    
  } catch (error) {
    console.error('Error adding sample products:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
addSampleProducts();