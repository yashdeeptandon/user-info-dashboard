import React, { useState } from "react";
import "./UserDetailsTable.css";

const UserDetailsTable = ({ users, generateReport }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const { username = "", email = "", phone = "" } = user || {};

    return (
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by Username, Email, or Phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => generateReport(user._id)}>
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailsTable;
