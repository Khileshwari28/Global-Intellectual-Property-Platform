import React, { useState, useEffect } from "react";
import { getAdminTickets, replyToTicket } from "../api/supportApi";
import { FaHeadset, FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    getAdminTickets()
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Support fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const selectedTicket = tickets.find((t) => t.id === selectedId) || null;

  const handleSelect = (ticket) => {
    setSelectedId(ticket.id);
    setReplyText("");
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    setSending(true);

    replyToTicket(selectedTicket.id, replyText)
      .then((res) => {
        setTickets((prev) =>
          prev.map((t) => (t.id === selectedTicket.id ? { ...t, ...res.data } : t))
        );
        setReplyText("");
      })
      .catch((err) => console.error("Reply error:", err))
      .finally(() => setSending(false));
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <h2 style={styles.pageHeading}>
          <FaHeadset /> Help &amp; Support
        </h2>

        <div style={styles.layout}>
          {/* LEFT: ticket list */}
          <div style={styles.listPane}>
            {loading && <p style={styles.emptyText}>Loading tickets...</p>}

            {!loading && tickets.length === 0 && (
              <p style={styles.emptyText}>No support messages yet.</p>
            )}

            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => handleSelect(t)}
                style={{
                  ...styles.listItem,
                  ...(selectedId === t.id ? styles.listItemActive : {}),
                }}
              >
                <div style={styles.listItemTop}>
                  <span style={styles.listItemSubject}>{t.subject}</span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(t.status === "RESOLVED"
                        ? styles.statusResolved
                        : styles.statusOpen),
                    }}
                  >
                    {t.status}
                  </span>
                </div>
                <div style={styles.listItemEmail}>
                  <FaEnvelope size={11} /> {t.userEmail}
                </div>
                <div style={styles.listItemSnippet}>{t.message}</div>
              </div>
            ))}
          </div>

          {/* RIGHT: conversation view */}
          <div style={styles.chatPane}>
            {!selectedTicket && (
              <div style={styles.chatEmpty}>
                <FaHeadset size={40} color="#c7dbff" />
                <p style={{ color: "#94a3b8", marginTop: "10px" }}>
                  Select a message to view the conversation
                </p>
              </div>
            )}

            {selectedTicket && (
              <>
                <div style={styles.chatHeader}>
                  <div>
                    <h4 style={{ margin: 0, color: "#1e293b" }}>
                      {selectedTicket.subject}
                    </h4>
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>
                      <FaEnvelope size={11} /> {selectedTicket.userEmail}
                    </p>
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(selectedTicket.status === "RESOLVED"
                        ? styles.statusResolved
                        : styles.statusOpen),
                    }}
                  >
                    {selectedTicket.status}
                  </span>
                </div>

                <div style={styles.chatBody}>
                  {/* USER MESSAGE BUBBLE */}
                  <div style={styles.bubbleRowLeft}>
                    <div style={styles.bubbleUser}>
                      <p style={styles.bubbleText}>{selectedTicket.message}</p>
                      <span style={styles.bubbleTime}>
                        {selectedTicket.createdAt
                          ? new Date(selectedTicket.createdAt).toLocaleString()
                          : ""}
                      </span>
                    </div>
                  </div>

                  {/* ADMIN REPLY BUBBLE */}
                  {selectedTicket.adminReply && (
                    <div style={styles.bubbleRowRight}>
                      <div style={styles.bubbleAdmin}>
                        <p style={styles.bubbleText}>{selectedTicket.adminReply}</p>
                        <span style={styles.bubbleTimeLight}>
                          {selectedTicket.repliedAt
                            ? new Date(selectedTicket.repliedAt).toLocaleString()
                            : ""}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedTicket.adminReply && (
                    <div style={styles.resolvedNote}>
                      <FaCheckCircle color="#16a34a" /> You replied to this ticket
                    </div>
                  )}
                </div>

                {/* REPLY BOX */}
                <div style={styles.replyBox}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      selectedTicket.adminReply
                        ? "Send another reply (this will replace your previous reply)..."
                        : "Type your reply..."
                    }
                    style={styles.replyInput}
                    rows={3}
                  />
                  <button
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    style={{
                      ...styles.sendBtn,
                      opacity: sending || !replyText.trim() ? 0.6 : 1,
                    }}
                  >
                    <FaPaperPlane /> {sending ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    background: "#f5f7fb",
    height: "100vh",
    width: "100%",
    fontFamily: "Arial",
    boxSizing: "border-box",
  },
  shell: {
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  pageHeading: {
    color: "#1e40af",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  layout: {
    display: "flex",
    gap: "16px",
    flex: 1,
    minHeight: 0,
  },
  listPane: {
    width: "340px",
    flexShrink: 0,
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #eef0f4",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    overflowY: "auto",
    padding: "10px",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: "13.5px",
    padding: "14px",
    textAlign: "center",
  },
  listItem: {
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "6px",
    border: "1px solid transparent",
  },
  listItemActive: {
    background: "#e0ecff",
    border: "1px solid #c7dbff",
  },
  listItemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  listItemSubject: {
    fontWeight: "700",
    fontSize: "14px",
    color: "#1e293b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  listItemEmail: {
    fontSize: "12px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "4px",
  },
  listItemSnippet: {
    fontSize: "12.5px",
    color: "#94a3b8",
    marginTop: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  statusBadge: {
    fontSize: "10.5px",
    fontWeight: "bold",
    padding: "3px 8px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },
  statusOpen: {
    background: "#fef3c7",
    color: "#92400e",
  },
  statusResolved: {
    background: "#dcfce7",
    color: "#166534",
  },
  chatPane: {
    flex: 1,
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #eef0f4",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  chatEmpty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "16px 20px",
    borderBottom: "1px solid #eef0f4",
  },
  chatBody: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  bubbleRowLeft: {
    display: "flex",
    justifyContent: "flex-start",
  },
  bubbleRowRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  bubbleUser: {
    background: "#f1f5f9",
    color: "#1e293b",
    padding: "12px 14px",
    borderRadius: "12px 12px 12px 2px",
    maxWidth: "70%",
  },
  bubbleAdmin: {
    background: "#1e40af",
    color: "#fff",
    padding: "12px 14px",
    borderRadius: "12px 12px 2px 12px",
    maxWidth: "70%",
  },
  bubbleText: {
    margin: 0,
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  },
  bubbleTime: {
    display: "block",
    marginTop: "6px",
    fontSize: "10.5px",
    color: "#94a3b8",
  },
  bubbleTimeLight: {
    display: "block",
    marginTop: "6px",
    fontSize: "10.5px",
    color: "#c7dbff",
  },
  resolvedNote: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#64748b",
    justifyContent: "center",
    marginTop: "4px",
  },
  replyBox: {
    borderTop: "1px solid #eef0f4",
    padding: "14px 20px",
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
  },
  replyInput: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    fontFamily: "Arial",
    resize: "vertical",
    boxSizing: "border-box",
  },
  sendBtn: {
    background: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    height: "42px",
  },
};

export default AdminSupport;