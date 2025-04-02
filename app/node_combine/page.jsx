"use client"

import { useState, useEffect } from "react";
import { getDataCombine } from "./data";

export default function CombinePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("5"); // Default to last 5 minutes
  const [loading, setLoading] = useState(false);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const dataFromAPI = await getDataCombine(); // Fetch all data from API
      console.log("Data received:", dataFromAPI); // Debug the data received

      // Filter the data based on the selected time range
      const filtered = filterDataByTime(dataFromAPI, selectedTime);
      setFilteredData(filtered); // Set the filtered data to be displayed
      setData(dataFromAPI); // Store all data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to filter data based on the selected time range
  const filterDataByTime = (data, selectedTime) => {
    const now = new Date();
    let timeThreshold = new Date();

    // Calculate the threshold time based on the selected range
    switch (selectedTime) {
      case "5":
        timeThreshold.setMinutes(now.getMinutes() - 5); // 5 minutes ago
        break;
      case "10":
        timeThreshold.setMinutes(now.getMinutes() - 10); // 10 minutes ago
        break;
      case "30":
        timeThreshold.setMinutes(now.getMinutes() - 30); // 30 minutes ago
        break;
      case "60":
        timeThreshold.setHours(now.getHours() - 1); // 1 hour ago
        break;
      case "120":
        timeThreshold.setHours(now.getHours() - 2); // 2 hours ago
        break;
      case "180":
        timeThreshold.setHours(now.getHours() - 3); // 3 hours ago
        break;
      case "240":
        timeThreshold.setHours(now.getHours() - 4); // 4 hours ago
        break;
      case "300":
        timeThreshold.setHours(now.getHours() - 5); // 5 hours ago
        break;
      case "360":
        timeThreshold.setHours(now.getHours() - 6); // 6 hours ago
        break;
      default:
        timeThreshold.setMinutes(now.getMinutes() - 5); // Default to 5 minutes
    }

    // Filter the data that has a timestamp greater than or equal to the threshold
    return data.filter(item => {
      const itemTimestamp = new Date(item.TIMESTAMP); // Convert the TIMESTAMP to Date
      return itemTimestamp >= timeThreshold; // Compare with the threshold
    });
  };

  // Fetch data when the page loads (on mount)
  useEffect(() => {
    fetchData(); // Fetch data and filter it for last 5 minutes by default
  }, []); // Empty dependency array to run once on mount

  // Fetch data whenever the selected time range changes
  useEffect(() => {
    fetchData(); // Refetch and filter data on time range change
  }, [selectedTime]); // This will trigger when selectedTime changes

    // Handle the Refresh button click
    const handleRefresh = () => {
      fetchData(); // Re-fetch and filter data when refresh is clicked
    };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Node_stack</h1>

      {/* Dropdown to select the time range */}
      <div className="my-4">
        <label htmlFor="time-select" className="mr-2">Select Time Range:</label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)} // Trigger filtering immediately
          className="border p-2"
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

       {/* Refresh button */}
       <button
        onClick={handleRefresh}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Refresh
      </button>

      {/* Display the fetched data */}
      <ul>
        {loading ? (
          <p>Loading data...</p>
        ) : filteredData.length > 0 ? (
          filteredData.map((stack) => (
            <li key={stack.id} className="border p-2 my-2">
              RSSI: {stack.rssi}, Timestamp: {stack.TIMESTAMP}
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
}
