"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./components/ReusableComponets/jobCard";
import Sidebar from "./components/ReusableComponets/Sidebar";
import Header from "./components/common/Header";
import TopCompanies from "./components/common/TopCompanies";
import Footer from "./components/common/Footer";
import Loading from "./components/Loading";
import { SortDropDownMenu } from "./components/ReusableComponets/SortDropDownMenu";
import { useJobs } from "./context/JobContext";
import { useCallback } from "react";

const jobsPerPage = 10;

export default function Home() {
  const { savedJobs, setSavedJobs } = useJobs();
  const { items, setItems } = useJobs();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [storedQuery, setStoredQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobType, setJobType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobsFound, setTotalJobsFound] = useState(0);
  const [jobCount, setJobCount] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minOfferedSalary, setMinOfferedSalary] = useState(30000);
  const [maxOfferedSalary, setMaxOfferedSalary] = useState(50000);
  const [datePosted, setDatePosted] = useState("All");
  const [location, setLocation] = useState("");

  const startIndex = (currentPage - 1) * jobsPerPage;

  const filterByLocation = useCallback((location, filteredJobs) => {
    let filtered = filteredJobs;

    const locationTrimmed = location?.trim();

    if (!locationTrimmed) return filtered;

    if (locationTrimmed.includes(",")) {
      const [inputCity, inputProvince] = locationTrimmed
        .split(",")
        .map((loc) => loc.trim());

      filtered = filtered.filter((item) => {
        const [jobCity, jobProvince] = item.location
          .split(",")
          .map((loc) => loc.trim());

        const matchesCity = jobCity === inputCity;
        const matchesProvince = jobProvince === inputProvince;

        return matchesCity && matchesProvince;
      });
    } else {
      filtered = filtered.filter((item) =>
        item.location.trim().includes(locationTrimmed)
      );
    }

    return filtered;
  }, []);

  const filterByDatePosted = useCallback((datePosted, filteredJobs) => {
    let filtered = filteredJobs;

    if (datePosted !== "All") {
      const currentDate = new Date();
      let dateLimit;

      if (datePosted === "Last 24 Hours") {
        dateLimit = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
      } else if (datePosted === "Last Week") {
        dateLimit = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (datePosted === "Last 2 Weeks") {
        dateLimit = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000);
      } else if (datePosted === "Last Month") {
        dateLimit = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      filtered = filtered.filter((item) => {
        const datePosted = item.posted_date.replace(" ", "T");
        const parsedDatePosted = new Date(datePosted);

        return parsedDatePosted >= dateLimit;
      });
    }

    return filtered;
  }, []);

  const filterBySalary = useCallback(
    (minOfferedSalary, maxOfferedSalary, filteredJobs) => {
      let filtered = filteredJobs;

      if (minOfferedSalary > 0 && maxOfferedSalary > 0) {
        filtered = filtered.filter(
          (item) =>
            item.offered_salary >= minOfferedSalary &&
            item.offered_salary <= maxOfferedSalary
        );
      }

      return filtered;
    },
    []
  );

  const filterByJobType = useCallback((jobType, filteredJobs) => {
    let filtered = filteredJobs;

    if (jobType.length > 0) {
      filtered = filtered.filter((item) => jobType.includes(item.job_type));
    }

    return filtered;
  }, []);

  const filterByExperienceLevel = useCallback(
    (experienceLevel, filteredJobs) => {
      let filtered = filteredJobs;

      if (experienceLevel.length > 0) {
        filtered = filtered.filter((item) =>
          experienceLevel.includes(item.experience_required)
        );
      }

      return filtered;
    },
    []
  );
  const filterByJobCategory = useCallback((category, filteredJobs) => {
    let filtered = filteredJobs;

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.job_category)
      );
    }

    return filtered;
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      let filteredJobs = items;

      filteredJobs = filterByLocation(location, filteredJobs);

      filteredJobs = filterByDatePosted(datePosted, filteredJobs);

      filteredJobs = filterBySalary(
        minOfferedSalary,
        maxOfferedSalary,
        filteredJobs
      );

      filteredJobs = filterByJobType(jobType, filteredJobs);

      filteredJobs = filterByExperienceLevel(experienceLevel, filteredJobs);

      filteredJobs = filterByJobCategory(category, filteredJobs);

      setTotalJobsFound(filteredJobs.length);

      setTotalPages(Math.ceil(filteredJobs.length / jobsPerPage));
      setCurrentJobs(filteredJobs.slice(startIndex, startIndex + jobsPerPage));
    } catch (error) {
      console.error("Error filtering jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [
    jobType,
    experienceLevel,
    items,
    startIndex,
    category,
    minOfferedSalary,
    maxOfferedSalary,
    datePosted,
    location,
    filterByLocation,
    filterByDatePosted,
    filterBySalary,
    filterByJobType,
    filterByExperienceLevel,
    filterByJobCategory,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async (finalQuery) => {
      try {
        let url;
        const baseQuery = finalQuery.replace(/(real|local|random)/, "").trim();
        const queryParams = [];

        if (finalQuery.includes("local")) {
          queryParams.push("local=true");
        }
        if (finalQuery.includes("random")) {
          queryParams.push("random=true");
        }
        if (finalQuery.includes("real")) {
          queryParams.push("real=true");
        }

        url = `/api/jobs?query=${baseQuery}${
          queryParams.length ? "&" + queryParams.join("&") : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const result = await response.json();
        setJobCount(result.jobCounts);
        setItems(result.jobs);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const setUpQuery = async () => {
      const storedQuery = localStorage.getItem("query");

      let finalQuery;

      if (query) {
        finalQuery = query + " " + "real";
      } else if (storedQuery) {
        setStoredQuery(storedQuery);
        finalQuery = storedQuery + " " + "local";
      } else {
        finalQuery = "random";
      }

      if (query !== "") {
        localStorage.setItem("query", query);
      }

      return finalQuery;
    };

    const executeFetch = async () => {
      setLoading(true);
      const finalQuery = await setUpQuery();
      fetchData(finalQuery);
      setLoading(false);
    };

    executeFetch();
  }, [items.length, query, setItems]);

  return (
    <div className="flex flex-col w-full">
      <Header
        setQuery={setQuery}
        query={query}
        savedJobs={savedJobs}
        setSavedJobs={setSavedJobs}
      />

      <main>
        {loading ? (
          <section
            className="flex justify-center items-center w-full bg-white"
            aria-live="polite"
          >
            <Loading />
          </section>
        ) : (
          <section
            className="flex flex-col md:flex-row gap-2 p-4 bg-white"
            aria-label="Job Results"
          >
            <SidebarSection
              jobCount={jobCount}
              setJobType={setJobType}
              jobType={jobType}
              setExperienceLevel={setExperienceLevel}
              experienceLevel={experienceLevel}
              setCategory={setCategory}
              category={category}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setMinOfferedSalary={setMinOfferedSalary}
              setMaxOfferedSalary={setMaxOfferedSalary}
              setDatePosted={setDatePosted}
              datePosted={datePosted}
              setLocation={setLocation}
            />

            <JobResultsListing
              totalJobsFound={totalJobsFound}
              currentJobs={currentJobs}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              query={query}
              items={items}
              storedQuery={storedQuery}
              savedJobs={savedJobs}
              setSavedJobs={setSavedJobs}
              category={category}
              location={location}
              minOfferedSalary={minOfferedSalary}
              maxOfferedSalary={maxOfferedSalary}
              datePosted={datePosted}
              jobType={jobType}
              experienceLevel={experienceLevel}
            />
          </section>
        )}

        <TopCompaniesSection />
      </main>

      <FooterSection />
    </div>
  );
}

const SidebarSection = ({
  jobCount,
  setJobType,
  jobType,
  setExperienceLevel,
  experienceLevel,
  setCategory,
  category,
  isSidebarOpen,
  setIsSidebarOpen,
  setMinOfferedSalary,
  setMaxOfferedSalary,
  setDatePosted,
  datePosted,
  setLocation,
}) => {
  return (
    <>
      <div className="relative w-full md:w-[406px]">
        <button
          className="md:hidden w-full px-4 py-2 bg-[#FFBD59] text-black rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Filters" : "Filter"}
        </button>

        <aside
          className={`md:sticky md:top-6 md:w-auto md:h-auto ${
            isSidebarOpen
              ? "opacity-100 max-h-screen mt-2"
              : "opacity-0 max-h-0"
          } md:opacity-100 md:max-h-screen md:mt-0 transition-all duration-300 ease-in-out overflow-hidden bg-[#FFF2DE] shadow-lg rounded-lg w-full`}
        >
          <Sidebar
            jobCount={jobCount}
            setJobType={setJobType}
            jobType={jobType}
            setExperienceLevel={setExperienceLevel}
            experienceLevel={experienceLevel}
            setCategory={setCategory}
            jobCategory={category}
            setMinOfferedSalary={setMinOfferedSalary}
            setMaxOfferedSalary={setMaxOfferedSalary}
            setDatePosted={setDatePosted}
            datePosted={datePosted}
            setLocation={setLocation}
          />
        </aside>
      </div>
    </>
  );
};

const JobResultsListing = ({
  totalJobsFound,
  currentJobs,
  setCurrentPage,
  currentPage,
  totalPages,
  query,
  items,
  storedQuery,
  savedJobs,
  setSavedJobs,
  category,
  location,
  minOfferedSalary,
  maxOfferedSalary,
  datePosted,
  jobType,
  experienceLevel,
}) => {
  const getFilterText = () => {
    const filters = [];

    if (query) filters.push(`Query: "${query}"`);
    if (Array.isArray(category) && category.length > 0)
      filters.push(`Category: ${category.join(", ")}`);
    if (location) filters.push(`Location: ${location}`);
    if (minOfferedSalary !== 30000 || maxOfferedSalary !== 120000) {
      filters.push(`Salary Range: ${minOfferedSalary} - ${maxOfferedSalary}`);
    }
    if (datePosted !== "All") filters.push(`Date Posted: ${datePosted}`);
    if (Array.isArray(jobType) && jobType.length > 0)
      filters.push(`Job Type: ${jobType.join(", ")}`);
    if (Array.isArray(experienceLevel) && experienceLevel.length > 0)
      filters.push(`Experience Level: ${experienceLevel.join(", ")}`);

    return filters.length > 0 ? filters.join(" | ") : "your selected criteria";
  };

  return (
    <>
      {totalJobsFound > 0 ? (
        <section
          className="flex flex-col justify-between gap-4 w-full"
          aria-label="Job Listings"
        >
          <ul className="flex flex-col gap-4 w-full">
            <li
              key="sort-dropdown"
              className="flex flex-col-reverse md:flex-row justify-between  items-center w-full  text-md gap-3"
            >
              <SortDropDownMenu
                totalJobsFound={totalJobsFound}
                storedQuery={storedQuery}
                query={query}
                currentPageJobs={currentJobs.length}
              />
            </li>

            {currentJobs.map((item) => (
              <JobCard
                key={item.id}
                className="w-full sm:w-auto"
                {...item}
                savedJobs={savedJobs}
                setSavedJobs={setSavedJobs}
                query={query}
              />
            ))}
          </ul>

          <div className="flex flex-wrap justify-center gap-2 mt-4 w-full">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded shrink-0 disabled:opacity-50 border-black text-black hover:bg-[#FFF2DE] disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded shrink-0 ${
                  currentPage === i + 1
                    ? "bg-[#FFBD59] text-black"
                    : "border-black text-black hover:bg-[#FFF2DE]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded shrink-0 disabled:opacity-50 border-black text-black hover:bg-[#FFF2DE] disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center w-full text-black text-center">
          <p>
            No jobs found for your selected filters:{" "}
            <span className="text-lg font-bold">{getFilterText()}</span>.
            <br />
            {minOfferedSalary !== 30000 || maxOfferedSalary !== 120000 ? (
              <span>
                {" "}
                There are no jobs available within the selected salary range.
              </span>
            ) : null}
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}
    </>
  );
};

const TopCompaniesSection = () => {
  return (
    <>
      <section aria-label="Top Companies">
        <TopCompanies />
      </section>
    </>
  );
};

const FooterSection = () => {
  return (
    <>
      <footer aria-label="Footer">
        <Footer />
      </footer>
    </>
  );
};
