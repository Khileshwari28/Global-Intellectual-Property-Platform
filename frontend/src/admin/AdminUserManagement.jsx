import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success | error
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    // --- NEW STATE FOR FILTERING ---
    const [searchTerm, setSearchTerm] = useState("");
    const [planFilter, setPlanFilter] = useState("ALL");

    const loadUsers = () => {
        axios.get("http://localhost:8080/api/admin/users/getall")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Failed to load users", err));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // --- FILTER LOGIC ---
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesPlan = planFilter === "ALL" || user.plan === planFilter;

        return matchesSearch && matchesPlan;
    });

    const deleteUser = () => {
        axios.delete(`http://localhost:8080/api/admin/users/${deleteUserId}`)
            .then(() => {
                setMessage("User deleted successfully");
                setMessageType("success");
                loadUsers();
            })
            .catch(err => {
                setMessage("Failed to delete user");
                setMessageType("error");
            })
            .finally(() => {
                setShowConfirmModal(false);
                setDeleteUserId(null);
                setTimeout(() => { setMessage(""); setMessageType(""); }, 3000);
            });
    };

    const updateRole = (id) => {
        axios.put(`http://localhost:8080/api/admin/users/${id}/promote`)
            .then(() => loadUsers())
            .catch(err => console.error(err));
    };

    const toggleStatus = (id, enabled) => {
        const url = enabled
            ? `http://localhost:8080/api/admin/users/${id}/disable`
            : `http://localhost:8080/api/admin/users/${id}/enable`;

        axios.put(url)
            .then(() => loadUsers())
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2 className="mb-4 text-primary fw-bold">User Management</h2>

            {/* --- SEARCH & FILTER BAR --- */}
            <div className="row g-3 mb-4 bg-white p-3 rounded shadow-sm border mx-0">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted">🔍</span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-select"
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                    >
                        <option value="ALL">All Plans</option>
                        <option value="NONE">No Plan</option>
                        <option value="BASIC">Basic</option>
                        <option value="PROFESSIONAL">Professional</option>
                        <option value="ENTERPRISE">Enterprise</option>
                    </select>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-end">
                    <span className="badge bg-light text-dark border">
                        {filteredUsers.length} Users Found
                    </span>
                </div>
            </div>

            {message && (
                <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
                    {message}
                </div>
            )}

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Plan</th>
                                <th>Role</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td className="fw-semibold">{user.username}</td>
                                        <td>{user.email}</td>
                                        <td><span className="badge bg-primary">{user.plan}</span></td>
                                        <td>
                                            <span className={`badge ${user.role === "ADMIN" ? "bg-danger" : "bg-secondary"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{String(user.createdAt).substring(0, 10)}</td>
                                        <td>
                                            <span className={`badge ${user.enabled ? "bg-success" : "bg-warning"}`}>
                                                {user.enabled ? "ACTIVE" : "DISABLED"}
                                            </span>
                                        </td>
                                        <td className="d-flex gap-1">
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => { setDeleteUserId(user.id); setShowConfirmModal(true); }}>Delete</button>
                                            {user.role !== "ADMIN" && <button className="btn btn-sm btn-outline-primary" onClick={() => updateRole(user.id)}>Promote</button>}
                                            <button className="btn btn-sm btn-outline-warning" onClick={() => toggleStatus(user.id, user.enabled)}>{user.enabled ? "Disable" : "Enable"}</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-muted">No users found matching your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- CONFIRMATION MODAL --- */}
            {showConfirmModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={() => setShowConfirmModal(false)}></button>
                                </div>
                                <div className="modal-body text-center p-4">
                                    <i className="bi bi-exclamation-triangle text-danger" style={{fontSize: "2rem"}}></i>
                                    <p className="mt-3 mb-1 fw-bold">Are you sure you want to delete this user?</p>
                                    <p className="text-muted small">This action is permanent and cannot be undone.</p>
                                </div>
                                <div className="modal-footer bg-light border-0">
                                    <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                                    <button className="btn btn-danger" onClick={deleteUser}>Yes, Delete User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminUserManagement;