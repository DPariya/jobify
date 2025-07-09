import React, { useEffect, useState } from "react";
import AutoSuggest from "../components/AutoSuggest";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";
import { deleteJob } from "../api/jobApi";
import { JobCard } from "../components/JobCard";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { updateJob, createJob } from "../api/jobApi";
import EditJob from "../components/EditJob";
import Pagination from "../components/Pagination";
import { buildJobsQuery } from "../utils/buildJobQuery";
import API from "../api/axiosInstance";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterJobs, setFilterJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobType: "full-time",
    jobStatus: "pending",
  });
  //filter
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "",
  });
  //fetch jobs
  useEffect(() => {
    fetchJobs(currentPage);
    setIsEditing(true);
  }, [currentPage, filters]);

  const fetchJobs = async (page) => {
    try {
      const url = buildJobsQuery(page, filters);
      const res = await API.get(url);
      const data = res.data;
      setJobs(data.jobs);
      setFilterJobs(data.jobs);
      setNumOfPages(data.numOfPages);
      setCurrentPage(data.currentPage);
      setTotalJobs(data.totalJobs);
      const PAGE_SIZE = 6; // fixed size per page (should match backend)

      const startOfJob = (data.currentPage - 1) * PAGE_SIZE + 1;
      const endOfJob = Math.min(
        startOfJob + data.jobs.length - 1,
        data.totalJobs
      );

      setStart(startOfJob);
      setEnd(endOfJob);
    } catch (err) {
      toast.error("Failed to load jobs");
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setFilterJobs(jobs);
      return;
    }
    try {
      setFilters((prev) => ({ ...prev, search: query }));
      fetchJobs(1);
    } catch (err) {
      console.error("Error fetching filtered jobs:", err);
    }
  };
  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    fetchJobs(1);
  };
  const handleSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sort }));
    fetchJobs(1);
  };
  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await deleteJob(jobId);
      toast.success("Job Deleted!");
      // Re-fetch job list
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      setFilterJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error("Failed to delete job");
      // console.error("Failed to delete job:", error);
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
      setFormData({
        position: "",
        company: "",
        jobLocation: "",
        jobType: "full-time",
        jobStatus: "pending",
      }); // Clear form
      fetchJobs(); // Re-fetch jobs
    } catch (error) {
      toast.error("Something went wrong.");
      // console.error("Job submit error:", error);
    }
  };
  const handleAdd = () => {
    setFormData({
      position: "",
      company: "",
      jobLocation: "",
      jobType: "full-time",
      jobStatus: "pending",
    });
    setOpen(true);
    setIsEditing(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jobs</h1>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <AutoSuggest onSearch={handleSearch} />
        <FilterDropdown onSearch={handleStatusChange} />
        <SortDropdown onSearch={handleSortChange} />
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
                    ...job,
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
          </div>
        ))}
        <EditJob
          open={open}
          setOpen={setOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        numOfPages={numOfPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= numOfPages) {
            setCurrentPage(page);
            fetchJobs(page);
          }
        }}
        totalResults={totalJobs}
        start={start}
        end={end}
      />
    </>
  );
};

export default Jobs;
