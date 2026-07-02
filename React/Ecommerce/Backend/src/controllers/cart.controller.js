import {
  getCartDetails,
  addCartItem,
  updateCartItemDetails,
  deleteCartItemDetails,
} from "../service/cartService.js";

export const getCart = async (req, res) => {
  try {
    const cart = await getCartDetails(req.user.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cartItemData = req.body;
    const newCartItem = await addCartItem(req.user.userId, cartItemData);
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedCart = await updateCartItemDetails(
      req.user.userId,
      id,
      quantity,
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCart = await deleteCartItemDetails(req.user.userId, id);

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
