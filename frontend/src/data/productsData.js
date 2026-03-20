// Comprehensive products data with 60 diverse products
export const allProducts = [
  // Electronics & Technology (15 products)
  {
    _id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1199.99,
    comparePrice: 1299.99,
    description: 'The most advanced iPhone ever featuring a revolutionary titanium design, powerful A17 Pro chip, and professional-grade camera system. Experience stunning photography with the 48MP Main camera, 12MP Ultra Wide, and 12MP 2x Telephoto. Features Action Button, USB-C connectivity, and up to 29 hours of video playback.',
    images: [
      { url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' }
    ],
    category: 'Electronics',
    brand: 'Apple',
    sku: 'IPH15PM-256-NT',
    rating: { average: 4.8, count: 1247 },
    discountPercentage: 8
  },
  {
    _id: '2',
    name: 'MacBook Pro 16-inch',
    price: 2499.99,
    comparePrice: 2699.99,
    description: 'Supercharged by M3 Pro and M3 Max chips for relentless performance. The 16-inch MacBook Pro delivers exceptional processing power for demanding workflows, from 3D rendering to video editing. Features stunning Liquid Retina XDR display, up to 22-hour battery life, and advanced thermal design for sustained performance.',
    images: [
      { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1486312338219-ce68e2dda28b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop' }
    ],
    category: 'Computers',
    brand: 'Apple',
    sku: 'MBP16-M3P-512',
    rating: { average: 4.9, count: 892 },
    discountPercentage: 7
  },
  {
    _id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399.99,
    comparePrice: 449.99,
    description: 'Industry-leading noise canceling headphones with exceptional sound quality. Features Dual Noise Sensor technology, V1 processor, and 30mm drivers for crystal-clear audio. Boasts 30-hour battery life, quick charge (3 min = 3 hours), and multipoint connection for seamless device switching.',
    images: [
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop' }
    ],
    category: 'Audio',
    brand: 'Sony',
    sku: 'WH1000XM5-BLK',
    rating: { average: 4.7, count: 2156 },
    discountPercentage: 11
  },
  {
    _id: '4',
    name: 'Canon EOS R5 Camera',
    price: 3899.99,
    comparePrice: 4199.99,
    description: 'Professional mirrorless camera with 45MP full-frame sensor and 8K video recording. Features Dual Pixel CMOS AF II with 1,053 AF points, in-body image stabilization up to 8 stops, and weather-sealed magnesium alloy body. Perfect for professionals who demand the highest image quality and video capabilities.',
    images: [
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764ce7?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop' }
    ],
    category: 'Photography',
    brand: 'Canon',
    sku: 'EOSR5-BODY',
    rating: { average: 4.8, count: 567 },
    discountPercentage: 7
  },
  {
    _id: '5',
    name: 'iPad Pro 12.9-inch',
    price: 1099.99,
    comparePrice: 1199.99,
    description: 'Ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil hover. Features 12.9-inch edge-to-edge Liquid Retina XDR display with ProMotion, True Tone, and P3 wide color. Supports Apple Pencil (2nd generation), Magic Keyboard, and offers all-day battery life.',
    images: [
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' }
    ],
    category: 'Tablets',
    brand: 'Apple',
    sku: 'IPP129-M2-256',
    rating: { average: 4.7, count: 1834 },
    discountPercentage: 8
  },
  {
    _id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299.99,
    comparePrice: 1399.99,
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features. Features 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 processor, and advanced camera system with 5x optical zoom. Includes S Pen for precise control, 5000mAh battery, and Galaxy AI features for enhanced productivity.',
    images: [
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' }
    ],
    category: 'Electronics',
    brand: 'Samsung',
    sku: 'GSS24U-512-TI',
    rating: { average: 4.6, count: 987 },
    discountPercentage: 7
  },
  {
    _id: '7',
    name: 'Dell XPS 13 Laptop',
    price: 1199.99,
    comparePrice: 1399.99,
    description: 'Compact premium laptop with InfinityEdge display and latest Intel processors. Features 13.4-inch FHD+ InfinityEdge display, 12th Gen Intel Core processors, and premium aluminum construction. Offers exceptional performance in an ultra-portable design with up to 12 hours of battery life.',
    images: [
      { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1486312338219-ce68e2dda28b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop' }
    ],
    category: 'Computers',
    brand: 'Dell',
    sku: 'XPS13-I7-512',
    rating: { average: 4.5, count: 756 },
    discountPercentage: 14
  },
  {
    _id: '8',
    name: 'AirPods Pro 2nd Generation',
    price: 249.99,
    comparePrice: 299.99,
    description: 'Active Noise Cancellation, Adaptive Transparency, and Spatial Audio with H2 chip. Features up to 2x more noise cancellation, Adaptive Audio that automatically adjusts noise control, and Personalized Volume. Includes four sizes of silicone tips and up to 6 hours of listening time.',
    images: [
      { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop' }
    ],
    category: 'Audio',
    brand: 'Apple',
    sku: 'APP2-WHITE',
    rating: { average: 4.6, count: 3421 },
    discountPercentage: 17
  },
  {
    _id: '9',
    name: 'Nintendo Switch OLED',
    price: 349.99,
    comparePrice: 379.99,
    description: 'Gaming console with vibrant 7-inch OLED screen and enhanced audio. Features 7-inch OLED touchscreen, 64GB internal storage, enhanced audio, wired LAN port, and wide adjustable stand. Compatible with all Nintendo Switch games and offers handheld, tabletop, and TV modes.',
    images: [
      { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' }
    ],
    category: 'Gaming',
    brand: 'Nintendo',
    sku: 'NSW-OLED-WHT',
    rating: { average: 4.8, count: 2156 },
    discountPercentage: 8
  },
  {
    _id: '10',
    name: 'Apple Watch Series 9',
    price: 429.99,
    comparePrice: 479.99,
    description: 'Advanced health and fitness features with S9 chip and Double Tap gesture. Features brightest Apple Watch display ever, S9 SiP chip for faster performance, Double Tap gesture control, and comprehensive health monitoring including ECG, blood oxygen, and temperature sensing.',
    images: [
      { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop' }
    ],
    category: 'Wearables',
    brand: 'Apple',
    sku: 'AWS9-45-MM',
    rating: { average: 4.7, count: 1876 },
    discountPercentage: 10
  },
  {
    _id: '11',
    name: 'PlayStation 5',
    price: 499.99,
    comparePrice: 549.99,
    description: 'Next-gen gaming console with Ray Tracing and 3D Audio. Features custom AMD Zen 2 processor, RDNA 2-based GPU, ultra-high speed SSD, and hardware-accelerated Ray Tracing. Supports 4K gaming at up to 120fps, 3D Audio, and DualSense controller with haptic feedback.',
    images: [
      { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' }
    ],
    category: 'Gaming',
    brand: 'Sony',
    sku: 'PS5-DISC-ST',
    rating: { average: 4.9, count: 4321 },
    discountPercentage: 9
  },
  {
    _id: '12',
    name: 'Bose SoundLink Speaker',
    price: 129.99,
    comparePrice: 179.99,
    description: 'Portable Bluetooth speaker with 360-degree sound and 12-hour battery. Features proprietary technology for clear, balanced audio, water-resistant design (IPX4), and voice prompt setup. Includes built-in speakerphone, voice assistant access, and multi-device pairing.',
    images: [
      { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1486312338219-ce68e2dda28b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' }
    ],
    category: 'Audio',
    brand: 'Bose',
    sku: 'SL-MINI-BLK',
    rating: { average: 4.5, count: 1234 },
    discountPercentage: 28
  },
  {
    _id: '13',
    name: 'Microsoft Surface Pro 9',
    price: 999.99,
    comparePrice: 1199.99,
    description: '2-in-1 laptop and tablet with 13-inch PixelSense display. Features 12th Gen Intel Core processors, 13-inch PixelSense Flow display with 120Hz refresh rate, and all-day battery life. Compatible with Surface Slim Pen 2 and Surface Pro Signature Keyboard.',
    images: [
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' }
    ],
    category: 'Tablets',
    brand: 'Microsoft',
    sku: 'SP9-I5-256',
    rating: { average: 4.4, count: 876 },
    discountPercentage: 17
  },
  {
    _id: '14',
    name: 'GoPro Hero 12 Black',
    price: 399.99,
    comparePrice: 449.99,
    description: 'Action camera with 5.3K video, HyperSmooth stabilization, and night effects. Features GP2 processor, 5.3K60 and 4K120 video, AutoBoost low-light performance, and enhanced HyperSmooth 6.0 stabilization. Waterproof to 33ft with voice control and wireless connectivity.',
    images: [
      { url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop' }
    ],
    category: 'Photography',
    brand: 'GoPro',
    sku: 'GP-H12-BLK',
    rating: { average: 4.6, count: 987 },
    discountPercentage: 11
  },
  {
    _id: '15',
    name: 'Kindle Paperwhite',
    price: 139.99,
    comparePrice: 179.99,
    description: 'E-reader with 6.8-inch display, adjustable warm light, and waterproof design. Features 6.8-inch Paperwhite display with 300 PPI, adjustable warm light, weeks-long battery life, and IPX8 water resistance. Store thousands of books and access millions more.',
    images: [
      { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop' }
    ],
    category: 'Electronics',
    brand: 'Amazon',
    sku: 'KW-PW11-ADB',
    rating: { average: 4.7, count: 2341 },
    discountPercentage: 22
  },

  // Fashion & Accessories (15 products)
  {
    _id: '16',
    name: 'Ray-Ban Aviator Sunglasses',
    price: 154.99,
    comparePrice: 199.99,
    description: 'Classic aviator sunglasses with polarized lenses and UV protection. Features timeless metal frame design, G-15 polarized lenses that reduce glare and enhance contrast, and 100% UV protection. Includes case and cleaning cloth. Perfect for driving, outdoor activities, and everyday wear.',
    images: [
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop' }
    ],
    category: 'Fashion',
    brand: 'Ray-Ban',
    sku: 'RB-3025-58-G15',
    rating: { average: 4.6, count: 1876 },
    discountPercentage: 23
  },
  {
    _id: '17',
    name: 'Coach Leather Handbag',
    price: 395.99,
    comparePrice: 495.99,
    description: 'Genuine leather tote bag with multiple compartments and gold-tone hardware. Features premium pebbled leather construction, signature C logo hardware, multiple interior pockets, and detachable shoulder strap. Perfect for work, travel, or everyday use with timeless elegance.',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' }
    ],
    category: 'Fashion',
    brand: 'Coach',
    sku: 'C-LG-TOTE-PE',
    rating: { average: 4.7, count: 654 },
    discountPercentage: 20
  },
  {
    _id: '18',
    name: 'Nike Air Max 270',
    price: 149.99,
    comparePrice: 179.99,
    description: 'Comfortable running shoes with Max Air cushioning and breathable mesh. Features large Max Air unit in the heel for all-day comfort, mesh upper for breathability, and rubber outsole for durability. Available in multiple colorways and sizes for both men and women.',
    images: [
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' }
    ],
    category: 'Footwear',
    brand: 'Nike',
    sku: 'AM270-BLK-10',
    rating: { average: 4.5, count: 2341 },
    discountPercentage: 17
  },
  {
    _id: '19',
    name: 'Timex Weekender Watch',
    price: 89.99,
    comparePrice: 129.99,
    description: 'Classic analog watch with Indiglo night-light and leather strap. Features 38mm brass case, mineral crystal, and Timex signature Indiglo backlight. Water-resistant to 30m with interchangeable 18mm leather strap. Perfect everyday watch with timeless style.',
    images: [
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop' }
    ],
    category: 'Accessories',
    brand: 'Timex',
    sku: 'TW-38-LEATHER',
    rating: { average: 4.4, count: 987 },
    discountPercentage: 31
  },
  {
    _id: '20',
    name: 'Levi\'s 501 Jeans',
    price: 79.99,
    comparePrice: 99.99,
    description: 'Original straight leg jeans with button fly and classic fit. Features 100% cotton denim, button fly closure, and straight leg cut that sits at waist. Pre-shrunk fabric with signature arcuate stitching on back pockets. Available in various washes and inseam lengths.',
    images: [
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'Levi\'s',
    sku: '501-IND-32X32',
    rating: { average: 4.6, count: 1876 },
    discountPercentage: 20
  },
  {
    _id: '21',
    name: 'North Face Jacket',
    price: 199.99,
    comparePrice: 249.99,
    description: 'Waterproof and breathable jacket for outdoor adventures. Features DryVent 2L waterproof technology, fully seam-sealed construction, and adjustable hood. Made with recycled nylon and available in multiple colors. Perfect for hiking, skiing, and everyday outdoor activities.',
    images: [
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'The North Face',
    sku: 'TNF-DRYVNT-M',
    rating: { average: 4.7, count: 1234 },
    discountPercentage: 20
  },
  {
    _id: '22',
    name: 'Tiffany & Co. Bracelet',
    price: 295.99,
    comparePrice: 350.99,
    description: 'Sterling silver heart tag bracelet with iconic Tiffany design. Features genuine sterling silver construction, heart-shaped tag with Tiffany & Co. engraving, and adjustable chain from 6-8 inches. Comes with authenticity card and signature blue pouch.',
    images: [
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' }
    ],
    category: 'Jewelry',
    brand: 'Tiffany & Co.',
    sku: 'TIF-HRT-SLV',
    rating: { average: 4.8, count: 432 },
    discountPercentage: 16
  },
  {
    _id: '23',
    name: 'Vans Old Skool Sneakers',
    price: 69.99,
    comparePrice: 89.99,
    description: 'Classic skate shoes with signature waffle sole and side stripe. Features canvas and suede upper, signature waffle outsole for superior grip, and iconic side stripe detail. Available in multiple colorways including classic black/white and seasonal editions.',
    images: [
      { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' }
    ],
    category: 'Footwear',
    brand: 'Vans',
    sku: 'VNS-OSK-BLK-9',
    rating: { average: 4.6, count: 2987 },
    discountPercentage: 22
  },
  {
    _id: '24',
    name: 'Patagonia Fleece',
    price: 129.99,
    comparePrice: 159.99,
    description: 'Sustainable recycled polyester fleece jacket for outdoor comfort. Features 100% recycled polyester fleece, classic full-zip design, and Fair Trade Certified sewing. Made from post-consumer plastic bottles with superior warmth-to-weight ratio.',
    images: [
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'Patagonia',
    sku: 'PAT-FLEECE-M',
    rating: { average: 4.7, count: 876 },
    discountPercentage: 19
  },
  {
    _id: '25',
    name: 'Gucci Belt',
    price: 395.99,
    comparePrice: 450.99,
    description: 'Iconic GG logo belt with leather construction and gold-tone buckle. Features genuine leather construction, signature GG logo buckle in brushed gold-tone, and adjustable design. Made in Italy with premium materials and craftsmanship.',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' }
    ],
    category: 'Accessories',
    brand: 'Gucci',
    sku: 'GUCCI-GG-105',
    rating: { average: 4.5, count: 543 },
    discountPercentage: 12
  },
  {
    _id: '26',
    name: 'Adidas Ultraboost',
    price: 179.99,
    comparePrice: 219.99,
    description: 'Premium running shoes with Boost midsole and Primeknit upper. Features responsive BOOST midsole for energy return, Primeknit upper for adaptive support, and Continental rubber outsole for superior traction. Designed for performance and comfort during runs.',
    images: [
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' }
    ],
    category: 'Footwear',
    brand: 'Adidas',
    sku: 'ADI-UB-21-BLK',
    rating: { average: 4.6, count: 1876 },
    discountPercentage: 18
  },
  {
    _id: '27',
    name: 'Lacoste Polo Shirt',
    price: 89.99,
    comparePrice: 119.99,
    description: 'Classic cotton polo shirt with signature crocodile logo. Features 100% cotton piqué construction, regular fit, and embroidered crocodile logo on chest. Available in various colors including white, navy, and seasonal shades. Perfect for casual and smart-casual wear.',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'Lacoste',
    sku: 'LAC-POLO-M-WHT',
    rating: { average: 4.4, count: 987 },
    discountPercentage: 25
  },
  {
    _id: '28',
    name: 'Fossil Watch',
    price: 195.99,
    comparePrice: 245.99,
    description: 'Modern chronograph watch with stainless steel case and leather strap. Features 44mm stainless steel case, chronograph movement, genuine leather strap, and water resistance to 50m. Includes date display and is backed by Fossil\'s warranty.',
    images: [
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop' }
    ],
    category: 'Accessories',
    brand: 'Fossil',
    sku: 'FS-CHRONO-44',
    rating: { average: 4.5, count: 765 },
    discountPercentage: 20
  },
  {
    _id: '29',
    name: 'Calvin Klein Underwear',
    price: 34.99,
    comparePrice: 44.99,
    description: 'Comfortable cotton underwear with modern fit and logo waistband. Features 95% cotton, 5% elastane blend for stretch and comfort, no-show design, and signature Calvin Klein logo waistband. Sold in multi-pack for value.',
    images: [
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'Calvin Klein',
    sku: 'CK-MODERN-3PK',
    rating: { average: 4.3, count: 1432 },
    discountPercentage: 22
  },
  {
    _id: '30',
    name: 'Hugo Boss Suit',
    price: 599.99,
    comparePrice: 799.99,
    description: 'Classic business suit with modern fit and premium wool blend. Features wool blend fabric, slim modern fit, matching jacket and trousers, and pre-lined for easy tailoring. Perfect for business, formal events, and special occasions.',
    images: [
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' }
    ],
    category: 'Clothing',
    brand: 'Hugo Boss',
    sku: 'HB-SUIT-SLIM-M',
    rating: { average: 4.6, count: 321 },
    discountPercentage: 25
  },

  // Home & Kitchen (15 products)
  {
    _id: '31',
    name: 'Dyson V15 Vacuum',
    price: 749.99,
    comparePrice: 899.99,
    description: 'Cordless vacuum with laser dust detection and powerful suction. Features laser detection for fine dust, LCD screen showing performance data, and up to 60 minutes of run time. Includes multiple attachments for whole-home cleaning.',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop' }
    ],
    category: 'Home Appliances',
    brand: 'Dyson',
    sku: 'DY-V15-DETECT',
    rating: { average: 4.7, count: 1234 },
    discountPercentage: 17
  },
  {
    _id: '32',
    name: 'KitchenAid Stand Mixer',
    price: 379.99,
    comparePrice: 449.99,
    description: '5-quart tilt-head stand mixer with 10 speeds and multiple attachments. Features 575-watt motor, 10 speed settings, and includes flat beater, dough hook, and wire whip. Perfect for baking, mixing, and food preparation.',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' }
    ],
    category: 'Kitchen',
    brand: 'KitchenAid',
    sku: 'KA-5QT-RED',
    rating: { average: 4.8, count: 987 },
    discountPercentage: 16
  },
  {
    _id: '33',
    name: 'Ninja Foodi Air Fryer',
    price: 129.99,
    comparePrice: 179.99,
    description: 'Dual-basket air fryer with 8 cooking functions and dehydrate option. Features 8-quart capacity, 8 cooking functions including air fry, roast, bake, reheat, and dehydrate. Includes dehydrating station for making dried fruits and jerky.',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' }
    ],
    category: 'Kitchen',
    brand: 'Ninja',
    sku: 'NINJA-FD-401',
    rating: { average: 4.6, count: 1876 },
    discountPercentage: 28
  },
  {
    _id: '34',
    name: 'Instant Pot Duo',
    price: 99.99,
    comparePrice: 129.99,
    description: '7-in-1 electric pressure cooker with stainless steel inner pot. Functions as pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer. Includes recipe book and steam rack for versatile cooking.',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' }
    ],
    category: 'Kitchen',
    brand: 'Instant Pot',
    sku: 'IP-DUO-7QT',
    rating: { average: 4.5, count: 2341 },
    discountPercentage: 23
  },
  {
    _id: '35',
    name: 'Dyson Fan',
    price: 399.99,
    comparePrice: 479.99,
    description: 'Bladeless fan with air multiplier technology and remote control. Features bladeless design for safe operation, oscillation, sleep timer, and remote control. Provides smooth, consistent airflow without traditional blades.',
    images: [
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop' }
    ],
    category: 'Home Appliances',
    brand: 'Dyson',
    sku: 'DY-AM09-WHT',
    rating: { average: 4.4, count: 876 },
    discountPercentage: 17
  },
  {
    _id: '36',
    name: 'Keurig Coffee Maker',
    price: 149.99,
    comparePrice: 199.99,
    description: 'Single-serve coffee maker with multiple brew sizes and strong brew option. Features 40oz removable water reservoir, programmable auto-off, and compatibility with all K-Cup pods. Includes water filter for better taste.',
    images: [
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop' }
    ],
    category: 'Kitchen',
    brand: 'Keurig',
    sku: 'KEURIG-K-ELITE',
    rating: { average: 4.3, count: 1543 },
    discountPercentage: 25
  },
  {
    _id: '37',
    name: 'Roomba i7+ Robot Vacuum',
    price: 799.99,
    comparePrice: 999.99,
    description: 'Self-emptying robot vacuum with smart mapping and app control. Features Imprint Smart Mapping, automatic dirt disposal, and Wi-Fi connectivity. Includes dual multi-surface rubber brushes and advanced navigation.',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop' }
    ],
    category: 'Home Appliances',
    brand: 'iRobot',
    sku: 'IRB-I7-PLUS',
    rating: { average: 4.6, count: 765 },
    discountPercentage: 20
  },
  {
    _id: '38',
    name: 'Vitamix Blender',
    price: 449.99,
    comparePrice: 549.99,
    description: 'High-performance blender with variable speed control and self-cleaning.',
    images: [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' }],
    category: 'Kitchen',
    rating: { average: 4.8, count: 654 },
    discountPercentage: 18
  },
  {
    _id: '39',
    name: 'Philips Hue Lights',
    price: 199.99,
    comparePrice: 249.99,
    description: 'Smart LED light bulbs with color changing and app control.',
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' }],
    category: 'Home',
    rating: { average: 4.5, count: 987 },
    discountPercentage: 20
  },
  {
    _id: '40',
    name: 'Oculus Quest 2',
    price: 299.99,
    comparePrice: 349.99,
    description: 'Wireless VR headset with 4K display and hand tracking.',
    images: [{ url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=400&fit=crop' }],
    category: 'Gaming',
    rating: { average: 4.7, count: 1876 },
    discountPercentage: 14
  },
  {
    _id: '41',
    name: 'Smart Thermostat',
    price: 249.99,
    comparePrice: 299.99,
    description: 'Wi-Fi enabled thermostat with energy saving and voice control.',
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' }],
    category: 'Home',
    rating: { average: 4.4, count: 1234 },
    discountPercentage: 17
  },
  {
    _id: '42',
    name: 'Air Purifier',
    price: 199.99,
    comparePrice: 249.99,
    description: 'HEPA air purifier with real-time air quality monitoring.',
    images: [{ url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' }],
    category: 'Home',
    rating: { average: 4.5, count: 876 },
    discountPercentage: 20
  },
  {
    _id: '43',
    name: 'Electric Toothbrush',
    price: 129.99,
    comparePrice: 179.99,
    description: 'Smart electric toothbrush with app connectivity and pressure sensor.',
    images: [{ url: 'https://images.unsplash.com/photo-1606216794074-735e91bf3dc2?w=400&h=400&fit=crop' }],
    category: 'Personal Care',
    rating: { average: 4.6, count: 1543 },
    discountPercentage: 28
  },
  {
    _id: '44',
    name: 'Hair Dryer',
    price: 89.99,
    comparePrice: 129.99,
    description: 'Ionic hair dryer with multiple heat and speed settings.',
    images: [{ url: 'https://images.unsplash.com/photo-1606216794074-735e91bf3dc2?w=400&h=400&fit=crop' }],
    category: 'Personal Care',
    rating: { average: 4.4, count: 987 },
    discountPercentage: 31
  },
  {
    _id: '45',
    name: 'Massage Gun',
    price: 199.99,
    comparePrice: 249.99,
    description: 'Percussive therapy device with multiple speed settings and quiet operation.',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }],
    category: 'Health & Fitness',
    rating: { average: 4.7, count: 1234 },
    discountPercentage: 20
  },

  // Sports & Fitness (10 products)
  {
    _id: '46',
    name: 'Yoga Mat Premium',
    price: 79.99,
    comparePrice: 109.99,
    description: 'Non-slip yoga mat with carrying strap and alignment guides.',
    images: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop' }],
    category: 'Fitness',
    rating: { average: 4.6, count: 987 },
    discountPercentage: 27
  },
  {
    _id: '47',
    name: 'Resistance Bands Set',
    price: 39.99,
    comparePrice: 59.99,
    description: 'Complete resistance bands set with multiple resistance levels.',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }],
    category: 'Fitness',
    rating: { average: 4.5, count: 1234 },
    discountPercentage: 33
  },
  {
    _id: '48',
    name: 'Protein Powder',
    price: 59.99,
    comparePrice: 79.99,
    description: 'Whey protein isolate with 25g protein per serving and great taste.',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }],
    category: 'Nutrition',
    rating: { average: 4.4, count: 876 },
    discountPercentage: 25
  },
  {
    _id: '49',
    name: 'Exercise Bike',
    price: 599.99,
    comparePrice: 799.99,
    description: 'Magnetic exercise bike with LCD display and heart rate monitor.',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }],
    category: 'Fitness',
    rating: { average: 4.5, count: 543 },
    discountPercentage: 25
  },
  {
    _id: '50',
    name: 'Tennis Racket',
    price: 189.99,
    comparePrice: 239.99,
    description: 'Professional tennis racket with graphite construction and balanced weight.',
    images: [{ url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop' }],
    category: 'Sports',
    rating: { average: 4.6, count: 432 },
    discountPercentage: 21
  },
  {
    _id: '51',
    name: 'Basketball',
    price: 49.99,
    comparePrice: 69.99,
    description: 'Official size basketball with composite leather cover and deep channels.',
    images: [{ url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop' }],
    category: 'Sports',
    rating: { average: 4.5, count: 876 },
    discountPercentage: 29
  },
  {
    _id: '52',
    name: 'Football',
    price: 39.99,
    comparePrice: 54.99,
    description: 'Official NFL football with composite leather and pointed laces.',
    images: [{ url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop' }],
    category: 'Sports',
    rating: { average: 4.4, count: 654 },
    discountPercentage: 27
  },
  {
    _id: '53',
    name: 'Golf Clubs Set',
    price: 799.99,
    comparePrice: 999.99,
    description: 'Complete golf club set with driver, woods, irons, wedges, and putter.',
    images: [{ url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop' }],
    category: 'Sports',
    rating: { average: 4.7, count: 321 },
    discountPercentage: 20
  },
  {
    _id: '54',
    name: 'Swimming Goggles',
    price: 29.99,
    comparePrice: 44.99,
    description: 'Anti-fog swimming goggles with UV protection and adjustable strap.',
    images: [{ url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop' }],
    category: 'Sports',
    rating: { average: 4.3, count: 987 },
    discountPercentage: 33
  },
  {
    _id: '55',
    name: 'Dumbbells Set',
    price: 299.99,
    comparePrice: 399.99,
    description: 'Adjustable dumbbells set with weight range from 5 to 50 pounds.',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }],
    category: 'Fitness',
    rating: { average: 4.6, count: 765 },
    discountPercentage: 25
  },

  // Books & Media (5 products)
  {
    _id: '56',
    name: 'The Psychology of Money',
    price: 18.99,
    comparePrice: 24.99,
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' }],
    category: 'Books',
    rating: { average: 4.8, count: 5432 },
    discountPercentage: 24
  },
  {
    _id: '57',
    name: 'Atomic Habits',
    price: 21.99,
    comparePrice: 28.99,
    description: 'An easy & proven way to build good habits & break bad ones by James Clear.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' }],
    category: 'Books',
    rating: { average: 4.9, count: 8765 },
    discountPercentage: 24
  },
  {
    _id: '58',
    name: 'The Midnight Library',
    price: 16.99,
    comparePrice: 22.99,
    description: 'A novel about life, death, and the choices that define us by Matt Haig.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' }],
    category: 'Books',
    rating: { average: 4.5, count: 2341 },
    discountPercentage: 26
  },
  {
    _id: '59',
    name: 'Where the Crawdads Sing',
    price: 17.99,
    comparePrice: 23.99,
    description: 'A mystery novel about isolation, nature, and belonging by Delia Owens.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' }],
    category: 'Books',
    rating: { average: 4.6, count: 4321 },
    discountPercentage: 25
  },
  {
    _id: '60',
    name: 'The Silent Patient',
    price: 19.99,
    comparePrice: 25.99,
    description: 'A psychological thriller about a woman and her husband.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' }],
    category: 'Books',
    rating: { average: 4.4, count: 3210 },
    discountPercentage: 23
  }
];

// Pagination configuration
export const productsPerPage = 20; // Show 20 products per page
export const totalPages = Math.ceil(allProducts.length / productsPerPage); // 3 pages total