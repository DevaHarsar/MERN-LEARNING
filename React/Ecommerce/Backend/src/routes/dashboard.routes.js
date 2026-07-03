import express from "express";

import {getDashboard} from "../controllers/dashboard.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getDashboard);


export default router;