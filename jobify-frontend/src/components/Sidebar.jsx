import React from "react";
import { Briefcase, LayoutDashboard, LogOut } from "lucide-react";
import useAuth from "../contexts/useAuth";
const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-blue-600 mb-10">Jobify</h2>

      <nav className="flex flex-col gap-6">
        <a
          href="/dashboard"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>
        <a
          href="/jobs"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Briefcase size={20} />
          Jobs
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 mt-auto"
        >
          <LogOut size={20} />
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
