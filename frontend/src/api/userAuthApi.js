import axiosClient from "./axiosClient";

// POST login with email/password
export const login = (credentials) => {
    return axiosClient.post(`/users/login`, credentials);
};

// POST register a new user
export const register = (userData) => {
    return axiosClient.post(`/users/register`, userData);
};

// GET current user after OAuth2 redirect, using the token param
export const getOAuth2User = (token) => {
    return axiosClient.get(`/users/oauth2/user`, { params: { token } });
};

// PUT change a user's password
export const changePassword = (userId, currentPassword, newPassword) => {
    return axiosClient.put(`/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
    });
};