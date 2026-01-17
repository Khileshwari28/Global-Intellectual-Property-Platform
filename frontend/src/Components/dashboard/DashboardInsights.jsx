import { Doughnut } from "react-chartjs-2";

const DashboardQuickAction = ({ completed, pending }) => {
  const total = completed + pending;
  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "rgba(25, 135, 84, 0.85)",
          "rgba(255, 193, 7, 0.85)"
        ],
        borderWidth: 0,
        cutout: "72%"
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h6 className="mb-3 text-muted fw-semibold">
          Quick Action
        </h6>

        <div style={{ height: "180px" }}>
          <Doughnut data={data} />
        </div>

        <div className="text-center mt-2">
          <div className="fw-bold text-success">
            {percent}% Completed
          </div>
          <small className="text-muted">
            Filing completion overview
          </small>
        </div>
      </div>
    </div>
  );
};

export default DashboardQuickAction;
