import React from "react";
import { Trash2 } from "lucide-react";

export const JobCard = ({ job, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "interview":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "declined":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{job.position}</h2>
        <p className="text-gray-600">
          {job.company} • {job.jobLocation}
        </p>
        <span
          className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
            job.jobStatus
          )}`}
        >
          {job.jobStatus}
        </span>
      </div>

      <div className="flex gap-2">
        {/* <button className="p-2 rounded hover:bg-gray-100">
          <Pencil size={18} />
        </button> */}
        <button onClick={onDelete} className="p-2 rounded hover:bg-gray-100">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
