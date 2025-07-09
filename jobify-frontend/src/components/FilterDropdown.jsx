import React, { useState } from "react";

const FilterDropdown = ({ onSearch }) => {
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = async (e) => {
    const selectedStatus = e.target.value;
    setSearchStatus(selectedStatus);
    onSearch(selectedStatus);
  };
  return (
    <select
      className="px-4 py-2 rounded-lg bg-white shadow text-gray-700 text-sm"
      name="status"
      value={searchStatus}
      onChange={handleSearch}
    >
      <option value="">Filter by status</option>
      <option value="pending">Pending</option>
      <option value="interview">Interview</option>
      <option value="declined">Declined</option>
    </select>
  );
};

export default FilterDropdown;
