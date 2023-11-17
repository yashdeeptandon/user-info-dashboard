import React, { useState } from "react";
import UserDetailsTable from "./UserDetailsTable";
import ReportModal from "./ReportModal";
import "./UserDetailsTab.css";

const UserDetailsTab = ({ users }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openReportModal = (userId) => {
    setSelectedUserId(userId);
  };

  const closeReportModal = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="container input-container gradient-bg user-details-section">
      {users.length !== 0 && (
        <UserDetailsTable users={users} generateReport={openReportModal} />
      )}

      {selectedUserId !== null && (
        <ReportModal
          userId={selectedUserId}
          onClose={closeReportModal}
          onGenerateReport={(userId) => {
            console.log(`Generate report for user with ID ${userId}`);
          }}
        />
      )}
    </div>
  );
};

export default UserDetailsTab;
