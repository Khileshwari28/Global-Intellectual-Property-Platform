import axiosClient from "./axiosClient";

export const fetchFilingTrend = (year) =>
  axiosClient.get(`/charts/ip-filings-trend/${year}`);

export const fetchAvailableYears = () =>
  axiosClient.get(`/charts/ip-filings-years`);

export const fetchIPTypeTrend = () =>
  axiosClient.get(`/charts/ip-type-trend`);

export const fetchIPStatusDist = () =>
  axiosClient.get(`/charts/ip-status-distribution`);