import Image from "next/image";
import React from "react";

const UpvoteSidebar = () => {
  return (
    <div className="w-1/3 h-screen bg-gray-100 flex flex-col">
      {/* Upper Part: Static Image */}
      <div className="flex-1 flex items-center justify-center bg-gray-200">
        <Image
          src="/3.png" // Replace with your image path
          alt="Static Image"
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>

      {/* Lower Part: Buttons */}
      <div className="flex-1 flex flex-col items-center justify-evenly bg-gray-300 p-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Upvote
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
          Share
        </button>
      </div>
    </div>
  );
};

export default UpvoteSidebar;
