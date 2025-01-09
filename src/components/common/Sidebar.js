"use client";

import { useState } from "react";
import * as Icons from "react-icons/fa";
import { usePathname } from "next/navigation"; // For active route detection
import Link from "next/link";

export default function Sidebar({ isOpen, setIsOpen, tabs }) {
  const pathname = usePathname(); // Get the current path

  return (
    <div
      className={`fixed top-0 left-0 w-16 min-h-screen bg-blue-900 text-white shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="p-4 mt-2 text-xl cursor-pointer hover:bg-blue-800 flex justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.FaBars />
      </div>

      {/* Navigation Items */}
      <ul className="mt-8 space-y-4 flex flex-col justify-between h-full">
        {tabs.map((tab, index) => {
          const IconComponent = Icons[tab.icon]; // Dynamically fetch icon

          const isActive = pathname === tab.route; // Check if the tab is active

          return (
            <li key={index} className="group relative">
              <Link
                href={tab.route}
                className={`flex items-center p-4 rounded-lg transition-colors duration-300 ${
                  isOpen ? "justify-start" : "justify-center"
                } 
                ${isActive ? "bg-blue-700 border-l-4 border-white" : "hover:bg-blue-800"}`}
              >
                <IconComponent 
                  className={`text-2xl transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-300"
                  }`} 
                />
                {isOpen && (
                  <span className={`ml-4 text-sm font-medium transition-all duration-200 ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}>
                    {tab.label}
                  </span>
                )}
              </Link>
              {!isOpen && (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-xs text-white px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {tab.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
