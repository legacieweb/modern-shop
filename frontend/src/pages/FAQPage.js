import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle, ShoppingCart } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'orders', name: 'Orders & Shipping', icon: ShoppingCart },
    { id: 'returns', name: 'Returns & Exchanges', icon: ChevronUp },
    { id: 'account', name: 'Account & Payment', icon: ChevronDown },
    { id: 'products', name: 'Products', icon: ChevronUp }
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll also receive a tracking number via email once your order ships. You can use this number on our tracking page or the carrier\'s website to monitor your package\'s progress.'
    },
    {
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-7 business days within the continental US. Express shipping (2-3 business days) and overnight shipping options are also available. International shipping times vary by destination and customs processing.'
    },
    {
      category: 'orders',
      question: 'What are your shipping costs?',
      answer: 'We offer free standard shipping on orders over $100. For orders under $100, shipping costs start at $5.99 for standard shipping. Express and overnight shipping options are available at additional cost based on your location and order weight.'
    },
    {
      category: 'orders',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide! International shipping times and costs vary by destination. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. For defective items, we offer a 60-day return window. Return shipping is free for defective items; otherwise, return shipping costs may apply.'
    },
    {
      category: 'returns',
      question: 'How do I return an item?',
      answer: 'To return an item, log into your account and initiate a return from the "My Orders" section. We\'ll provide you with a prepaid return label for most returns. Package the item securely and drop it off at any authorized shipping location.'
    },
    {
      category: 'returns',
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method within 5-10 business days, depending on your bank or credit card issuer.'
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking "Sign Up" in the top right corner. You\'ll need to provide your email address, create a password, and fill in some basic information. Having an account allows you to track orders, save items to your wishlist, and speed up checkout.'
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a password reset link. Check your spam folder if you don\'t see it in your inbox. The link will expire after 24 hours for security reasons.'
    },
    {
      category: 'account',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and store credit/gift cards. All transactions are processed securely with SSL encryption.'
    },
    {
      category: 'products',
      question: 'How do I know what size to order?',
      answer: 'Each product page includes a detailed size guide with measurements. If you\'re between sizes, we recommend ordering the larger size. You can also check our comprehensive size guide page for general sizing information across all brands.'
    },
    {
      category: 'products',
      question: 'Are your products authentic?',
      answer: 'Yes, absolutely! We are an authorized retailer for all brands we sell. All products come with authentic packaging and documentation. We guarantee the authenticity of every item we sell.'
    },
    {
      category: 'products',
      question: 'What if an item I want is out of stock?',
      answer: 'If an item is out of stock, you can sign up for restock notifications on the product page. We\'ll email you as soon as the item becomes available again. You can also check back regularly or contact customer service for estimated restock dates.'
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it, as long as it hasn\'t been processed for shipment. After that, changes may not be possible. Contact customer service immediately if you need to make changes.'
    },
    {
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log into your account and go to "Profile Settings" to update your personal information, shipping addresses, and payment methods. You can also manage your email preferences and communication settings from this page.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-primary-100 mb-6">
            Our customer support team is here to help you with any questions not covered above.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@modernshop.com"
              className="border border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shipping" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🚚 Shipping Info</h3>
            <p className="text-gray-600">Learn about our shipping options, times, and costs.</p>
          </Link>
          
          <Link to="/returns" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔄 Returns</h3>
            <p className="text-gray-600">Our hassle-free return and exchange policy.</p>
          </Link>
          
          <Link to="/track-order" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📦 Track Order</h3>
            <p className="text-gray-600">Track your package with your order number.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;