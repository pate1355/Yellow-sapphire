import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./Navbar";
function Header({ setQuery, savedJobs, setSavedJobs }) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
  };
  return (
    <>
      <header className="p-3 bg-[url(/bannerBG4.jpg)] bg-cover">
        <Navbar savedJobs={savedJobs} setSavedJobs={setSavedJobs} />

        <section className="flex flex-col justify-center items-center py-8 gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Home">
              <Image
                src="/YellowSapphire-icon.png"
                alt="Yellow Sapphire Logo"
                width={30}
                height={30}
              />
            </Link>
            <h1 className="text-3xl md:text-5xl  font-bold text-[#FFBD59] transition-all duration-300">
              YELLOW SAPPHIRE
            </h1>
          </div>

          <form
            className="flex"
            onSubmit={handleSubmit}
            aria-label="Job Search Form"
          >
            <label htmlFor="job-search" className="sr-only">
              Search for a job by title or company
            </label>
            <input
              id="job-search"
              type="text"
              placeholder={"Job Title or Company"}
              className="text-black max-w-80 md:w-80 py-2 px-4 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border border-gray-300 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#FFBD59] p-4 rounded-r-lg cursor-pointer text-sm flex items-center text-black"
            >
              <CiSearch className="mr-2 stroke-[2]" />
              Search Job
            </button>
          </form>
        </section>
      </header>
    </>
  );
}
export default Header;
