import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";
import ChatBotComponent from "../components/ChatBot/ChatBotComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../service/cartService";
import { setCart } from "../redux/cartSlice";

function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await getCart(token);
        dispatch(setCart(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    loadCart();
  }, []);
  return (
    <>
      <div className="main-layout">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
        <ChatBotComponent />
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
