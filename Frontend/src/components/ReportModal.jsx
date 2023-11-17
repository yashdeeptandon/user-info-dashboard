import React from "react";
import "./ReportModal.css";

const ReportModal = ({ userId, onClose, onGenerateReport }) => {
  const handleGenerateReport = () => {
    onGenerateReport(userId);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Generate Report</h2>
        <p>Are you sure you want to generate a report for this user?</p>
        <button onClick={handleGenerateReport}>Close</button>
      </div>
    </div>
  );
};

export default ReportModal;
