import categoryModel from "../models/category.model.js";
export const getAllCategories = async () => {
    try {
        const categories = await categoryModel.find();
        return categories;
    } catch (error) {
        throw error;
    }
};

export const createCategoryDetails = async (categoryData) => {
    try {
        const newCategory = await categoryModel.create(categoryData);
        return newCategory;
    } catch (error) {
        throw error;
    }
};