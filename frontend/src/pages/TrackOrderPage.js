import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, ShoppingCart, Phone, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const TrackOrderPage = () => {
  const { orderNumber: urlOrderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email');
  
  const [trackingData, setTrackingData] = useState({
    orderNumber: urlOrderNumber || '',
    email: emailFromUrl || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-search if order number is in URL
  useEffect(() => {
    if (urlOrderNumber && emailFromUrl) {
      handleTrackOrder(urlOrderNumber, emailFromUrl);
    }
  }, [urlOrderNumber, emailFromUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrackingData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user types
  };

  const handleTrackOrder = async (orderNum = trackingData.orderNumber, email = trackingData.email) => {
    if (!orderNum || !email) {
      setError('Please enter both order number and email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/orders/by-number/${encodeURIComponent(orderNum)}?email=${encodeURIComponent(email)}`);
      const result = await response.json();

      if (result.success) {
        setTrackingResult(result.data.order);
        toast.success('Order tracking information retrieved successfully!');
      } else {
        setError(result.message || 'Order not found. Please check your order number and email.');
        setTrackingResult(null);
      }
    } catch (error) {
      console.error('Track order error:', error);
      setError('Failed to track order. Please try again.');
      setTrackingResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleTrackOrder();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in_transit':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'shipped':
        return <Package className="h-6 w-6 text-purple-500" />;
      default:
        return <Clock className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in_transit':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              ModernShop
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600">
            Enter your order details to track your package in real-time.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Search className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number *
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  required
                  value={trackingData.orderNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="ORD-1234567890-0001"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={trackingData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Order {trackingResult.orderNumber}</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  trackingResult.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  trackingResult.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  trackingResult.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Order Date</div>
                  <div className="font-semibold">{new Date(trackingResult.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Total Amount</div>
                  <div className="font-semibold">${trackingResult.totalAmount}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Shipping Address</div>
                  <div className="font-semibold text-sm">
                    {trackingResult.shippingAddress?.street}<br/>
                    {trackingResult.shippingAddress?.city}, {trackingResult.shippingAddress?.state} {trackingResult.shippingAddress?.zipCode}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                <div className="space-y-3">
                  {trackingResult.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.price}</div>
                        <div className="text-sm text-gray-600">Each</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            {trackingResult.trackingEvents && trackingResult.trackingEvents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Truck className="h-6 w-6 text-primary-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Tracking History</h3>
                </div>

                <div className="space-y-4">
                  {trackingResult.trackingEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4 relative z-10"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{event.status}</h4>
                          <span className="text-sm text-gray-600">
                            {new Date(event.timestamp).toLocaleDateString()} at {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{event.location}</p>
                        {event.description && (
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with Your Order?</h3>
                <p className="text-gray-600 mb-6">Our customer support team is here to assist you</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@yourstore.com"
                    className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email Support
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Phone className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you're having trouble tracking your order, our customer service team is here to help.
            </p>
            <Link
              to="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Mail className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Issues?</h3>
            <p className="text-gray-600 mb-4">
              If your package is delayed or you're experiencing delivery problems, we can assist.
            </p>
            <Link
              to="/contact"
              className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-2 rounded-lg transition-colors inline-block"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;