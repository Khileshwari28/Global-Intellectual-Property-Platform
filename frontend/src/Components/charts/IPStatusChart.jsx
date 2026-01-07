import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { VIZ_IDS } from "./vizConfig";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const IPStatusChart = ({ data = [], vizId = VIZ_IDS.IP_STATUS_DIST }) => {
  const fallbackData = [
    { status: "Completed", count: 136 },
    { status: "Pending", count: 50 },
    { status: "Rejected", count: 38 }
  ];

  const finalData = data.length ? data : fallbackData;

  const chartData = {
    labels: finalData.map(item => item.status),
    datasets: [
      {
        label: "IP Status Distribution",
        data: finalData.map(item => item.count),

        /* ⭐ THIS MAKES IT LOOK LIKE YOUR IMAGE */
        fill: "origin",

        backgroundColor: "rgba(54, 162, 235, 0.45)", // light blue fill
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

        /* GRID + ANGLES (very important) */
        grid: {
          color: "rgba(0,0,0,0.08)"
        },
        angleLines: {
          color: "rgba(0,0,0,0.12)"
        },

        ticks: {
          backdropColor: "transparent",
          stepSize: 50
        },

        pointLabels: {
          font: {
            size: 12,
            weight: "600"
          }
        }
      }
    },
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default IPStatusChart;
