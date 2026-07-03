import express from "express";
import {
  placeOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getAdminOrderById
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/myorders", authMiddleware, getMyOrders);
router.get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders);
router.patch(
  "/admin/orders/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus,
);
router.get(
  "/admin/orders/:id",
  authMiddleware,
  adminMiddleware,
  getAdminOrderById,
);
router.get("/:id", authMiddleware, getOrderById);

export default router;
