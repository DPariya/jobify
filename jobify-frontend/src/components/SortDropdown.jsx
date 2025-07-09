import React, { useState } from "react";

const SortDropdown = ({ onSearch }) => {
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = async (e) => {
    setSearchStatus(e.target.value);
    onSearch(`sort=${e.target.value}`);
  };
  return (
    <select
      className="px-4 py-2 rounded-lg bg-white shadow text-gray-700 text-sm"
      name="status"
      value={searchStatus}
      onChange={handleSearch}
    >
      <option value="">sort By</option>
      <option value="oldest">oldest</option>
      <option value="latest">newest</option>
    </select>
  );
};

export default SortDropdown;
