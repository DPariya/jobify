import React, { useEffect, useState } from "react";
import AutoSuggest from "../components/AutoSuggest";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";
import { deleteJob, getJobs, searchJobs } from "../api/jobApi";
import { JobCard } from "../components/JobCard";
import { toast } from "react-toastify";
import { updateJob, createJob } from "../api/jobApi";
import EditJob from "../components/EditJob";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobType: "full-time",
    jobStatus: "pending",
  });
  const [isEditing, setIsEditing] = useState(true);

  //fetch jobs
  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data.jobs);
    setFilterJobs(data.jobs);
  };

  useEffect(() => {
    fetchJobs();
    setIsEditing(true);
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      setFilterJobs(jobs);
      return;
    }
    try {
      const data = await searchJobs(query);
      setFilterJobs(data.jobs);
      return;
    } catch (err) {
      toast.error("Error fetching filtered jobs");
    }
  };

  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      const res = await deleteJob(jobId);
      // Re-fetch job list
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      setFilterJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job Deleted!");
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Failed to delete job:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateJob(formData._id, formData);
        toast.success("Job updated!");
      } else {
        await createJob(formData);
        toast.success("Job created!");
      }

      setOpen(false);
      setIsEditing(true);
      setFormData({}); // Clear form
      fetchJobs(); // Re-fetch jobs
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Job submit error:", error);
    }
  };
  const handleAdd = () => {
    setOpen(true);
    setIsEditing(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jobs</h1>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <AutoSuggest onSearch={handleSearch} />
        <FilterDropdown onSearch={handleSearch} />
        <SortDropdown onSearch={handleSearch} />
        <PlusCircleIcon onClick={handleAdd} className="w-6 h-6 text-blue-600" />
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 shadow rounded-xl border border-gray-200 relative"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {job.position}
            </h3>
            <p className="text-gray-600">
              {job.company} • {job.jobLocation}
            </p>
            <div className="flex justify-between">
              <p className="text-gray-800">{job.jobType}</p>
              {/* Posted On */}
              {job?.createdAt && (
                <p className="text-sm text-gray-500">
                  Added on:{" "}
                  {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            {/* job status */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                job.jobStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : job.jobStatus === "interview"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {job.jobStatus}
            </span>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setFormData({
                    position: job.position,
                    company: job.company,
                    jobLocation: job.jobLocation,
                    jobType: job.jobType || "full-time",
                    jobStatus: job.jobStatus || "pending",
                    _id: job._id,
                  }); // Set the selected job as formData
                  setIsEditing(true); // Mark editing mode
                  setOpen(true);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
            <EditJob
              open={open}
              setOpen={setOpen}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Jobs;
