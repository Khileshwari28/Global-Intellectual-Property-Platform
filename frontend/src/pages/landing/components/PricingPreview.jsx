import { Link } from "react-router-dom";

const plans = [
  {
    name: "BASIC",
    price: "₹0",
    features: [
      "Standard Search",
      "Basic IP Tracking",
      "Manual Updates",
      "Email Support",
    ],
  },
  {
    name: "PROFESSIONAL",
    price: "₹499 / month",
    popular: true,
    features: [
      "Legal Status Access",
      "Real-time Updates",
      "Advanced Visualizations",
      "Priority Support",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "₹1999 / month",
    features: [
      "Unlimited Access",
      "Admin Dashboard",
      "Instant Alerts",
      "Dedicated Manager",
    ],
  },
];

const PricingPreview = () => {
  return (
    <section className="py-5">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Subscription Plans</h2>
          <p className="text-muted mt-2">
            Choose a plan that fits your intellectual property needs
          </p>
        </div>

        {/* Plans */}
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className={`card h-100 border-0 shadow-sm text-center ${
                  plan.popular ? "border-primary" : ""
                }`}
              >
                {plan.popular && (
                  <span className="badge bg-primary position-absolute top-0 start-50 translate-middle px-3">
                    Most Popular
                  </span>
                )}

                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">{plan.name}</h4>
                  <h2 className="text-primary mb-3">{plan.price}</h2>

                  <ul className="list-unstyled text-muted mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2">
                        ✅ {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`btn ${
                      plan.popular ? "btn-primary" : "btn-outline-primary"
                    } w-100`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingPreview;
