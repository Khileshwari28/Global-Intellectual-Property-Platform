import React, { useEffect, useState } from "react";
import axios from "axios";
import { hasAccess } from "../utils/permissions";


const getBorderClass = (type) => {
  switch (type) {
    case "danger": return "border-start border-4 border-danger";
    case "warning": return "border-start border-4 border-warning";
    case "success": return "border-start border-4 border-success";
    case "info": return "border-start border-4 border-primary";
    default: return "border-start border-4 border-secondary";
  }
};

const DashboardAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  // ✅ get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const plan = user?.plan;
 const userUniqueId = user?.id;

 

  useEffect(() => {
    if (!userUniqueId) return;

    axios
      .get(`http://localhost:8080/api/notifications/${userUniqueId}`)
      .then(res => {
        // ✅ show only top 3
        setAlerts(res.data.slice(0, 3));
      })
      .catch(err => console.error("Notification error:", err));
  }, [userUniqueId]);

  

  if (!hasAccess(plan, "canNotify")) {
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
          <h6>🔒 Notifications Locked</h6>
          <small className="text-muted">
            Upgrade your plan to access analytics charts.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="text-muted mb-3">Top Notifications</h6>

        {alerts.length === 0 && (
          <small className="text-muted">No notifications</small>
        )}

        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-3 mb-2 ${getBorderClass(alert.type)}`}
          >
            <div className="fw-semibold">{alert.message}</div>
            <small className="text-muted">
              {new Date(alert.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAlerts;
