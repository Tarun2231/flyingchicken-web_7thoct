import React, { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) =>
          item.menuItem === action.payload.menuItem &&
          JSON.stringify(item.variant) ===
            JSON.stringify(action.payload.variant) &&
          JSON.stringify(item.addons) === JSON.stringify(action.payload.addons)
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
      } else {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
      }

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: filteredItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    case "UPDATE_QUANTITY":
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case "SET_CART_OPEN":
      return {
        ...state,
        isOpen: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    const cartItem = {
      id: `${item.menuItem}_${Date.now()}_${Math.random()}`,
      menuItem: item.menuItem,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      variant: item.variant,
      addons: item.addons || [],
      specialInstructions: item.specialInstructions || "",
      vendor: item.vendor,
      vendorName: item.vendorName,
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    toast.success("Item removed from cart");
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const setCartOpen = (isOpen) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen });
  };

  const getCartSummary = () => {
    const deliveryFee = state.items.length > 0 ? 30 : 0; // Assuming ₹30 delivery fee
    const tax = (state.totalPrice + deliveryFee) * 0.05; // 5% GST
    const total = state.totalPrice + deliveryFee + tax;

    return {
      subtotal: state.totalPrice,
      deliveryFee,
      tax,
      total,
    };
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
    getCartSummary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

