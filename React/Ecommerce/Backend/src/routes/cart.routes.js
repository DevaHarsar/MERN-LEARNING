import express from "express";
import { getCart, addToCart, updateCartItem, deleteCartItem } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;