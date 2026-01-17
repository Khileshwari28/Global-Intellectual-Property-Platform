import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaUserPlus, FaCheckCircle, FaShieldAlt, FaSave, FaTimes, FaUserEdit, FaLock, FaArrowUp, FaBan } from 'react-icons/fa';
import '../styles/UserManagement.css'; 

/* --- SUBSCRIPTION MODULE PERMISSIONS --- 
   This defines which plan is allowed to have which features enabled.
*/
const PLAN_PERMISSIONS = {
  BASIC: {
    apiHealth: false,
    activityTrends: true,
    filingMgmt: true,
    uiCustomization: false,
    maxUsers: 2
  },
  PRO: {
    apiHealth: true,
    activityTrends: true,
    filingMgmt: true,
    uiCustomization: true,
    maxUsers: 10
  },
  ENTERPRISE: {
    apiHealth: true,
    activityTrends: true,
    filingMgmt: true,
    uiCustomization: true,
    maxUsers: 100
  }
};

const dummyUsers = [
  { 
    id: 1, firstName: 'Manika', lastName: 'Sethi', company: 'Legal IP Solutions', email: 'manika@example.com', role: 'Admin', status: 'Active', plan: 'PRO',
    modules: { apiHealth: true, activityTrends: true, filingMgmt: true, uiCustomization: true }
  },
  { 
    id: 2, firstName: 'Arjun', lastName: 'Varma', company: 'IP Tech', email: 'arjun@example.com', role: 'Editor', status: 'Active', plan: 'BASIC',
    modules: { apiHealth: false, activityTrends: true, filingMgmt: false, uiCustomization: false }
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [activeUser, setActiveUser] = useState(dummyUsers[0]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSubscription, setIsEditingSubscription] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ firstName: '', lastName: '', email: '', role: 'Viewer' });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!inviteData.firstName.trim()) errors.firstName = "First name is required";
    if (!inviteData.lastName.trim()) errors.lastName = "Last name is required";
    if (!inviteData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(inviteData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (users.some(u => u.email.toLowerCase() === inviteData.email.toLowerCase())) {
      errors.email = "A member with this email already exists";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();

    // ENFORCE SUBSCRIPTION LIMIT
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || activeUser;
    const planLimit = PLAN_PERMISSIONS[loggedInUser.plan]?.maxUsers || 3;

    if (users.length >= planLimit) {
      alert(`Limit reached! Your ${loggedInUser.plan} plan only allows ${planLimit} members. Please upgrade your plan.`);
      setShowInviteModal(false);
      return;
    }
    
    if (validateForm()) {
      const newUser = {
        ...inviteData,
        id: Date.now(),
        status: 'Active',
        plan: 'BASIC', // New invites start on Basic
        company: activeUser?.company || 'My Company', 
        modules: { apiHealth: false, activityTrends: true, filingMgmt: false, uiCustomization: false }
      };
      
      setUsers([...users, newUser]);
      setActiveUser(newUser); 
      setShowInviteModal(false); 
      setInviteData({ firstName: '', lastName: '', email: '', role: 'Viewer' });
      setFormErrors({});
      alert("Invitation sent successfully!");
    }
  };

  const handlePromote = () => {
    const roles = ['Viewer', 'Editor', 'Admin'];
    const nextRole = roles[(roles.indexOf(activeUser.role) + 1) % roles.length];
    setActiveUser({ ...activeUser, role: nextRole });
  };

  const handleToggleStatus = () => {
    const nextStatus = activeUser.status === 'Active' ? 'Disabled' : 'Active';
    setActiveUser({ ...activeUser, status: nextStatus });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActiveUser({ ...activeUser, [name]: value });
  };

  // ENFORCE MODULE ACCESS BASED ON PLAN
  const toggleModule = (moduleKey) => {
    if (!isEditingSubscription) return;

    const isAllowedByPlan = PLAN_PERMISSIONS[activeUser.plan][moduleKey];

    if (!isAllowedByPlan) {
      alert(`The ${activeUser.plan} plan does not include access to ${moduleKey.replace(/([A-Z])/g, ' $1').toUpperCase()}. Please upgrade this user's plan.`);
      return;
    }

    setActiveUser(prev => ({
      ...prev,
      modules: { ...prev.modules, [moduleKey]: !prev.modules[moduleKey] }
    }));
  };
  
  const saveProfile = () => {
    setUsers(users.map(u => u.id === activeUser.id ? activeUser : u));
    setIsEditingProfile(false);
  };
  
  const saveSubscription = () => {
    setUsers(users.map(u => u.id === activeUser.id ? activeUser : u));
    setIsEditingSubscription(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      const updated = users.filter(user => user.id !== id);
      setUsers(updated);
      setActiveUser(updated.length > 0 ? updated[0] : null);
    }
  };

  return (
    <div className="um-container">
      {showInviteModal && (
        <div className="um-modal-overlay">
          <div className="um-modal-card">
            <div className="modal-header">
              <h3>Invite Team Member</h3>
              <button className="btn-close" onClick={() => setShowInviteModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleInviteSubmit} noValidate>
              <div className="modal-body">
                <div className="row-group">
                  <div className="input-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      className={formErrors.firstName ? 'input-error' : ''}
                      value={inviteData.firstName} 
                      onChange={(e) => setInviteData({...inviteData, firstName: e.target.value})} 
                    />
                    {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      className={formErrors.lastName ? 'input-error' : ''}
                      value={inviteData.lastName} 
                      onChange={(e) => setInviteData({...inviteData, lastName: e.target.value})} 
                    />
                    {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
                  </div>
                </div>
                <div className="input-group full-width">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className={formErrors.email ? 'input-error' : ''}
                    value={inviteData.email} 
                    onChange={(e) => setInviteData({...inviteData, email: e.target.value})} 
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>
                <div className="input-group full-width">
                  <label>Initial Role</label>
                  <select value={inviteData.role} onChange={(e) => setInviteData({...inviteData, role: e.target.value})}>
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel-small" onClick={() => setShowInviteModal(false)}>Cancel</button>
                <button type="submit" className="btn-save-small">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <aside className="um-sidebar">
        <div className="sidebar-header-container">
          <div className="sidebar-title-row">
            <h2>Team</h2>
            <span className="user-count-badge">{users.length}</span>
          </div>
          <button className="btn-invite-new" onClick={() => { setFormErrors({}); setShowInviteModal(true); }}>
            <FaUserPlus className="me-2" />
            <span>Add Member</span>
          </button>
        </div>
        
        <div className="user-list">
          {users.map((user) => (
            <div 
              key={user.id} 
              className={`user-nav-item ${activeUser?.id === user.id ? 'active' : ''}`} 
              onClick={() => { setActiveUser(user); setIsEditingProfile(false); setIsEditingSubscription(false); }}
            >
              <div className={`nav-avatar ${user.status === 'Disabled' ? 'disabled-avatar' : ''}`}>
                {user.firstName[0]}
              </div>
              <div className="nav-details">
                <span className="nav-name">{user.firstName} {user.lastName}</span>
                <span className="nav-role-text">{user.role}</span>
              </div>
              {user.status === 'Active' && <div className="active-dot"></div>}
            </div>
          ))}
        </div>
      </aside>

      <main className="um-content">
        {activeUser && (
          <div className="profile-card animate-fade-in">
            <div className="section-container">
                <div className="section-header">
                    <div className="profile-info-group">
                        <div className={`profile-main-avatar ${activeUser.status === 'Disabled' ? 'disabled-avatar' : ''}`}>
                          {activeUser.firstName[0]}
                        </div>
                        <div>
                            <h1>{activeUser.firstName}'s Profile</h1>
                            <p className="subtext text-uppercase fw-bold">{activeUser.role} Level Access • <span style={{color: 'var(--primary)'}}>{activeUser.plan} PLAN</span></p>
                        </div>
                    </div>
                    <div className="header-actions">
                        {!isEditingProfile ? (
                            <>
                                <button className="btn-edit-small" onClick={() => setIsEditingProfile(true)}><FaUserEdit /> Edit</button>
                                <button className="btn-delete-small" onClick={() => handleDelete(activeUser.id)}><FaTrash /> Remove</button>
                            </>
                        ) : (
                            <div className="btn-group">
                                <button className="btn-save-small" onClick={saveProfile}><FaSave /> Save Changes</button>
                                <button className="btn-cancel-small" onClick={() => setIsEditingProfile(false)}><FaTimes /></button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="input-group">
                        <label>First Name</label>
                        <input name="firstName" value={activeUser.firstName} onChange={handleInputChange} disabled={!isEditingProfile} className={isEditingProfile ? 'editable' : ''} />
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <input name="lastName" value={activeUser.lastName} onChange={handleInputChange} disabled={!isEditingProfile} className={isEditingProfile ? 'editable' : ''} />
                    </div>
                    <div className="input-group full-width">
                        <label>Email Address</label>
                        <input name="email" value={activeUser.email} onChange={handleInputChange} disabled={!isEditingProfile} className={isEditingProfile ? 'editable' : ''} />
                    </div>

                    {isEditingProfile && (
                      <div className="management-actions-row full-width">
                        <button className="btn-promote" onClick={handlePromote}>
                          <FaArrowUp /> Promote to {activeUser.role === 'Admin' ? 'Viewer' : activeUser.role === 'Viewer' ? 'Editor' : 'Admin'}
                        </button>
                        <button className={`btn-status ${activeUser.status === 'Active' ? 'status-disable' : 'status-enable'}`} onClick={handleToggleStatus}>
                          {activeUser.status === 'Active' ? <><FaBan /> Disable Account</> : <><FaCheckCircle /> Enable Account</>}
                        </button>
                      </div>
                    )}
                </div>
            </div>

            <div className="section-container permission-section-bg">
                <div className="section-header">
                    <div>
                        <h3><FaShieldAlt /> Module Access Control</h3>
                        <p className="subtext">Based on <strong>{activeUser.plan}</strong> subscription columns</p>
                    </div>
                    <div className="header-actions">
                        {!isEditingSubscription ? (
                            <button className="btn-edit-small" onClick={() => setIsEditingSubscription(true)}><FaLock /> Edit Permissions</button>
                        ) : (
                            <div className="btn-group">
                                <button className="btn-save-small" onClick={saveSubscription}><FaSave /> Update Access</button>
                                <button className="btn-cancel-small" onClick={() => setIsEditingSubscription(false)}><FaTimes /></button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="modules-grid">
                    {Object.keys(activeUser.modules).map((module) => {
                        const isDisabledByPlan = !PLAN_PERMISSIONS[activeUser.plan][module];
                        
                        return (
                          <div 
                            key={module} 
                            className={`module-card ${activeUser.modules[module] ? 'enabled' : 'disabled'} ${isDisabledByPlan ? 'locked-by-plan' : ''}`}
                            title={isDisabledByPlan ? "Upgrade plan to unlock this feature" : ""}
                          >
                              <span className="module-name">
                                {module.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                {isDisabledByPlan && <FaLock style={{marginLeft: '8px', fontSize: '0.7rem', color: '#94a3b8'}} />}
                              </span>
                              <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={activeUser.modules[module]} 
                                    onChange={() => toggleModule(module)} 
                                    disabled={!isEditingSubscription || isDisabledByPlan} 
                                  />
                                  <span className="slider round"></span>
                              </label>
                          </div>
                        );
                    })}
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagement;