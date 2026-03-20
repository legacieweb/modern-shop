import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, Globe, Shield, DollarSign, MapPin, ShoppingCart, Package } from 'lucide-react';

const ShippingPage = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '3-7 business days',
      cost: 'Free on orders $100+ | $5.99 under $100',
      description: 'Our most popular option with reliable delivery to your door.',
      icon: Truck,
      popular: true
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$12.99',
      description: 'Faster delivery when you need your items quickly.',
      icon: Clock,
      popular: false
    },
    {
      name: 'Overnight Shipping',
      time: 'Next business day',
      cost: '$24.99',
      description: 'Get your order delivered the very next business day.',
      icon: Package,
      popular: false
    }
  ];

  const internationalOptions = [
    { region: 'Canada', time: '5-10 business days', cost: '$15.99' },
    { region: 'Mexico', time: '5-10 business days', cost: '$18.99' },
    { region: 'Europe', time: '7-14 business days', cost: '$24.99' },
    { region: 'Asia-Pacific', time: '10-20 business days', cost: '$29.99' },
    { region: 'Rest of World', time: '15-25 business days', cost: '$34.99' }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable shipping to get your orders to you quickly and safely.
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-12 text-white text-center">
          <Truck className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Free Standard Shipping on Orders $100+</h2>
          <p className="text-green-100">No code needed - free shipping automatically applied at checkout</p>
        </div>

        {/* Domestic Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Domestic Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                    option.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-semibold text-gray-900">{option.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-semibold text-primary-600">{option.cost}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="h-6 w-6 text-primary-600 mr-3" />
              Shipping Protection
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Package Insurance</h4>
                  <p className="text-gray-600 text-sm">All packages are insured against loss or damage during transit.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Tracking Included</h4>
                  <p className="text-gray-600 text-sm">Real-time tracking updates from warehouse to your door.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Secure Packaging</h4>
                  <p className="text-gray-600 text-sm">Items are carefully packaged to prevent damage.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 text-primary-600 mr-3" />
              Processing Times
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Order Processing:</span>
                <span className="font-semibold text-gray-900">1-2 business days</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Weekend Orders:</span>
                <span className="font-semibold text-gray-900">Processed Monday</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Holiday Orders:</span>
                <span className="font-semibold text-gray-900">May have delays</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Backordered Items:</span>
                <span className="font-semibold text-gray-900">Additional 1-2 weeks</span>
              </div>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Shipping</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We ship to over 50 countries worldwide. International orders may be subject to customs duties and taxes.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Region</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Delivery Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shipping Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {internationalOptions.map((option, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{option.region}</td>
                      <td className="px-6 py-4 text-gray-600">{option.time}</td>
                      <td className="px-6 py-4 text-primary-600 font-semibold">{option.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <DollarSign className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  International orders may be subject to customs duties, taxes, and brokerage fees. These charges are the responsibility of the customer and are not included in the shipping cost.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Restrictions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipping Restrictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🚫 Restricted Items</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Hazardous materials</li>
                <li>• Perishable goods</li>
                <li>• Items over 70 lbs</li>
                <li>• Firearms or ammunition</li>
                <li>• Certain electronics in some countries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">📍 Geographic Restrictions</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• PO Box deliveries for heavy items</li>
                <li>• Remote area surcharges may apply</li>
                <li>• Some islands have extended delivery times</li>
                <li>• Military addresses have special requirements</li>
                <li>• Rural areas may require additional time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact and Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/contact" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions?</h3>
            <p className="text-gray-600">Contact our shipping specialists</p>
          </Link>
          
          <Link to="/track-order" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Package className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Order</h3>
            <p className="text-gray-600">Check your package status</p>
          </Link>
          
          <Link to="/faq" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping FAQ</h3>
            <p className="text-gray-600">Common shipping questions answered</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;