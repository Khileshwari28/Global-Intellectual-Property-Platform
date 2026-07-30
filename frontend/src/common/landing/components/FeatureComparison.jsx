const FeatureComparison = () => {
  const features = [
    { name: "IP Search & Filing Tracker", basic: true, pro: true, enterprise: true },
    { name: "Visualization Dashboard", basic: false, pro: true, enterprise: true },
    { name: "Legal Status Monitoring", basic: false, pro: true, enterprise: true },
    { name: "Automated Alerts", basic: false, pro: false, enterprise: true },
    { name: "Admin Dashboard Access", basic: false, pro: false, enterprise: true },
    { name: "Support", basic: "Email", pro: "Priority", enterprise: "Dedicated" },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Compare Plans</h2>
          <p className="text-muted">
            See what you get with each subscription tier
          </p>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle bg-white shadow-sm">
            <thead className="table-light">
              <tr>
                <th className="text-start">Features</th>
                <th>BASIC</th>
                <th className="text-primary">PRO</th>
                <th className="text-success">ENTERPRISE</th>
              </tr>
            </thead>

            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="text-start fw-medium">{feature.name}</td>

                  <td>
                    {typeof feature.basic === "boolean"
                      ? feature.basic ? "✔️" : "❌"
                      : feature.basic}
                  </td>

                  <td>
                    {typeof feature.pro === "boolean"
                      ? feature.pro ? "✔️" : "❌"
                      : feature.pro}
                  </td>

                  <td>
                    {typeof feature.enterprise === "boolean"
                      ? feature.enterprise ? "✔️" : "❌"
                      : feature.enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default FeatureComparison;
