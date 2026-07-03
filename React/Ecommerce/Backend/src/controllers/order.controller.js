import{ placeOrderDetails, getOrderDetails, getOrderByIdDetails, getAllOrderDetails, updateOrderStatusDetails, getAdminOrderByIdDetails } from '../service/orderService.js';

export const placeOrder = async (req, res) => {
  try {
    const orderData = req.body; 
    const newOrder = await placeOrderDetails(req.user.userId, orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await getOrderDetails(req.user.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdDetails(req.user.userId, id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrderDetails();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const updatedOrder = await updateOrderStatusDetails(id, orderStatus);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const getAdminOrderById = async (req, res) => {
  try {
    const order = await getAdminOrderByIdDetails(req.params.id);

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};