import React from "react";
import AdminStats from "./AdminStats";
import KPISummary from "../dashboard/KPISummary";
import IPMap from "../map/IPMap";
import IPSidePanel from "../map/IPSidePanel";
import { useState } from "react";
import IPStatusChart from "../charts/IPStatusChart";
import IPTrendChart from "../charts/IPTrendChart";
import IPTypeTrendChart from "../charts/IPTypeTrendChart";
import DashboardQuickRatio from "../dashboard/DashboardQuickRatio";

const AdminDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <div>
      <h4 className="mb-3">System Overview</h4>

      <AdminStats />

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


      {/* Placeholder Panels */}
      <div className="row g-3 align-items-stretch">
        <div className="col-lg-6 d-flex">
          <div className="card border-0 shadow-sm w-100 h-100">
            <div className="card-body">
              <KPISummary />
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex">
          <div className="card border-0 shadow-sm w-100 h-100">
            <div className="card-body">
              <IPTrendChart />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 align-items-stretch mt-1">
        {/* Left column: Trend + Ratio stacked */}
        <div className="col-lg-6">
          <div className="d-flex flex-column h-100 gap-3">

            <div className="card border-0 shadow-sm flex-fill">
              <div className="card-body">
                <IPTypeTrendChart />
              </div>
            </div>

            <div className="card border-0 shadow-sm flex-fill">
              <div className="card-body">
                <DashboardQuickRatio />
              </div>
            </div>

          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-6 d-flex">
          <div className="card border-0 shadow-sm w-100 h-100">
            <div className="card-body">
              <IPStatusChart />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
