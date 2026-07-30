import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { hasAccess } from "../utils/permissions";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const IPTypeTrendChart = ({ vizId = VIZ_IDS.IP_TYPE_TREND }) => {
  const [data, setData] = useState([]);

  // 🔐 Get user plan
      const user = JSON.parse(localStorage.getItem("user"));
      const plan = user?.plan;
      const role = user?.role;
    
      // 🔐 Permission check
      const canSeeCharts = role === "ADMIN" || hasAccess(plan, "canSeeCharts");
  


  /* 🔌 FETCH REAL DATA */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/charts/ip-type-trend")
      .then(res => setData(res.data))
      .catch(err => {
        console.error("IP Type Trend error:", err);
        setData([]);
      });
  }, [canSeeCharts]);

  // 🔒 LOCKED UI
  if (!canSeeCharts) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "300px",
          background: "rgba(255,255,255,0.7)",
          border: "1px dashed #ccc",
          borderRadius: "6px",
          textAlign: "center"
        }}
      >
        <div>
          <h6>🔒 Charts Locked</h6>
          <small className="text-muted">
            Upgrade your plan to access analytics charts.
          </small>
        </div>
      </div>
    );
  }

  /* 🔁 FALLBACK (only if API fails / DB empty) */
  const fallbackData = [
    { type: "Patent", count: 180 },
    { type: "Trademark", count: 68 }
  ];

  const finalData = data.length ? data : fallbackData;

  const chartData = {
    labels: finalData.map(item =>
      item.type?.toUpperCase() === "PATENT"
        ? "Patent"
        : "Trademark"
    ),
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
