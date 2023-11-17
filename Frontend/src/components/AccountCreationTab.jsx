import React, { useState } from "react";
import "./AccountCreationTab.css";
import axios from "axios";

const AccountCreationTab = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailID, setEmailID] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/create",
        {
          username,
          password,
          phoneNumber,
          email: emailID,
        }
      );

      props.onCreate((prevState) => prevState + 1);
      props.notifySuccess();
      // Additional handling after successful account creation
      console.log("Account created successfully:", response.data);
    } catch (error) {
      console.error("Error creating account:", error);
      props.notifyError();
      // Handle error state
    }
  };

  return (
    <div className="container account-section gradient-bg">
      {/* Account Creation Form will be displayed here */}
      <form onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phn"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AccountCreationTab;
