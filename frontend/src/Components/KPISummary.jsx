import React, { useEffect, useState } from "react";
import axios from "axios";

const KPISummary = () => {
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ip/kpis")
      .then((res) => setKpiData(res.data))
      .catch((err) => console.error("KPI API error:", err));
  }, []);

  if (!kpiData) {
    return (
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <h5 className="mb-3">Key Insights</h5>
          <p className="text-muted">Loading insights...</p>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: "Total IP Growth",
      value: `+${kpiData.growthPercent}%`,
      subtitle: "Compared to last year",
      icon: "📈",
      color: "text-success"
    },
    {
      title: "Pending Actions",
      value: kpiData.pendingActions,
      subtitle: "Needs review",
      icon: "⏳",
      color: "text-warning"
    },
    {
      title: "Active Countries",
      value: kpiData.activeCountries,
      subtitle: "With IP filings",
      icon: "🌍",
      color: "text-primary"
    },
    {
      title: "High Priority IPs",
      value: kpiData.highPriorityIPs,
      subtitle: "Immediate attention",
      icon: "⚠️",
      color: "text-danger"
    }
  ];

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h5 className="mb-3">Key Insights</h5>

        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-start mb-3"
          >
            <div>
              <div className="fw-semibold">
                {kpi.icon} {kpi.title}
              </div>
              <small className="text-muted">{kpi.subtitle}</small>
            </div>

            <div className={`fw-bold ${kpi.color}`}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPISummary;
