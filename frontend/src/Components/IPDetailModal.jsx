import React from "react";

const IPDetailModal = ({ show, onClose, data }) => {
  if (!show || !data) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1055 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">{data.type} Details</h5>
              <button className="btn-close" onClick={onClose}></button>
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
                  <strong>Assignee</strong>
                  <p>{data.owner || "Not Available"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Country</strong>
                  <p>{data.country}</p>
                </div>

                <div className="col-md-6">
                  <strong>IP Type</strong>
                  <p>{data.type}</p>
                </div>

                <div className="col-md-6">
                  <strong>Issuing Authority</strong>
                  <p>{data.issuingAuthority}</p>
                </div>

                {/* ✅ NEW: Filing Date */}
                <div className="col-md-6">
                  <strong>Filing Date</strong>
                  <p>{data.filingDate || "Not Available"}</p>
                </div>

                {/* ✅ NEW: Grant Date */}
                <div className="col-md-6">
                  <strong>Grant Date</strong>
                  <p>{data.grantDate || "Not Granted Yet"}</p>
                </div>

                <div className="col-12">
                  <strong>Description</strong>
                  <p className="text-muted">
                    {data.description || "No description available."}
                  </p>
                </div>

              </div>

              {data.pdfLink && (
                <div className="col-12 mt-3">
                  <a
                    href={data.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    📄 Download Patent PDF
                  </a>
                </div>
              )}



            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default IPDetailModal;
