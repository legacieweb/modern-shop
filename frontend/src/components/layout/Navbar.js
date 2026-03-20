import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search, 
  Heart, 
  LogOut,
  Package,
  Shield,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = getCartItemsCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-purple-50 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced styling */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-2xl mr-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <ShoppingCart className="h-7 w-7" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ModernShop
                </span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>Premium Experience</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className="group relative text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              to="/products"
              className="group relative text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search amazing products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-indigo-300 bg-white/70 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </form>
          </div>

          {/* Enhanced Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart - Hide for admins */}
            {user?.role !== 'admin' && (
              <Link
                to="/cart"
                className="group relative p-3 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {/* Wishlist - Hide for admins */}
            {isAuthenticated && user?.role !== 'admin' && (
              <Link
                to="/wishlist"
                className="group relative p-3 text-gray-700 hover:text-red-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl"
              >
                <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Link>
            )}

            {/* Enhanced Profile Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl"
                >
                  <div className="relative">
                    <User className="h-6 w-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-md opacity-30"></div>
                  </div>
                  <span className="text-sm font-semibold">{user?.firstName}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl py-2 z-50 border border-gray-100">
                    {user?.role === 'admin' ? (
                      // Admin Dropdown
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Shield className="h-5 w-5 mr-3 text-indigo-600" />
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Package className="h-5 w-5 mr-3 text-indigo-600" />
                          Order Management
                        </Link>
                        <Link
                          to="/admin/users"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-3 text-indigo-600" />
                          User Management
                        </Link>
                      </>
                    ) : (
                      // Regular User Dropdown
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-3 text-indigo-600" />
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Package className="h-5 w-5 mr-3 text-indigo-600" />
                          My Orders
                        </Link>
                      </>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl mt-2 mb-4 shadow-2xl border border-gray-100">
            <div className="px-4 pt-4 pb-3 space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              {/* Mobile Cart Link - Hide for admins */}
              {user?.role !== 'admin' && (
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Cart ({cartItemsCount})
                </Link>
              )}

              {/* Mobile Wishlist Link - Hide for admins */}
              {isAuthenticated && user?.role !== 'admin' && (
                <Link
                  to="/wishlist"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Wishlist
                </Link>
              )}

              {/* Mobile Authentication Links */}
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' ? (
                    // Admin Mobile Menu
                    <>
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Shield className="h-5 w-5 mr-3" />
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        Order Management
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3" />
                        User Management
                      </Link>
                    </>
                  ) : (
                    // Regular User Mobile Menu
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        My Orders
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;