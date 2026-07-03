import User from "../models/user.models.js";
import Product from "../models/products.model.js";
import Order from "../models/order.model.js";

export const getDashboardStats = async () => {
  const totalUsers = await User.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  const paidRevenue = await Order.aggregate([
    {
      $match: {
        paymentStatus: "Paid",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$total",
        },
      },
    },
  ]);
  const pendingRevenue = await Order.aggregate([
    {
      $match: {
        paymentStatus: "Pending",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$total",
        },
      },
    },
  ]);

  const totalOrderValue = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$total",
        },
      },
    },
  ]);

  const shippedOrders = await Order.countDocuments({
    orderStatus: "Shipped",
  });

  const packedOrders = await Order.countDocuments({
    orderStatus: "Packed",
  });

  const pendingOrders = await Order.countDocuments({
    orderStatus: "Placed",
  });

  const deliveredOrders = await Order.countDocuments({
    orderStatus: "Delivered",
  });

  const cancelledOrders = await Order.countDocuments({
    orderStatus: "Cancelled",
  });

  const outOfStockProducts = await Product.countDocuments({
    stock: 0,
  });

  const recentOrders = await Order.find()
    .populate("user", "fullName email")
    .sort({ createdAt: -1 })
    .limit(5);

  const latestUsers = await User.find()
    .select("fullName email createdAt")
    .sort({ createdAt: -1 })
    .limit(5);

  const lowStockProducts = await Product.find({
    stock: {
      $lte: 5,
    },
  })
    .select("title stock images price")
    .limit(5);

  return {
    totalUsers,

    totalProducts,

    totalOrders,

    paidRevenue:
    paidRevenue.length > 0
      ? paidRevenue[0].total
      : 0,

  pendingRevenue:
    pendingRevenue.length > 0
      ? pendingRevenue[0].total
      : 0,

  totalOrderValue:
    totalOrderValue.length > 0
      ? totalOrderValue[0].total
      : 0,

    pendingOrders,

    packedOrders,

    shippedOrders,

    deliveredOrders,

    cancelledOrders,
     
    lowStockCount: lowStockProducts.length,

    outOfStockProducts,

    recentOrders,

    latestUsers,

    lowStockProducts,
  };
};
