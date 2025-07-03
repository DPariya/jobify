import React from "react";

export const SummaryCard = ({ title, count }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-600 text-md">{title}</h3>
    <p className="text-2xl font-semibold text-blue-600">{count}</p>
  </div>
);
