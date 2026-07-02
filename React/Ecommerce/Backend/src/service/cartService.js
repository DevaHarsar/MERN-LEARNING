import Cart from "../models/cart.model.js";

export const getCartDetails = async (userId) => {
  try {
    const cartItems = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

export const addCartItem = async (userId, cartItemData) => {
  try {
    const { product, quantity } = cartItemData;

    let cart = await Cart.findOne({ user: userId });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Check if product already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product,
        quantity,
      });
    }

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
  } catch (error) {
    throw error;
  }
};

export const updateCartItemDetails = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      throw new Error("Product not found in cart");
    }

    item.quantity = quantity;

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
  } catch (error) {
    throw error;
  }
};

export const deleteCartItemDetails = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
  } catch (error) {
    throw error;
  }
};
    