import axiosClient from "./axiosClient";

// GET all users (admin view)
export const getAllUsers = () => {
    return axiosClient.get(`/admin/users/getall`);
};

// DELETE a user by id
export const deleteUser = (id) => {
    return axiosClient.delete(`/admin/users/${id}`);
};

// PUT promote a user to admin
export const promoteUser = (id) => {
    return axiosClient.put(`/admin/users/${id}/promote`);
};

// PUT disable a user account
export const disableUser = (id) => {
    return axiosClient.put(`/admin/users/${id}/disable`);
};

// PUT enable a user account
export const enableUser = (id) => {
    return axiosClient.put(`/admin/users/${id}/enable`);
};