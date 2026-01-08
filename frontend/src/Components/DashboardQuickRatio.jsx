import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardQuickRatio = ({ summary }) => {
  const completed = summary?.activeCount || 0;
  const pending = summary?.pendingCount || 0;

  const total = completed + pending;
  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "rgba(25, 135, 84, 0.85)", // green
          "rgba(255, 193, 7, 0.85)"  // yellow
        ],
        borderWidth: 0,
        cutout: "72%"
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h6 className="mb-3 text-muted fw-semibold">
          Quick Ratio
        </h6>

        <div style={{ height: "180px" }}>
          <Doughnut data={data} />
        </div>

        <div className="text-center mt-2">
          <div className="fw-bold text-success">
            {percent}% Completed
          </div>
          <small className="text-muted">
            Completion vs Pending filings
          </small>
        </div>
      </div>
    </div>
  );
};

export default DashboardQuickRatio;
