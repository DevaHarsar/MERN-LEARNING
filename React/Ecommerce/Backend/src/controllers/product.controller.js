import {
  ProductList,
  getProductById,
  createProductDetails,
  updateProductDetails,
  deleteProductDetails,
} from "../service/productService.js";
import cloudinary from "../config/cloudinary.js";
export const getProducts = async (req, res) => {
  try {
    const products = await ProductList();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    let productData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      productData.thumbnail = result.secure_url;
      productData.images = [result.secure_url];
    }

    const newProduct = await createProductDetails(productData);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let productData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      productData.thumbnail = result.secure_url;
      productData.images = [result.secure_url];
    }

    const updatedProduct = await updateProductDetails(productId, productData);

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProductDetails(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
