import React from "react";

const IPDetailModal = ({ show, onClose, data }) => {
  if (!show || !data) return null;

  return (
    <>
      {/* MODAL */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1055
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div
            className="modal-content border-0 shadow"
            style={{ pointerEvents: "auto" }}
          >
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                {data.type} Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <strong>Title</strong>
                  <p>{data.title}</p>
                </div>

                <div className="col-md-6">
                  <strong>Status</strong><br />
                  <span className="badge bg-success">{data.status}</span>
                </div>

                <div className="col-md-6">
                  <strong>Owner</strong>
                  <p>{data.owner}</p>
                </div>

                <div className="col-md-6">
                  <strong>Country / Jurisdiction</strong>
                  <p>{data.country}</p>
                </div>

                <div className="col-md-6">
                  <strong>Filing Date</strong>
                  <p>{data.date}</p>
                </div>

                <div className="col-md-6">
                  <strong>IP Type</strong>
                  <p>{data.type}</p>
                </div>

                <div className="col-12">
                  <strong>Description</strong>
                  <p className="text-muted">
                    {data.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BACKDROP (CLICK TO CLOSE) */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default IPDetailModal;
