import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  Star, 
  ShoppingBag,
  Filter,
  Grid,
  List,
  Calendar,
  Share2,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist, getWishlistTotal, moveToCart } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date-added');
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleAddToCart = async (item) => {
    try {
      // Create a product object for the cart
      const product = {
        _id: item.product,
        name: item.name,
        price: item.price,
        images: [{ url: item.image }],
        stock: 10 // Default stock
      };
      
      addToCart(product, 1);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleMoveToCart = (item) => {
    const movedItem = moveToCart(item.product, 1);
    if (movedItem) {
      const product = {
        _id: movedItem.product,
        name: movedItem.name,
        price: movedItem.price,
        images: [{ url: movedItem.image }],
        stock: 10
      };
      addToCart(product, 1);
      toast.success(`${item.name} moved to cart!`);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId);
    toast.success('Item removed from wishlist');
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
      toast.success('Wishlist cleared!');
    }
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My ModernShop Wishlist',
        text: `Check out my wishlist with ${items.length} items!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Wishlist link copied to clipboard!');
    }
  };

  const toggleItemSelection = (productId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkAddToCart = () => {
    const selectedItemsList = items.filter(item => selectedItems.has(item.product));
    selectedItemsList.forEach(item => {
      const product = {
        _id: item.product,
        name: item.name,
        price: item.price,
        images: [{ url: item.image }],
        stock: 10
      };
      addToCart(product, 1);
      removeFromWishlist(item.product);
    });
    setSelectedItems(new Set());
    toast.success(`${selectedItemsList.length} items moved to cart!`);
  };

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date-added':
      default:
        return new Date(b.addedAt) - new Date(a.addedAt);
    }
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Empty Wishlist */}
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Save items you love to your wishlist. You can easily move them to your cart later!
              </p>
              <div className="space-y-4">
                <Link
                  to="/products"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Link>
                <div className="text-sm text-gray-500">
                  <p>Browse our products and click the heart icon to save items</p>
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
              My Wishlist ({items.length} items)
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShareWishlist}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
            <button
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Sort and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="date-added">Date Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* View Mode and Bulk Actions */}
            <div className="flex items-center space-x-4">
              {/* Bulk Actions */}
              {selectedItems.size > 0 && (
                <button
                  onClick={handleBulkAddToCart}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add {selectedItems.size} to Cart
                </button>
              )}
              
              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {sortedItems.map((item) => (
            <div key={item.product} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
              viewMode === 'list' ? 'flex items-center p-4' : ''
            }`}>
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.product)}
                  onChange={() => toggleItemSelection(item.product)}
                  className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500"
                />
              </div>

              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveItem(item.product)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>

              {/* Product Details */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1 ml-4' : ''}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating?.average || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({item.rating?.count || 0})
                  </span>
                </div>

                {/* Brand */}
                {item.brand && (
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  {item.comparePrice && item.comparePrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.comparePrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Date Added */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className={`flex space-x-2 ${viewMode === 'list' ? 'justify-end' : ''}`}>
                  <Link
                    to={`/products/${item.product}`}
                    className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Summary */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{items.length}</h3>
              <p className="text-gray-600">Items in Wishlist</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-600">${getWishlistTotal().toFixed(2)}</h3>
              <p className="text-gray-600">Total Value</p>
            </div>
            <div>
              <Link
                to="/products"
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;