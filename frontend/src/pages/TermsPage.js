import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingCart, Shield, AlertCircle } from 'lucide-react';

const TermsPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Last updated: December 25, 2024
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
              <p className="mt-1 text-sm text-yellow-700">
                By using our website and services, you agree to be bound by these Terms of Service. 
                Please read them carefully before making any purchases.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '1. Acceptance of Terms',
              '2. Use License',
              '3. User Accounts',
              '4. Product Information',
              '5. Pricing and Payment',
              '6. Shipping and Delivery',
              '7. Returns and Refunds',
              '8. Prohibited Uses',
              '9. Intellectual Property',
              '10. Privacy Policy',
              '11. Limitation of Liability',
              '12. Governing Law',
              '13. Changes to Terms',
              '14. Contact Information'
            ].map((item, index) => (
              <a key={index} href={`#section-${index + 1}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div id="section-1" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 text-primary-600 mr-3" />
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                By accessing and using the ModernShop website ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-600">
                These Terms of Service ("Terms") govern your use of our website located at modernshop.com (the "Service") operated by ModernShop Inc. ("us", "we", or "our").
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on ModernShop's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p className="text-gray-600">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by ModernShop at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="text-gray-600">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-gray-600">
                All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time without prior notice.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing and Payment</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                All prices are listed in US dollars and are subject to applicable taxes. Payment must be received in full before shipment of products.
              </p>
              <p className="text-gray-600">
                We accept major credit cards and other payment methods as displayed during checkout. We reserve the right to refuse or cancel any order for any reason at any time.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control.
              </p>
              <p className="text-gray-600">
                Risk of loss passes to you upon delivery of the products to the shipping address provided.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Please refer to our Returns & Exchanges policy for detailed information about returns, refunds, and exchanges.
              </p>
              <p className="text-gray-600">
                We reserve the right to refuse returns that do not meet our return policy requirements.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of ModernShop Inc. and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-gray-600">
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                View our Privacy Policy
              </Link>
            </div>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                In no event shall ModernShop Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
              <p className="text-gray-600">
                Our total liability to you for all damages, losses, and causes of action shall not exceed the amount you paid for the products in question.
              </p>
            </div>
          </div>

          {/* Section 12 */}
          <div id="section-12" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600">
                These Terms shall be interpreted and governed by the laws of the State of New York, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>
          </div>

          {/* Section 13 */}
          <div id="section-13" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-600">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </div>

          {/* Section 14 */}
          <div id="section-14" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> legal@modernshop.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Commerce Street, New York, NY 10001</p>
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

export default TermsPage;