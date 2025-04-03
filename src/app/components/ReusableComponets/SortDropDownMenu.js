"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import React, { useState } from "react";

export const SortDropDownMenu = ({
  totalJobsFound,
  query,
  currentPageJobs,
  storedQuery,
}) => {
  return (
    <>
      {/* Displaying Search Results Summary */}
      <div className="text-black font-bold">
        Showing {currentPageJobs} of {totalJobsFound} Results for{" "}
        {query ? query : storedQuery.toUpperCase() + " as of last search"}
      </div>

      {/* Sort By Menu */}

      <Dropdown />
    </>
  );
};

function Dropdown() {
  const [sortType, setSortType] = useState("Sort By");

  return (
    <Menu as="div" className="relative inline-block text-left w-full md:w-auto">
      <div>
        <MenuButton className="inline-flex w-full md:w-auto justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          {sortType}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="w-full md:w-56 absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50"
              onClick={() => {
                setSortType("Sort By");
                close();
              }}
            >
              Sort By
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50"
              onClick={() => {
                setSortType("Sort By Latest");
                close();
              }}
            >
              Sort By Latest
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50"
              onClick={() => {
                setSortType("Sort By Relevant");
                close();
              }}
            >
              Sort By Relevant
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
