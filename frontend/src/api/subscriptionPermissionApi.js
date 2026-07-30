import axiosClient from "./axiosClient";

// GET permissions for a single plan
export const getPermissionsByPlan = (plan) => {
    return axiosClient.get(`/permissions/${plan}`);
};

// GET all plan permissions (used to build the pricing feature comparison)
export const getAllPermissions = () => {
    return axiosClient.get(`/permissions`);
};