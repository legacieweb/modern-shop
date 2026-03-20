import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, ShoppingCart, Heart, Truck, Shield, Headphones, ChevronLeft, ChevronRight, Zap, Sparkles, Clock, DollarSign, RotateCcw, Award, X, CheckCircle, Phone, Mail, Package, MapPin, CreditCard, RefreshCw, Crown, Smartphone, Laptop, Headphones as HeadphonesIcon, Camera, Watch, Shirt, Home, Gamepad2, Book } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { requestQueue } from '../utils/requestQueue';
import { allProducts } from '../data/productsData';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [scatteredTiles, setScatteredTiles] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Product image tiles that overlap
  const productImageTiles = [
    {
      id: 'smartphone',
      name: 'iPhone 15 Pro',
      price: '$999',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
      category: 'Electronics',
      badge: 'New'
    },
    {
      id: 'laptop',
      name: 'MacBook Pro',
      price: '$1,299',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
      category: 'Computers',
      badge: 'Hot'
    },
    {
      id: 'headphones',
      name: 'Sony WH-1000XM5',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
      category: 'Audio',
      badge: 'Sale'
    },
    {
      id: 'camera',
      name: 'Canon EOS R5',
      price: '$3,899',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764ce7?w=300&h=300&fit=crop',
      category: 'Photography',
      badge: 'Pro'
    },
    {
      id: 'watch',
      name: 'Apple Watch Ultra',
      price: '$799',
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=300&fit=crop',
      category: 'Wearables',
      badge: 'Premium'
    }
  ];

  // Feature tiles data with detailed information
  const featureTiles = [
    {
      id: 'shipping',
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On orders over $100',
      description: 'Enjoy completely free shipping on all orders over $100. We partner with reliable carriers to ensure your items arrive safely and on time.',
      gradient: 'from-green-400 to-emerald-500',
      details: {
        benefits: [
          'Free shipping on orders over $100',
          'Express delivery available',
          'Real-time tracking',
          'Insured shipping'
        ],
        coverage: 'Nationwide delivery',
        time: '2-5 business days',
        partners: ['UPS', 'FedEx', 'DHL']
      }
    },
    {
      id: 'support',
      icon: Clock,
      title: '24/7 Support',
      subtitle: 'Always here to help',
      description: 'Our dedicated customer support team is available around the clock to assist you with any questions or concerns.',
      gradient: 'from-blue-400 to-cyan-500',
      details: {
        benefits: [
          '24/7 live chat support',
          'Email response within 1 hour',
          'Phone support 9AM-9PM',
          'Video call assistance'
        ],
        coverage: 'Global customer support',
        time: 'Instant response',
        partners: ['LiveChat', 'Zendesk', 'Intercom']
      }
    },
    {
      id: 'payment',
      icon: Shield,
      title: 'Secure Payment',
      subtitle: '256-bit SSL encryption',
      description: 'Your payment information is protected with industry-leading security measures and encrypted payment processing.',
      gradient: 'from-purple-400 to-violet-500',
      details: {
        benefits: [
          '256-bit SSL encryption',
          'PCI DSS compliant',
          'Fraud protection',
          'Multiple payment methods'
        ],
        coverage: 'Worldwide payment security',
        time: 'Instant processing',
        partners: ['Stripe', 'PayPal', 'Square']
      }
    },
    {
      id: 'returns',
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: '30-day return policy',
      description: 'Not satisfied with your purchase? Return any item within 30 days for a full refund, no questions asked.',
      gradient: 'from-orange-400 to-red-500',
      details: {
        benefits: [
          '30-day return window',
          'Free return shipping',
          'Instant refunds',
          'No restocking fees'
        ],
        coverage: 'All products eligible',
        time: '5-7 business days',
        partners: ['UPS', 'USPS', 'Local carriers']
      }
    },
    {
      id: 'prices',
      icon: Award,
      title: 'Best Prices',
      subtitle: 'Price match guarantee',
      description: 'We guarantee the best prices on all our products. Found a lower price elsewhere? We\'ll match it.',
      gradient: 'from-yellow-400 to-amber-500',
      details: {
        benefits: [
          'Price match guarantee',
          'Daily price updates',
          'Bulk discounts',
          'Clearance sales'
        ],
        coverage: 'All products',
        time: 'Instant price checking',
        partners: ['Price comparison APIs', 'Market data']
      }
    }
  ];

  // Use first 8 products from allProducts as featured products
  const sampleProducts = allProducts.slice(0, 8);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchHomeData();
    
    // Keyboard support for popups
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && activePopup) {
        setActivePopup(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePopup]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Use first 8 products from allProducts as featured products
      setFeaturedProducts(allProducts.slice(0, 8));

      // Extract unique categories from allProducts
      const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
      
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Error fetching home data:', error);
      toast.error('Failed to load homepage data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist!');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Clean Modern Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Clean Content Section */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-5 backdrop-blur-sm rounded-full mb-8 border border-white border-opacity-10">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-white font-medium text-sm">Premium Shopping Experience</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
                <span className="block text-white mb-2">Modern</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-normal">
                  Commerce
                </span>
                <span className="block text-white mt-2">Redefined</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
                Discover curated products from trusted brands. Experience seamless shopping with 
                <span className="text-white font-medium"> fast delivery</span> and 
                <span className="text-white font-medium"> exceptional service</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/products" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-medium rounded-2xl hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/products" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white border-opacity-20 text-white font-medium rounded-2xl hover:border-opacity-40 hover:bg-white hover:bg-opacity-5 transition-all duration-300 text-lg"
                >
                  <span>Learn More</span>
                </Link>
              </div>
              
              {/* Simple Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-light text-white mb-1">50K+</div>
                  <div className="text-gray-400 text-sm">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-light text-white mb-1">1M+</div>
                  <div className="text-gray-400 text-sm">Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-light text-white mb-1">99%</div>
                  <div className="text-gray-400 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Clean Interactive Section */}
            <div className="hidden lg:block relative">
              <div className="relative h-96">
                {/* Central Focus */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <ShoppingCart className="h-16 w-16 text-slate-900 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Clean Feature Tiles with Popups */}
                <div className="absolute top-8 left-8">
                  <button
                    onClick={() => setActivePopup(activePopup === 'shipping' ? null : 'shipping')}
                    className="w-20 h-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <Truck className="h-6 w-6 text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">Shipping</span>
                  </button>
                </div>
                
                <div className="absolute top-8 right-8">
                  <button
                    onClick={() => setActivePopup(activePopup === 'payment' ? null : 'payment')}
                    className="w-20 h-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <Shield className="h-6 w-6 text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">Secure</span>
                  </button>
                </div>
                
                <div className="absolute bottom-8 left-8">
                  <button
                    onClick={() => setActivePopup(activePopup === 'support' ? null : 'support')}
                    className="w-20 h-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <Headphones className="h-6 w-6 text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">Support</span>
                  </button>
                </div>
                
                <div className="absolute bottom-8 right-8">
                  <button
                    onClick={() => setActivePopup(activePopup === 'returns' ? null : 'returns')}
                    className="w-20 h-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <RotateCcw className="h-6 w-6 text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">Returns</span>
                  </button>
                </div>
                
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button
                    onClick={() => setActivePopup(activePopup === 'prices' ? null : 'prices')}
                    className="w-16 h-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <Award className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button
                    onClick={() => setActivePopup(activePopup === 'support' ? null : 'support')}
                    className="w-16 h-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20 group"
                  >
                    <Clock className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                
                {/* Cool Popup Modals */}
                {activePopup && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-60 popup-backdrop animate-fadeIn"
                      onClick={() => setActivePopup(null)}
                    ></div>
                    
                    {/* Popup Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-scaleIn popup-content">
                      {/* Close Button */}
                      <button
                        onClick={() => setActivePopup(null)}
                        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10 group"
                      >
                        <X className="h-4 w-4 text-gray-600 group-hover:rotate-90 transition-transform duration-200" />
                      </button>
                      
                      {/* Content */}
                      {(() => {
                        const tile = featureTiles.find(t => t.id === activePopup);
                        if (!tile) return null;
                        const Icon = tile.icon;
                        
                        return (
                          <div className="p-8">
                            {/* Header */}
                            <div className="text-center mb-6">
                              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${tile.gradient} rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-200`}>
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tile.title}</h3>
                              <p className="text-gray-600">{tile.subtitle}</p>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-700 mb-6 leading-relaxed">{tile.description}</p>
                            
                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                              {tile.details.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${tile.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                                    <CheckCircle className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                              <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group cursor-pointer">
                                <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-sm font-medium text-gray-900">{tile.details.coverage}</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group cursor-pointer">
                                <Clock className="h-5 w-5 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-sm font-medium text-gray-900">{tile.details.time}</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group cursor-pointer">
                                <Package className="h-5 w-5 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-sm font-medium text-gray-900">{tile.details.partners.length} Partners</div>
                              </div>
                            </div>
                            
                            {/* Partners */}
                            <div className="text-center">
                              <p className="text-sm text-gray-500 mb-3">Trusted Partners</p>
                              <div className="flex flex-wrap justify-center gap-2">
                                {tile.details.partners.map((partner, index) => (
                                  <span key={index} className={`px-3 py-1 bg-gradient-to-r ${tile.gradient} text-white text-sm rounded-full shadow-sm hover:shadow-md transition-shadow duration-200`}>
                                    {partner}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Simple Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border border-white border-opacity-30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Creative Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-primary-800 font-medium">Discover Categories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore our carefully curated categories filled with premium products</p>
          </div>
          
          {/* Desktop: 5x1 Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-6">
              {categories.slice(0, 5).map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:rotate-1"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-primary-600 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary-600 rounded-full"></div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                        <ShoppingCart className="h-10 w-10 text-primary-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors text-lg">
                        {category}
                      </h3>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile: Sliding Carousel */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCategoryIndex * 100}%)` }}
                >
                  {categories.slice(0, 5).map((category, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Link
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="block group"
                      >
                        <div className="bg-white rounded-2xl shadow-xl m-4 p-8 transform group-hover:scale-105 transition-all duration-300">
                          <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                              <ShoppingCart className="h-12 w-12 text-primary-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">{category}</h3>
                            <div className="text-primary-600 font-medium">Explore Now →</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={() => setCurrentCategoryIndex(prev => prev > 0 ? prev - 1 : categories.length - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                disabled={categories.length <= 1}
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              
              <button
                onClick={() => setCurrentCategoryIndex(prev => prev < categories.length - 1 ? prev + 1 : 0)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                disabled={categories.length <= 1}
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {categories.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCategoryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentCategoryIndex 
                        ? 'bg-primary-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Hand-picked products just for you</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                <div className="relative">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors text-sm leading-tight">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating.average)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-primary-600 text-lg">${product.price.toFixed(2)}</span>
                      {product.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons - Always at Bottom */}
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                      className={`p-2 rounded-xl transition-all duration-300 border-2 ${
                        isInWishlist(product._id)
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                      }`}
                      title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(product._id) 
                            ? 'fill-current text-red-600' 
                            : ''
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;