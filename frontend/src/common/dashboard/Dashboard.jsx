import React, { useEffect, useState } from "react";
import axios from "axios";
import IPMap from "../map/IPMap";
import IPSidePanel from "../map/IPSidePanel";
import KPISummary from "./KPISummary";
import DashboardAlerts from "./DashboardAlerts";
import DashboardQuickRatio from "./DashboardQuickRatio";


const Dashboard = ({ setActiveComponent }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/dashboard.json")
      .then((res) => {
        setStats(res.data.stats);
        setRecentActivities(res.data.recentActivities);
        setQuickActions(res.data.quickActions);
      })
      .catch((err) => {
        console.error("Dashboard data fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "in-progress":
        return "bg-info";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading Dashboard...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 mb-2">Dashboard</h1>
        <p className="text-muted">
          Welcome to Global IP Platform, {user?.username}
        </p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div style={{ fontSize: "32px" }}>{stat.icon}</div>
                <h6 className="text-muted text-uppercase mt-2">
                  {stat.label}
                </h6>
                <h3 className="fw-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Side Panel */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="mb-3">IP Distribution by Country</h5>
              <IPMap onCountrySelect={setSelectedCountry} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <IPSidePanel country={selectedCountry} />
        </div>
      </div>

      {/* Insights */}
      <div className="row mb-4">
        <div className="col-lg-4"><KPISummary /></div>
        <div className="col-lg-4"><DashboardAlerts /></div>
        <div className="col-lg-4"><DashboardQuickRatio /></div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <h5 className="mb-3">Quick Actions</h5>
        <div className="row g-2">
          {quickActions.map((action, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <button
                className="btn btn-outline-secondary w-100 py-3"
                onClick={() =>
                  action.name === "Search Patents" &&
                  setActiveComponent("Search Result")
                }
              >
                {action.icon} {action.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Recent Activity</h5>
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="d-flex justify-content-between py-2 border-bottom"
            >
              <div>
                <div className="fw-medium">{activity.action}</div>
                <small className="text-muted">{activity.time}</small>
              </div>
              <span className={`badge ${getStatusBadgeClass(activity.status)}`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
