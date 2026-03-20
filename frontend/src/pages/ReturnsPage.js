import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Package, Clock, Shield, CheckCircle, AlertCircle, DollarSign, ShoppingCart, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

const ReturnsPage = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    itemName: '',
    reason: '',
    condition: 'new'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReturnForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Return request submitted successfully! We\'ll email you a return label.');
      setReturnForm({
        orderNumber: '',
        email: '',
        itemName: '',
        reason: '',
        condition: 'new'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const returnReasons = [
    'Wrong size',
    'Item damaged',
    'Item defective',
    'Not as described',
    'Changed mind',
    'Poor quality',
    'Wrong item received',
    'Other'
  ];

  const conditionOptions = [
    { value: 'new', label: 'Like New', description: 'Unused with tags attached' },
    { value: 'good', label: 'Good', description: 'Lightly used, no damage' },
    { value: 'fair', label: 'Fair', description: 'Some wear, still functional' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              ModernShop
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Easy, hassle-free returns within 30 days. Your satisfaction is our priority.
          </p>
        </div>

        {/* Return Policy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Returns</h3>
            <p className="text-gray-600 text-sm">30 days from delivery date</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <RotateCcw className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Returns</h3>
            <p className="text-gray-600 text-sm">Prepaid return labels provided</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <DollarSign className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Refunds</h3>
            <p className="text-gray-600 text-sm">3-5 business day processing</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 text-sm">60 days for defective items</p>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Returns Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Return</h3>
              <p className="text-gray-600 text-sm">Log into your account and initiate a return for any eligible item</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Label</h3>
              <p className="text-gray-600 text-sm">We'll email you a prepaid return shipping label</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ship Item</h3>
              <p className="text-gray-600 text-sm">Package securely and drop off at any authorized location</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Refund</h3>
              <p className="text-gray-600 text-sm">Receive your refund to the original payment method</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Return Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Initiate a Return</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number *
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  required
                  value={returnForm.orderNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Order #12345"
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
                  value={returnForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name/Description *
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  required
                  value={returnForm.itemName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Blue Cotton T-Shirt, Size M"
                />
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Return Reason *
                </label>
                <select
                  id="reason"
                  name="reason"
                  required
                  value={returnForm.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Item Condition *
                </label>
                <div className="space-y-3">
                  {conditionOptions.map((option) => (
                    <label key={option.value} className="flex items-start">
                      <input
                        type="radio"
                        name="condition"
                        value={option.value}
                        checked={returnForm.condition === option.value}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </label>
                  ))}
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
                    <Package className="h-5 w-5 mr-2" />
                    Submit Return Request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Return Policy Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Return Policy</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Standard Returns</h4>
                    <p className="text-gray-600 text-sm">30 days from delivery for unworn items with tags attached</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Defective Items</h4>
                    <p className="text-gray-600 text-sm">60 days for items that arrive damaged or defective</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Final Sale Items</h4>
                    <p className="text-gray-600 text-sm">Cannot be returned unless defective</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Refund Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-semibold text-gray-900">3-5 business days</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Refund Method:</span>
                  <span className="font-semibold text-gray-900">Original payment</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bank Processing:</span>
                  <span className="font-semibold text-gray-900">5-10 business days</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Return Shipping:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <RotateCcw className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Need an Exchange Instead?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Want a different size or color? We make exchanges easy! Just indicate your preferred replacement 
              when initiating your return, and we'll process it at no additional cost.
            </p>
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Request Exchange
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Your Return?</h2>
          <p className="text-gray-600 mb-8">Our customer service team is here to assist you with any questions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Support
            </Link>
            <a
              href="mailto:returns@modernshop.com"
              className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Returns Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;