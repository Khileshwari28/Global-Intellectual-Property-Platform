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

const IPTypeTrendChart = ({ data = [], vizId = VIZ_IDS.IP_TYPE_TREND }) => {
  const fallbackData = [
    { type: "Patent", count: 180 },
    { type: "Trademark", count: 68 }
  ];

  const finalData = data.length ? data : fallbackData;

  const chartData = {
    labels: finalData.map(item => item.type),
    datasets: [
      {
        label: "IP Type Distribution",
        data: finalData.map(item => item.count),
        backgroundColor: ["#0d6efd", "#20c997"]
      }
    ]
  };

  return <Bar data={chartData} />;
};

export default IPTypeTrendChart;
