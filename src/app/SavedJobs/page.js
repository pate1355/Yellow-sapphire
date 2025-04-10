"use client";
import { React } from "react";
import SavedPageHeader from "../components/SavedPageComponents/SavedPageHeader";
import JobCard from "../components/ReusableComponets/jobCard";
import Image from "next/image";
import Footer from "../components/common/Footer";
import { useJobs } from "../context/JobContext";

const SavedJobs = () => {
  const { savedJobs, setSavedJobs } = useJobs();

  return (
    <>
      <div className="bg-white ">
        <SavedPageHeader />

        <div className="flex flex-col md:items-center justify-center mt-4 p-6 ">
          <div
            className={`${
              savedJobs.length > 0 ? "max-w-screen-xl mx-auto" : ""
            }  flex flex-col items-start justify-center ${
              savedJobs.length > 0 ? "gap-6 md:gap-8 lg:gap-10" : "gap-16"
            }`}
          >
            <div className="flex items-start gap-4 md:w-[40rem]">
              <h1 className="text-2xl font-bold text-left text-black mt-4">
                Your Saved Jobs
              </h1>
            </div>
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <ul
                  key={job.id}
                  className="flex flex-col items-center justify-center gap-18 w-full"
                >
                  <JobCard
                    className="w-full md:w-1/2 lg:w-1/3"
                    key={job.id}
                    {...job}
                    savedJobs={savedJobs}
                    setSavedJobs={setSavedJobs}
                  />
                </ul>
              ))
            ) : (
              <div className="flex flex-col w-full items-center justify-center gap-4">
                <Image
                  src="/No-Saved-Job.png"
                  alt="No saved jobs Image"
                  width={300}
                  height={300}
                />
                <p className="text-black text-center w-full">
                  No saved jobs yet.
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SavedJobs;
