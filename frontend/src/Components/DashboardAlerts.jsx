import React from "react";

const alerts = [
  {
    icon: "⚠️",
    title: "Patent Expiry",
    message: "3 patents expiring in 60 days",
    type: "danger",
  },
  {
    icon: "⏰",
    title: "Pending Review",
    message: "5 filings pending legal review",
    type: "warning",
  },
  {
    icon: "❗",
    title: "Trademark Objection",
    message: "Objection received on trademark filing",
    type: "info",
  },
];

const getBorderClass = (type) => {
  switch (type) {
    case "danger":
      return "border-start border-4 border-danger";
    case "warning":
      return "border-start border-4 border-warning";
    case "info":
      return "border-start border-4 border-primary";
    default:
      return "";
  }
};

const DashboardAlerts = () => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h6 className="mb-3 text-muted fw-semibold">
          Action Required
        </h6>

        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`d-flex align-items-start p-3 mb-3 rounded bg-light ${getBorderClass(
              alert.type
            )}`}
            style={{ cursor: "pointer" }}
          >
            {/* Icon */}
            <div style={{ fontSize: "20px", marginRight: "12px" }}>
              {alert.icon}
            </div>

            {/* Content */}
            <div className="flex-grow-1">
              <div className="fw-semibold">{alert.title}</div>
              <small className="text-muted">
                {alert.message}
              </small>
            </div>

            {/* Arrow */}
            <div className="text-muted">›</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAlerts;
