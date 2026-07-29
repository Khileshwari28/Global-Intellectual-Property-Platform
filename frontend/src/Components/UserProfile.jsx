import { useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaCrown,
  FaSave,
  FaEdit,
  FaHeadset,
  FaInfoCircle,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const UserProfile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("account"); // account | personal | security | support

  const [profile, setProfile] = useState({
    username: loggedUser?.username || "No details provided",
    email: loggedUser?.email || "No details provided",
    role: loggedUser?.role || "USER",
    id: loggedUser?.id || "N/A",
    plan: loggedUser?.plan || "Basic",

    company: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3500);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    alert("Profile Updated Successfully");
    setEditing(false);

    // Later connect backend
  };

  const updatePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      showMessage("Please fill in all three password fields", "error");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      showMessage("New password and confirmation do not match", "error");
      return;
    }

    // Matches UserController: PUT /api/users/{id}/change-password
    axios
      .put(`http://localhost:8080/api/users/${profile.id}/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      .then(() => {
        showMessage("Password updated successfully", "success");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPassword({ current: false, new: false, confirm: false });
      })
      .catch((err) => {
        // Surfaces the backend's own message when it has one (e.g. "Current password is incorrect"),
        // otherwise falls back to a sensible default.
        const backendMessage = err.response?.data?.message;
        showMessage(backendMessage || "Current password is incorrect", "error");
      });
  };

  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportQuery, setSupportQuery] = useState({ subject: "", message: "" });
  const [sendingQuery, setSendingQuery] = useState(false);

  const handleSupportChange = (e) => {
    setSupportQuery({ ...supportQuery, [e.target.name]: e.target.value });
  };

  const submitSupportQuery = () => {
    if (!supportQuery.subject.trim() || !supportQuery.message.trim()) {
      showMessage("Please fill in both subject and message", "error");
      return;
    }

    setSendingQuery(true);

    // NOTE: adjust this URL to match your real support-ticket endpoint.
    axios
      .post(`http://localhost:8080/api/users/${profile.id}/support`, {
        subject: supportQuery.subject,
        message: supportQuery.message,
      })
      .then(() => {
        showMessage("Your query has been sent to the admin", "success");
        setSupportQuery({ subject: "", message: "" });
        setShowSupportForm(false);
      })
      .catch((err) => {
        const backendMessage = err.response?.data?.message;
        showMessage(backendMessage || "Could not send your query, please try again", "error");
      })
      .finally(() => setSendingQuery(false));
  };

  const tabs = [
    { key: "account", label: "Account", icon: <FaUserCircle /> },
    { key: "personal", label: "Personal Info", icon: <FaBuilding /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "support", label: "Support", icon: <FaHeadset /> },
  ];

  return (
    <div style={styles.page} className="up-page">
      <style>{RESPONSIVE_CSS}</style>

      <div style={styles.shell} className="up-shell">
        {/* HEADER */}
        <div style={styles.header} className="up-header">
          <div style={styles.userBox} className="up-userbox">
            <div style={styles.avatar} className="up-avatar">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <div style={styles.nameRow} className="up-namerow">
                <h1 style={styles.name} className="up-name">
                  {profile.username}
                </h1>
                <span style={styles.role}>{profile.role}</span>
                <span style={styles.plan}>
                  <FaCrown size={11} /> {profile.plan}
                </span>
              </div>
              <p style={styles.email}>
                <FaEnvelope size={12} /> {profile.email}
              </p>
            </div>
          </div>

          <button style={styles.editBtn} className="up-editbtn" onClick={() => (editing ? saveProfile() : setEditing(true))}>
            {editing ? (
              <>
                <FaSave /> Save
              </>
            ) : (
              <>
                <FaEdit /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* TABS */}
        <div style={styles.tabBar} className="up-tabbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="up-tabbtn"
              style={{
                ...styles.tabBtn,
                ...(activeTab === t.key ? styles.tabBtnActive : {}),
              }}
            >
              {t.icon} <span className="up-tablabel">{t.label}</span>
            </button>
          ))}
        </div>

        {/* TAB PANEL */}
        <div style={styles.panel} className="up-panel">
          {message && (
            <div
              style={{
                ...styles.banner,
                ...(messageType === "success" ? styles.bannerSuccess : styles.bannerError),
              }}
            >
              {messageType === "success" ? <FaCheckCircle /> : <FaExclamationCircle />} {message}
            </div>
          )}

          {activeTab === "account" && (
            <div style={styles.twoCol} className="up-twocol">
              <div>
                <h2 style={styles.heading} className="up-heading">
                  <FaUserCircle /> Account Information
                </h2>

                <div style={styles.infoGrid} className="up-infogrid">
                  <div style={styles.info} className="up-info">
                    <label style={styles.label}>User ID</label>
                    <p style={styles.value} className="up-value">{profile.id}</p>
                  </div>
                  <div style={styles.info} className="up-info">
                    <label style={styles.label}>Role</label>
                    <p style={styles.value} className="up-value">{profile.role}</p>
                  </div>
                  <div style={styles.info} className="up-info">
                    <label style={styles.label}>Email</label>
                    <p style={styles.value} className="up-value">{profile.email}</p>
                  </div>
                  <div style={styles.info} className="up-info">
                    <label style={styles.label}>Member Since</label>
                    <p style={styles.value} className="up-value">July 2026</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 style={styles.heading} className="up-heading">
                  <FaCrown /> Subscription
                </h2>

                <div style={styles.info} className="up-info">
                  <label style={styles.label}>Current Plan</label>
                  <p style={styles.value} className="up-value">{profile.plan}</p>
                </div>

                <div style={styles.info} className="up-info">
                  <label style={styles.label}>Status</label>
                  <p style={{ ...styles.value, color: "#16a34a" }}>Active</p>
                </div>

                <button style={styles.upgradeBtn}>Upgrade Plan</button>
              </div>
            </div>
          )}

          {activeTab === "personal" && (
            <div>
              <h2 style={styles.heading} className="up-heading">
                <FaBuilding /> Personal Information
              </h2>

              <div style={styles.formGrid} className="up-formgrid">
                <div>
                  <label style={styles.label}>Full Name</label>
                  {editing ? (
                    <input
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.username}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Company</label>
                  {editing ? (
                    <input
                      name="company"
                      value={profile.company}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.company || "No details provided"}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <FaPhone size={11} /> Phone
                  </label>
                  {editing ? (
                    <input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.phone || "No details provided"}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <FaMapMarkerAlt size={11} /> Address
                  </label>
                  {editing ? (
                    <input
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.address || "No details provided"}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>City</label>
                  {editing ? (
                    <input
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.city || "No details provided"}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>State</label>
                  {editing ? (
                    <input
                      name="state"
                      value={profile.state}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.state || "No details provided"}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>Country</label>
                  {editing ? (
                    <input
                      name="country"
                      value={profile.country}
                      onChange={handleChange}
                      placeholder="No details provided"
                      style={styles.input}
                      className="up-input"
                    />
                  ) : (
                    <p style={styles.value} className="up-value">{profile.country || "No details provided"}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 style={styles.heading} className="up-heading">
                <FaLock /> Change Password
              </h2>

              <div style={styles.passwordGrid} className="up-passwordgrid">
                <div style={styles.inputWrapper}>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    placeholder="Current Password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePassword}
                    style={{ ...styles.input, paddingRight: "40px" }}
                    className="up-input"
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => toggleShowPassword("current")}
                    aria-label={showPassword.current ? "Hide password" : "Show password"}
                  >
                    {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div style={styles.inputWrapper}>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="New Password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePassword}
                    style={{ ...styles.input, paddingRight: "40px" }}
                    className="up-input"
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => toggleShowPassword("new")}
                    aria-label={showPassword.new ? "Hide password" : "Show password"}
                  >
                    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div style={styles.inputWrapper}>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePassword}
                    style={{ ...styles.input, paddingRight: "40px" }}
                    className="up-input"
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => toggleShowPassword("confirm")}
                    aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                  >
                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button style={styles.passwordBtn} onClick={updatePassword}>
                Update Password
              </button>
            </div>
          )}

          {activeTab === "support" && (
            <div>
              <div style={styles.supportRow} className="up-supportrow">
                <div>
                  <h2 style={styles.heading} className="up-heading">
                    <FaHeadset /> Support
                  </h2>
                  <p style={{ ...styles.value, color: "#64748b" }}>
                    <FaInfoCircle size={12} /> Need help regarding your Intellectual Property account?
                  </p>
                </div>
                {!showSupportForm && (
                  <button style={styles.supportBtn} onClick={() => setShowSupportForm(true)}>
                    Contact Support
                  </button>
                )}
              </div>

              {showSupportForm && (
                <div style={styles.supportForm}>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={styles.label}>Subject</label>
                    <input
                      name="subject"
                      value={supportQuery.subject}
                      onChange={handleSupportChange}
                      placeholder="Briefly describe your issue"
                      style={styles.input}
                      className="up-input"
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={styles.label}>Message</label>
                    <textarea
                      name="message"
                      value={supportQuery.message}
                      onChange={handleSupportChange}
                      placeholder="Explain your query in detail so the admin can help you faster"
                      style={styles.textarea}
                      className="up-input"
                      rows={5}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={styles.supportBtn} onClick={submitSupportQuery} disabled={sendingQuery}>
                      {sendingQuery ? "Sending..." : "Send Query"}
                    </button>
                    <button
                      style={styles.cancelBtn}
                      onClick={() => {
                        setShowSupportForm(false);
                        setSupportQuery({ subject: "", message: "" });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RESPONSIVE_CSS = `
  .up-tabbar { -webkit-overflow-scrolling: touch; }
  .up-tabbar::-webkit-scrollbar { display: none; }

  /* Tablet */
  @media (max-width: 900px) {
    .up-page { padding: 14px !important; }
    .up-header { padding: 14px 18px !important; }
    .up-avatar { width: 54px !important; height: 54px !important; font-size: 22px !important; }
    .up-name { font-size: 18px !important; }
    .up-panel { padding: 18px !important; }
    .up-twocol { gap: 20px !important; }
    .up-formgrid { grid-template-columns: repeat(2, 1fr) !important; }
    .up-passwordgrid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* Mobile landscape / small tablet — still no page scroll, just tighter */
  @media (max-width: 700px) {
    .up-page { padding: 10px !important; }
    .up-header { flex-direction: column; align-items: flex-start !important; padding: 12px 16px !important; gap: 10px !important; }
    .up-editbtn { width: 100%; justify-content: center; padding: 8px 14px !important; }
    .up-tabbar { overflow-x: auto; flex-wrap: nowrap !important; }
    .up-tabbtn { flex: 0 0 auto !important; padding: 8px 12px !important; font-size: 13px !important; }
    .up-panel { padding: 14px !important; }
    .up-heading { margin-bottom: 10px !important; font-size: 14px !important; }
    .up-twocol { grid-template-columns: 1fr !important; gap: 14px !important; }
    .up-infogrid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .up-info { margin-bottom: 8px !important; }
    .up-formgrid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .up-passwordgrid { grid-template-columns: 1fr !important; gap: 8px !important; margin-bottom: 10px !important; }
    .up-supportrow { flex-direction: column; align-items: flex-start !important; gap: 10px !important; }
    .up-value { font-size: 13px !important; }
    .up-input { padding: 8px 10px !important; font-size: 13px !important; }
  }

  /* Small phone */
  @media (max-width: 460px) {
    .up-userbox { gap: 10px !important; }
    .up-avatar { width: 44px !important; height: 44px !important; font-size: 18px !important; }
    .up-name { font-size: 16px !important; }
    .up-namerow { gap: 6px !important; }
    .up-infogrid { grid-template-columns: 1fr !important; }
    .up-formgrid { grid-template-columns: 1fr !important; }
    .up-tablabel { display: none; }
    .up-tabbtn { padding: 8px !important; }
  }
`;

const styles = {
  page: {
    padding: "20px",
    paddingTop: "28px",
    background: "#f5f7fb",
    height: "100vh",
    width: "100%",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  shell: {
    width: "100%",
    maxWidth: "1100px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    background: "#fff",
    borderRadius: "10px",
    padding: "16px 22px",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    border: "1px solid #eef0f4",
    flexWrap: "wrap",
    gap: "14px",
    flexShrink: 0,
  },

  userBox: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },

  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "10px",
    background: "#1e40af",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    fontWeight: "bold",
    flexShrink: 0,
  },

  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  name: {
    margin: 0,
    color: "#1e3a8a",
    fontSize: "21px",
  },

  email: {
    color: "#666",
    margin: "6px 0 0",
    fontSize: "13.5px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  role: {
    background: "#e0ecff",
    color: "#1e40af",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  plan: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  editBtn: {
    background: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },

  tabBar: {
    display: "flex",
    gap: "6px",
    background: "#fff",
    borderRadius: "10px",
    padding: "6px",
    marginBottom: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,.04)",
    border: "1px solid #eef0f4",
    flexWrap: "wrap",
    flexShrink: 0,
  },

  tabBtn: {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "none",
    background: "transparent",
    color: "#64748b",
    padding: "10px 16px",
    borderRadius: "7px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  tabBtnActive: {
    background: "#1e40af",
    color: "#fff",
  },

  panel: {
    background: "#fff",
    borderRadius: "10px",
    padding: "24px 28px",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    border: "1px solid #eef0f4",
    maxHeight: "calc(100vh - 190px)",
    overflowY: "auto",
  },

  heading: {
    color: "#1e40af",
    marginBottom: "18px",
    marginTop: 0,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "16px",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  info: {
    marginBottom: "14px",
  },

  label: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "4px",
  },

  value: {
    margin: 0,
    fontSize: "14.5px",
    color: "#1e293b",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "7px",
    border: "1px solid #ddd",
    marginTop: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  eyeBtn: {
    position: "absolute",
    right: "10px",
    top: "calc(50% + 3px)",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },

  banner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "7px",
    fontSize: "13.5px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  bannerSuccess: {
    background: "#dcfce7",
    color: "#166534",
    border: "1px solid #bbf7d0",
  },

  bannerError: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fecaca",
  },

  upgradeBtn: {
    marginTop: "8px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "11px",
    borderRadius: "7px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    fontSize: "14px",
  },

  passwordGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px",
    marginBottom: "18px",
  },

  passwordBtn: {
    background: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  supportRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
  },

  supportForm: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eef0f4",
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "7px",
    border: "1px solid #ddd",
    marginTop: "6px",
    fontSize: "14px",
    fontFamily: "Arial",
    resize: "vertical",
    boxSizing: "border-box",
  },

  cancelBtn: {
    background: "#f1f5f9",
    color: "#334155",
    border: "1px solid #e2e8f0",
    padding: "12px 22px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  supportBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
};

export default UserProfile;