import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set axios default header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      // Add a small delay to prevent rapid successive requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/api/auth/me');
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: response.data.data.user, token }
          });
        } catch (error) {
          // Don't immediately logout on rate limiting or network errors
          if (error.response?.status === 429) {
            // Rate limited - keep user logged in but don't verify
            console.log('Rate limited during auth check, keeping user logged in');
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: { _id: 'temp', email: 'temp@temp.com' }, token }
            });
          } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            // Network error - keep user logged in temporarily
            console.log('Network error during auth check, keeping user logged in');
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: { _id: 'temp', email: 'temp@temp.com' }, token }
            });
          } else {
            // Other errors (like invalid token) - logout
            console.log('Auth check failed, logging out user');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      let errorMessage = 'Login failed';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 429) {
          // Rate limiting
          errorMessage = 'Too many login attempts. Please wait a moment and try again.';
        } else if (error.response.data && typeof error.response.data === 'object') {
          // JSON response
          errorMessage = error.response.data.message || 'Login failed';
        } else {
          // Non-JSON response (like rate limiting)
          errorMessage = error.response.statusText || 'Server error';
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data && typeof error.response.data === 'object') {
          // JSON response
          errorMessage = error.response.data.message || 'Registration failed';
        } else {
          // Non-JSON response (like rate limiting)
          errorMessage = error.response.statusText || 'Server error';
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};