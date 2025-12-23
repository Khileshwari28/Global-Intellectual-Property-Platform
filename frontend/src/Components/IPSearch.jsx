import React, { useState } from "react";
import "../styles/IPSearch.css";

const IPSearch = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("Patent");
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      type: searchType,
      keyword,
      country,
      fromDate,
      toDate
    });
  };

  const handleClear = () => {
    setSearchType("Patent");
    setKeyword("");
    setCountry("");
    setFromDate("");
    setToDate("");
    onSearch(null); // reset results
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Search Patent / Trademark</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Search Type</label>
              <select
                className="form-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option>Patent</option>
                <option>Trademark</option>
              </select>
            </div>

            <div className="col-md-8">
              <label className="form-label">Keyword</label>
              <input
                className="form-control"
                placeholder="Patent number / trademark name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">All Countries</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleClear}>
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IPSearch;
