import React, { useState } from "react";
import IPMap from "./IPMap";
import IPSidePanel from "./IPSidePanel";
import IPTrendChart from "./charts/IPTrendChart";
import IPTypeTrendChart from "./charts/IPTypeTrendChart";
import IPStatusChart from "./charts/IPStatusChart";
import { VIZ_IDS } from "./charts/vizConfig";


const Dashboard = ({ setActiveComponent }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Dashboard user:", user);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const stats = [
    { label: "Total Filings", value: "248", icon: "📑" },
    { label: "Pending Review", value: "12", icon: "⏳" },
    { label: "Completed", value: "236", icon: "✅" },
    { label: "Success Rate", value: "95%", icon: "📈" },
  ];

  const recentActivities = [
    { id: 1, action: "Trademark Application Submitted", status: "completed", time: "2 hours ago" },
    { id: 2, action: "Patent Document Review", status: "in-progress", time: "5 hours ago" },
    { id: 3, action: "Design Registration", status: "pending", time: "1 day ago" },
    { id: 4, action: "Copyright Filing Completed", status: "completed", time: "2 days ago" },
  ];

  const quickActions = [
    { name: "New Filing", icon: "➕" },
    { name: "Search Patents", icon: "🔍" },
    { name: "View Reports", icon: "📊" },
    { name: "Help & Support", icon: "❓" },
  ];

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

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 mb-2">Dashboard</h1>
        <p className="text-muted">
          Welcome to Global IP Platform, {user?.username} — Manage your intellectual property filings
        </p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div style={{ fontSize: "32px" }}>{stat.icon}</div>
                <h6 className="text-muted text-uppercase mt-2">{stat.label}</h6>
                <h3 className="fw-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🌍 MAP + SIDE PANEL */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="mb-3">IP Distribution by Country</h5>
              <IPMap onCountrySelect={setSelectedCountry} />
              <div className="small text-muted mt-2">
                ● Click on a country to view IP assets
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <IPSidePanel country={selectedCountry} />
        </div>
      </div>

      {/* 🌍 IP Distribution (Viz ID aware) */}
            <div className="row mb-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="mb-3">IP Distribution by Country</h5>
                            <IPMap vizId={VIZ_IDS.IP_COUNTRY_MAP} />
                            <div className="small text-muted mt-2">
                                ● Circle size indicates number of IP filings
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Top Countries</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>🇺🇸 United States</span>
                                    <strong>120</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>🇮🇳 India</span>
                                    <strong>60</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>🇩🇪 Germany</span>
                                    <strong>40</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>🇯🇵 Japan</span>
                                    <strong>30</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📊 Landscape Visualizations (Trend Charts with Viz IDs) */}
            <div className="row mb-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5>IP Filings Trend</h5>
                            <IPTrendChart vizId={VIZ_IDS.IP_FILING_TREND} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5>Patent vs Trademark Trend</h5>
                            <IPTypeTrendChart vizId={VIZ_IDS.IP_TYPE_TREND} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5>IP Status Distribution</h5>
                            <IPStatusChart vizId={VIZ_IDS.IP_STATUS_DIST} />
                        </div>
                    </div>
                </div>
            </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <h5 className="mb-3">Quick Actions</h5>
        <div className="row g-2">
          {quickActions.map((action, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <button
                className="btn btn-outline-secondary w-100 py-3"
                onClick={() => {
                  if (action.name === "Search Patents") {
                    setActiveComponent("Search Result");
                  }
                }}
              >
                <div style={{ fontSize: "24px" }}>{action.icon}</div>
                <div className="fw-medium">{action.name}</div>
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
            <div key={activity.id} className="d-flex justify-content-between py-2 border-bottom">
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
