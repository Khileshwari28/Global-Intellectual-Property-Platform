import React, { useState } from 'react';

const FillingTracker = () => {
    const [trackers] = useState([
        {
            id: 1,
            name: 'Patent Application - IoT Device',
            type: 'Patent',
            progress: 75,
            status: 'In Progress',
            startDate: '2023-01-15',
            expectedDate: '2024-01-15',
            description: 'Filing for smart home automation device',
            steps: [
                { name: 'Application Submitted', completed: true, date: '2023-01-15' },
                { name: 'Initial Review', completed: true, date: '2023-02-20' },
                { name: 'Office Action Response', completed: true, date: '2023-04-10' },
                { name: 'Final Review', completed: false, date: 'Pending' }
            ]
        },
        {
            id: 2,
            name: 'Trademark Registration - BrandName',
            type: 'Trademark',
            progress: 100,
            status: 'Completed',
            startDate: '2022-06-10',
            expectedDate: '2023-06-10',
            description: 'Registration for brand logo and name',
            steps: [
                { name: 'Application Submitted', completed: true, date: '2022-06-10' },
                { name: 'Examination', completed: true, date: '2022-07-15' },
                { name: 'Publication', completed: true, date: '2022-09-20' },
                { name: 'Registration Certificate', completed: true, date: '2023-06-10' }
            ]
        },
        {
            id: 3,
            name: 'Copyright Filing - Software Library',
            type: 'Copyright',
            progress: 50,
            status: 'In Progress',
            startDate: '2023-03-01',
            expectedDate: '2023-09-01',
            description: 'Copyright protection for code library v3.0',
            steps: [
                { name: 'Documentation Prepared', completed: true, date: '2023-03-01' },
                { name: 'Application Filed', completed: true, date: '2023-03-15' },
                { name: 'Processing', completed: false, date: 'In Progress' },
                { name: 'Certificate Issued', completed: false, date: 'Pending' }
            ]
        },
        {
            id: 4,
            name: 'Design Patent - UI Framework',
            type: 'Design',
            progress: 25,
            status: 'Pending',
            startDate: '2023-05-20',
            expectedDate: '2024-05-20',
            description: 'Design patent for innovative user interface',
            steps: [
                { name: 'Design Documentation', completed: true, date: '2023-05-20' },
                { name: 'Application Submission', completed: false, date: 'Next Week' },
                { name: 'Examination', completed: false, date: 'TBD' },
                { name: 'Approval', completed: false, date: 'TBD' }
            ]
        }
    ]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'In Progress':
                return 'bg-info';
            case 'Completed':
                return 'bg-success';
            case 'Pending':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    };

    const getProgressBarClass = (progress) => {
        if (progress >= 75) return 'bg-success';
        if (progress >= 50) return 'bg-info';
        if (progress >= 25) return 'bg-warning';
        return 'bg-danger';
    };

    return (
        <div>
            <div className="mb-4">
                <h1 className="h2 mb-2">Filling Tracker</h1>
                <p className="text-muted">Monitor the progress of all your intellectual property filings</p>
            </div>

            <div className="space-y-4">
                {trackers.map((tracker) => (
                    <div key={tracker.id} className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 className="card-title mb-2">{tracker.name}</h5>
                                    <p className="text-muted small mb-2">{tracker.description}</p>
                                    <span className={`badge bg-primary`} style={{ fontSize: '11px' }}>
                                        {tracker.type}
                                    </span>
                                </div>
                                <span className={`badge ${getStatusBadgeClass(tracker.status)}`}>
                                    {tracker.status}
                                </span>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Progress</span>
                                    <span className="text-primary" style={{ fontWeight: '600' }}>{tracker.progress}%</span>
                                </div>
                                <div className="progress">
                                    <div
                                        className={`progress-bar ${getProgressBarClass(tracker.progress)}`}
                                        role="progressbar"
                                        style={{ width: `${tracker.progress}%` }}
                                    ></div>
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
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            border: '2px solid #ddd',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: step.completed ? '#fff' : '#666',
                                            backgroundColor: step.completed ? '#28a745' : '#f0f0f0',
                                            borderColor: step.completed ? '#28a745' : '#ddd',
                                            flexShrink: 0
                                        }}>
                                            {step.completed ? '✓' : index + 1}
                                        </div>
                                        <div>
                                            <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>{step.name}</p>
                                            <small className="text-muted">{step.date}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">View Details</button>
                                <button className="btn btn-outline-primary btn-sm">Upload Documents</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FillingTracker;