import axios from "axios";

let PERMISSIONS = {}; // will be filled from backend

// Load permissions from backend once
export const loadPermissions = async () => {
  const res = await axios.get("http://localhost:8080/api/permissions");

  const formatted = {};

  res.data.forEach(p => {
    if (!formatted[p.planName]) {
      formatted[p.planName] = {};
    }
    formatted[p.planName][p.featureKey] = p.enabled;
  });

  PERMISSIONS = formatted;
};

// Same function name, but now dynamic
export const hasAccess = (plan, feature) => {
  return PERMISSIONS?.[plan]?.[feature] || false;
};
