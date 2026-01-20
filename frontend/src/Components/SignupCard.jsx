// import React from 'react';
// import { Link } from "react-router-dom";
// import SignupForm from './SignupForm';

// const SignupCard = () => {
//   return (
//     <div className="signup-form-card">
//       <h2 className="form-title">Create Your Account</h2>
//       <SignupForm />

//       <p className="login-footer">
//         By signing up, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
//       </p>
//       <p className="login-footer">
//         Already have an account?
//         <Link to="/login" className="text-blue-600 font-medium">
//           Sign In
//         </Link>
//       </p>
//     </div>
//   );
// };

//export default SignupCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

const SignupCard = () => {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <div className="signup-form-card" style={styles.card}>
      <h2 className="form-title" style={styles.title}>
        Create Your Account
      </h2>

      {/* This ensures the form stretches to the edges but labels stay left */}
      <div style={styles.formContainer}>
        <SignupForm />
      </div>

      <div style={styles.footerContainer}>
        <p style={styles.legalText}>
          By signing up, you agree to our{" "}
          <span onClick={() => setShowLegal(true)} style={styles.link}>
            Terms & Privacy Policy
          </span>
        </p>

        <p style={styles.loginRedirect}>
          Already have an account?{" "}
          <Link to="/login" style={styles.signInLink}>
            Sign In
          </Link>
        </p>
      </div>

      {/* MODAL  */}
      {showLegal && (
        <div style={styles.overlay} onClick={() => setShowLegal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Legal Agreements</h3>
              <button onClick={() => setShowLegal(false)} style={styles.closeX}>
                &times;
              </button>
            </div>

            <div style={styles.scrollArea}>
              <h4 style={styles.sectionTitle}>Terms of Service</h4>
              <p style={styles.p}>
                By using Global IP, you agree to our search protocols and data
                management policies.
              </p>
              <h4 style={styles.sectionTitle}>Privacy Policy</h4>
              <p style={styles.p}>
                We use industry-standard encryption to protect your account
                information.
              </p>
            </div>

            <button onClick={() => setShowLegal(false)} style={styles.doneBtn}>
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: "40px",
    background: "#fff",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "480px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#0f172a",
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    textAlign: "left",
  },
  footerContainer: {
    marginTop: "24px",
    textAlign: "center",
    width: "100%",
  },
  legalText: { fontSize: "13px", color: "#64748b", marginBottom: "8px" },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
  loginRedirect: { fontSize: "14px", color: "#1e293b" },
  signInLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.4)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  },
  modal: {
    background: "#fff",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  closeX: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#94a3b8",
    cursor: "pointer",
  },
  scrollArea: { maxHeight: "200px", overflowY: "auto", textAlign: "left" },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
    marginTop: "16px",
  },
  p: { fontSize: "13px", color: "#64748b", lineHeight: "1.6" },
  doneBtn: {
    width: "100%",
    marginTop: "24px",
    padding: "12px",
    borderRadius: "12px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default SignupCard;
