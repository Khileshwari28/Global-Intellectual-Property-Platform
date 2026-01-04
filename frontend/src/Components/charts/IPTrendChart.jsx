import React from "react";
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
  const fallbackData = [
    { year: "2020", count: 120 },
    { year: "2021", count: 160 },
    { year: "2022", count: 200 },
    { year: "2023", count: 248 }
  ];

  const finalData = data.length ? data : fallbackData;

  const chartData = {
    labels: finalData.map(item => item.year),
    datasets: [
      {
        label: "Total IP Filings",
        data: finalData.map(item => item.count),
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4
      }
    ]
  };

  return <Line data={chartData} />;
};

export default IPTrendChart;
