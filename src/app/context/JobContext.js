"use client";
import { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [items, setItems] = useState([]);
  // const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setSavedJobs(storedJobs);
    } catch (error) {
      console.error("Error loading savedJobs from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    } catch (error) {
      console.error("Error saving savedJobs to localStorage:", error);
    }
  }, [savedJobs]);

  // Load jobDetails from localStorage when app starts
  // useEffect(() => {
  //   try {
  //     const storedJobDetails =
  //       JSON.parse(localStorage.getItem("jobDetails")) || {};
  //     setJobDetails(storedJobDetails);
  //   } catch (error) {
  //     console.error("Error loading jobDetails from localStorage:", error);
  //   }
  // }, []);

  // Save jobDetails to localStorage whenever jobDetails changes
  // useEffect(() => {
  //   try {
  //     localStorage.setItem("jobDetails", JSON.stringify(jobDetails));
  //   } catch (error) {
  //     console.error("Error saving jobDetails to localStorage:", error);
  //   }
  // }, [jobDetails]);

  return (
    <JobContext.Provider
      value={{
        savedJobs,
        setSavedJobs,
        items,
        setItems,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
