import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { SummaryCard } from "./../components/SummaryCard";
import FilterDropdown from "../components/FilterDropdown";
import AutoSuggest from "../components/AutoSuggest";
import { getJobs, searchJobs } from "../api/jobApi";

const DashBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [totalJobCount, setTotalJobCount] = useState(0);

  //fetch jobs
  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data.jobs);
    setFilterJobs(data.jobs);
    setTotalJobCount(data.totalJobs);
  };
  useEffect(() => {
    fetchJobs();
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
      console.error("Error fetching filtered jobs:", err);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard title="Total Jobs" count={totalJobCount} />
        <SummaryCard
          title="Interviews"
          count={jobs.filter((j) => j.jobStatus === "interview").length}
        />
        <SummaryCard
          title="Pending"
          count={jobs.filter((j) => j.jobStatus === "pending").length}
        />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <AutoSuggest onSearch={handleSearch} />
        <FilterDropdown onSearch={handleSearch} />
      </div>

      {/* Job cards */}
      <div className="grid gap-4">
        {filterJobs.length > 0 ? (
          filterJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-gray-500 text-center">No jobs found.</p>
        )}
      </div>
    </>
  );
};
export default DashBoard;
