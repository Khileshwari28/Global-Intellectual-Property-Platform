import React, { useEffect, useState } from "react";
import axios from "axios";
import IPDetailModal from "../Components/ui/IPDetailModal";

const FillingTracker = () => {

    const [trackers, setTrackers] = useState([]);
    const [selectedIPId, setSelectedIPId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userFilings, setUserFilings] = useState([]);

    const [showNewFilingModal, setShowNewFilingModal] = useState(false);
    const [newFilingData, setNewFilingData] = useState({
        keyword: "",
        assetType: "",
        jurisdiction: "",
        description: "",
        status: "PENDING",
        frequency: "Weekly"
    });

    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        // User filings
        axios.get(`http://localhost:8080/api/user-filings/user/${user.id}`)
            .then(res => setUserFilings(res.data))
            .catch(err => console.error("User filings error", err));

        // Old tracker data
        axios.get("http://localhost:8080/api/ip/filings/tracker")
            .then(res => setTrackers(res.data))
            .catch(err => console.error(err));
    }, []);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-warning text-dark";
            case "APPROVED":
                return "bg-success";
            case "GRANTED":
                return "bg-info";
            case "REJECTED":
                return "bg-danger";
            case "REVOKED":
                return "bg-dark";
            case "COMPLETED":
                return "bg-primary";
            default:
                return "bg-secondary";
        }
    };

    const getProgressFromStatus = (status) => {
        switch (status) {
            case "PENDING":
                return 0;
            case "APPROVED":
                return 40;
            case "GRANTED":
                return 70;
            case "COMPLETED":
                return 100;
            case "REJECTED":
            case "REVOKED":
                return 0;
            default:
                return 0;
        }
    };


    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const combinedData = [...userFilings, ...trackers];
    const currentTrackers = combinedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(combinedData.length / ITEMS_PER_PAGE);

    const getProgressBarClass = (progress) => {
        if (progress >= 75) return "bg-success";
        if (progress >= 50) return "bg-info";
        if (progress >= 25) return "bg-warning";
        return "bg-danger";
    };

    // CREATE NEW FILING
    const handleCreateNewFiling = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        axios.post("http://localhost:8080/api/user-filings/create", {
            ...newFilingData,
            userId: user.id
        })
            .then(res => {
                setUserFilings(prev => [res.data, ...prev]);
                setShowNewFilingModal(false);
                setNewFilingData({
                    keyword: "",
                    assetType: "",
                    jurisdiction: "",
                    status: "PENDING",
                    frequency: "Weekly"
                });
            })
            .catch(err => console.error(err));
    };

    return (
        <div>

            {/* HEADER + NEW BUTTON */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 mb-2">Filing Tracker</h1>
                    <p className="text-muted">
                        Monitor the progress of all your intellectual property filings
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowNewFilingModal(true)}
                >
                    + New Filing
                </button>
            </div>

            <div className="space-y-4">
                {currentTrackers.map((tracker) => (
                    <div key={tracker.id} className="card border-0 shadow-sm">
                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 className="card-title mb-2">
                                        {tracker.name || tracker.keyword}
                                    </h5>
                                    <p className="text-muted small mb-2">
                                        {tracker.description || "User created filing"}
                                    </p>
                                    <span className="badge bg-primary" style={{ fontSize: "11px" }}>
                                        {tracker.type || tracker.assetType}
                                    </span>
                                </div>
                                <span className={`badge ${getStatusBadgeClass(tracker.status)}`}>
                                    {tracker.status}
                                </span>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ fontWeight: 600 }}>Progress</span>
                                    <span className="text-primary" style={{ fontWeight: 600 }}>
                                        {tracker.progress ?? getProgressFromStatus(tracker.status)}%
                                    </span>
                                </div>
                                <div className="progress">
                                    <div
                                        className={`progress-bar ${getProgressBarClass(
                                            tracker.progress ?? getProgressFromStatus(tracker.status)
                                        )}`}
                                        style={{
                                            width: `${tracker.progress ?? getProgressFromStatus(tracker.status)}%`
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row text-muted small mb-3 pb-3 border-bottom">
                                <div className="col-md-6">
                                    <strong>Started:</strong> {tracker.startDate || tracker.createdAt || "-"}
                                </div>
                                <div className="col-md-6">
                                    <strong>Expected:</strong> {tracker.expectedDate || "-"}
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 className="mb-3">Progress Steps</h6>
                                {tracker.steps?.map((step, index) => (
                                    <div key={index} className="d-flex gap-3 mb-2">
                                        <div style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: "50%",
                                            border: "2px solid #ddd",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: step.completed ? "#28a745" : "#f0f0f0",
                                            color: step.completed ? "#fff" : "#666"
                                        }}>
                                            {step.completed ? "✓" : index + 1}
                                        </div>
                                        <div>
                                            <p className="mb-1" style={{ fontWeight: 500 }}>
                                                {step.name}
                                            </p>
                                            <small className="text-muted">{step.date}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => {
                                        setSelectedIPId(tracker.id);
                                        setShowModal(true);
                                    }}
                                >
                                    View Details
                                </button>
                                <button className="btn btn-outline-primary btn-sm">
                                    Upload Documents
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Previous
                </button>

                <span className="align-self-center">
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

            {/* EXISTING MODAL */}
            {showModal && (
                <IPDetailModal
                    ipId={selectedIPId}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* NEW FILING MODAL */}
            {showNewFilingModal && <div className="modal-backdrop fade show"></div>}

            {showNewFilingModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Create New Filing</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowNewFilingModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-2"
                                    placeholder="Keywords / Terms"
                                    value={newFilingData.keyword}
                                    onChange={(e) =>
                                        setNewFilingData({ ...newFilingData, keyword: e.target.value })
                                    }
                                />
                                <textarea
                                    className="form-control mb-2"
                                    placeholder="Describe your IP filing in detail..."
                                    rows="3"
                                    value={newFilingData.description}
                                    onChange={(e) =>
                                        setNewFilingData({ ...newFilingData, description: e.target.value })
                                    }
                                />


                                <select
                                    className="form-control mb-2"
                                    value={newFilingData.assetType}
                                    onChange={(e) =>
                                        setNewFilingData({ ...newFilingData, assetType: e.target.value })
                                    }
                                >
                                    <option value="">Select Asset Type</option>
                                    <option>Patent</option>
                                    <option>Trademark</option>
                                </select>

                                <input
                                    className="form-control mb-2"
                                    placeholder="Jurisdiction (US, EU, JP)"
                                    value={newFilingData.jurisdiction}
                                    onChange={(e) =>
                                        setNewFilingData({ ...newFilingData, jurisdiction: e.target.value })
                                    }
                                />

                                <select
                                    className="form-control mb-2"
                                    value={newFilingData.frequency}
                                    onChange={(e) =>
                                        setNewFilingData({ ...newFilingData, frequency: e.target.value })
                                    }
                                >
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Daily</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowNewFilingModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCreateNewFiling}
                                >
                                    Create Filing
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FillingTracker;
