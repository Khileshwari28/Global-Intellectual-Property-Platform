import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Razorpay TEST Key */
const RAZORPAY_KEY = "rzp_test_S0yogPh9RsxaZ5";

const plans = [
  {
    name: "Basic",
    role: "BASIC",
    price: 0,
    displayPrice: "₹0",
    credits: "100 Credits",
    track: "Standard Search",
    updates: "Manual",
    support: "Email Only",
  },
  {
    name: "Professional",
    role: "PRO",
    price: 499,
    displayPrice: "₹499",
    credits: "5,000 Credits",
    track: "Legal Status Access",
    updates: "Real-time",
    support: "24/7 Priority",
    popular: true,
  },
  {
    name: "Enterprise",
    role: "ENTERPRISE",
    price: 1999,
    displayPrice: "₹1999",
    credits: "Unlimited",
    track: "Legal Status Access",
    updates: "Instant Push",
    support: "Dedicated Mgr",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  /* Load current plan */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentPlan(user?.plan || "Basic");
  }, []);

  const currentPlanPrice =
    plans.find((p) => p.name === currentPlan)?.price ?? 0;

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmUpgrade = () => {
    setShowModal(false);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    if (selectedPlan.price === 0) return;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: selectedPlan.price * 100,
      currency: "INR",
      name: "Global IP Platform",
      description: selectedPlan.name,

      handler: async function () {
        try {
          const res = await fetch(
            `http://localhost:8080/api/subscription/upgrade?userId=${user.id}&plan=${selectedPlan.name}`,
            { method: "POST" }
          );

          if (!res.ok) throw new Error("Upgrade failed");

          const subscription = await res.json();

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              plan: subscription.planName,
            })
          );

          setCurrentPlan(
            user?.plan
              ? user.plan.charAt(0) + user.plan.slice(1).toLowerCase()
              : "Basic"
          );

          alert(`Payment successful! Upgraded to ${selectedPlan.name}`);
          
          navigate("/dashboard");
        } catch (err) {
          console.error(err);
          alert("Subscription upgrade failed");
        }
      },
    });

    rzp.open();
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Choose the plan that's right for you</h1>

      <div style={styles.grid}>
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          const isDowngrade = plan.price < currentPlanPrice;
          const isHovered = hoveredPlan === plan.name;

          return (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                ...styles.card,
                ...(isCurrent ? styles.current : {}),
                ...(isHovered && !isCurrent ? styles.hovered : {}),
                ...(isDowngrade ? styles.disabledCard : {}),
              }}
            >
              {plan.popular && <div style={styles.popular}>Most Popular</div>}

              <h2>{plan.name}</h2>

              <div style={styles.body}>
                <Item label="Monthly price" value={plan.displayPrice} />
                <Item label="API Credits" value={plan.credits} />
                <Item label="Track" value={plan.track} />
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

/* ----------------- modal ----------------- */

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

/* ----------------- STYLES ----------------- */

const styles = {
  wrapper: { padding: 40, fontFamily: "Inter, Arial" },
  heading: { fontSize: 28, marginBottom: 32 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },

  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 24,
    background: "#fff",
    position: "relative",
    transition: "all 0.25s ease",
  },

  hovered: {
    border: "2px solid #2563eb",
    boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
    transform: "translateY(-4px)",
  },

  // current: { boxShadow: "0 0 0 2px #2563eb" },

  current: {
    background: "#f3f4f6",
    border: "2px solid #9ca3af",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  disabledCard: { opacity: 0.6 },

  popular: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#111827",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
  },

  body: { margin: "20px 0" },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
  },

  label: { color: "#6b7280" },
  value: { fontWeight: 500 },

  button: {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  currentBtn: {
    background: "#e5e7eb",
    color: "#374151",
    cursor: "not-allowed",
  },

  disabledBtn: {
    background: "#9ca3af",
    cursor: "not-allowed",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    width: 320,
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "10px 16px",
  },

  confirmBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
  },
};
