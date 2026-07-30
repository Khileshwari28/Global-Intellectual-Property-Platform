import axiosClient from "./axiosClient";

// POST upgrade a user's subscription plan
export const upgradeSubscription = (userId, plan) => {
    return axiosClient.post(`/subscription/upgrade`, null, {
        params: { userId, plan },
    });
};