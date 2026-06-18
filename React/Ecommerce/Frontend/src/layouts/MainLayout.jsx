import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";
import ChatBotComponent from "../components/ChatBot/ChatBotComponent";

function MainLayout() {
  return (
    <>
      <div className="main-layout">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
        <ChatBotComponent/>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
