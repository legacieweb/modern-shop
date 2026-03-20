import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { requestQueue } from '../utils/requestQueue';

const SavedAddressesContext = createContext();

export const useSavedAddresses = () => {
  const context = useContext(SavedAddressesContext);
  if (!context) {
    throw new Error('useSavedAddresses must be used within a SavedAddressesProvider');
  }
  return context;
};

export const SavedAddressesProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  // Fetch saved addresses when user changes
  useEffect(() => {
    if (user && user._id && user.email) {
      fetchSavedAddresses();
    } else {
      setSavedAddresses([]);
    }
  }, [user]);

  // Helper function to check if we should skip due to rate limiting
  const shouldSkipRequest = () => {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;
    
    // Skip if in cooldown or if last request was too recent
    if (isCooldown || timeSinceLastFetch < 2000) {
      return true;
    }
    
    return false;
  };

  const fetchSavedAddresses = async () => {
    // Skip if in cooldown or request too recent
    if (shouldSkipRequest()) {
      return;
    }
    
    try {
      setLoading(true);
      setLastFetchTime(Date.now());
      
      await requestQueue.addRequest(async () => {
        const response = await fetch('/api/addresses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setSavedAddresses(data.data.addresses || []);
          } else {
            console.warn('Saved addresses API returned non-JSON response');
          }
        } else if (response.status === 429) {
          // Rate limited - set cooldown
          console.warn('Rate limited when fetching saved addresses');
          setIsCooldown(true);
          setTimeout(() => setIsCooldown(false), 5000);
          throw new Error('Rate limited');
        } else {
          console.warn('Failed to fetch saved addresses:', response.status);
          throw new Error(`HTTP ${response.status}`);
        }
      });
    } catch (error) {
      if (error.message !== 'Rate limited') {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.warn('Network error when fetching saved addresses');
        } else {
          console.error('Error fetching saved addresses:', error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async (addressData, addressType = 'shipping') => {
    try {
      setLoading(true);
      
      await requestQueue.addRequest(async () => {
        const response = await fetch('/api/addresses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            ...addressData,
            type: addressType,
            isDefault: true
          })
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setSavedAddresses(prev => [...prev.filter(addr => addr.type !== addressType), data.data.address]);
            toast.success(`${addressType === 'shipping' ? 'Shipping' : 'Billing'} address saved successfully!`);
            return { success: true };
          } else {
            console.warn('Save address API returned non-JSON response');
            toast.error('Failed to save address: Server error');
            return { success: false };
          }
        } else if (response.status === 429) {
          toast.error('Too many requests. Please wait a moment and try again.');
          throw new Error('Rate limited');
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to save address');
          } else {
            const textResponse = await response.text();
            toast.error(textResponse || 'Failed to save address');
          }
          return { success: false };
        }
      });
      
      return true;
    } catch (error) {
      if (error.message !== 'Rate limited') {
        console.error('Error saving address:', error);
        toast.error('Failed to save address');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      setLoading(true);
      
      await requestQueue.addRequest(async () => {
        const response = await fetch(`/api/addresses/${addressId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(addressData)
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setSavedAddresses(prev => 
              prev.map(addr => addr._id === addressId ? data.data.address : addr)
            );
            toast.success('Address updated successfully!');
            return { success: true };
          } else {
            console.warn('Update address API returned non-JSON response');
            toast.error('Failed to update address: Server error');
            return { success: false };
          }
        } else if (response.status === 429) {
          toast.error('Too many requests. Please wait a moment and try again.');
          throw new Error('Rate limited');
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to update address');
          } else {
            const textResponse = await response.text();
            toast.error(textResponse || 'Failed to update address');
          }
          return { success: false };
        }
      });
      
      return true;
    } catch (error) {
      if (error.message !== 'Rate limited') {
        console.error('Error updating address:', error);
        toast.error('Failed to update address');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      setLoading(true);
      
      await requestQueue.addRequest(async () => {
        const response = await fetch(`/api/addresses/${addressId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setSavedAddresses(prev => prev.filter(addr => addr._id !== addressId));
          toast.success('Address deleted successfully!');
          return { success: true };
        } else if (response.status === 429) {
          toast.error('Too many requests. Please wait a moment and try again.');
          throw new Error('Rate limited');
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to delete address');
          } else {
            const textResponse = await response.text();
            toast.error(textResponse || 'Failed to delete address');
          }
          return { success: false };
        }
      });
      
      return true;
    } catch (error) {
      if (error.message !== 'Rate limited') {
        console.error('Error deleting address:', error);
        toast.error('Failed to delete address');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getDefaultAddress = (type = 'shipping') => {
    return savedAddresses.find(addr => addr.type === type && addr.isDefault) || 
           savedAddresses.find(addr => addr.type === type);
  };

  const value = {
    savedAddresses,
    loading,
    fetchSavedAddresses,
    saveAddress,
    updateAddress,
    deleteAddress,
    getDefaultAddress
  };

  return (
    <SavedAddressesContext.Provider value={value}>
      {children}
    </SavedAddressesContext.Provider>
  );
};