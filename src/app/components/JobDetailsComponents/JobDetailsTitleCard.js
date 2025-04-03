"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import Loading from "../Loading";
import Link from "next/link";

export default function JobDetailsTitleCard({ job }) {
  const { savedJobs, setSavedJobs } = useJobs();
  const [bookmarked, setBookmarked] = useState(false);

  // Check if the job is already bookmarked
  useEffect(() => {
    setBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
  }, [savedJobs, job.id]);

  // Handle bookmarking/unbookmarking job
  const handleClick = () => {
    if (bookmarked) {
      // Remove job from saved jobs
      setSavedJobs((prev) => prev.filter((savedJob) => savedJob.id !== job.id));
      console.log("Job removed from saved jobs:", job);
    } else {
      // Add job only if it's not already in savedJobs
      setSavedJobs((prev) =>
        prev.some((savedJob) => savedJob.id === job.id) ? prev : [...prev, job]
      );
      console.log("Job added to saved jobs:", job);
    }

    // Toggle bookmark state
    setBookmarked(!bookmarked);
  };

  // Return Loading state if jobDetails is empty
  return job && Object.keys(job).length > 0 ? (
    <div className="w-full flex flex-col gap-2 bg-[#FFF2DE] p-6 rounded-[20px] shadow-md">
      <div className="flex justify-between items-center">
        {/* Posted Date */}
        <div className="flex items-center justify-center bg-white p-2 rounded-[8px] border border-black">
          <span className="text-gray-600 text-sm">1 Week ago</span>
        </div>

        {/* Bookmark Button */}
        <motion.button
          className="p-3 cursor-pointer"
          onClick={handleClick}
          aria-label="Bookmark this job"
          whileTap={{ scale: 0.9 }} // Button shrinks slightly when clicked
        >
          <motion.div
            animate={{
              scale: bookmarked ? 1.2 : 1, // Scale up slightly on bookmark
              rotate: bookmarked ? [0, 10, -10, 5, -5, 0] : 0, // Rotates back and forth
            }}
            transition={{
              type: "tween", // Use 'tween' for smooth animation
              ease: "easeInOut",
              duration: 0.4, // Animation duration
            }}
          >
            <Bookmark
              className="w-8 h-8 transition-all duration-300"
              color={bookmarked ? "#FFBD59" : "gray"}
              fill={bookmarked ? "#FFBD59" : "none"}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Job Details */}
      <div className="text-left flex gap-2 flex-col">
        <h2 className="text-3xl text-textTitle font-bold">{job?.job_title}</h2>
        <h1 className="text-sm text-textSubtitle">{job?.company_name}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* Tags Section */}
        <div className="flex lg:gap-12 gap-4 flex-col text-black items-start mt-4 md:flex-row md:justify-center">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> <span>{job?.job_category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> <span>{job?.job_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />{" "}
            <span>{job?.offered_salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />{" "}
            <span>{job?.location.slice(0, 17)}</span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-2 w-full md:hidden">
          <Link
            className="bg-background text-center text-textTitle py-2 rounded-lg"
            href={`/`}
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loading /> // If jobDetails is empty or not loaded
  );
}
