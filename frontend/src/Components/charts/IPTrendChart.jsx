import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { VIZ_IDS } from "./vizConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const IPTrendChart = ({ data = [], vizId = VIZ_IDS.IP_FILING_TREND }) => {
  const [selectedYear, setSelectedYear] = useState("2023");

  // 🔹 Fallback data by year (API-ready)
  const fallbackDataByYear = {
    "2022": [
      { month: "Jan", count: 10 },
      { month: "Feb", count: 12 },
      { month: "Mar", count: 15 },
      { month: "Apr", count: 14 },
      { month: "May", count: 18 },
      { month: "Jun", count: 20 }
    ],
    "2023": [
      { month: "Jan", count: 18 },
      { month: "Feb", count: 22 },
      { month: "Mar", count: 25 },
      { month: "Apr", count: 20 },
      { month: "May", count: 28 },
      { month: "Jun", count: 30 },
      { month: "Jul", count: 32 },
      { month: "Aug", count: 35 },
      { month: "Sep", count: 38 },
      { month: "Oct", count: 40 },
      { month: "Nov", count: 42 },
      { month: "Dec", count: 48 }
    ]
  };

  const finalData =
    data.length ? data : fallbackDataByYear[selectedYear];

  const chartData = {
    labels: finalData.map(item => item.month),
    datasets: [
      {
        label: `IP Filings (${selectedYear})`,
        data: finalData.map(item => item.count),
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.25)",
        fill: true,
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  return (
    <>
      {/* 🎯 Year Selector */}
      <div className="d-flex justify-content-end mb-2">
        <select
          className="form-select form-select-sm w-auto"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* 📈 Chart */}
      <Line data={chartData} />
    </>
  );
};

export default IPTrendChart;
