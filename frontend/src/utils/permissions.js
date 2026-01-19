export const PERMISSIONS = {
  
  BASIC: {
    canSearch: true,
    canTrack: false,      // Locks DashboardAlerts
    canSeeCharts: false,   // Locks the IPMap
    isAdmin: false
  },
  PRO: {
    canSearch: true,
    canTrack: true,       // Unlocks DashboardAlerts
    canSeeCharts: true,    // Unlocks the IPMap
    isAdmin: false
  },
  ENTERPRISE: {
    canSearch: true,
    canTrack: true,
    canSeeCharts: true,
    isAdmin: true
  }
};

export const hasAccess = (plan, feature) => {
  return PERMISSIONS[plan]?.[feature] || false;
};

