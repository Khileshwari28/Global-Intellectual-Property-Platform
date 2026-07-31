import { useState } from "react";
import { updateUser, changePassword } from "../api/userAuthApi";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaSave,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminProfile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("account"); // account | security

  const [profile, setProfile] = useState({
    username: loggedUser?.username || "No details provided",
    email: loggedUser?.email || "No details provided",
    role: loggedUser?.role || "ADMIN",
    id: loggedUser?.id || "N/A",
    createdAt: loggedUser?.createdAt || null,
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

  const [saving, setSaving] = useState(false);
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
    if (!profile.username.trim() || !profile.email.trim()) {
      showMessage("Username and email cannot be empty", "error");
      return;
    }

    setSaving(true);

    // Matches UserController: PUT /api/users/{id}
    updateUser(profile.id, { username: profile.username, email: profile.email, role: profile.role })
      .then((res) => {
        showMessage("Profile updated successfully", "success");
        setEditing(false);

        // keep localStorage (and therefore the navbar) in sync
        const updatedUser = { ...loggedUser, username: profile.username, email: profile.email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => {
        const backendMessage = err.response?.data?.message;
        showMessage(backendMessage || "Could not update profile, please try again", "error");
      })
      .finally(() => setSaving(false));
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
    changePassword(profile.id, passwords.currentPassword, passwords.newPassword)
      .then(() => {
        showMessage("Password updated successfully", "success");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPassword({ current: false, new: false, confirm: false });
      })
      .catch((err) => {
        const backendMessage = err.response?.data?.message;
        showMessage(backendMessage || "Current password is incorrect", "error");
      });
  };

  const tabs = [
    { key: "account", label: "Account", icon: <FaUserCircle /> },
    { key: "security", label: "Security", icon: <FaLock /> },
  ];

  return (
    <div style={styles.page} className="ap-page">
      <style>{RESPONSIVE_CSS}</style>

      <div style={styles.shell} className="ap-shell">
        {/* HEADER */}
        <div style={styles.header} className="ap-header">
          <div style={styles.userBox} className="ap-userbox">
            <div style={styles.avatar} className="ap-avatar">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <div style={styles.nameRow} className="ap-namerow">
                <h1 style={styles.name} className="ap-name">
                  {profile.username}
                </h1>
                <span style={styles.role}>
                  <FaShieldAlt size={11} /> {profile.role}
                </span>
              </div>
              <p style={styles.email}>
                <FaEnvelope size={12} /> {profile.email}
              </p>
            </div>
          </div>

          <button
            style={styles.editBtn}
            className="ap-editbtn"
            onClick={() => (editing ? saveProfile() : setEditing(true))}
            disabled={saving}
          >
            {editing ? (
              <>
                <FaSave /> {saving ? "Saving..." : "Save"}
              </>
            ) : (
              <>
                <FaEdit /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* TABS */}
        <div style={styles.tabBar} className="ap-tabbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="ap-tabbtn"
              style={{
                ...styles.tabBtn,
                ...(activeTab === t.key ? styles.tabBtnActive : {}),
              }}
            >
              {t.icon} <span className="ap-tablabel">{t.label}</span>
            </button>
          ))}
        </div>

        {/* TAB PANEL */}
        <div style={styles.panel} className="ap-panel">
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
            <div>
              <h2 style={styles.heading} className="ap-heading">
                <FaUserCircle /> Account Information
              </h2>

              <div style={styles.formGrid} className="ap-formgrid">
                <div>
                  <label style={styles.label}>
                    <FaUserCircle size={11} /> Username
                  </label>
                  {editing ? (
                    <input
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      style={styles.input}
                      className="ap-input"
                    />
                  ) : (
                    <p style={styles.value} className="ap-value">{profile.username}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <FaEnvelope size={11} /> Email
                  </label>
                  {editing ? (
                    <input
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      style={styles.input}
                      className="ap-input"
                    />
                  ) : (
                    <p style={styles.value} className="ap-value">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label style={styles.label}>User ID</label>
                  <p style={styles.value} className="ap-value">{profile.id}</p>
                </div>

                <div>
                  <label style={styles.label}>
                    <FaShieldAlt size={11} /> Role
                  </label>
                  <p style={styles.value} className="ap-value">{profile.role}</p>
                </div>

                {profile.createdAt && (
                  <div>
                    <label style={styles.label}>
                      <FaCalendarAlt size={11} /> Admin Since
                    </label>
                    <p style={styles.value} className="ap-value">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 style={styles.heading} className="ap-heading">
                <FaLock /> Change Password
              </h2>

              <div style={styles.passwordGrid} className="ap-passwordgrid">
                <div style={styles.inputWrapper}>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    placeholder="Current Password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePassword}
                    style={{ ...styles.input, paddingRight: "40px" }}
                    className="ap-input"
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
                    className="ap-input"
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
                    className="ap-input"
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
        </div>
      </div>
    </div>
  );
};

const RESPONSIVE_CSS = `
  .ap-tabbar { -webkit-overflow-scrolling: touch; }
  .ap-tabbar::-webkit-scrollbar { display: none; }

  /* Tablet */
  @media (max-width: 900px) {
    .ap-page { padding: 14px !important; }
    .ap-header { padding: 14px 18px !important; }
    .ap-avatar { width: 54px !important; height: 54px !important; font-size: 22px !important; }
    .ap-name { font-size: 18px !important; }
    .ap-panel { padding: 18px !important; }
    .ap-formgrid { grid-template-columns: repeat(2, 1fr) !important; }
    .ap-passwordgrid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* Mobile landscape / small tablet */
  @media (max-width: 700px) {
    .ap-page { padding: 10px !important; }
    .ap-header { flex-direction: column; align-items: flex-start !important; padding: 12px 16px !important; gap: 10px !important; }
    .ap-editbtn { width: 100%; justify-content: center; padding: 8px 14px !important; }
    .ap-tabbar { overflow-x: auto; flex-wrap: nowrap !important; }
    .ap-tabbtn { flex: 0 0 auto !important; padding: 8px 12px !important; font-size: 13px !important; }
    .ap-panel { padding: 14px !important; }
    .ap-heading { margin-bottom: 10px !important; font-size: 14px !important; }
    .ap-formgrid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .ap-passwordgrid { grid-template-columns: 1fr !important; gap: 8px !important; margin-bottom: 10px !important; }
    .ap-value { font-size: 13px !important; }
    .ap-input { padding: 8px 10px !important; font-size: 13px !important; }
  }

  /* Small phone */
  @media (max-width: 460px) {
    .ap-userbox { gap: 10px !important; }
    .ap-avatar { width: 44px !important; height: 44px !important; font-size: 18px !important; }
    .ap-name { font-size: 16px !important; }
    .ap-namerow { gap: 6px !important; }
    .ap-formgrid { grid-template-columns: 1fr !important; }
    .ap-tablabel { display: none; }
    .ap-tabbtn { padding: 8px !important; }
  }
`;

const styles = {
  page: {
    width: "100%",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  shell: {
    width: "100%",
    maxWidth: "1100px",
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
    background: "#2563eb",
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
    color: "#1e293b",
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
    background: "#dbeafe",
    color: "#2563eb",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  editBtn: {
    background: "#2563eb",
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
    background: "#2563eb",
    color: "#fff",
  },

  panel: {
    background: "#fff",
    borderRadius: "10px",
    padding: "24px 28px",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    border: "1px solid #eef0f4",
  },

  heading: {
    color: "#2563eb",
    marginBottom: "18px",
    marginTop: 0,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "16px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
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
    background: "#dbeafe",
    color: "#991b1b",
    border: "1px solid #fecaca",
  },

  passwordGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px",
    marginBottom: "18px",
  },

  passwordBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
};

export default AdminProfile;