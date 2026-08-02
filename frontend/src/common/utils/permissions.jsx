import axiosClient from "../../api/axiosClient";

let PERMISSIONS = {}; // will be filled from backend

// Load permissions from backend once
export const loadPermissions = async () => {
  const res = await axiosClient.get("/permissions");

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
