import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/cart`;

export const getCart = (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToCart = (token, productId) => {
  return axios.post(
    API,
    {
      product: productId,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateCart = (token, productId, quantity) => {
  return axios.put(
    `${API}/${productId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeCartItem = (token, productId) => {
  return axios.delete(`${API}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};