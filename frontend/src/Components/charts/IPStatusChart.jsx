import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { VIZ_IDS } from "./vizConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const IPStatusChart = ({ data = [], vizId = VIZ_IDS.IP_STATUS_DIST }) => {
  // ✅ Fallback data (used until API is connected)
  const fallbackData = [
    { status: "Completed", count: 236 },
    { status: "Pending", count: 12 },
    { status: "Rejected", count: 8 }
  ];

  // ✅ Use API data if available
  const finalData = data.length ? data : fallbackData;

  // ✅ Convert API format → Chart.js format
  const chartData = {
    labels: finalData.map(item => item.status),
    datasets: [
      {
        label: "IP Status",
        data: finalData.map(item => item.count),
        backgroundColor: ["#198754", "#ffc107", "#dc3545"]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default IPStatusChart;
