import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="page-background">
      <div className="base-document-container">
        <div className="card border-0 shadow-sm p-5 text-center">

          {/* LOGO / TITLE */}
          <h1 className="mb-3 fw-bold">Global IPI Platform</h1>
          <p className="text-muted mb-4">
            Manage, track, and analyze your intellectual property with ease.
          </p>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-outline-primary px-4">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary px-4">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
