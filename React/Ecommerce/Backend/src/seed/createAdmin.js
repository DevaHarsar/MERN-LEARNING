import dotenv from "dotenv";
const result = dotenv.config();

console.log(result);
console.log("MONGO_URI =", process.env.MONGO_URI);

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create admin
    await User.create({
      fullName: {
        firstName: "Admin",
        lastName: "User",
      },
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
