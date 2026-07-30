import axiosClient from "./axiosClient";

// GET all support queries submitted by a user
export const getUserSupportQueries = (userId) => {
    return axiosClient.get(`/support/user/${userId}`);
};

// POST a new support query for a user
export const submitSupportQuery = (userId, subject, message) => {
    return axiosClient.post(`/support/user/${userId}`, { subject, message });
};