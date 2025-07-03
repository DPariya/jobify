import React from "react";

const FilterDropdown = () => {
  return (
    <select className="px-4 py-2 rounded-lg bg-white shadow text-gray-700 text-sm">
      <option value="">Filter by status</option>
      <option value="pending">Pending</option>
      <option value="interview">Interview</option>
      <option value="declined">Declined</option>
    </select>
  );
};

export default FilterDropdown;
