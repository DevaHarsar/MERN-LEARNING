import express from "express";
import{ getProducts, getProductDetails, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import  authMiddleware  from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

router.get("/",getProducts)
router.get("/:id",getProductDetails)
router.post("/",authMiddleware, adminMiddleware, upload.single("image"), createProduct)
router.put("/:id",authMiddleware, adminMiddleware, upload.single("image"), updateProduct)
router.delete("/:id",authMiddleware, adminMiddleware, deleteProduct)


export default router;