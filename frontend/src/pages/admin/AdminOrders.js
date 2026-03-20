import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
  Download,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 20
  });

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, paymentStatusFilter, pagination.current]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: pagination.current,
        limit: pagination.limit,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(paymentStatusFilter && { paymentStatus: paymentStatusFilter })
      });

      const response = await axios.get(`/api/admin/orders?${params}`);
      
      if (response.data.success) {
        setOrders(response.data.data.orders);
        setPagination(prev => ({
          ...prev,
          ...response.data.data.pagination
        }));
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to load orders. Please try again.');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePaymentStatusFilter = (e) => {
    setPaymentStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handleUpdateOrderStatus = async (orderId) => {
    if (!newStatus && !newPaymentStatus) {
      toast.error('Please select at least one status to update');
      return;
    }

    try {
      setActionLoading(true);
      const updateData = {};
      if (newStatus) updateData.status = newStatus;
      if (newPaymentStatus) updateData.paymentStatus = newPaymentStatus;
      if (statusNotes.trim()) updateData.notes = statusNotes;

      const response = await axios.patch(`/api/admin/orders/${orderId}/status`, updateData);
      
      if (response.data.success) {
        toast.success('Order status updated successfully');
        setShowStatusModal(false);
        setNewStatus('');
        setNewPaymentStatus('');
        setStatusNotes('');
        setSelectedOrder(null);
        fetchOrders(); // Refresh the list
      }
    } catch (error) {
      console.error('Update order status error:', error);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Order Header */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Order Number</p>
                  <p className="text-lg font-bold text-gray-900">#{order.orderNumber || order._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Order Date</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-green-600">${order.totalAmount?.toFixed(2) || order.total?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Current Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || order.orderStatus)}`}>
                      {getStatusIcon(order.status || order.orderStatus)}
                      <span className="ml-2">{order.status || order.orderStatus}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Payment Status</span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.customer?.firstName} {order.customer?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{order.customer?.email}</p>
                    </div>
                  </div>
                  {order.customer?.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">${item.price?.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${item.subtotal?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{order.shippingAddress.street}</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm text-gray-900">${(order.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm text-gray-900">${(order.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-900">${(order.shipping || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${(order.totalAmount || order.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatusUpdateModal = ({ order, onClose }) => {
    if (!order) return null;

    const statusOptions = [
      { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
      { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: '✅' },
      { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: '⚙️' },
      { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: '🚚' },
      { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: '📦' },
      { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: '❌' },
      { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-800', icon: '💰' }
    ];

    const paymentOptions = [
      { value: 'pending', label: 'Pending', color: 'bg-orange-100 text-orange-800', icon: '⏳' },
      { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800', icon: '✅' },
      { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800', icon: '❌' },
      { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-800', icon: '💰' }
    ];

    const getCurrentStatusInfo = (status) => {
      return statusOptions.find(opt => opt.value === status) || statusOptions[0];
    };

    const getCurrentPaymentInfo = (status) => {
      return paymentOptions.find(opt => opt.value === status) || paymentOptions[0];
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-2xl">
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Update Order Status</h2>
                <p className="text-primary-100">Order #{order.orderNumber || order._id.slice(-8)}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Current Status Overview */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Current Status Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Order Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCurrentStatusInfo(order.status || order.orderStatus).color}`}>
                      <span className="mr-1">{getCurrentStatusInfo(order.status || order.orderStatus).icon}</span>
                      {getCurrentStatusInfo(order.status || order.orderStatus).label}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Payment Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCurrentPaymentInfo(order.paymentStatus).color}`}>
                      <span className="mr-1">{getCurrentPaymentInfo(order.paymentStatus).icon}</span>
                      {getCurrentPaymentInfo(order.paymentStatus).label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                🎯 Order Status
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewStatus(newStatus === option.value ? '' : option.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                      newStatus === option.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className={`text-sm font-medium ${
                      newStatus === option.value ? 'text-primary-700' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
              {newStatus && (
                <div className="mt-2 p-2 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-sm text-primary-700">
                    <span className="font-medium">📝 Selected:</span> {getCurrentStatusInfo(newStatus).label}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Status Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                💳 Payment Status
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewPaymentStatus(newPaymentStatus === option.value ? '' : option.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                      newPaymentStatus === option.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className={`text-sm font-medium ${
                      newPaymentStatus === option.value ? 'text-primary-700' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
              {newPaymentStatus && (
                <div className="mt-2 p-2 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-sm text-primary-700">
                    <span className="font-medium">📝 Selected:</span> {getCurrentPaymentInfo(newPaymentStatus).label}
                  </p>
                </div>
              )}
            </div>
            
            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                📝 Administrative Notes
              </label>
              <textarea
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add notes about this status change... (Optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>
            
            {/* Info Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm">💡</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Status Tracking</h4>
                  <p className="text-sm text-blue-700">
                    All status changes will be recorded in the order history with timestamps and admin information for complete audit trail.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpdateOrderStatus(order._id)}
              disabled={actionLoading || (!newStatus && !newPaymentStatus)}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {actionLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">⚡</span>
                  Update Status
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-1">Track and manage customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Download className="h-5 w-5" />
                <span>Export Orders</span>
              </button>
              <button 
                onClick={fetchOrders}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => (o.status || o.orderStatus) === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => (o.status || o.orderStatus) === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${orders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={paymentStatusFilter}
              onChange={handlePaymentStatusFilter}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Payment Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setPaymentStatusFilter('');
                setPagination(prev => ({ ...prev, current: 1 }));
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Orders ({pagination.total})
            </h2>
          </div>
          
          {error ? (
            <div className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchOrders}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.orderNumber || order._id.slice(-8)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items?.length || 0} item(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Customer {order.user ? order.user.slice(-6) : 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {order.user}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status || order.orderStatus)}`}>
                          {getStatusIcon(order.status || order.orderStatus)}
                          <span className="ml-1">{order.status || order.orderStatus}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${(order.totalAmount || order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors p-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setNewStatus('');
                              setNewPaymentStatus('');
                              setStatusNotes('');
                              setShowStatusModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                            title="Update Status"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.current - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.current * pagination.limit, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      page === pagination.current
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.pages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }} 
        />
      )}
      
      {/* Status Update Modal */}
      {showStatusModal && (
        <StatusUpdateModal 
          order={selectedOrder} 
          onClose={() => {
            setShowStatusModal(false);
            setSelectedOrder(null);
            setNewStatus('');
            setNewPaymentStatus('');
            setStatusNotes('');
          }} 
        />
      )}
    </div>
  );
};

export default AdminOrders;