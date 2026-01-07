import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*  Razorpay TEST Key */
const RAZORPAY_KEY = "rzp_test_S0yogPh9RsxaZ5"; 

const CURRENT_PLAN = "Basic"; 

const plans = [
  {
    name: "Basic",
    price: 0,
    displayPrice: "₹0",
    credits: "100 Credits",
    search: "Standard Search",
    updates: "Manual",
    support: "Email Only",
  },
  {
    name: "Professional",
    price: 499,
    displayPrice: "₹499",
    credits: "5,000 Credits",
    search: "Advanced Track",
    updates: "Real-time",
    support: "24/7 Priority",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 1999,
    displayPrice: "₹1999",
    credits: "Unlimited",
    search: "Full API Access",
    updates: "Instant Push",
    support: "Dedicated Mgr",
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  const currentPlanPrice = plans.find((p) => p.name === CURRENT_PLAN)?.price;
  
  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };
  
 const confirmUpgrade = () => {
  setShowModal(false);

  // Free plan → instant upgrade
  if (selectedPlan.price === 0) {
    applyRole(selectedPlan.role);
    alert(`Upgraded to ${selectedPlan.name} plan!`);
    navigate("/dashboard");
    return;
  }

  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY,
    amount: selectedPlan.price * 100,
    currency: "INR",
    name: "Demo App",
    description: selectedPlan.name,
    theme: { color: "#2563eb" },
    handler: function (response) {
      // Payment completed (success alert after card entry)
      alert(`Payment successful! Upgraded to ${selectedPlan.name}`);
      applyRole(selectedPlan.role);
      navigate("/dashboard");
    },
    modal: {
      ondismiss: function () {
        //  Even if user closes/fails payment, we treat as success for demo
        alert(`Payment successful (Demo Mode)! Upgraded to ${selectedPlan.name}`);
        applyRole(selectedPlan.role);
        navigate("/dashboard");
      },
    },
  });

  rzp.open();
};
  

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Choose the plan that's right for you</h1>

      <div style={styles.grid}>
        {plans.map((plan) => {
          const isCurrent = plan.name === CURRENT_PLAN;
          const isDowngrade = plan.price < currentPlanPrice;

          return (
            <div
              key={plan.name}
              style={{
                ...styles.card,
                ...(isCurrent ? styles.current : {}),
                ...(isDowngrade ? styles.disabledCard : {}),
              }}
            >
              {plan.popular && <div style={styles.popular}>Most Popular</div>}

              <h2>{plan.name}</h2>

              <div style={styles.body}>
                <Item label="Monthly price" value={plan.displayPrice} />
                <Item label="API Credits" value={plan.credits} />
                <Item label="Search & Track" value={plan.search} />
                <Item label="Data Updates" value={plan.updates} />
                <Item label="Support" value={plan.support} />
              </div>

              <button
                disabled={isCurrent || isDowngrade}
                style={{
                  ...styles.button,
                  ...(isCurrent ? styles.currentBtn : {}),
                  ...(isDowngrade ? styles.disabledBtn : {}),
                }}
                onClick={() => handleSelect(plan)}
              >
                {isCurrent
                  ? "Current Plan"
                  : isDowngrade
                  ? "Downgrade Disabled"
                  : "Select Plan"}
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <ConfirmModal
          plan={selectedPlan}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmUpgrade}
        />
      )}
    </div>
  );
}

/* Role storage */
function applyRole(role) {
  const existingUser = JSON.parse(localStorage.getItem("user")) || {
    id: 1,
    email: "test@test.com",
  };

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...existingUser,
      role,
    })
  );
}

/* Confirm modal */
function ConfirmModal({ plan, onCancel, onConfirm }) {
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <h3>Confirm Upgrade</h3>
        <p>
          Upgrade to <strong>{plan.name}</strong> for {plan.displayPrice}/month?
        </p>

        <div style={styles.modalActions}>
          <button onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} style={styles.confirmBtn}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const Item = ({ label, value }) => (
  <div style={styles.item}>
    <span style={styles.label}>{label}</span>
    <span style={styles.value}>{value}</span>
  </div>
);


const styles = {
  wrapper: { padding: "40px", fontFamily: "Inter, Arial, sans-serif" },
  heading: { fontSize: "28px", marginBottom: "32px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "24px",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  current: { boxShadow: "0 0 0 2px #2563eb" },
  disabledCard: { opacity: 0.6 },
  popular: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#111827",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  body: { margin: "20px 0" },
  item: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e5e7eb", fontSize: "14px" },
  label: { color: "#6b7280" },
  value: { fontWeight: "500" },
  button: { padding: "12px", borderRadius: "8px", border: "none", fontSize: "14px", cursor: "pointer", background: "#2563eb", color: "#fff" },
  currentBtn: { background: "#e5e7eb", color: "#374151", cursor: "not-allowed" },
  disabledBtn: { background: "#9ca3af", cursor: "not-allowed" },
  modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#fff", padding: 24, borderRadius: 12, width: 320 },
  modalActions: { display: "flex", justifyContent: "space-between", marginTop: 20 },
  cancelBtn: { background: "#e5e7eb", border: "none", padding: "10px 16px", borderRadius: 6 },
  confirmBtn: { background: "#2563eb", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 6 },
};
