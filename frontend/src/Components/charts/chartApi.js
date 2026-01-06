import axios from "axios";

const BASE_URL = "http://localhost:8080/api/charts";

export const fetchFilingTrend = () =>
  axios.get(`${BASE_URL}/ip-filings-trend`);

export const fetchIPTypeTrend = () =>
  axios.get(`${BASE_URL}/ip-type-trend`);

export const fetchIPStatusDist = () =>
  axios.get(`${BASE_URL}/ip-status-distribution`);
