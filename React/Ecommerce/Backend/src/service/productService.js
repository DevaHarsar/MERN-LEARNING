import productModel from "../models/products.model.js";

export const ProductList = async ()=>{
    try{
        const products = await productModel.find();
        return products;
    }
    catch(error){
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        const product = await productModel.findById(productId);
        return product;
    }
    catch (error) {
        throw error;
    }
}

export const createProductDetails = async (productData) => {
    try {
        const newProduct = await productModel.create(productData);
        return newProduct;
    }
    catch (error) {
        throw error;
    }
}

export const updateProductDetails = async (productId, productData) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, productData, { new: true });
        return updatedProduct;
    }
    catch (error) {
        throw error;
    }
}

export const deleteProductDetails = async (productId) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId); 
        return deletedProduct;
    }
    catch (error) {
        throw error;
    }
}

