import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw, Plus, Minus, MessageCircle, User, Calendar, ThumbsUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { allProducts } from '../data/productsData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Changed to false since we're using local data
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSort, setReviewSort] = useState('newest');
  const [showImageModal, setShowImageModal] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const fetchProduct = useCallback(() => {
    // Find product from local data
    const foundProduct = allProducts.find(p => p._id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [fetchProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.success('Removed from wishlist!');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  // Fetch reviews (mock data)
  const fetchReviews = useCallback(() => {
    // Generate mock reviews for the product
    const mockReviews = [
      {
        _id: '1',
        user: { name: 'John Doe' },
        rating: 5,
        title: 'Excellent product!',
        comment: 'This product exceeded my expectations. Great quality and fast shipping.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 12
      },
      {
        _id: '2',
        user: { name: 'Jane Smith' },
        rating: 4,
        title: 'Very good',
        comment: 'Good value for money. Works as described. Would recommend.',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 8
      },
      {
        _id: '3',
        user: { name: 'Mike Johnson' },
        rating: 5,
        title: 'Highly recommended',
        comment: 'Amazing quality! Will definitely buy again.',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 15
      },
      {
        _id: '4',
        user: { name: 'Sarah Wilson' },
        rating: 3,
        title: 'Decent product',
        comment: 'It\'s okay, but could be better. Not bad for the price.',
        createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 5
      }
    ];
    
    setReviews(mockReviews);
  }, [id]);

  // Submit review (local only)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }

    setIsSubmittingReview(true);
    try {
      // Add review locally (simulate successful submission)
      const newReview = {
        _id: Date.now().toString(),
        user: { name: user.name || 'Current User' },
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        createdAt: new Date().toISOString(),
        helpful: 0
      };
      
      setReviews(prev => [newReview, ...prev]);
      toast.success('Review submitted successfully!');
      setReviewForm({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Sort reviews
  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (reviewSort) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };

  // Update fetchProduct to also fetch reviews
  useEffect(() => {
    fetchProduct();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [fetchProduct, fetchReviews]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg relative group">
              <img
                src={product.images?.[selectedImageIndex]?.url || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                {selectedImageIndex + 1} / {product.images?.length || 1}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImageIndex === index
                        ? 'border-primary-600 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Full-size Image Modal */}
            {product.images && product.images.length > 1 && (
              <button
                onClick={() => setShowImageModal(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                View All Images ({product.images.length})
              </button>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating?.average || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating?.count || 0} reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                {product.comparePrice && (
                  <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <div className="relative">
                  <button
                    onClick={handleAddToWishlist}
                    className={`p-3 border-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      isInWishlist(id)
                        ? 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-red-500 hover:border-red-300'
                    }`}
                    title={isInWishlist(id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-all duration-300 ${
                        isInWishlist(id) 
                          ? 'fill-current text-white animate-pulse' 
                          : 'hover:fill-current'
                      }`} 
                    />
                  </button>
                  {isInWishlist(id) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: 'description', label: 'Description' },
                { key: 'specifications', label: 'Specifications' },
                { key: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="text-gray-900">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand:</dt>
                      <dd className="text-gray-900">{product.brand || 'N/A'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">SKU:</dt>
                      <dd className="text-gray-900">{product.sku || 'N/A'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating?.average || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.rating?.average?.toFixed(1) || '0.0'}
                      </span>
                      <span className="text-gray-600">({reviews.length} reviews)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="mt-4 md:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h4>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rating *
                        </label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="p-1"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= reviewForm.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                          Review Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          required
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Summarize your experience"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review *
                        </label>
                        <textarea
                          id="comment"
                          required
                          rows={4}
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Share your thoughts about this product..."
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={isSubmittingReview}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                          {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Reviews Filter/Sort */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                      value={reviewSort}
                      onChange={(e) => setReviewSort(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="highest">Highest rating</option>
                      <option value="lowest">Lowest rating</option>
                    </select>
                  </div>
                  <span className="text-sm text-gray-600">
                    {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {getSortedReviews().length > 0 ? (
                    getSortedReviews().map((review) => (
                      <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-gray-100 rounded-full p-2">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {review.user?.name || 'Anonymous'}
                              </h5>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <h6 className="font-semibold text-gray-900 mb-2">{review.title}</h6>
                        <p className="text-gray-600 mb-4">{review.comment}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-sm">Helpful ({review.helpful || 0})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                      <p className="text-gray-600 mb-4">
                        Be the first to share your thoughts about this product!
                      </p>
                      {!user && (
                        <p className="text-sm text-gray-500">
                          <Link to="/login" className="text-primary-600 hover:text-primary-700">
                            Sign in
                          </Link>
                          {' '}to write a review
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && product.images && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg text-sm">
              {selectedImageIndex + 1} of {product.images.length}
            </div>
            
            {/* Main Image */}
            <img
              src={product.images[selectedImageIndex].url}
              alt={product.name}
              className="w-full h-full object-contain max-h-[80vh]"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-full overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-white'
                      : 'border-transparent hover:border-white'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;