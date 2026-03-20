import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { SavedAddressesProvider } from './contexts/SavedAddressesContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import SizeGuidePage from './pages/SizeGuidePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Configure axios base URL for production
// In development, uses proxy (set in package.json)
// In production, uses REACT_APP_API_URL environment variable
if (process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <SavedAddressesProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ScrollToTop />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Customer Service Routes */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/track-order/:orderNumber?" element={<TrackOrderPage />} />
              <Route path="/size-guide" element={<SizeGuidePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />

              
              {/* Protected Routes */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
              <Route path="/orders/:id" element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/products" element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </SavedAddressesProvider>
    </Router>
  );
}

export default App;