import React, { useEffect } from "react";
import { setUser } from "../utils/localStorage";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/auth/refresh-token");
        setUser(res.data.user, res.data.accessToken); // update context
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="p-6 bg-gray-100 min-h-screen">
            <Outlet /> {/* This is where nested routes render */}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
