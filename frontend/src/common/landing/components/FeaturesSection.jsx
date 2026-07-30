const features = [
  {
    icon: "🔍",
    title: "Advanced IP Search",
    desc: "Search patents and trademarks using filters, keywords, and jurisdictions with fast results.",
  },
  {
    icon: "📊",
    title: "Visualization Dashboard",
    desc: "Interactive charts, radar graphs, donut charts and trend analysis for IP insights.",
  },
  {
    icon: "📋",
    title: "Filing Tracker",
    desc: "Track filing status, deadlines, renewals, and pending actions in one place.",
  },
  {
    icon: "⚖️",
    title: "Legal Status Monitoring",
    desc: "Monitor active, expired, pending filings with legal risk indicators.",
  },
  {
    icon: "🗺️",
    title: "Global IP Coverage",
    desc: "Country-wise IP distribution with interactive maps and insights.",
  },
  {
    icon: "👤",
    title: "Role-Based Access",
    desc: "Separate dashboards for Users and Admins with secure access control.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-5">
      <div className="container">

        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Powerful Features</h2>
          <p className="text-muted mt-2">
            Everything you need to manage your intellectual property efficiently
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 landing-feature-card">
                <div className="card-body">
                  <div style={{ fontSize: "36px" }}>{feature.icon}</div>
                  <h5 className="mt-3 fw-semibold">{feature.title}</h5>
                  <p className="text-muted small mt-2">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
