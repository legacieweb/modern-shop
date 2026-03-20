import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, ShoppingCart } from 'lucide-react';

const PrivacyPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: December 25, 2024
          </p>
        </div>

        {/* Privacy Promise */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Our Privacy Promise</h2>
          </div>
          <p className="text-primary-100">
            We are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="h-6 w-6 text-primary-600 mr-3" />
            Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">What We Collect</h4>
                  <p className="text-gray-600 text-sm">Basic information to process your orders and provide service</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">How We Use It</h4>
                  <p className="text-gray-600 text-sm">To process orders, improve our services, and communicate with you</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Your Rights</h4>
                  <p className="text-gray-600 text-sm">Access, modify, or delete your personal information anytime</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Data Security</h4>
                  <p className="text-gray-600 text-sm">Industry-standard encryption and security measures</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '1. Information We Collect',
              '2. How We Use Your Information',
              '3. Information Sharing',
              '4. Data Security',
              '5. Cookies and Tracking',
              '6. Your Rights and Choices',
              '7. Data Retention',
              '8. International Transfers',
              '9. Children\'s Privacy',
              '10. California Privacy Rights',
              '11. Changes to This Policy',
              '12. Contact Us'
            ].map((item, index) => (
              <a key={index} href={`#section-${index + 1}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div id="section-1" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 text-primary-600 mr-3" />
              1. Information We Collect
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 mb-3">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Create an account or make a purchase</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for customer support</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p className="text-gray-600 mt-3">This may include your name, email address, shipping address, phone number, and payment information.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-600 mb-3">
                    When you visit our website, we automatically collect certain information about your device and usage, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Device type and operating system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Process and fulfill your orders',
                  'Communicate about your purchases',
                  'Provide customer support',
                  'Send promotional emails (with consent)',
                  'Improve our website and services',
                  'Prevent fraud and ensure security',
                  'Comply with legal obligations',
                  'Analyze usage patterns and trends'
                ].map((use, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-600">{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                  <p className="text-gray-600 text-sm">
                    We share information with trusted third-party service providers who help us operate our business, 
                    such as payment processors, shipping companies, and email service providers.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                  <p className="text-gray-600 text-sm">
                    We may disclose information when required by law or to protect our rights, property, or safety, 
                    or that of our users or others.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                  <p className="text-gray-600 text-sm">
                    In connection with a merger, acquisition, or sale of assets, your information may be transferred 
                    as part of the transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-primary-600 mr-3" />
              4. Data Security
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'SSL encryption for data transmission',
                  'Secure servers and databases',
                  'Regular security audits and updates',
                  'Access controls and authentication',
                  'Employee training on data protection',
                  'Incident response procedures'
                ].map((measure, index) => (
                  <div key={index} className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-600">{measure}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> While we strive to protect your personal information, no method of transmission 
                  over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Marketing Cookies:</strong> Used to show you relevant advertisements</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">
                    You can control cookies through your browser settings. However, disabling certain cookies 
                    may limit the functionality of our website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { right: 'Access', description: 'Request a copy of your personal data' },
                  { right: 'Rectification', description: 'Correct inaccurate or incomplete information' },
                  { right: 'Erasure', description: 'Request deletion of your personal data' },
                  { right: 'Portability', description: 'Receive your data in a structured format' },
                  { right: 'Objection', description: 'Object to certain types of data processing' },
                  { right: 'Restriction', description: 'Request limitation of data processing' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.right}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  To exercise any of these rights, please contact us using the information provided below. 
                  We will respond to your request within a reasonable timeframe.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, 
                unless a longer retention period is required or permitted by law.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Account Information:</span>
                  <span className="text-gray-900">Until account deletion</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Order Information:</span>
                  <span className="text-gray-900">7 years (tax/legal requirements)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Marketing Data:</span>
                  <span className="text-gray-900">Until you unsubscribe</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Website Analytics:</span>
                  <span className="text-gray-900">26 months maximum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Transfers</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data during international transfers.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  These safeguards may include standard contractual clauses approved by relevant authorities 
                  or other lawful transfer mechanisms.
                </p>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you become aware that a child has provided 
                us with personal information, please contact us.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  If we learn that we have collected personal information from a child under 13, 
                  we will promptly delete that information.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. California Privacy Rights</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
              <p className="text-gray-600 mt-4">
                We do not sell your personal information as defined under California law.
              </p>
            </div>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  We encourage you to review this Privacy Policy periodically to stay informed about our privacy practices.
                </p>
              </div>
            </div>
          </div>

          {/* Section 12 */}
          <div id="section-12" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Email:</h4>
                    <p className="text-gray-600">privacy@modernshop.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone:</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address:</h4>
                    <p className="text-gray-600">123 Commerce Street<br />New York, NY 10001</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Protection Officer:</h4>
                    <p className="text-gray-600">dpo@modernshop.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-12 text-center">
          <a
            href="#top"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Shield className="h-5 w-5 mr-2" />
            Back to Top
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;