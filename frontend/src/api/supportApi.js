import axiosClient from "./axiosClient";

// GET all support queries submitted by a user
export const getUserSupportQueries = (userId) => {
    return axiosClient.get(`/support/user/${userId}`);
};

// POST a new support query for a user
export const submitSupportQuery = (userId, subject, message) => {
    return axiosClient.post(`/support/user/${userId}`, { subject, message });
};

// GET count of open support tickets (admin badge)
export const getAdminOpenCount = () => {
    return axiosClient.get(`/support/admin/open-count`);
};
 
// GET all support tickets (admin view)
export const getAdminTickets = () => {
    return axiosClient.get(`/support/admin`);
};
 
// PUT reply to a support ticket (admin action)
export const replyToTicket = (ticketId, reply) => {
    return axiosClient.put(`/support/admin/${ticketId}/reply`, null, {
        params: { reply },
    });
};