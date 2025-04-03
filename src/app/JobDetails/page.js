"use client";

import React from "react";
import { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import JobDetailsTitleCard from "../components/JobDetailsComponents/JobDetailsTitleCard";
import JobDetailsDescriptionCard from "../components/JobDetailsComponents/JobDetailsDescriptionCard";
import JobDetailsRelatedCard from "../components/JobDetailsComponents/JobDetailsRelatedCard";
import JobDetailsSidebar from "../components/JobDetailsComponents/JobDetailsSidebar";
import { useJobs } from "../context/JobContext";

import Loading from "../components/Loading";

const JobDetails = () => {
  const { items } = useJobs();
  const [currentJobDetails, setCurrentJobDetails] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const id = searchParams?.get("id");
  const query = searchParams?.get("query");

  console.log("items", items);
  console.log("id", id);
  console.log("query", query);

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const jobDetails = items.find((job) => job.id === id);
      if (jobDetails) {
        setCurrentJobDetails(jobDetails || null);
      }
    }
  }, [id, items]);

  return (
    <div className="bg-white min-h-screen">
      <JobDetailsHeader />
      {currentJobDetails !== null ? (
        <div className="m-6 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center  ">
            <JobDetailsTitleCard job={currentJobDetails} />
          </div>
          <div className="flex flex-col md:flex-row-reverse   gap-2">
            <div className="flex flex-col md:max-h-screen md:sticky md:top-4  md:items-end  ">
              <JobDetailsSidebar job={currentJobDetails} />
            </div>
            <div className="flex flex-col p-2 items-center justify-stretch gap-8">
              {Object.keys(currentJobDetails).length > 0 && (
                <div className="hidden md:block md:sticky md:top-4 w-2 min-h-screen bg-[#ffbd59] rounded-[5px]" />
              )}
            </div>
            <div className="flex flex-col gap-8 flex-wrap">
              <JobDetailsDescriptionCard job={currentJobDetails} />
              <JobDetailsRelatedCard job={currentJobDetails} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetails;
