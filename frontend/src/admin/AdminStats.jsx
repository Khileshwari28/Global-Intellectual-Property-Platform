import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStats = () => {
  const [stats, setStats] = useState([
    { label: "Total Users", value: "…" },
    { label: "Total Filings", value: "…" },
    { label: "Pending Approvals", value: "…" },
    { label: "Paid Plans", value: "…" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  // UserFilingRepository confirms the entity's field is literally "status"
  // (see countByUserIdAndStatusIgnoreCase), compared case-insensitively.
  const getFilingStatus = (filing) => String(filing.status ?? "").toUpperCase();

  const loadStats = () => {
    setLoading(true);

    const usersRequest = axios.get("http://localhost:8080/api/admin/users/getall");
    // Matches UserFilingController: GET /api/user-filings/admin
    const filingsRequest = axios.get("http://localhost:8080/api/user-filings/admin");

    Promise.allSettled([usersRequest, filingsRequest]).then(([usersRes, filingsRes]) => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.label === "Total Users") {
            if (usersRes.status !== "fulfilled") return { ...stat, value: "—" };
            return { ...stat, value: (usersRes.value.data || []).length };
          }

          if (stat.label === "Paid Plans") {
            if (usersRes.status !== "fulfilled") return { ...stat, value: "—" };
            const paidPlans = (usersRes.value.data || []).filter(
              (u) => u.plan && u.plan !== "NONE"
            ).length;
            return { ...stat, value: paidPlans };
          }

          if (stat.label === "Total Filings") {
            if (filingsRes.status !== "fulfilled") return { ...stat, value: "—" };
            return { ...stat, value: (filingsRes.value.data || []).length };
          }

          if (stat.label === "Pending Approvals") {
            if (filingsRes.status !== "fulfilled") return { ...stat, value: "—" };
            const pending = (filingsRes.value.data || []).filter(
              (f) => getFilingStatus(f) === "PENDING"
            ).length;
            return { ...stat, value: pending };
          }

          return stat;
        })
      );

      if (usersRes.status === "rejected") {
        console.error("Failed to load user stats", usersRes.reason);
      }
      if (filingsRes.status === "rejected") {
        console.error("Failed to load filing stats", filingsRes.reason);
      }
    }).finally(() => setLoading(false));
  };

  return (
    <div className="row g-3 mb-4">
      {stats.map((item, index) => (
        <div key={index} className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">{item.label}</p>
              <h3 className="fw-bold">{loading && item.value === "…" ? "…" : item.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;