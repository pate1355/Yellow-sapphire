import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useJobs } from "../../context/JobContext";
import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";

const JobDetailsRelatedCard = ({ job }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const { items, setSavedJobs, savedJobs } = useJobs();
  const currentJobTitle = job?.job_title;
  const currentJob = job?.id;
  const [jobPostedDate, setJobPostedDate] = useState("");

  useEffect(() => {
    const postedDate = new Date(job?.posted_date);

    const now = new Date();
    const diffInMs = now - postedDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours <= 24) {
      setJobPostedDate("24 hours ago");
    } else if (diffInDays === 7) {
      setJobPostedDate("1 week ago");
    } else if (diffInDays === 14) {
      setJobPostedDate("2 weeks ago");
    } else if (diffInDays === 21) {
      setJobPostedDate("3 weeks ago");
    } else if (diffInDays === 28) {
      setJobPostedDate("4 weeks ago");
    } else if (diffInDays === 30) {
      setJobPostedDate("1 month ago");
    } else if (
      diffInDays < 30 &&
      diffInDays !== 7 &&
      diffInDays !== 14 &&
      diffInDays !== 21 &&
      diffInDays !== 28
    ) {
      setJobPostedDate(`${Math.round(diffInDays)} days ago`);
    }
  }, [job]);

  useEffect(() => {
    if (currentJobTitle && items.length > 0) {
      let relatedJobs;
      relatedJobs = items.filter(
        (job) =>
          job.job_title
            ?.toLowerCase()
            .includes(currentJobTitle?.toLowerCase()) && job.id !== job.id
      );

      if (relatedJobs.length === 0) {
        relatedJobs = items.filter((job) => job.id !== currentJob);
      }

      const shuffledRelatedJobs = relatedJobs.sort(() => Math.random() - 0.5);

      const limitedRelatedJobs = shuffledRelatedJobs.slice(0, 3);
      setRelatedJobs(limitedRelatedJobs);
    }
  }, [currentJob, currentJobTitle, items, job.id]);

  useEffect(() => {
    setBookmarkedJobs(
      relatedJobs.map((job) =>
        savedJobs.some((savedJob) => savedJob.id === job.id)
      )
    );
  }, [savedJobs, relatedJobs]);

  const handleClick = (job) => {
    const isBookmarked = bookmarkedJobs[relatedJobs.indexOf(job)];

    if (isBookmarked) {
      setSavedJobs((prev) => prev.filter((savedJob) => savedJob.id !== job.id));
    } else {
      setSavedJobs((prev) =>
        prev.some((savedJob) => savedJob.id === job.id) ? prev : [...prev, job]
      );
    }

    setBookmarkedJobs((prev) => {
      const updatedBookmarks = [...prev];
      updatedBookmarks[relatedJobs.indexOf(job)] =
        !updatedBookmarks[relatedJobs.indexOf(job)];
      return updatedBookmarks;
    });
  };

  const extractJobOverview = (text) => {
    const match = text.match(/Job Overview\s([\s\S]+?)\n\n/);
    return match ? match[1].trim() : "Job Overview not found.";
  };

  return job && Object.keys(job).length > 0 ? (
    <div className="w-full flex flex-col gap-4  p-0 rounded-[20px] ">
      <h2 className="text-4xl font-semibold mb-4 text-black">Related Jobs</h2>

      {relatedJobs.map((job) => (
        <div
          key={job.id}
          className="w-full flex flex-col gap-4 bg-[#FFF2DE] p-6 rounded-[20px] shadow-md"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center bg-white p-2 rounded-[8px] border border-black">
              <span className="text-gray-600 text-sm">{jobPostedDate}</span>
            </div>

            <motion.button
              className="p-3 cursor-pointer"
              onClick={() => handleClick(job)}
              aria-label="Bookmark this job"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{
                  scale: bookmarkedJobs[relatedJobs.indexOf(job)] ? 1.2 : 1,
                  rotate: bookmarkedJobs[relatedJobs.indexOf(job)]
                    ? [0, 10, -10, 5, -5, 0]
                    : 0,
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.4,
                }}
              >
                <Bookmark
                  className="w-8 h-8 transition-all duration-300"
                  color={
                    bookmarkedJobs[relatedJobs.indexOf(job)]
                      ? "#FFBD59"
                      : "gray"
                  }
                  fill={
                    bookmarkedJobs[relatedJobs.indexOf(job)]
                      ? "#FFBD59"
                      : "none"
                  }
                />
              </motion.div>
            </motion.button>
          </div>

          <div className="text-left">
            <h2 className="text-lg text-textTitle font-bold">
              {job?.job_title}
            </h2>
            <h1 className="text-sm text-textSubtitle">{job?.company_name}</h1>
            <p className="text-sm text-textBody mt-1 max-w-screen-lg">
              {extractJobOverview(job?.job_description)}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
            <div className="grid grid-cols-2 w-full gap-2 text-sm text-textBody">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />{" "}
                <span>{job?.job_category}</span>
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
                <span>
                  {job?.location?.slice(0, 17) || "Location not available"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-40">
              <Link
                className="bg-background text-center text-textTitle py-2 rounded-lg"
                href={`/`}
              >
                Apply
              </Link>
              <Link
                className="bg-background text-center text-textTitle  py-2 rounded-lg"
                href={`/JobDetails?id=${job.id}`}
                aria-label="Job Details"
              >
                Job Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default JobDetailsRelatedCard;
