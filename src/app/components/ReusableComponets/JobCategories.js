import React, { useState } from "react";

const JobCategories = ({ categories, jobCounts, jobCategory, setCategory }) => {
  const [showMore, setShowMore] = useState(false);

  const category = categories.slice(0, showMore ? categories : 5);
  const moreCategory = categories;

  return (
    <fieldset className="mt-4">
      <legend className="text-sm font-semibold block mb-2">Category</legend>
      {category.map((cat) => (
        <div key={cat} className="flex justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="category"
              className="mr-2 appearance-none w-5 h-5 border-2 rounded-sm bg-white hover:border-black checked:bg-black focus:outline-none"
              checked={jobCategory.includes(cat)}
              onChange={(e) => {
                setCategory(
                  e.target.checked
                    ? [...jobCategory, cat]
                    : jobCategory.filter((t) => t !== cat)
                );
              }}
            />
            {cat}
          </label>
          <span className="text-gray-600">
            {jobCounts[
              cat.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")
            ] || 0}
          </span>{" "}
        </div>
      ))}

      {showMore &&
        moreCategory.map((cat) => (
          <div key={cat} className="flex justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="category"
                className="mr-2 appearance-none w-5 h-5 border-2 rounded-sm bg-white hover:border-black checked:bg-black focus:outline-none"
                checked={jobCategory.includes(cat)}
                onChange={(e) => {
                  setCategory(
                    e.target.checked
                      ? [...jobCategory, cat]
                      : jobCategory.filter((t) => t !== cat)
                  );
                }}
              />
              {cat}
            </label>
            <span className="text-gray-600">
              {jobCounts[
                cat.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")
              ] || 0}
            </span>
          </div>
        ))}

      <button
        className="w-full mt-2 bg-[#FFBD59] text-black py-2 rounded"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </fieldset>
  );
};

export default JobCategories;
