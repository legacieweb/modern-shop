import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { safeNumber } from '../utils/numberUtils';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Gift,
  Tag,
  ShoppingBag,
  Star,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState({});

  const subtotal = parseFloat(getCartTotal()) || 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = async (productId, newQuantity, variant = null) => {
    setIsUpdating(prev => ({ ...prev, [productId]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      updateQuantity(productId, newQuantity, variant);
      toast.success('Quantity updated!');
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = (productId, variant = null) => {
    removeFromCart(productId, variant);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared!');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  const handleMoveToWishlist = (item) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    // Create a product object for the wishlist
    const product = {
      _id: item.product,
      name: item.name,
      price: item.price || 0,
      comparePrice: (item.price || 0) * 1.2, // Estimated compare price
      images: [{ url: item.image }],
      rating: { average: 4.5, count: 100 },
      brand: 'Various'
    };

    if (isInWishlist(item.product)) {
      toast.info('Item is already in your wishlist!');
      return;
    }

    addToWishlist(product);
    toast.success(`${item.name || 'Item'} moved to wishlist!`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. 
                Start shopping to fill it up!
              </p>
              <div className="space-y-4">
                <Link
                  to="/products"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Link>
                <div className="flex justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Free shipping over $100
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure checkout
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 mr-1" />
                    Easy returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart ({getCartItemsCount()} items)
            </h1>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.product}-${JSON.stringify(item.variant)}`} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name || 'Unnamed Product'}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                    </div>
                    {item.variant && (
                      <p className="text-sm text-gray-600 mt-1">
                        {Object.entries(item.variant).map(([key, value]) => (
                          <span key={key} className="mr-2">{key}: {value}</span>
                        ))}
                      </p>
                    )}
                    <p className="text-lg font-bold text-primary-600 mt-2">${Number(item.price || 0).toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.product, item.quantity - 1, item.variant)}
                      disabled={isUpdating[item.product]}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {isUpdating[item.product] ? (
                        <LoadingSpinner size="small" showText={false} />
                      ) : (
                        (item.quantity || 0)
                      )}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.product, item.quantity + 1, item.variant)}
                      disabled={isUpdating[item.product] || (item.quantity || 0) >= (item.stock || 0)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${safeNumber(item.price * item.quantity).toFixed(2)}
                    </p>
                    {(item.quantity || 0) > 1 && (
                      <p className="text-sm text-gray-500">
                        ${Number(Number(item.price || 0) || 0).toFixed(2)} each
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <div className="relative">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                          isInWishlist(item.product)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={isInWishlist(item.product) ? 'Already in wishlist' : 'Move to wishlist'}
                      >
                        <Heart 
                          className={`h-5 w-5 transition-all duration-300 ${
                            isInWishlist(item.product) 
                              ? 'fill-current text-red-500 animate-pulse' 
                              : 'hover:fill-current'
                          }`} 
                        />
                      </button>
                      {isInWishlist(item.product) && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product, item.variant)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Stock Warning */}
                {(item.quantity || 0) >= (item.stock || 0) && (
                  <div className="mt-4 flex items-center text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Only {item.stock || 0} items left in stock</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                    <Tag className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
                  <span className="font-semibold">${Number(subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `${Number(shipping || 0).toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${Number(tax || 0).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${Number(total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 100 && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm text-blue-800 mb-2">
                    <span>Add ${Math.max(0, Number(100 - (subtotal || 0))).toFixed(2)} more for free shipping!</span>
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Security Features */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-green-500" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center">
                  <Gift className="h-4 w-4 mr-2 text-green-500" />
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-center">
              Recommended products will appear here based on your cart items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;