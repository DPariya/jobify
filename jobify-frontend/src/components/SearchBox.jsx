import React from "react";
import { Search } from "lucide-react";
function SearchBox({ value, onChange }) {
  return (
    <div className="flex items-center w-full sm:w-1/2 bg-white rounded-lg shadow px-4 py-2">
      <Search className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search Jobs"
        value={value}
        onChange={onChange}
        className="w-full outline-none text-sm"
      />
    </div>
  );
}

export default SearchBox;
