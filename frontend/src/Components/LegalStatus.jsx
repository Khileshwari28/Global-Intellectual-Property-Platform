import React, { useState } from 'react';

const LegalStatus = () => {
    const [expandedId, setExpandedId] = useState(null);

    const filings = [
        {
            id: 1,
            name: 'Patent - IoT Smart Device',
            filingNumber: 'US2023/234567',
            type: 'Patent',
            status: 'Active',
            filedDate: '2021-05-10',
            expiryDate: '2041-05-10',
            jurisdiction: 'United States',
            description: 'A comprehensive patent covering smart home automation technology',
            legalRisks: 'Low',
            details: {
                claims: '25 independent claims',
                examiner: 'Dr. John Smith',
                office: 'USPTO, Silicon Valley',
                annualFee: 'Paid until 2024'
            }
        },
        {
            id: 2,
            name: 'Trademark - Brand Logo',
            filingNumber: 'TM2022/456789',
            type: 'Trademark',
            status: 'Registered',
            filedDate: '2019-08-15',
            expiryDate: '2029-08-15',
            jurisdiction: 'European Union',
            description: 'Registered trademark for company brand and logo',
            legalRisks: 'Very Low',
            details: {
                class: 'Class 35, 42',
                registrar: 'EUIPO',
                status: 'Fully Protected',
                renewalDate: '2024-08-15'
            }
        },
        {
            id: 3,
            name: 'Copyright - Software',
            filingNumber: 'CR2023/567890',
            type: 'Copyright',
            status: 'Protected',
            filedDate: '2020-03-20',
            expiryDate: '2070-03-20',
            jurisdiction: 'International',
            description: 'Copyright protection for proprietary software library',
            legalRisks: 'Moderate',
            details: {
                works: '15 software modules',
                registrant: 'Tech Corp Ltd',
                protectionLevel: 'Automatic + Registered',
                lastUpdated: '2023-09-10'
            }
        },
        {
            id: 4,
            name: 'Trade Secret - Process',
            filingNumber: 'TS2023/789012',
            type: 'Trade Secret',
            status: 'Confidential',
            filedDate: '2022-01-05',
            expiryDate: 'Indefinite',
            jurisdiction: 'Confidential',
            description: 'Manufacturing process and formulation details',
            legalRisks: 'Medium',
            details: {
                category: 'Manufacturing Process',
                accessLevel: 'Restricted',
                lastAudit: '2023-08-15',
                protectionMeasures: 'NDA, Access Control'
            }
        },
        {
            id: 5,
            name: 'Design Patent - UI',
            filingNumber: 'DP2023/901234',
            type: 'Design',
            status: 'Pending',
            filedDate: '2023-04-10',
            expiryDate: 'Pending',
            jurisdiction: 'United States',
            description: 'Design patent for innovative user interface',
            legalRisks: 'Low',
            details: {
                drawings: '15 design drawings',
                examiner: 'Ms. Sarah Johnson',
                stage: 'Under Examination',
                nextAction: 'Office Action Response Due'
            }
        }
    ];

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
                            <h3>{filings.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Active/Protected</p>
                            <h3>{filings.filter(f => f.status === 'Active' || f.status === 'Protected' || f.status === 'Registered').length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Pending</p>
                            <h3>{filings.filter(f => f.status === 'Pending').length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <p className="text-muted mb-2" style={{ fontSize: '12px', fontWeight: '600' }}>Risk Level</p>
                            <span className="badge bg-success" style={{ fontSize: '14px', padding: '8px' }}>Low</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filings.map((filing) => (
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
                                        {Object.entries(filing.details).map(([key, value]) => (
                                            <div key={key} className="col-md-6 mb-2">
                                                <strong className="text-capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
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
        </div>
    );
};

export default LegalStatus;