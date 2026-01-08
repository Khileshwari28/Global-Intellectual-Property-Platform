import React, { useEffect, useState } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { VIZ_IDS } from "./vizConfig";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const IPStatusChart = ({ vizId = VIZ_IDS.IP_STATUS_DIST }) => {
  const [data, setData] = useState([]);

  /* 🔌 FETCH REAL BACKEND DATA */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/charts/ip-status-distribution")
      .then(res => setData(res.data))
      .catch(err => {
        console.error("IP Status chart error:", err);
        setData([]);
      });
  }, []);

  /* 🔁 FALLBACK (only if API fails / empty DB) */
  const fallbackData = [
    { status: "Completed", count: 136 },
    { status: "Pending", count: 50 },
    { status: "Rejected", count: 38 }
  ];

  const finalData = data.length ? data : fallbackData;

  /* OPTIONAL STATUS NORMALIZATION */
  const normalizeStatus = (status) =>
    status === "GRANTED" ? "Completed" : status;

  const chartData = {
    labels: finalData.map(item => normalizeStatus(item.status)),
    datasets: [
      {
        label: "IP Status Distribution",
        data: finalData.map(item => item.count),
        fill: "origin",
        backgroundColor: "rgba(54, 162, 235, 0.45)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.08)" },
        angleLines: { color: "rgba(0,0,0,0.12)" },
        ticks: {
          backdropColor: "transparent",
          stepSize: 50
        },
        pointLabels: {
          font: { size: 12, weight: "600" }
        }
      }
    },
    plugins: {
      legend: { position: "top" }
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default IPStatusChart;
