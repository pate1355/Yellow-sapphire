import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-32 h-32 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto flex justify-center items-center">
        <svg
          className="animate-pulse h-16 w-16 text-yellow-400"
          viewBox="0 0 172.77 295.27"
        >
          <defs>
            <style>{`.cls-1 { fill: #f5cb50; }`}</style>
          </defs>
          <path
            className="cls-1"
            d="M86.39,0L0,76.58v142.12l86.39,76.57,86.38-76.57V76.58L86.39,0ZM105.44,147.64l42.06-37.28v74.56l-42.06-37.28ZM141.08,82.26l-54.69,48.49-54.7-48.49,54.7-48.49,54.69,48.49ZM25.28,207.33v-96.97l115.81,102.66-54.69,48.48-61.11-54.17Z"
          />
        </svg>
      </div>
      <p className="text-yellow-400 mt-4 text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
