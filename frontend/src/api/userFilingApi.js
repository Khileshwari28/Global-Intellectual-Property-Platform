import axiosClient from "./axiosClient";

// GET all filings created by a specific user
export const getUserFilings = (userId) => {
    return axiosClient.get(`/user-filings/user/${userId}`);
};

// GET summary (KPI) stats for a user's filings
export const getUserFilingsSummary = (userId) => {
    return axiosClient.get(`/user-filings/user/${userId}/summary`);
};

// GET a single user-created filing by id
export const getUserFilingById = (id) => {
    return axiosClient.get(`/user-filings/${id}`);
};

// POST create a new filing
export const createUserFiling = (filingData) => {
    return axiosClient.post(`/user-filings/create`, filingData);
};

// GET all user filings across all users (admin view)
export const getAdminFilings = () => {
    return axiosClient.get(`/user-filings/admin`);
};
 
// PUT update the status of a filing (admin action)
export const updateFilingStatus = (id, status) => {
    return axiosClient.put(`/user-filings/admin/${id}/status`, null, {
        params: { status },
    });
};