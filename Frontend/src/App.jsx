import React, { useState, useEffect } from "react";
import UserDetailsTab from "./components/UserDetailsTab";
import AccountCreationTab from "./components/AccountCreationTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const baseurl = "https://user-info-dashboard.onrender.com";

function App() {
  const [currentTab, setCurrentTab] = useState("userDetails");
  const [users, setUsers] = useState([]);
  const [newUserCreated, setNewUserCreated] = useState(0);

  const notifySuccess = () => toast.success("Account created Successfully");
  const notifyError = () => toast.error("Unable to Add");

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseurl}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newUserCreated]);

  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  const generateReport = (userId) => {
    // Handle report generation here
    console.log(`Generate report for user with ID ${userId}`);
    // Open a modal or perform any other action for report generation
  };

  return (
    <div>
      <ToastContainer />
      <div className="tabs">
        <button
          onClick={() => changeTab("userDetails")}
          className={currentTab === "userDetails" ? "active" : ""}
        >
          User Details
        </button>
        <button
          onClick={() => changeTab("accountCreation")}
          className={currentTab === "accountCreation" ? "active" : ""}
        >
          Account Creation
        </button>
      </div>

      {currentTab === "userDetails" && (
        <div className="tab-content">
          <UserDetailsTab users={users} generateReport={generateReport} />
        </div>
      )}

      {currentTab === "accountCreation" && (
        <div className="tab-content">
          <AccountCreationTab
            onCreate={setNewUserCreated}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
          />
        </div>
      )}
    </div>
  );
}

export default App;
