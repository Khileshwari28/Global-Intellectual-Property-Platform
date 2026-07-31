import axiosClient from "./axiosClient";

// GET permissions for a single plan
export const getPermissionsByPlan = (plan) => {
    return axiosClient.get(`/permissions/${plan}`);
};

// GET all plan permissions (used to build the pricing feature comparison)
export const getAllPermissions = () => {
    return axiosClient.get(`/permissions`);
};

// POST toggle a feature on/off for a given plan (admin action)
export const updatePermission = (plan, feature, enabled) => {
    return axiosClient.post(`/permissions/update`, { plan, feature, enabled });
};