import React, { useEffect, useState } from "react";
import axios from "axios";

const IPDetailModal = ({ ipId, source, onClose }) => {

  const [ip, setIp] = useState(null);

  useEffect(() => {
    if (!ipId) return;

    const url = source === "user"
      ? `http://localhost:8080/api/user-filings/${ipId}`
      : `http://localhost:8080/api/ip/${ipId}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (source === "user") {
          // Normalize UserFiling shape into the same fields the JSX expects
          setIp({
            title: data.keyword,
            type: data.assetType,
            owner: null,               // no equivalent on UserFiling
            country: data.jurisdiction,
            issuingAuthority: null,    // no equivalent on UserFiling
            filingDate: data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : null,
            grantDate: null,           // no equivalent on UserFiling
            pdfLink: null,             // no equivalent on UserFiling
            description: data.description,
            status: data.status,
          });
        } else {
          // IPDetailDTO already matches the JSX field names directly
          setIp(data);
        }
      })
      .catch((err) => console.error(err));
  }, [ipId, source]);

  if (!ip) return null;
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1055 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow">

            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">{ip.type} Details</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-3">

                <div className="col-md-6">
                  <strong>Title</strong>
                  <p>{ip.title}</p>
                </div>

                <div className="col-md-6">
                  <strong>Status</strong><br />
                  <span className="badge bg-success">{ip.status}</span>
                </div>

                <div className="col-md-6">
                  <strong>Assignee</strong>
                  <p>{ip.owner || "Not Available"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Country</strong>
                  <p>{ip.country}</p>
                </div>

                <div className="col-md-6">
                  <strong>IP Type</strong>
                  <p>{ip.type}</p>
                </div>

                <div className="col-md-6">
                  <strong>Issuing Authority</strong>
                  <p>{ip.issuingAuthority}</p>
                </div>

                <div className="col-md-6">
                  <strong>Filing Date</strong>
                  <p>{ip.filingDate || "Not Available"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Grant Date</strong>
                  <p>{ip.grantDate || "Not Granted Yet"}</p>
                </div>

                <div className="col-12">
                  <strong>Description</strong>
                  <p className="text-muted">
                    {ip.description || "No description available."}
                  </p>
                </div>

              </div>

              {ip.pdfLink && (
                <div className="mt-3">
                  <a
                    href={ip.pdfLink}
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

      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default IPDetailModal;
