import React from "react";

const JobForm = ({ formData, setFormData, handleSubmit, isEditing }) => {
  const jobTypeOptions = ["full-time", "part-time", "remote", "internship"];
  const statusOptions = ["pending", "interview", "declined"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      console.log("prev", prev);
      const updated = { ...prev, [name]: value };
      console.log("Updated formData:", updated);
      return updated;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="edit-job-form"
      className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4"
    >
      {/* Position */}
      <div>
        <label
          htmlFor="position"
          className="block text-sm font-medium text-gray-700"
        >
          Position
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position || ""}
          onChange={(e) => handleChange(e)}
          required
          className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company || ""}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Job Location */}
      <div>
        <label
          htmlFor="jobLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Job Location
        </label>
        <input
          type="text"
          name="jobLocation"
          id="jobLocation"
          value={formData.jobLocation || ""}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Job Type */}
      <div>
        <label
          htmlFor="jobType"
          className="block text-sm font-medium text-gray-700"
        >
          Job Type
        </label>
        <select
          name="jobType"
          id="jobType"
          value={formData.jobType || "full-time"}
          onChange={handleChange}
          className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {jobTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type[0].toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="jobStatus"
          id="jobStatus"
          value={formData.jobStatus || "pending"}
          onChange={handleChange}
          className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {isEditing ? "Update Job" : "Create Job"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
