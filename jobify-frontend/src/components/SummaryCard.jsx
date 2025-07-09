import React from "react";

export const SummaryCard = ({ title, count }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Interviewed":
        return " text-green-700";
      case "Pending":
        return "text-yellow-700";
      case "Declined":
        return " text-red-700";

      default:
        return "text-blue-600";
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-600 text-md">{title}</h3>
      <p className={`text-2xl font-semibold  ${getStatusColor(title)}`}>
        {count}
      </p>
    </div>
  );
};
