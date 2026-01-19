import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="landing-footer py-4 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🌍 Global IPI Platform</h5>
            <p className="text-muted small">
              A centralized platform to manage, track and analyze
              intellectual property portfolios with smart visualization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Plans */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Subscription Plans</h6>
            <ul className="list-unstyled small text-muted">
              <li>Basic — Free</li>
              <li>Professional — ₹499 / month</li>
              <li>Enterprise — ₹1999 / month</li>
            </ul>
          </div>

        </div>

        <hr />

        {/* Bottom */}
        <div className="text-center small text-muted">
          © {new Date().getFullYear()} Global IPI Platform.  
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
