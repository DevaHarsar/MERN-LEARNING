import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-super-mart-rho.vercel.app",
      
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

export default app;
