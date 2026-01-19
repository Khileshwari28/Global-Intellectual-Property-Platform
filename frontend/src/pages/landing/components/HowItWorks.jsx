const steps = [
  {
    step: "01",
    title: "Register & Login",
    desc: "Create your account and securely login to access the Global IP Platform.",
    icon: "📝",
  },
  {
    step: "02",
    title: "Search & Track IP",
    desc: "Search patents and trademarks, track filings, deadlines and jurisdictions.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "Analyze & Visualize",
    desc: "View IP trends, charts, radar graphs, country-wise distributions and KPIs.",
    icon: "📊",
  },
  {
    step: "04",
    title: "Upgrade for More Power",
    desc: "Unlock Legal Status, real-time updates and admin insights with Pro plans.",
    icon: "🚀",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted mt-2">
            Simple steps to manage your intellectual property efficiently
          </p>
        </div>

        {/* Steps */}
        <div className="row g-4">
          {steps.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="mb-3" style={{ fontSize: "40px" }}>
                    {item.icon}
                  </div>

                  <span className="badge bg-primary mb-2">
                    Step {item.step}
                  </span>

                  <h5 className="fw-semibold mt-3">{item.title}</h5>
                  <p className="text-muted small mt-2">
                    {item.desc}
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

export default HowItWorks;
