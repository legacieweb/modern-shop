import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3 mr-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white">ModernShop</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for premium products. Experience seamless shopping with 
              <span className="text-white font-medium"> fast delivery</span> and 
              <span className="text-white font-medium"> exceptional service</span>.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span>support@moderncommerce.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: 'All Products', path: '/products' },
                { name: 'New Arrivals', path: '/products?sort=-createdAt' },
                { name: 'Best Sellers', path: '/products?sort=-rating' },
                { name: 'Sale Items', path: '/products?discount=true' },
                { name: 'Categories', path: '/products' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Shipping Info', path: '/shipping' },
                { name: 'Returns', path: '/returns' },
                { name: 'Track Order', path: '/track-order' },
                { name: 'Size Guide', path: '/size-guide' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Policy', path: '/cookies' },
                { name: 'Careers', path: '/careers' },
                { name: 'Press', path: '/press' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-16 pt-8 border-t border-white border-opacity-10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', name: 'Facebook' },
                  { icon: Twitter, href: '#', name: 'Twitter' },
                  { icon: Instagram, href: '#', name: 'Instagram' },
                  { icon: Youtube, href: '#', name: 'YouTube' }
                ].map(({ icon: Icon, href, name }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    title={name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Bottom Bar */}
       <div className="border-t border-white border-opacity-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
             <div className="flex items-center text-gray-400">
               <span>© 2026 ModernShop. All rights reserved.</span>
             </div>
             
             <div className="flex items-center space-x-6">
               <a
                 href="https://iyonicorp.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-all duration-300 group"
               >
                 <span className="relative inline-block">
                   <span className="relative z-10 px-2 py-1">Powered by Iyonicorp</span>
                   <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></span>
                   <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 animate-pulse delay-100"></span>
                   <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 animate-pulse delay-200"></span>
                 </span>
               </a>
             </div>
           </div>
         </div>
       </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white p-3 rounded-full border border-white border-opacity-20 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;