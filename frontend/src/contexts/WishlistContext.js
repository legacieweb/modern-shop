import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => 
        item.product === action.payload.product
      );
      
      if (existingItem) {
        return state; // Item already in wishlist
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.product !== action.payload.product)
      };
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        // Validate the wishlist items format
        if (Array.isArray(wishlistItems)) {
          dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems });
          console.log('Wishlist loaded from localStorage:', wishlistItems.length, 'items');
        } else {
          console.warn('Invalid wishlist data format in localStorage');
          localStorage.removeItem('wishlist');
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        localStorage.removeItem('wishlist'); // Clear corrupted data
      }
    } else {
      console.log('No wishlist data found in localStorage');
    }
    setIsLoaded(true);
  }, []);

  // Save wishlist to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        console.log('Wishlist saved to localStorage:', state.items.length, 'items');
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [state.items, isLoaded]);

  const addToWishlist = (product) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: {
        product: product._id,
        name: product.name,
        price: product.price,
        comparePrice: product.comparePrice,
        image: product.images?.[0]?.url || '/placeholder-product.jpg',
        rating: product.rating,
        brand: product.brand,
        addedAt: new Date().toISOString()
      }
    });
  };

  const removeFromWishlist = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: { product: productId }
    });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.product === productId);
  };

  const getWishlistItemsCount = () => {
    return state.items.length;
  };

  const getWishlistTotal = () => {
    return state.items.reduce((total, item) => total + item.price, 0);
  };

  const moveToCart = (productId, quantity = 1) => {
    // This would integrate with cart context
    const item = state.items.find(item => item.product === productId);
    if (item) {
      removeFromWishlist(productId);
      return item;
    }
    return null;
  };

  const value = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistItemsCount,
    getWishlistTotal,
    moveToCart,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};