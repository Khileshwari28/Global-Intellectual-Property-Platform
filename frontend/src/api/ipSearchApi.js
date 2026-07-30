import axiosClient from "./axiosClient";

// POST search patents/trademarks with filters
export const searchIP = (filters) => {
    return axiosClient.post(`/ip/search`, filters);
};

// POST track a specific IP item by id
export const trackIP = (id) => {
    return axiosClient.post(`/ip/track/${id}`);
};

// GET full detail for a single IP item (patent/trademark)
export const getIPById = (id) => {
    return axiosClient.get(`/ip/${id}`);
};

// GET tracked IP items for a user
export const getTrackedFilings = (userId) => {
    return axiosClient.get(`/ip/tracked/${userId}`);
};

// GET key dashboard insight metrics (growth %, pending actions, etc.)
export const getKPIs = () => {
    return axiosClient.get(`/ip/kpis`);
};