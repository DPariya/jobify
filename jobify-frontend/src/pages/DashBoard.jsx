import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { SummaryCard } from "./../components/SummaryCard";
import FilterDropdown from "../components/FilterDropdown";
import AutoSuggest from "../components/AutoSuggest";
import Pagination from "../components/Pagination";
import { buildJobsQuery } from "../utils/buildJobQuery";
import API from "../api/axiosInstance";
import { deleteJob } from "../api/jobApi";
import { toast } from "react-toastify";
import EmptyImage from "../assets/noFound.jpg";
const DashBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [totalJobCount, setTotalJobCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [loading, setLoading] = useState(false);
  //filter
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "",
  });

  //fetch jobs
  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const url = buildJobsQuery(page, filters);
      const res = await API.get(url);
      const data = res.data;

      setJobs(data.jobs);
      setFilterJobs(data.jobs);
      setNumOfPages(data.numOfPages);
      setTotalJobCount(data.totalJobs);
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
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage, filters]);

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
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard title="Total Jobs" count={totalJobCount} />
        <SummaryCard
          title="Interviewed"
          count={jobs.filter((j) => j.jobStatus === "interview").length}
        />
        <SummaryCard
          title="Pending"
          count={jobs.filter((j) => j.jobStatus === "pending").length}
        />
        <SummaryCard
          title="Declined"
          count={jobs.filter((j) => j.jobStatus === "declined").length}
        />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <AutoSuggest onSearch={handleSearch} />
        <FilterDropdown onSearch={handleStatusChange} />
      </div>

      {/* Job cards */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : filterJobs.length > 0 ? (
          filterJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={() => handleDelete(job._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-10 bg-gray-50 rounded-xl shadow-sm">
            <img
              src={EmptyImage}
              alt="No Jobs"
              className="mx-auto h-32 w-32 mb-4 opacity-70"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              No Jobs Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting filters or search query.
            </p>
          </div>
        )}
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
export default DashBoard;
