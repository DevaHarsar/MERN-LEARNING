import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Authentication/Login/Login";
import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";
import ProductList from "./pages/Products/ProductList/ProductList";
import './index.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<ProductList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
