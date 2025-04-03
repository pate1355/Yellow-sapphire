"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-5  items-center justify-center h-screen text-[1em] bg-white">
      <DotLottieReact
        src="https://lottie.host/c85791e0-4c81-4bea-86d0-ab7debca2c46/NaTbHlk6p8.lottie"
        loop
        autoplay
        style={{ width: "500px", height: "500px" }}
      />
      {/* back to home page */}
      <div>
        <Link
          href="/"
          className="text-black bg-[#FFBD59] hover:underline px-4 py-4 rounded-md hover:bg-[#FFF2DE]"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
