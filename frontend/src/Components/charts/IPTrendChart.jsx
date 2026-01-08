import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

// Month mapping (DB → UI)
const MONTH_MAP = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
  5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
  9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
};

const IPTrendChart = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);

  // 🔹 fetch available years
  useEffect(() => {
    axios.get("http://localhost:8080/api/charts/ip-filings-years")
      .then(res => {
        setYears(res.data);
        if (res.data.length) {
          setSelectedYear(res.data[0]); // latest year
        }
      })
      .catch(console.error);
  }, []);

  // 🔹 fetch month-wise data when year changes
  useEffect(() => {
    if (!selectedYear) return;

    axios
      .get(`http://localhost:8080/api/charts/ip-filings-trend/${selectedYear}`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [selectedYear]);

  if (!data.length) {
    return <p className="text-muted">No data available</p>;
  }

  const chartData = {
    labels: data.map(d => MONTH_MAP[d.label]),
    datasets: [
      {
        label: `IP Filings (${selectedYear})`,
        data: data.map(d => d.count),
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.25)",
        fill: true,
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  return (
    <>
      {/* Year Selector */}
      <div className="d-flex justify-content-end mb-2">
        <select
          className="form-select form-select-sm w-auto"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <Line data={chartData} />
    </>
  );
};

export default IPTrendChart;
