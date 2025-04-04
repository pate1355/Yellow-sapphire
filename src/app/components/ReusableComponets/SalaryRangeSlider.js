import { useEffect, useState } from "react";
function SalaryRangeSlider({ setMinOfferedSalary, setMaxOfferedSalary }) {
  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(120000);
  const minLimit = 30000;
  const maxLimit = 120000;

  useEffect(() => {
    setMinOfferedSalary(minSalary);
    setMaxOfferedSalary(maxSalary);
  }, [minSalary, maxSalary, setMinOfferedSalary, setMaxOfferedSalary]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxSalary - 5000);
    setMinSalary(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minSalary + 5000);
    setMaxSalary(value);
  };

  return (
    <div className="w-full mt-4">
      <fieldset className="relative">
        <legend className="text-sm font-semibold block mb-4">
          Salary Range
        </legend>

        <div className="relative w-full h-1 bg-gray-300 rounded-full">
          <div
            className="absolute h-1 bg-[#FFBD59] rounded-full"
            style={{
              left: `${
                ((minSalary - minLimit) / (maxLimit - minLimit)) * 100
              }%`,
              right: `${
                100 - ((maxSalary - minLimit) / (maxLimit - minLimit)) * 100
              }%`,
            }}
          />
        </div>

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minSalary}
          onChange={handleMinChange}
          className="absolute top-0 w-full appearance-none pointer-events-none"
          style={{ height: "1px" }}
        />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxSalary}
          onChange={handleMaxChange}
          className="absolute top-0 w-full appearance-none pointer-events-none"
          style={{ height: "1px" }}
        />

        <div className="flex justify-between text-sm mt-4">
          <span>30k</span>
          <span>120k</span>
        </div>

        <div className="flex flex-col gap-2 justify-between mt-4 ">
          <div className="px-3 py-2  text-center bg-[#FFBD59] text-black text-sm font-semibold rounded-lg shadow-md">
            Min ${minSalary.toLocaleString()}
          </div>
          <div className="px-3 py-2  text-center bg-[#FFBD59] text-black text-sm font-semibold rounded-lg shadow-md">
            Max ${maxSalary.toLocaleString()}
          </div>
        </div>
      </fieldset>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          position: absolute;
          width: 100%;
          background: transparent;
          pointer-events: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #ffbd59;
          border: 2px solid black;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          pointer-events: auto;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #ffbd59;
          border: 2px solid black;
          border-radius: 50%;
          cursor: grab;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

export default SalaryRangeSlider;
