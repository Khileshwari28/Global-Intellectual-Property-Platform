import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserManagement = () => {

    const [users, setUsers] = useState([]);

    // ✅ Define first
    const loadUsers = () => {
        axios.get("http://localhost:8080/api/admin/users/getall")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Failed to load users", err));
    };

    // ✅ Then call
    useEffect(() => {
        loadUsers();
    }, []);

    const deleteUser = (id) => {
        if (!window.confirm("Delete this user?")) return;

        axios.delete(`http://localhost:8080/api/admin/users/${id}`)
            .then(() => loadUsers())
            .catch(err => console.error(err));
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
            <h2 className="mb-4">User Management</h2>

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
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>

                                    <td>
                                        <span className="badge bg-primary">{user.plan}</span>
                                    </td>

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
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>

                                        {user.role !== "ADMIN" && (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => updateRole(user.id)}
                                            >
                                                Promote
                                            </button>
                                        )}


                                        <button
                                            className="btn btn-sm btn-outline-warning"
                                            onClick={() => toggleStatus(user.id, user.enabled)}
                                        >
                                            {user.enabled ? "Disable" : "Enable"}
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUserManagement;
