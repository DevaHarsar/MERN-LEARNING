import { registerUser, loginUser } from "../service/authservice.js";

export const signup = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      message: "Signup Successful",
      ...result,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.json({
      message: "Login Successful",
      ...result,
    });
  } catch (error) {
    if (error.message === "Invalid Credentials") {
      return res.status(401).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};
