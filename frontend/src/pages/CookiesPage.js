import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Settings, Eye, BarChart3, Target, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const CookiesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: ['Session management', 'Security features', 'Load balancing'],
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      required: true
    },
    {
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Page views', 'User behavior'],
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      required: false
    },
    {
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver advertisements more relevant to you.',
      examples: ['Advertising networks', 'Social media tracking', 'Retargeting'],
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      required: false
    },
    {
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: ['Language preferences', 'Region settings', 'Chat widgets'],
      icon: Settings,
      color: 'from-orange-500 to-yellow-500',
      required: false
    }
  ];

  const thirdPartyCookies = [
    { name: 'Google Analytics', purpose: 'Website analytics and user behavior tracking', duration: '2 years' },
    { name: 'Facebook Pixel', purpose: 'Social media marketing and advertising', duration: '90 days' },
    { name: 'Stripe', purpose: 'Payment processing and fraud prevention', duration: 'Session' },
    { name: 'Mailchimp', purpose: 'Email marketing and newsletter management', duration: '30 days' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <Cookie className="h-16 w-16 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Learn about how we use cookies to enhance your shopping experience and protect your privacy.
            </p>
            <div className="mt-8 flex justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'types', label: 'Cookie Types', icon: Cookie },
            { id: 'manage', label: 'Manage Cookies', icon: Settings },
            { id: 'third-party', label: 'Third Party', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* What are Cookies */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Cookie className="h-8 w-8 text-indigo-600 mr-3" />
                What Are Cookies?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed mb-6">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our site.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Why We Use Cookies</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Keep you logged in to your account</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Remember your shopping cart and preferences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Improve our website performance and functionality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Provide personalized content and recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Analyze website traffic and user behavior</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Essential Operations',
                    description: 'Enable core website functionality like security, network management, and accessibility.',
                    icon: Shield,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'Performance Analysis',
                    description: 'Understand how visitors use our site to improve user experience and performance.',
                    icon: BarChart3,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Personalization',
                    description: 'Remember your preferences and provide tailored content and recommendations.',
                    icon: Settings,
                    color: 'from-purple-500 to-pink-500'
                  },
                  {
                    title: 'Marketing & Advertising',
                    description: 'Deliver relevant advertisements and measure the effectiveness of our campaigns.',
                    icon: Target,
                    color: 'from-orange-500 to-red-500'
                  }
                ].map(({ title, description, icon: Icon, color }, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${color} rounded-xl mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon;
              return (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cookie.color} rounded-2xl mr-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{cookie.name}</h3>
                        <div className="flex items-center">
                          {cookie.required ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Required
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Optional
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-6">{cookie.description}</p>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cookie.examples.map((example, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-8 w-8 text-indigo-600 mr-3" />
                Managing Your Cookie Preferences
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p className="text-lg">
                  You have control over which cookies you accept. You can manage your preferences 
                  at any time using the settings below or through your browser settings.
                </p>
              </div>

              {/* Cookie Preference Controls */}
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => {
                  const Icon = cookie.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${cookie.color} rounded-xl mr-3`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{cookie.name}</h3>
                            <p className="text-sm text-gray-600">{cookie.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {cookie.required ? (
                            <span className="text-sm font-medium text-gray-500">Always Active</span>
                          ) : (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Browser Settings */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Browser Cookie Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can also manage cookies through your browser settings. Here's how to do it in popular browsers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { browser: 'Google Chrome', steps: 'Settings → Privacy and Security → Cookies and other site data' },
                    { browser: 'Mozilla Firefox', steps: 'Options → Privacy & Security → Cookies and Site Data' },
                    { browser: 'Safari', steps: 'Preferences → Privacy → Manage Website Data' },
                    { browser: 'Microsoft Edge', steps: 'Settings → Cookies and site permissions → Cookies and site data' }
                  ].map(({ browser, steps }, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">{browser}</h4>
                      <p className="text-sm text-gray-600">{steps}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'third-party' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-8 w-8 text-indigo-600 mr-3" />
                Third-Party Cookies
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p className="text-lg">
                  We work with trusted third-party services that may set cookies on your device. 
                  These services help us provide better functionality and analyze our website performance.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Service</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdPartyCookies.map((cookie, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{cookie.name}</td>
                        <td className="py-4 px-6 text-gray-700">{cookie.purpose}</td>
                        <td className="py-4 px-6 text-gray-700">{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                    <p className="text-yellow-700">
                      Third-party cookies are subject to their respective privacy policies. 
                      We recommend reviewing their policies to understand how they handle your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
          <p className="text-xl text-gray-200 mb-8">
            If you have any questions about our Cookie Policy, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
            <Link 
              to="/privacy" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-gray-500">
          <p>Last updated: December 26, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;