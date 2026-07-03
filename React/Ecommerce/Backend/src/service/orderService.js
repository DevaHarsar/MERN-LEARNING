import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

export const placeOrderDetails = async (userId, orderData) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const { name, phone, address, city, state, zip } =
      orderData.shippingAddress || {};

    if (!name || !address || !city || !state || !zip || !phone) {
      throw new Error("Shipping address is required");
    }

    const allowedMethods = ["COD", "Razorpay", "Stripe"];

    if (!allowedMethods.includes(orderData.paymentMethod)) {
      throw new Error("Invalid payment method");
    }
    const items = cart.items.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      image: item.product.images?.[0] || "",
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

    const discount = cart.items.reduce(
      (sum, item) =>
        sum +
        (item.product.price * item.quantity * (item.product.discount ?? 0)) /
          100,
      0,
    );

    const taxableAmount = subtotal - discount;

    const tax = taxableAmount * 0.1;

    const shipping = subtotal > 1000 ? 0 : 100;

    const total = taxableAmount + tax + shipping;

    // Reduce stock atomically
    for (const item of cart.items) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product._id,
          stock: { $gte: item.quantity },
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
        },
      );

      if (!updatedProduct) {
        throw new Error(`${item.product.title} is out of stock`);
      }
    }

    // Create order
    const newOrder = new Order({
      user: userId,

      items,

      shippingAddress: orderData.shippingAddress,

      subtotal,

      discount,

      tax,

      shipping,

      total,

      paymentMethod: orderData.paymentMethod,

      paymentStatus: orderData.paymentMethod === "COD" ? "Pending" : "Paid",

      orderStatus: "Placed",
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    return newOrder;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetails = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate("items.product");

    return orders;
  } catch (error) {
    throw error;
  }
};

export const getOrderByIdDetails = async (userId, id) => {
  try {
    const order = await Order.findOne({
      user: userId,
      _id: id,
    }).populate("items.product");

    return order;
  } catch (error) {
    throw error;
  }
};

export const getAllOrderDetails = async () => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .populate("items.product");

    return orders;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatusDetails = async (id, orderStatus) => {
  try {
    const allowedStatus = [
      "Placed",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(orderStatus)) {
      throw new Error("Invalid order status");
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = orderStatus;

    // Automatically update COD payment
    if (orderStatus === "Delivered" && order.paymentMethod === "COD") {
      order.paymentStatus = "Paid";
    }
    else{
      order.paymentStatus = "Pending";
    }

    await order.save();

    return await Order.findById(id)
      .populate("user", "fullName email")
      .populate("items.product");
  } catch (error) {
    throw error;
  }
};
export const getAdminOrderByIdDetails = async (id) => {
  return await Order.findById(id).populate("user").populate("items.product");
};
