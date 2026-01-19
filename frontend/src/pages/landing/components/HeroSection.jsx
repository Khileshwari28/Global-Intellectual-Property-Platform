import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="landing-hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <span className="badge bg-primary mb-3 px-3 py-2">
              Enterprise IP Management Platform
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Manage & Track Your <br />
              <span className="text-primary">Intellectual Property</span> Seamlessly
            </h1>

            <p className="text-muted fs-5 mb-4">
              Global IPI Platform helps organizations monitor patents,
              trademarks, and filings with real-time analytics, legal status
              tracking, and powerful visual dashboards.
            </p>

            <div className="d-flex gap-3">
              <Link to="/register" className="btn btn-primary btn-lg px-4">
                Get Started Free
              </Link>

              <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
                View Dashboard
              </Link>
            </div>

            {/* TRUST INFO */}
            <div className="d-flex gap-4 mt-4 text-muted small">
              <div>✔ Secure</div>
              <div>✔ Real-time Data</div>
              <div>✔ Admin & User Dashboards</div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="col-lg-6 text-center">
            <div className="hero-visual-card p-4">
              <h5 className="fw-bold mb-3">What You Can Do</h5>

              <ul className="list-unstyled text-start">
                <li className="mb-2">📊 Visualize IP filing trends</li>
                <li className="mb-2">⚖️ Track legal status & risks</li>
                <li className="mb-2">🗺️ Country-wise IP distribution</li>
                <li className="mb-2">👤 Role-based dashboards</li>
                <li className="mb-2">💳 Subscription-based access</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
