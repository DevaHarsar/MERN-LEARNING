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
    const name = categoryData.name?.trim().toLowerCase();

    if (!name) {
      throw new Error("Category name is required");
    }

    const existingCategory = await categoryModel.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const newCategory = await categoryModel.create({
      name,
    });

    return newCategory;
  } catch (error) {
    throw error;
  }
};
