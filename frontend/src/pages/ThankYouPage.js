import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  ArrowRight,
  Download,
  Share2,
  Star,
  Gift,
  Sparkles,
  CreditCard,
  Calendar,
  Shield,
  Headphones,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const orderNumber = searchParams.get('order');
  const paymentReference = searchParams.get('ref');
  
  useEffect(() => {
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    if (!orderNumber) {
      navigate('/');
      return;
    }
    
    fetchOrderDetails();
  }, [orderNumber, paymentReference, navigate]);
  
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/orders/by-number/${orderNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data.data.order);
      } else if (response.status === 401) {
        navigate('/login');
        return;
      } else {
        // If order not found, still show a basic success page
        setOrderDetails({
          orderNumber: orderNumber,
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          total: 0,
          subtotal: 0,
          shipping: 0,
          tax: 0,
          items: [],
          shippingAddress: user?.address || {},
          paymentReference: paymentReference
        });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      // Show basic success page even if fetch fails
      setOrderDetails({
        orderNumber: orderNumber,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        total: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        items: [],
        shippingAddress: user?.address || {},
        paymentReference: paymentReference
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Order Confirmation',
        text: `I just placed an amazing order #${orderNumber}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'shipped':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'delivered':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressSteps = () => {
    const steps = [
      { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, completed: true },
      { id: 'processing', label: 'Processing', icon: Package, completed: ['confirmed', 'processing'].includes(orderDetails?.status) },
      { id: 'shipped', label: 'Shipped', icon: Truck, completed: ['confirmed', 'processing', 'shipped'].includes(orderDetails?.status) },
      { id: 'delivered', label: 'Delivered', icon: Gift, completed: orderDetails?.status === 'delivered' }
    ];
    return steps;
  };
  
  const getEstimatedDelivery = () => {
    const orderDate = new Date(orderDetails?.createdAt || Date.now());
    const deliveryDate = new Date(orderDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Success Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
              <CheckCircle className="h-14 w-14 text-white animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase, <span className="font-semibold text-gray-800">{user?.firstName || 'Valued Customer'}</span>!
            </p>
            <p className="text-gray-500">Your order has been successfully placed and is being processed.</p>
          </div>
        </div>

        {/* Order Progress Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Order Progress</h2>
          <div className="relative">
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full"></div>
            <div className="absolute top-8 left-8 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                 style={{ width: `${(getProgressSteps().findIndex(step => !step.completed) / (getProgressSteps().length - 1)) * 100}%` }}>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
              {getProgressSteps().map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500 ${
                      step.completed 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-200 text-white shadow-lg' 
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <p className={`mt-3 font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                    {step.completed && index === 0 && (
                      <p className="text-sm text-green-600 mt-1">Just now</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Package className="h-6 w-6 mr-3 text-blue-600" />
                  Order Details
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Print
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <span className="text-gray-600 font-medium">Order Number</span>
                    <span className="font-mono font-bold text-blue-600">{orderDetails?.orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <span className="text-gray-600 font-medium">Order Date</span>
                    <span className="font-semibold text-gray-900">{formatDate(orderDetails?.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <span className="text-gray-600 font-medium">Payment Reference</span>
                    <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">{paymentReference}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
                    <span className="text-gray-600 font-medium">Payment Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Paid
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
                    <span className="text-gray-600 font-medium">Total Amount</span>
                    <span className="font-bold text-2xl text-gray-900">${orderDetails?.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                    <span className="text-gray-600 font-medium">Estimated Delivery</span>
                    <span className="font-semibold text-gray-900">{getEstimatedDelivery()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            {orderDetails?.items && orderDetails.items.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Gift className="h-6 w-6 mr-3 text-purple-600" />
                  Items Ordered ({orderDetails.items.length})
                </h2>
                <div className="space-y-6">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={item.product?.images?.[0]?.url || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-2xl shadow-md"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                        {item.variant && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(item.variant).map(([key, value]) => (
                              <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1" />
                            ${(item.price || 0).toFixed(2)} each
                          </span>
                          <span className="flex items-center">
                            <Package className="h-4 w-4 mr-1" />
                            Subtotal: ${(item.subtotal || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900">${(item.subtotal || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-green-600" />
                Shipping Address
              </h2>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-900 mb-3">
                      {orderDetails?.shippingAddress?.firstName} {orderDetails?.shippingAddress?.lastName}
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <span className="font-medium">Address:</span>
                        <span className="ml-2">{orderDetails?.shippingAddress?.street}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">
                          {orderDetails?.shippingAddress?.city}, {orderDetails?.shippingAddress?.state} {orderDetails?.shippingAddress?.zipCode}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Country:</span>
                        <span className="ml-2">{orderDetails?.shippingAddress?.country}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-green-200">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-green-600" />
                        {orderDetails?.shippingAddress?.email || user?.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        {orderDetails?.shippingAddress?.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${orderDetails?.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {orderDetails?.shipping === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      `$${orderDetails?.shipping?.toFixed(2) || '0.00'}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${orderDetails?.tax?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ${orderDetails?.total?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/orders"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Package className="h-5 w-5 mr-2" />
                  View All Orders
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
                
                <Link
                  to={`/track-order/${orderDetails?.orderNumber}?email=${encodeURIComponent(orderDetails?.shippingAddress?.email || user?.email || '')}`}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Truck className="h-5 w-5 mr-2" />
                  Track This Order
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  You're Protected
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Secure payment processing
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    30-day return policy
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    24/7 customer support
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                What's Next?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Order Processing</h4>
                    <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Truck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Shipping Updates</h4>
                    <p className="text-sm text-gray-600">You'll receive tracking information via email</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Gift className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delivery</h4>
                    <p className="text-sm text-gray-600">Your order will arrive within 7 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Headphones className="h-5 w-5 mr-2 text-orange-600" />
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">Our support team is here to help you with any questions.</p>
              <Link
                to="/contact"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Shopping</h2>
            <p className="text-gray-600 mb-8">Discover more amazing products in our store</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop More Products
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;