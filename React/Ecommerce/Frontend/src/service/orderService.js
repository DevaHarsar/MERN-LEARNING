import api from "../api"

const API = `${import.meta.env.VITE_API_URL}/orders`;


export const placeOrder = (token, orderData) => {
  return api.post(API, orderData);
};


export const getMyOrders = () => {
  return api.get(`${API}/myorders`);
};


export const getOrderById = (token, id) => {
  return api.get(`${API}/${id}`);
};


// Admin Services

export const getAllOrders = () => {
  return api.get(`${API}/admin/orders`);
};

export const updateOrderStatus = (token, id, orderStatus) => {
  return api.patch(
    `${API}/admin/orders/${id}`,
    {
      orderStatus,
    }
  );
};

export const getAdminOrderById = (token, id) => {
  return api.get(`${API}/admin/orders/${id}`);
};