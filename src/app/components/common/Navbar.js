"use client";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className=" w-full p-4 flex items-center justify-center">
      <nav
        className=" flex justify-between items-center w-full max-w-6xl"
        aria-label="Main Navigation"
      >
        <ul
          className="relative left-1/2 transform -translate-x-1/2 flex flex-row gap-8"
          aria-label="Primary Navigation"
        >
          <li>
            <Link href="/">
              <span
                className={
                  pathname === "/" ? "text-[#FFBD59]" : "hover:text-[#FFBD59]"
                }
              >
                Home
              </span>
            </Link>
          </li>
          {/* <li>
            <Link href="/about">
              <span
                className={
                  pathname === "/about"
                    ? "text-[#FFBD59]"
                    : "hover:text-[#FFBD59]"
                }
              >
                About Us
              </span>
            </Link>
          </li> */}
        </ul>

        <Link
          className={`flex items-center justify-center gap-1 ${
            pathname === `/SavedJobs`
              ? "text-[#FFBD59]"
              : "hover:text-[#FFBD59]"
          }`}
          href="/SavedJobs"
          aria-label="Saved Jobs"
        >
          <CiBookmark className="text-2xl" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
