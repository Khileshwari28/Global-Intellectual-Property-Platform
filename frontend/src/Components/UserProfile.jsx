import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaChevronRight,
  FaHeadset,
  FaTimes,
  FaCheckCircle,
  FaUserShield,
  FaLock,
  FaBuilding,
  FaEdit,
  FaSave,
  FaPen,
} from "react-icons/fa";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  const [userData, setUserData] = useState({
    name: "Manika Sethi",
    userId: "USR-88219",
    email: "manika.sethi@legalipsolutions.com",
    company: "Legal IP Solutions",
    tier: "Enterprise",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.pageContainer}>
      {/* --- HEADER --- */}
      <div style={styles.header}>
        <div style={styles.profileInfo}>
          <div style={styles.avatar}>{userData.name[0]}</div>
          <div>
            <h1 style={styles.userName}>{userData.name}</h1>
            <p style={styles.userSub}>
              <FaBuilding size={12} /> {userData.company}
            </p>
          </div>
        </div>
        <button onClick={() => navigate("/login")} style={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div style={styles.grid}>
        {/* LEFT COLUMN */}
        <div style={styles.leftCol}>
          {/* SUPPORT & ASSISTANCE (REMOVED HELP CENTER) */}
          <div style={styles.card}>
            <h3 style={styles.cardLabel}>
              <FaHeadset style={{ marginRight: "8px" }} /> SUPPORT & ASSISTANCE
            </h3>
            {!showContactForm ? (
              <>
                <h2 style={styles.cardTitle}>Need technical help?</h2>
                <p style={styles.cardText}>
                  Our IP experts are available 24/7 to assist with your queries.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  style={styles.primaryBtn}
                >
                  <FaUserShield /> Contact Support
                </button>
              </>
            ) : (
              <div style={styles.formContainer}>
                <div style={styles.flexBetween}>
                  <span style={styles.formSmallLabel}>MESSAGE SUPPORT</span>
                  <FaTimes
                    onClick={() => setShowContactForm(false)}
                    style={{ cursor: "pointer", color: "#94a3b8" }}
                  />
                </div>
                <textarea
                  placeholder="How can we help?"
                  style={styles.textArea}
                />
                <button
                  onClick={() => setShowContactForm(false)}
                  style={styles.primaryBtn}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>

          {/* SECURITY */}
          <div style={styles.card}>
            <h3 style={styles.cardLabel}>
              <FaLock style={{ marginRight: "8px" }} /> SECURITY
            </h3>
            {!showPassForm ? (
              <button
                onClick={() => setShowPassForm(true)}
                style={styles.passTrigger}
              >
                Update Password <FaChevronRight size={10} />
              </button>
            ) : (
              <div style={styles.formContainer}>
                <label style={styles.miniLabel}>CURRENT PASSWORD</label>
                <input
                  type="password"
                  style={styles.miniInput}
                  placeholder="••••••••"
                />
                <label style={styles.miniLabel}>NEW PASSWORD</label>
                <input
                  type="password"
                  style={styles.miniInput}
                  placeholder="Enter new password"
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button
                    onClick={() => setShowPassForm(false)}
                    style={styles.smallSaveBtn}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowPassForm(false)}
                    style={styles.smallCancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.rightCol}>
          {/* REGISTRATION DETAILS */}
          <div style={styles.card}>
            <div style={styles.flexBetween}>
              <h3 style={styles.cardLabel}>REGISTRATION DETAILS</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={
                  isEditing ? styles.saveDetailsBtn : styles.editDetailsBtn
                }
              >
                {isEditing ? (
                  <>
                    <FaSave /> Save Changes
                  </>
                ) : (
                  <>
                    <FaEdit /> Update Profile
                  </>
                )}
              </button>
            </div>

            <div style={styles.infoGrid}>
              <div style={isEditing ? styles.infoItemEditing : styles.infoItem}>
                <div style={styles.flexBetween}>
                  <label style={styles.infoLabel}>FULL NAME</label>
                  {!isEditing && <FaPen size={10} color="#3b82f6" />}
                </div>
                {isEditing ? (
                  <input
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.infoValue}>{userData.name}</div>
                )}
              </div>

              <div style={styles.infoItemDisabled}>
                <label style={styles.infoLabel}>USER ID</label>
                <div style={styles.infoValue}>{userData.userId}</div>
              </div>

              <div style={isEditing ? styles.infoItemEditing : styles.infoItem}>
                <div style={styles.flexBetween}>
                  <label style={styles.infoLabel}>OFFICIAL EMAIL</label>
                  {!isEditing && <FaPen size={10} color="#3b82f6" />}
                </div>
                {isEditing ? (
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={{ ...styles.infoValue, color: "#1e3a8a" }}>
                    {userData.email}
                  </div>
                )}
              </div>

              <div style={isEditing ? styles.infoItemEditing : styles.infoItem}>
                <div style={styles.flexBetween}>
                  <label style={styles.infoLabel}>FIRM NAME</label>
                  {!isEditing && <FaPen size={10} color="#3b82f6" />}
                </div>
                {isEditing ? (
                  <input
                    name="company"
                    value={userData.company}
                    onChange={handleChange}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.infoValue}>{userData.company}</div>
                )}
              </div>

              <div style={styles.infoItemDisabled}>
                <label style={styles.infoLabel}>ACCOUNT TIER</label>
                <div style={styles.infoValue}>
                  <FaCheckCircle color="#22c55e" /> {userData.tier}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: "#f4f7fa",
    minHeight: "100vh",
    padding: "40px 60px",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  profileInfo: { display: "flex", alignItems: "center", gap: "15px" },
  avatar: {
    width: "55px",
    height: "55px",
    background: "#1e3a8a",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
  },
  userName: {
    fontSize: "24px",
    fontWeight: "800",
    margin: 0,
    color: "#1e3a8a",
  },
  userSub: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "4px 0 0 0",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  logoutBtn: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  grid: { display: "flex", gap: "30px" },
  leftCol: { flex: "1 1 350px" },
  rightCol: { flex: "2 1 600px" },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "25px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
  },
  cardLabel: {
    fontSize: "10px",
    fontWeight: "900",
    color: "#1e3a8a",
    letterSpacing: "1px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
  },
  cardTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "8px" },
  cardText: { color: "#64748b", fontSize: "14px", marginBottom: "25px" },
  editDetailsBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  saveDetailsBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginTop: "10px",
  },
  infoItem: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    transition: "0.2s",
  },
  infoItemEditing: {
    background: "#eff6ff",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #3b82f6",
    transition: "0.2s",
  },
  infoItemDisabled: {
    background: "#f1f5f9",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    opacity: 0.7,
  },
  infoLabel: {
    fontSize: "9px",
    fontWeight: "900",
    color: "#94a3b8",
    marginBottom: "8px",
    display: "block",
  },
  infoValue: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  editInput: {
    width: "100%",
    padding: "4px 0",
    border: "none",
    borderBottom: "2px solid #3b82f6",
    background: "transparent",
    outline: "none",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e3a8a",
  },
  passTrigger: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "14px",
    border: "1px solid #f1f5f9",
    textAlign: "left",
    background: "white",
    fontWeight: "700",
    color: "#1e3a8a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  formContainer: { display: "flex", flexDirection: "column", gap: "8px" },
  miniLabel: { fontSize: "9px", fontWeight: "900", color: "#94a3b8" },
  miniInput: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    outline: "none",
    fontSize: "14px",
  },
  smallSaveBtn: {
    padding: "10px 20px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  smallCancelBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "12px",
    cursor: "pointer",
  },
  textArea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    minHeight: "80px",
    marginBottom: "10px",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  formSmallLabel: { fontSize: "9px", fontWeight: "900", color: "#1e3a8a" },
};

export default UserProfile;
