import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from "react";

const LegalStatus = () => {
    const [expandedId, setExpandedId] = useState(null);
    const ITEMS_PER_PAGE = 5;

    const [currentPage, setCurrentPage] = useState(1);


    const [filings, setFilings] = useState([]);
    const [summary, setSummary] = useState({
        totalFilings: 0,
        activeCount: 0,
        pendingCount: 0,
        riskLevel: "Low"
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/ip/legal-status")
            .then(res => setFilings(res.data))
            .catch(err => console.error(err));

        axios.get("http://localhost:8080/api/ip/legal-status/summary")
            .then(res => setSummary(res.data))
            .catch(err => console.error(err));
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const currentFilings = filings.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filings.length / ITEMS_PER_PAGE);


    const getRiskBadgeClass = (risk) => {
        switch (risk) {
            case 'Very Low':
            case 'Low':
                return 'bg-success';
            case 'Moderate':
                return 'bg-warning text-dark';
            case 'High':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Active':
            case 'Protected':
            case 'Registered':
                return 'bg-success';
            case 'Pending':
                return 'bg-warning text-dark';
            case 'Confidential':
                return 'bg-secondary';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div>
            <div className="mb-4">
                <h1 className="h2 mb-2">Legal Status</h1>
                <p className="text-muted">View and manage the legal status of all your intellectual property filings</p>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Total Filings</p>
                            <h3>{summary.totalFilings}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Active/Protected</p>
                            <h3>{summary.activeCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Pending</p>
                            <h3>{summary.pendingCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Risk Level</p>
                            <span className="badge bg-success">{summary.riskLevel}</span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {currentFilings.map((filing) => (
                    <div
                        key={filing.id}
                        className="card border-0 shadow-sm"
                        onClick={() => setExpandedId(expandedId === filing.id ? null : filing.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h5 className="card-title mb-2">{filing.name}</h5>
                                    <span className="badge bg-secondary me-2" style={{ fontSize: '11px' }}>
                                        {filing.type}
                                    </span>
                                </div>
                                <div className="d-flex gap-2">
                                    <span className={`badge ${getStatusBadgeClass(filing.status)}`}>
                                        {filing.status}
                                    </span>
                                    <span className={`badge ${getRiskBadgeClass(filing.legalRisks)}`}>
                                        {filing.legalRisks}
                                    </span>
                                    <span style={{ marginLeft: '10px' }}>
                                        {expandedId === filing.id ? '▼' : '▶'}
                                    </span>
                                </div>
                            </div>

                            <div className="row text-muted small mt-3">
                                <div className="col-md-3">
                                    <strong>Filing #:</strong> {filing.filingNumber}
                                </div>
                                <div className="col-md-3">
                                    <strong>Jurisdiction:</strong> {filing.jurisdiction}
                                </div>
                                <div className="col-md-3">
                                    <strong>Filed:</strong> {filing.filedDate}
                                </div>
                                <div className="col-md-3">
                                    <strong>Expiry:</strong> {filing.expiryDate}
                                </div>
                            </div>

                            {expandedId === filing.id && (
                                <div className="mt-3 pt-3 border-top">
                                    <p className="text-muted mb-3">{filing.description}</p>
                                    <h6 className="mb-2">Details</h6>
                                    <div className="row text-muted small">
                                        {filing.details &&
                                            Object.entries(filing.details).map(([key, value]) => (
                                                <div key={key} className="col-md-6 mb-2">
                                                    <strong className="text-capitalize">
                                                        {key.replace(/([A-Z])/g, " $1")}:
                                                    </strong>{" "}
                                                    {value}
                                                </div>
                                            ))}

                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-primary btn-sm">Request Certificate</button>
                                        <button className="btn btn-outline-primary btn-sm">Renew Filing</button>
                                        <button className="btn btn-outline-primary btn-sm">Download Documents</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Previous
                </button>

                <span style={{ fontWeight: "600" }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default LegalStatus;