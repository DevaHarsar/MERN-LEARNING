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
import OrderList from "./pages/Orders/OrderList/OrderList";
import OrderDetails from "./pages/Orders/OrderDetails/OrderDetails";
import AdminOrders from "./pages/Admin/Orders/AdminOrders";
import AdminOrderDetails from "./pages/Admin/Orders/AdminOrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route
              path="/orders"
              element={
                <ProtectedRoutes>
                  <OrderList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoutes>
                  <OrderDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminProtectedRoutes>
                  <AdminOrders />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminProtectedRoutes>
                  <AdminOrderDetails />
                </AdminProtectedRoutes>
              }
            />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"
        autoClose={2000}
        theme="light"/>
    </>
  );
}

export default App;
