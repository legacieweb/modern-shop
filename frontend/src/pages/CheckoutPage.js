import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import PaystackPop from '@paystack/inline-js';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Lock
} from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  // Debug environment variables
  console.log('CheckoutPage - Environment variables:');
  console.log('REACT_APP_PAYSTACK_PUBLIC_KEY:', process.env.REACT_APP_PAYSTACK_PUBLIC_KEY);
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Address
    shipping: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    },
    // Billing Address (same as shipping by default)
    billing: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    },
    sameAsShipping: true,
    paymentMethod: 'card',
    notes: ''
  });

  // Debug logging for user data
  useEffect(() => {
    console.log('CheckoutPage - user:', user);
    console.log('CheckoutPage - hasUnsavedChanges:', hasUnsavedChanges);
  }, [user, hasUnsavedChanges]);

  // Auto-fill form with user profile data when user changes
  useEffect(() => {
    if (user && !hasUnsavedChanges) {
      setFormData(prev => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || ''
        },
        billing: {
          ...prev.billing,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || ''
        }
      }));
    }
  }, [user, hasUnsavedChanges]);

  // Auto-fill form with user profile data including address fields
  useEffect(() => {
    console.log('Auto-fill effect triggered:', { 
      hasUnsavedChanges,
      user: user 
    });
    
    if (user && !hasUnsavedChanges) {
      console.log('Auto-filling from user profile:', user);
      
      setFormData(prev => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Nigeria'
        },
        billing: {
          ...prev.billing,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Nigeria'
        }
      }));
      console.log('Profile data auto-filled successfully');
    }
  }, [user, hasUnsavedChanges]);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Set hasUnsavedChanges to true if this is an address field change
    const addressFields = ['firstName', 'lastName', 'phone', 'street', 'city', 'state', 'zipCode', 'country'];
    if (addressFields.includes(field)) {
      setHasUnsavedChanges(true);
    }
  };

  // Remove address selection functionality since we're using profile data only

  // Remove address saving functionality since we're using profile data only

  // Remove save prompt functionality

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // If sameAsShipping is checked, copy shipping to billing
      billing: value ? { ...prev.shipping } : prev.billing
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zipCode', 'country'];
    
    for (let field of required) {
      if (!formData.shipping[field]?.trim()) {
        toast.error(`Please fill in shipping ${field}`);
        return false;
      }
    }
    
    if (!formData.sameAsShipping) {
      for (let field of required) {
        if (!formData.billing[field]?.trim()) {
          toast.error(`Please fill in billing ${field}`);
          return false;
        }
      }
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    
    return true;
  };

  const initializePayment = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Check if Paystack public key is available - use fallback if environment variable is not loaded
      let publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
      
      // Fallback to hardcoded key if environment variable is not available (for development)
      if (!publicKey) {
        console.log('Environment variable not found, using fallback key');
        publicKey = 'pk_test_232531a5c927ef2cc67ed1b85af3f26e3b8ed2f2'; // Same as in backend/.env
      }
      
      console.log('Paystack public key:', publicKey ? 'Available' : 'Missing');
      
      if (!publicKey) {
        console.error('REACT_APP_PAYSTACK_PUBLIC_KEY is not set and no fallback available');
        toast.error('Payment system is not configured. Please contact support.');
        setLoading(false);
        return;
      }

      // Validate that the public key format is correct (starts with pk_test_ or pk_live_)
      if (!publicKey.startsWith('pk_test_') && !publicKey.startsWith('pk_live_')) {
        console.error('Invalid Paystack public key format:', publicKey);
        toast.error('Payment system configuration error. Please contact support.');
        setLoading(false);
        return;
      }
      
      console.log('Paystack configuration validated successfully');

      // Create Paystack popup instance
      const paystack = new PaystackPop();
      
      // Initialize payment transaction
      paystack.newTransaction({
        key: publicKey,
        email: formData.shipping.email,
        amount: Math.round(total * 100), // Paystack expects amount in cents for USD
        currency: 'USD',
        reference: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          orderData: JSON.stringify({
            items: items.map(item => ({
              product: item.product,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              variant: item.variant
            })),
            subtotal,
            shipping,
            tax,
            total,
            shippingAddress: formData.shipping,
            billingAddress: formData.sameAsShipping ? formData.shipping : formData.billing,
            paymentMethod: formData.paymentMethod,
            notes: formData.notes,
            customer: user?._id
          }),
          userId: user?._id
        },
        onSuccess: async (transaction) => {
          try {
            // No address saving needed since we're using profile data

            // Verify payment on backend
            const response = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                reference: transaction.reference,
                orderData: JSON.stringify({
                  items: items.map(item => ({
                    product: item.product,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    variant: item.variant
                  })),
                  subtotal,
                  shipping,
                  tax,
                  total,
                  shippingAddress: formData.shipping,
                  billingAddress: formData.sameAsShipping ? formData.shipping : formData.billing,
                  paymentMethod: formData.paymentMethod,
                  notes: formData.notes,
                  customer: user?._id
                })
              })
            });

            let result;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
              result = await response.json();
            } else {
              // Handle non-JSON responses (like rate limiting messages)
              const textResponse = await response.text();
              throw new Error(textResponse || 'Server returned non-JSON response');
            }
            
            if (result.success) {
              clearCart();
              toast.success('Payment successful! Order confirmed.');
              navigate(`/thank-you?order=${result.data.orderNumber}&ref=${transaction.reference}`);
            } else {
              toast.error('Payment verification failed: ' + (result.message || 'Unknown error'));
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed: ' + (error.message || 'Please contact support.'));
          } finally {
            setLoading(false);
          }

        },
        onCancel: () => {
          setLoading(false);
          toast.info('Payment cancelled');
        },
        onError: (error) => {
          setLoading(false);
          console.error('Payment error:', error);
          toast.error('Payment failed: ' + (error.message || 'Please try again.'));
        }
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Payment system error. Please try again or contact support.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <CreditCard className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to your cart before checking out</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
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
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        {/* User Profile Information Section */}
        {user && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">
                    Address information will be auto-filled from your profile
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Update your profile address in your account settings for automatic checkout filling
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.firstName}
                    onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.lastName}
                    onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.shipping.email}
                    onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.shipping.phone}
                    onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.street}
                    onChange={(e) => handleInputChange('shipping', 'street', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.city}
                    onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.state}
                    onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.zipCode}
                    onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.shipping.country}
                    onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sameAsShipping}
                    onChange={(e) => handleCheckboxChange('sameAsShipping', e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Same as shipping</span>
                </label>
              </div>
              
              {!formData.sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.firstName}
                      onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.lastName}
                      onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.billing.email}
                      onChange={(e) => handleInputChange('billing', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.billing.phone}
                      onChange={(e) => handleInputChange('billing', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.street}
                      onChange={(e) => handleInputChange('billing', 'street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.city}
                      onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.state}
                      onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.billing.zipCode}
                      onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.billing.country}
                      onChange={(e) => handleInputChange('billing', 'country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes (Optional)</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Special instructions for delivery..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product}-${JSON.stringify(item.variant)}`} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.variant && (
                        <p className="text-sm text-gray-500">
                          {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
              
              {/* Free Shipping Progress */}
              {subtotal < 100 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm text-blue-800 mb-2">
                    <span>Add ${(100 - subtotal).toFixed(2)} more for free shipping!</span>
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
              
              {/* Payment Button */}
              <button
                onClick={initializePayment}
                disabled={loading}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <LoadingSpinner size="small" showText={false} />
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Pay ${total.toFixed(2)} USD Securely
                  </>
                )}
              </button>
              
              {/* Security Features */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>256-bit SSL encrypted checkout</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-green-500" />
                  <span>Your payment information is secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;