"use client";

import { useState, useEffect } from "react";
import { getData } from "./getData";

export default function DataPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("5");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dataFromAPI = await getData();
      console.log("Data received:", dataFromAPI);
      const filtered = filterDataByTime(dataFromAPI, selectedTime);
      setFilteredData(filtered);
      setData(dataFromAPI);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByTime = (data, selectedTime) => {
    const now = new Date();
    let timeThreshold = new Date();
    switch (selectedTime) {
      case "5":
        timeThreshold.setMinutes(now.getMinutes() - 5);
        break;
      case "10":
        timeThreshold.setMinutes(now.getMinutes() - 10);
        break;
      case "30":
        timeThreshold.setMinutes(now.getMinutes() - 30);
        break;
      case "60":
        timeThreshold.setHours(now.getHours() - 1);
        break;
      case "120":
        timeThreshold.setHours(now.getHours() - 2);
        break;
      case "180":
        timeThreshold.setHours(now.getHours() - 3);
        break;
      case "240":
        timeThreshold.setHours(now.getHours() - 4);
        break;
      case "300":
        timeThreshold.setHours(now.getHours() - 5);
        break;
      case "360":
        timeThreshold.setHours(now.getHours() - 6);
        break;
      default:
        timeThreshold.setMinutes(now.getMinutes() - 5);
    }
    return data.filter(item => new Date(item.TIMESTAMP) >= timeThreshold);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-[#007BB5] mb-4">Node Combine</h1>

      {/* Dropdown */}
      <div className="my-4">
        <label htmlFor="time-select" className="block text-lg font-semibold mb-2 text-gray-700">
          Select Time Range:
        </label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-[#007BB5] focus:outline-none w-full"
        >
          <option value="5">Last 5 minutes</option>
          <option value="10">Last 10 minutes</option>
          <option value="30">Last 30 minutes</option>
          <option value="60">Last 1 hour</option>
          <option value="120">Last 2 hours</option>
          <option value="180">Last 3 hours</option>
          <option value="240">Last 4 hours</option>
          <option value="300">Last 5 hours</option>
          <option value="360">Last 6 hours</option>
        </select>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchData}
        className="bg-[#005BAC] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full"
      >
        Refresh Data
      </button>

      {/* Data Display */}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading data...</p>
        ) : filteredData.length > 0 ? (
          <div className="grid gap-4">
            {filteredData.map((stack) => (
              <div key={stack.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <p className="text-lg font-semibold text-[#005BAC]">Moisture: {stack.moisture}</p>
                <p className="text-gray-500 text-sm">Timestamp: {stack.TIMESTAMP}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No data available.</p>
        )}
      </div>
    </div>
  );
}
