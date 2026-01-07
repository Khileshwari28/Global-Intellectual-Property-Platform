import React from "react";

const kpis = [
  {
    title: "Total IP Growth",
    value: "+18%",
    subtitle: "Compared to last year",
    icon: "📈",
    color: "text-success"
  },
  {
    title: "Pending Actions",
    value: "12",
    subtitle: "Needs review",
    icon: "⏳",
    color: "text-warning"
  },
  {
    title: "Active Countries",
    value: "6",
    subtitle: "With IP filings",
    icon: "🌍",
    color: "text-primary"
  },
  {
    title: "High Priority IPs",
    value: "4",
    subtitle: "Immediate attention",
    icon: "⚠️",
    color: "text-danger"
  }
];

const KPISummary = () => {
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
