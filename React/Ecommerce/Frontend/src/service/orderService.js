import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/orders`;


export const placeOrder = (token, orderData) => {
  return axios.post(API, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getMyOrders = (token) => {
  return axios.get(`${API}/myorders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getOrderById = (token, id) => {
  return axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Admin Services

export const getAllOrders = (token) => {
  return axios.get(`${API}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderStatus = (token, id, orderStatus) => {
  return axios.patch(
    `${API}/admin/orders/${id}`,
    {
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAdminOrderById = (token, id) => {
  return axios.get(`${API}/admin/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};