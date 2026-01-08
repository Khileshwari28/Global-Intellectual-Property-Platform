import React, { useEffect, useState } from "react";
import axios from "axios";

const getBorderClass = (type) => {
  if (type === "danger") return "border-danger";
  if (type === "warning") return "border-warning";
  if (type === "success") return "border-success";
  return "border-primary";
};

const DashboardAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.userId) return;

    axios
      .get(`http://localhost:8080/api/notifications/${user.userId}`)
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="text-muted mb-3">Action Required</h6>

        {alerts.length === 0 && (
          <small className="text-muted">No alerts</small>
        )}

        {alerts.map(a => (
          <div key={a.id} className={`p-3 mb-2 border-start border-4 ${getBorderClass(a.type)}`}>
            <div className="fw-semibold">{a.message}</div>
            <small className="text-muted">
              {new Date(a.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAlerts;
