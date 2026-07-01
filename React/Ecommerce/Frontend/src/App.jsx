import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Authentication/Login/Login";
import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";
import WelcomeComponent from "./components/Practice/WelcomeComponent";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import "./index.css";
import ProductsPage from "./pages/Admin/Products/ProductsPage";
import AddProducts from "./pages/Admin/Products/AddProducts/AddProducts";
import EditProducts from "./pages/Admin/Products/EditProducts/EditProducts";
import Carts from "./pages/Carts/Carts";
import Checkout from "./pages/CheckOut/Checkout";
import AdminProtectedRoutes from "./ProtectedRoutes/AdminProtectedRoutes";
import AdminProductPage from "./pages/Admin/Products/AdminProductPage/AdminProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/practice" element={<WelcomeComponent />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoutes>
                  <Dashboard />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProtectedRoutes>
                  <AdminProductPage />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/admin/add-products"
              element={
                <AdminProtectedRoutes>
                  <AddProducts />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminProtectedRoutes>
                  <EditProducts />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/cartPage"
              element={
                <ProtectedRoutes>
                  <Carts />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoutes>
                  <Checkout />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
