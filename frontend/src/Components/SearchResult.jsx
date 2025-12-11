import React, { useState } from 'react';

const SearchResult = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    const results = [
        {
            id: 1,
            title: 'Global Patent Filing - US Patent 10,987,654',
            type: 'Patent',
            status: 'Granted',
            date: '2023-05-15',
            owner: 'Tech Corp Ltd'
        },
        {
            id: 2,
            title: 'Trademark - "InnovatePro" Design Mark',
            type: 'Trademark',
            status: 'Registered',
            date: '2023-04-20',
            owner: 'Brand Solutions Inc'
        },
        {
            id: 3,
            title: 'Copyright - Software Code Library v2.0',
            type: 'Copyright',
            status: 'Protected',
            date: '2023-03-10',
            owner: 'CodeBase Studios'
        },
        {
            id: 4,
            title: 'Design Patent - UI/UX Framework',
            type: 'Design',
            status: 'Pending',
            date: '2023-06-01',
            owner: 'Creative Labs'
        },
        {
            id: 5,
            title: 'Trade Secret - Manufacturing Process',
            type: 'Trade Secret',
            status: 'Protected',
            date: '2023-02-14',
            owner: 'Industrial Dynamics'
        }
    ];

    const filteredResults = results.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || result.type === filterType;
        return matchesQuery && matchesFilter;
    });

    const getTypeBadgeClass = (type) => {
        const typeMap = {
            'Patent': 'bg-primary',
            'Trademark': 'bg-warning',
            'Copyright': 'bg-danger',
            'Design': 'bg-info',
            'Trade Secret': 'bg-dark'
        };
        return typeMap[type] || 'bg-secondary';
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Granted':
            case 'Registered':
            case 'Protected':
                return 'bg-success';
            case 'Pending':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div>
            <div className="mb-4">
                <h1 className="h2 mb-2">Search Results</h1>
                <p className="text-muted">Find and manage your intellectual property filings</p>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-md-9">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">🔍</span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by title or owner..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">All Types</option>
                        <option value="Patent">Patents</option>
                        <option value="Trademark">Trademarks</option>
                        <option value="Copyright">Copyrights</option>
                        <option value="Design">Designs</option>
                        <option value="Trade Secret">Trade Secrets</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 text-muted small">
                Showing {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            </div>

            <div className="space-y-3">
                {filteredResults.length > 0 ? (
                    filteredResults.map(result => (
                        <div key={result.id} className="card border-0 shadow-sm mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="card-title mb-2">{result.title}</h5>
                                        <span className={`badge me-2 ${getTypeBadgeClass(result.type)}`}>
                                            {result.type}
                                        </span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">View Details</button>
                                </div>
                                <div className="row text-muted small">
                                    <div className="col-md-3">
                                        <strong>Owner:</strong> {result.owner}
                                    </div>
                                    <div className="col-md-3">
                                        <strong>Date:</strong> {result.date}
                                    </div>
                                    <div className="col-md-3">
                                        <span className={`badge ${getStatusBadgeClass(result.status)}`}>
                                            {result.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info text-center">
                        No results found. Try adjusting your search or filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;