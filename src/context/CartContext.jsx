// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState(() => {
		// Load from localStorage on mount
		const saved = localStorage.getItem("current_products");
		return saved ? JSON.parse(saved) : [];
	});

	const [cartCount, setCartCount] = useState(() => {
		const savedCount = localStorage.getItem("cartCount");
		return savedCount ? parseInt(savedCount, 10) : 0;
	});

	// Whenever cartItems changes → sync to localStorage + update count
	useEffect(() => {
		localStorage.setItem("current_products", JSON.stringify(cartItems));

		const newCount = cartItems.length;
		setCartCount(newCount);
		localStorage.setItem("cartCount", newCount.toString());
	}, [cartItems]);

	const addToCart = (newItem) => {
		setCartItems((prevItems) => {
			// Optional: prevent duplicate products by id (or allow multiples)
			// If you want to allow quantity > 1 later, change this logic
			const alreadyExists = prevItems.some(
				(item) => item.product?.id === newItem.product?.id,
			);

			if (alreadyExists) {
				// For now: don't add duplicates (you can change to increase quantity)
				console.warn("Item already in cart");
				return prevItems;
			}

			return [...prevItems, newItem];
		});
	};

	const removeFromCart = (productId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.product?.id !== productId),
		);
	};

	const clearCart = () => {
		setCartItems([]);
		setCartCount(0);
		localStorage.removeItem("current_products");
		localStorage.removeItem("cartCount");
	};

	// Optional: simple total price calculation (uses the discounted price stored in item)
	const getCartTotal = () => {
		return cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
	};

	// Optional: total original price (before discounts)
	const getOriginalTotal = () => {
		return cartItems.reduce((sum, item) => {
			// If you store original price separately, use it here
			return sum + (item.totalPrice || 0); // adjust as needed
		}, 0);
	};

	const value = {
		cartItems,
		cartCount,
		addToCart,
		removeFromCart,
		clearCart,
		getCartTotal,
		getOriginalTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use the cart anywhere
export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
