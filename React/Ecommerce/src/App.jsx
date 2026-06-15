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
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
