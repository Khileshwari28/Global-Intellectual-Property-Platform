import React, { useState, useEffect } from "react";
import axios from "axios";

import IPTrendChart from "./charts/IPTrendChart";
import IPTypeTrendChart from "./charts/IPTypeTrendChart";
import IPStatusChart from "./charts/IPStatusChart";
import { VIZ_IDS } from "./charts/vizConfig";
import KPISummary from "./KPISummary";

const LegalStatus = ({ userRole, userPlan, setActiveComponent }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [filings, setFilings] = useState([]);
  const [summary, setSummary] = useState({
    totalFilings: 0,
    activeCount: 0,
    pendingCount: 0,
    riskLevel: "Low",
  });

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  /* ✅ NORMALIZE */
  const role = (userRole || "").toUpperCase();
  const plan = (userPlan || "").toUpperCase();

  /* ✅ FINAL ACCESS RULE (ADMIN OVERRIDE) */
  const hasAccess =
    role === "ADMIN" ||
    (role === "USER" &&
      (plan === "PROFESSIONAL" || plan === "ENTERPRISE"));


  /* 🔌 Fetch data ONLY if access allowed */
  useEffect(() => {
    if (!hasAccess) return;

    axios
      .get("http://localhost:8080/api/ip/legal-status")
      .then(res => setFilings(res.data))
      .catch(console.error);

    axios
      .get("http://localhost:8080/api/ip/legal-status/summary")
      .then(res => setSummary(res.data))
      .catch(console.error);
  }, [hasAccess]);

  /* Pagination */
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentFilings = filings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filings.length / ITEMS_PER_PAGE);

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-success";
      case "PENDING":
        return "bg-warning text-dark";
      case "EXPIRED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk?.toUpperCase()) {
      case "HIGH":
        return "bg-danger";
      case "MEDIUM":
        return "bg-warning text-dark";
      case "LOW":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };


  return (
    <div className="position-relative">

      {/* 🔒 RESTRICTED OVERLAY (same design) */}
      {!hasAccess && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255,255,255,0.6)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h4>Upgrade to Pro or Enterprise to access Legal Status</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={() => setActiveComponent("Upgrade Plan")}
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* ================= ORIGINAL UI ================= */}

      <div className="mb-4">
        <h1 className="h2 mb-2">Legal Status</h1>
        <p className="text-muted">
          View and manage the legal status of all your intellectual property
          filings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Filings", value: summary.totalFilings },
          { label: "Active / Protected", value: summary.activeCount },
          { label: "Pending", value: summary.pendingCount },
        ].map((item, i) => (
          <div key={i} className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <p className="text-muted small">{item.label}</p>
                <h3>{item.value}</h3>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <p className="text-muted small">Risk Level</p>
              <span className="badge bg-success px-3 py-2">
                {summary.riskLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5>IP Filings Trend</h5>
              <IPTrendChart vizId={VIZ_IDS.IP_FILING_TREND} />
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5>Patent vs Trademark Trend</h5>
              <IPTypeTrendChart vizId={VIZ_IDS.IP_TYPE_TREND} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5>IP Status Distribution</h5>
              <IPStatusChart vizId={VIZ_IDS.IP_STATUS_DIST} />
            </div>
          </div>

          <KPISummary />
        </div>
      </div>

      {/* Filings List */}
      <div className="space-y-3">
        {currentFilings.map((filing) => (
          <div
            key={filing.id}
            className="card border-0 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setExpandedId(expandedId === filing.id ? null : filing.id)
            }
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{filing.name}</h5>
                  <span className="badge bg-secondary">{filing.type}</span>
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span
                    className={`badge rounded-pill px-3 py-2 ${getStatusBadgeClass(
                      filing.status
                    )}`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {filing.status}
                  </span>

                  <span
                    className={`badge rounded-pill px-3 py-2 ${getRiskBadgeClass(
                      filing.legalRisk
                    )}`}
                    style={{ fontSize: "0.8rem", opacity: 0.9 }}
                  >
                    Risk: {filing.legalRisk}
                  </span>
                </div>

              </div>

              {expandedId === filing.id && (
                <div className="mt-3 border-top pt-3">
                  <p className="text-muted">{filing.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <strong>
          Page {currentPage} of {totalPages}
        </strong>

        <button
          className="btn btn-outline-primary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LegalStatus;
