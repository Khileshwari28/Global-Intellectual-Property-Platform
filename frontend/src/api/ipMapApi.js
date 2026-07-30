import axiosClient from "./axiosClient";

// GET IP assets for a given country (used by the dashboard map side panel)
export const getMapAssetsByCountry = (country) => {
    return axiosClient.get(`/map/assets`, { params: { country } });
};