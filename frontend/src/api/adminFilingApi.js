import axiosClient from "./axiosClient";

// GET the admin-side IP filings tracker (all tracked filings)
export const getIpFilingsTracker = () => {
    return axiosClient.get(`/ip/filings/tracker`);
};

// Add further AdminFilingController endpoints here as you send more components
// that use them (e.g. approve/reject filing, assign reviewer, etc.)