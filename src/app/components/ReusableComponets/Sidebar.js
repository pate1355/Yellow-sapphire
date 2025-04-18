"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import JobCategories from "./JobCategories";
import SalaryRangeSlider from "./SalaryRangeSlider";
import { useJobs } from "../../context/JobContext";

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
  const { items } = useJobs();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [last24HoursCount, setLast24HoursCount] = useState(0);
  const [lastWeekCount, setLastWeekCount] = useState(0);
  const [last2WeeksCount, setLast2WeeksCount] = useState(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);

  useEffect(() => {
    let last24 = 0;
    let lastWeek = 0;
    let last2Weeks = 0;
    let lastMonth = 0;

    items.forEach((item) => {
      const postedDate = new Date(item?.posted_date);
      const now = new Date();
      const diffInMs = now - postedDate;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInHours <= 24) {
        last24++;
      }
      if (diffInDays <= 7) {
        lastWeek++;
      }
      if (diffInDays <= 14) {
        last2Weeks++;
      }
      if (diffInDays <= 30) {
        lastMonth++;
      }
    });

    setLast24HoursCount(last24);
    setLastWeekCount(lastWeek);
    setLast2WeeksCount(last2Weeks);
    setLastMonthCount(lastMonth);
  }, [items]);

  const datePostedOptions = [
    { All: items.length },
    { "Last 24 Hours": last24HoursCount },
    { "Last Week": lastWeekCount },
    { "Last 2 Weeks": last2WeeksCount },
    { "Last Month": lastMonthCount },
  ];

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
      return { locationName: "" };
    };

    const { locationName } = getLocation();
    setLocation(locationName);
  }, [selectedProvince, selectedCity, setLocation]);

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

      <JobCategories
        categories={categories}
        jobCounts={jobCount}
        jobCategory={jobCategory}
        setCategory={setCategory}
      />

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
            <span className="text-gray-600 ">
              {jobCount?.[type.toLowerCase().replace(" ", "_")] || 0}
            </span>
          </label>
        ))}
      </fieldset>

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

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold block mb-2">
          Date Posted
        </legend>
        {datePostedOptions.map((option) => {
          const date = Object.keys(option)[0];
          const count = Object.values(option)[0];
          return (
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
              <span className="text-gray-600">{count}</span>
            </div>
          );
        })}
      </fieldset>
    </aside>
  );
};

export default Sidebar;
