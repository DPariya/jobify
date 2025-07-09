import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800"></h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600" text-sm="true">
          Hello Dipti!
        </span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
