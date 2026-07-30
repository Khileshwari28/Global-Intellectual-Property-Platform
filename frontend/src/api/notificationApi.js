import axiosClient from "./axiosClient";

// GET notifications for a user
export const getNotifications = (userId) => {
    return axiosClient.get(`/notifications/${userId}`);
};

// PUT clear/mark-cleared all notifications for a user
export const clearNotifications = (userId) => {
    return axiosClient.put(`/notifications/${userId}/clear`);
};