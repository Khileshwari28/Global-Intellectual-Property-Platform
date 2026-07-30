import axios from "axios";

const BASE_URL = "http://localhost:8080/api/charts";

//  year-based filings trend
export const fetchFilingTrend = (year) =>
  axios.get(`${BASE_URL}/ip-filings-trend/${year}`);

//  available years
export const fetchAvailableYears = () =>
  axios.get(`${BASE_URL}/ip-filings-years`);

export const fetchIPTypeTrend = () =>
  axios.get(`${BASE_URL}/ip-type-trend`);

export const fetchIPStatusDist = () =>
  axios.get(`${BASE_URL}/ip-status-distribution`);
