import { Link } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <header className="landing-topbar">
      <div className="container-fluid d-flex align-items-center justify-content-between px-4 h-100">

        {/* Logo / Brand */}
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: "26px" }}>🌍</span>
          <h4 className="mb-0 fw-bold text-primary">
            Global IPI Platform
          </h4>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="btn btn-outline-primary px-4">
            Login
          </Link>

          <Link to="/register" className="btn btn-primary px-4">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
