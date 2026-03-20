import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.product === action.payload.product && 
        JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product === action.payload.product && 
            JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.product === action.payload.product && 
            JSON.stringify(item.variant) === JSON.stringify(action.payload.variant))
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product === action.payload.product && 
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.filter(item => 
          item && 
          typeof item === 'object' && 
          item.product && 
          typeof item.price === 'number' && 
          typeof item.quantity === 'number'
        )
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        // Validate the cart items format
        if (Array.isArray(cartItems)) {
          dispatch({ type: 'LOAD_CART', payload: cartItems });
          console.log('Cart loaded from localStorage:', cartItems.length, 'items');
        } else {
          console.warn('Invalid cart data format in localStorage');
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart'); // Clear corrupted data
      }
    } else {
      console.log('No cart data found in localStorage');
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
        console.log('Cart saved to localStorage:', state.items.length, 'items');
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, isLoaded]);

  const addToCart = (product, quantity = 1, variant = null) => {
    // Validate product data
    if (!product || !product._id || typeof product.price !== 'number' || !product.name) {
      console.error('Invalid product data:', product);
      return;
    }
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || '/placeholder-product.jpg',
        quantity,
        variant,
        stock: product.stock || 0
      }
    });
  };

  const removeFromCart = (productId, variant = null) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { product: productId, variant }
    });
  };

  const updateQuantity = (productId, quantity, variant = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { product: productId, quantity, variant }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate cart totals
  const getCartTotal = () => {
    if (!state.items || !Array.isArray(state.items)) return 0;
    
    return state.items.reduce((total, item) => {
      const price = parseFloat(item?.price) || 0;
      const quantity = parseInt(item?.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const isInCart = (productId, variant = null) => {
    return state.items.some(item => 
      item.product === productId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    );
  };

  const getCartItem = (productId, variant = null) => {
    return state.items.find(item => 
      item.product === productId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    );
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};