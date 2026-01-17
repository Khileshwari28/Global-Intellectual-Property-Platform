import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardQuickRatio = () => {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [236, 12],
        backgroundColor: [
          "rgba(25, 135, 84, 0.85)",   // green
          "rgba(255, 193, 7, 0.85)"    // yellow
        ],
        borderWidth: 0,
        cutout: "72%" // makes it compact & modern
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          font: { size: 12 }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(8px)"
      }}
    >
      <div className="card-body">
        <h6 className="mb-3 text-muted fw-semibold">
          Quick Ratio
        </h6>

        <div style={{ height: "180px" }}>
          <Doughnut data={data} options={options} />
        </div>

        <div className="text-center mt-2">
          <div className="fw-bold text-success">95% Completed</div>
          <small className="text-muted">
            Completion vs Pending filings
          </small>
        </div>
      </div>
    </div>
  );
};

export default DashboardQuickRatio;
