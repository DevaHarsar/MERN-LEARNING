import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);

  const userResponse = newUser.toObject();
  delete userResponse.password;

  return {
    token,
    user: userResponse,
  };
};

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken(user._id);
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    token,
    user: userResponse,
  };
};
