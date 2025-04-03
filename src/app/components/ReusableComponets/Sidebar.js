"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import JobCategories from "./JobCategories";
import SalaryRangeSlider from "./SalaryRangeSlider";

const Sidebar = ({
  setJobType,
  jobType,
  jobCount,
  setExperienceLevel,
  experienceLevel,
  setCategory,
  jobCategory,
  setMinOfferedSalary,
  setMaxOfferedSalary,
  setDatePosted,
  datePosted,
  setLocation,
}) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getLocation = () => {
      if (selectedProvince.trim() !== "" && selectedCity.trim() !== "") {
        return { locationName: `${selectedCity}, ${selectedProvince}` };
      }
      if (selectedProvince.trim() !== "") {
        return { locationName: selectedProvince };
      }
      if (selectedCity.trim() !== "") {
        return { locationName: selectedCity };
      }
      return { locationName: "" }; // Ensure function always returns an object
    };

    const { locationName } = getLocation();
    setLocation(locationName);
  }, [selectedProvince, selectedCity, setLocation]); // Removed setLocation from dependency array

  const categories = [
    "Technology & IT",
    "Healthcare & Medical",
    "Engineering",
    "Business & Finance",
    "Marketing & Sales",
    "Customer Service",
    "Education & Training",
    "Construction & Trades",
    "Transportation & Logistics",
    "Hospitality & Tourism",
    "Art & Design",
    "Legal",
    "Science & Research",
    "Manufacturing & Production",
    "Retail",
    "Writing & Communication",
    "Government & Public Sector",
    "Non-profit & Charity",
  ];

  const canadaMetropolitanCities = {
    AB: ["Calgary", "Edmonton"],
    BC: ["Vancouver", "Victoria", "Surrey"],
    MB: ["Winnipeg"],
    NB: ["Moncton", "Saint John", "Fredericton"],
    NL: ["St. John's"],
    NT: ["Yellowknife"],
    NS: ["Halifax"],
    NU: ["Iqaluit"],
    ON: [
      "Toronto",
      "Ottawa",
      "Mississauga",
      "Brampton",
      "Hamilton",
      "London",
      "Kitchener",
    ],
    PE: ["Charlottetown"],
    QC: ["Montreal", "Quebec City", "Laval", "Gatineau"],
    SK: ["Regina", "Saskatoon"],
    YT: ["Whitehorse"],
  };

  const validateProvince = (e) => {
    const Province = e.target.value;
    setSelectedProvince(Province !== "Select Province" ? Province : "");

    if (selectedProvince !== Province) {
      setSelectedCity("");
    }
  };

  const validateCity = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity !== "Select City" ? selectedCity : "");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Search */

  /* <div>
        <label className="text-sm font-semibold block mb-1">
          Search by Job Title
        </label>

        <input
          type="text"
          placeholder="Job title or company"
          className="w-full p-2 border rounded"
        />
      </div> */

  return (
    <aside
      aria-label="Filters"
      className=" p-5 bg-[#FFF2DE] max-h-[90vh] sticky top-6 overflow-y-auto rounded-[20px] text-black"
    >
      {/* Select Province */}
      <div className="mt-4">
        <label
          htmlFor="provinceSelect"
          className="text-sm font-semibold block mb-1"
        >
          Province
        </label>
        <div className="flex bg-white items-center border p-2 rounded-lg">
          <MapPin className="text-black mr-2" />
          <select
            id="provinceSelect"
            onChange={validateProvince}
            className="w-full bg-transparent focus:outline-none"
            aria-label="Select a province"
          >
            <option>Select Province</option>
            {Object.keys(canadaMetropolitanCities).map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Select City (Dynamic) */}
      {selectedProvince && (
        <div className="mt-4">
          <label
            htmlFor="citySelect"
            className="text-sm font-semibold block mb-1"
          >
            City
          </label>
          <div className="flex bg-white items-center border p-2 rounded-lg">
            <MapPin className="text-black mr-2" />
            <select
              id="citySelect"
              className="w-full bg-transparent focus:outline-none"
              aria-label="Select a city"
              onChange={validateCity}
            >
              <option>Select City</option>
              {canadaMetropolitanCities[selectedProvince].map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Category Filters */}

      <JobCategories
        categories={categories}
        jobCounts={jobCount}
        jobCategory={jobCategory}
        setCategory={setCategory}
      />

      {/* Job Type Filter */}
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold block mb-2">Job Type</legend>
        {[
          "Full Time",
          "Part Time",
          "Contract",
          "Internship",
          "Temporary",
          "Remote",
        ].map((type) => (
          <label key={type} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="jobType"
                checked={jobType.includes(type)}
                onChange={(e) => {
                  setJobType(
                    e.target.checked
                      ? [...jobType, type]
                      : jobType.filter((t) => t !== type)
                  );
                  scrollToTop();
                }}
                className="mr-2 appearance-none w-5 h-5 border-2 rounded-sm bg-white hover:border-black checked:bg-black focus:outline-none"
              />
              {type}
            </div>
            <span className="text-gray-700 font-medium">
              {jobCount?.[type.toLowerCase().replace(" ", "_")] || 0}
            </span>
          </label>
        ))}
      </fieldset>

      {/* Experience Level */}
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold block mb-2">
          Experience Level
        </legend>
        {["Entry Level", "Intermediate", "Expert"].map((level) => (
          <div key={level} className="flex justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="experienceLevel"
                className="mr-2 appearance-none w-5 h-5 border-2 rounded-sm bg-white hover:border-black checked:bg-black focus:outline-none"
                checked={experienceLevel.includes(level)}
                onChange={(e) => {
                  setExperienceLevel(
                    e.target.checked
                      ? [...experienceLevel, level]
                      : experienceLevel.filter((l) => l !== level)
                  );
                }}
              />
              {level}
            </label>
            <span className="text-gray-600">
              {jobCount?.[level.toLowerCase().replace(" ", "_")] || 0}
            </span>
          </div>
        ))}
      </fieldset>

      <SalaryRangeSlider
        setMinOfferedSalary={setMinOfferedSalary}
        setMaxOfferedSalary={setMaxOfferedSalary}
      />

      {/* Date Posted */}
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold block mb-2">
          Date Posted
        </legend>
        {[
          "All",
          "Last 24 Hours",
          "Last Week",
          "Last 2 Weeks",
          "Last Month",
        ].map((date) => (
          <div key={date} className="flex justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                name="datePosted"
                value={date}
                checked={datePosted === date}
                onChange={() => setDatePosted(date)}
                className="mr-2 appearance-none w-5 h-5 border-2 rounded-sm bg-white hover:border-black checked:bg-black focus:outline-none"
              />
              {date}
            </label>
            <span className="text-gray-600">10</span>
          </div>
        ))}
      </fieldset>
    </aside>
  );
};

export default Sidebar;
