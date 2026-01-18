// src/services/cartService.js
import api from "../api/api"; // centralized axios instance

// Add course to cart
export const addToCart = async (courseId, price) => {
  try {
    const response = await api.post("/cart/add", { courseId, price });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Get all cart items
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data.cart; // return cart object
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Remove a course from cart
export const removeFromCart = async (courseId) => {
  try {
    const response = await api.delete(`/cart/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error removing course from cart:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Remove all items from cart
export const removeAllFromCart = async () => {
  try {
    const response = await api.delete("/cart");
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing cart:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
