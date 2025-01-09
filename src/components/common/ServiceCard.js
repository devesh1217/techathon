"use client";

import Link from "next/link";

export default function ServiceCard({ title, description, icon, page }) {
  return (
    <Link href={page}>
      <div className="relative w-64 h-80 bg-white shadow-lg border-2 border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        {/* Icon */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-7xl transition-all duration-500 ease-in-out group-hover:top-4">
          {icon}
        </div>
 
        {/* Title */}
        <h2 className="absolute top-44 left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-center text-gray-800 transition-all duration-500 ease-in-out group-hover:top-24">
          {title}
        </h2>

        {/* Description */}
        <div className="absolute bottom-4 left-4 right-4 bg-blue-800 text-white text-sm p-4 rounded transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <p className="text-center">{description}</p>
        </div>
      </div>
    </Link>
  );
}
