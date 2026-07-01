import dotenv from "dotenv";
const result = dotenv.config();

console.log(result);
console.log("MONGO_URI =", process.env.MONGO_URI);

import mongoose from "mongoose";
import Category from "../models/category.model.js";


const categories = [
  { name: "Smartphones" },
  { name: "Laptops" },
  { name: "Headphones" },
  { name: "Smartwatches" },
  { name: "Footwear" },
  { name: "Men's Clothing" },
  { name: "Women's Clothing" },
  { name: "Cameras" },
  { name: "Gaming" },
  { name: "Televisions" },
  { name: "Kitchen" },
  { name: "Furniture" },
  { name: "Audio" },
  { name: "Accessories" },
  { name: "E-Books" },
];

const createCategories = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    await Category.insertMany(categories);
  } catch (error) {
    console.error("Error creating categories:", error);
  }
};

createCategories();