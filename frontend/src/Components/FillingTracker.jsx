import React, { useEffect, useState } from "react";
import axios from "axios";
import IPDetailModal from "./IPDetailModal";

const FillingTracker = () => {

    const [trackers, setTrackers] = useState([]);
    const [selectedIPId, setSelectedIPId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const ITEMS_PER_PAGE = 5;

    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        axios.get("http://localhost:8080/api/ip/filings/tracker")
            .then(res => setTrackers(res.data))
            .catch(err => console.error(err));
    }, []);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "In Progress": return "bg-info";
            case "Completed": return "bg-success";
            case "Pending": return "bg-warning text-dark";
            default: return "bg-secondary";
        }
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const currentTrackers = trackers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(trackers.length / ITEMS_PER_PAGE);


    const getProgressBarClass = (progress) => {
        if (progress >= 75) return "bg-success";
        if (progress >= 50) return "bg-info";
        if (progress >= 25) return "bg-warning";
        return "bg-danger";
    };




    return (
        <div>
            <div className="mb-4">
                <h1 className="h2 mb-2">Filing Tracker</h1>
                <p className="text-muted">Monitor the progress of all your intellectual property filings</p>
            </div>

            <div className="space-y-4">
                {currentTrackers.map((tracker) => (
                    <div key={tracker.id} className="card border-0 shadow-sm">
                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 className="card-title mb-2">{tracker.name}</h5>
                                    <p className="text-muted small mb-2">{tracker.description}</p>
                                    <span className="badge bg-primary" style={{ fontSize: "11px" }}>
                                        {tracker.type}
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
                                        {tracker.progress}%
                                    </span>
                                </div>
                                <div className="progress">
                                    <div
                                        className={`progress-bar ${getProgressBarClass(tracker.progress)}`}
                                        style={{ width: `${tracker.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="row text-muted small mb-3 pb-3 border-bottom">
                                <div className="col-md-6">
                                    <strong>Started:</strong> {tracker.startDate}
                                </div>
                                <div className="col-md-6">
                                    <strong>Expected:</strong> {tracker.expectedDate}
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 className="mb-3">Progress Steps</h6>
                                {tracker.steps.map((step, index) => (
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


            {showModal && (
                <IPDetailModal
                    ipId={selectedIPId}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default FillingTracker;
