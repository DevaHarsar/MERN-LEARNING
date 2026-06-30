import express from "express";
import{ getProducts, getProductDetails, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/",getProducts)
router.get("/:id",getProductDetails)
router.post("/",createProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)


export default router;