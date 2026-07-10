import api from "../api"

const API = `${import.meta.env.VITE_API_URL}/cart`;

export const getCart = () => {
  return api.get(API);
};

export const addToCart = (token, productId) => {
  return api.post(
    API,
    {
      product: productId,
      quantity: 1,
    }
  );
};

export const updateCart = (token, productId, quantity) => {
  return api.put(
    `${API}/${productId}`,
    { quantity },
  );
};

export const removeCartItem = (token, productId) => {
  return api.delete(`${API}/${productId}`);
};