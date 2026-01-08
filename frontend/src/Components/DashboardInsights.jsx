import React from "react";

const insights = [
  {
    icon: "📈",
    title: "Growth This Year",
    value: "+18%",
    note: "Compared to last year",
    color: "text-success",
  },
  {
    icon: "⏳",
    title: "Pending IPs",
    value: "12",
    note: "Need review",
    color: "text-warning",
  },
  {
    icon: "🌍",
    title: "New Countries",
    value: "4",
    note: "Added this year",
    color: "text-primary",
  },
];

const DashboardInsights = () => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h6 className="mb-3 text-muted">Key Insights</h6>

        {insights.map((item, index) => (
          <div key={index} className="d-flex align-items-start mb-3">
            <div style={{ fontSize: "22px", marginRight: "10px" }}>
              {item.icon}
            </div>
            <div>
              <div className="fw-semibold">{item.title}</div>
              <div className={`fw-bold ${item.color}`}>{item.value}</div>
              <small className="text-muted">{item.note}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardInsights;
