import React, { useState, useEffect } from "react";
import axios from "axios";

const FEATURES = [
  { id: "canLegalStatus", label: "Legal Status Access", icon: "⚖️" },
  { id: "canTrack", label: "Filing Tracker", icon: "📋" },
  { id: "canSeeMaps", label: "IP Distribution Maps", icon: "🗺️" },
  { id: "canSeeCharts", label: "Analytics Charts", icon: "📊" },
  { id: "canNotify", label: "Real-time Notifications", icon: "🔔" },
];

// IMPORTANT → must match DB exactly
const PLANS = ["BASIC", "PROFESSIONAL", "ENTERPRISE"];

export default function SubscriptionManagement() {

  const [permissions, setPermissions] = useState({
    BASIC: [],
    PROFESSIONAL: [],
    ENTERPRISE: []
  });

  // 🔹 Load permissions from backend (instead of localStorage)
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    const res = await axios.get("http://localhost:8080/api/permissions");

    // Normalize DB data → frontend structure
    const formatted = {
      BASIC: [],
      PROFESSIONAL: [],
      ENTERPRISE: []
    };

    res.data.forEach(p => {
      if (p.enabled) {
        formatted[p.planName].push(p.featureKey);
      }
    });

    setPermissions(formatted);
  };

  // 🔹 Toggle = backend update
  const togglePermission = async (plan, featureId) => {
    const isEnabled = permissions[plan].includes(featureId);

    await axios.post("http://localhost:8080/api/permissions/update", {
      plan: plan,
      feature: featureId,
      enabled: !isEnabled
    });

    loadPermissions();   // refresh UI from DB
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="h3">System Access Control</h2>
        <p className="text-muted">Map platform features to subscription tiers.</p>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3">Feature Module</th>
                {PLANS.map(plan => (
                  <th key={plan} className="text-center py-3">{plan}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature) => (
                <tr key={feature.id}>
                  <td className="ps-4 py-3">
                    <span className="me-2">{feature.icon}</span>
                    <span className="fw-medium">{feature.label}</span>
                  </td>

                  {PLANS.map((plan) => (
                    <td key={plan} className="text-center">
                      <div className="form-check form-switch d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
                          checked={permissions[plan]?.includes(feature.id) || false}
                          onChange={() => togglePermission(plan, feature.id)}
                        />
                      </div>
                    </td>
                  ))}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 bg-light rounded border">
        <small className="text-muted">
          <strong>Pro-Tip:</strong> Changes made here are saved in database and will immediately
          affect all users based on their subscription plan.
        </small>
      </div>
    </div>
  );
}

