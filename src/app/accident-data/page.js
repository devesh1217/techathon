"use client";
import React, { useEffect, useState } from "react";

export default function AccidentDataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/accident-data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-50 mt-20">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Road Accident Data in India</h1>
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-100">
            {Object.keys(data[0] || {}).map((key, index) => (
              <th key={index} className="border px-4 py-2 text-left text-gray-600 font-medium">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} className="border px-4 py-2 text-gray-700">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
