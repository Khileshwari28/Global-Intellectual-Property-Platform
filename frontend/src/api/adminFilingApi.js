import axiosClient from "./axiosClient";

// GET the admin-side IP filings tracker (all tracked filings)
export const getIpFilingsTracker = () => {
    return axiosClient.get(`/ip/filings/tracker`);
};