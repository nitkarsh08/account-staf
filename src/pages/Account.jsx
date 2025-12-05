
import React, { useState } from "react";

export default function Account() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Local editable states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSave = (e) => {
    e.preventDefault();

    // Validation alerts
    if (!name || !email) {
      alert("⚠️ Name and Email are required!");
      return;
    }

    // Update user object
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
      address,
    };

    // Save back to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("✔ Information Updated Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out!");
    window.location.href = "/login";  
  };

  return (
    <div className="box">
      <h2>Manage Account</h2>

      <form onSubmit={handleSave}>

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
<br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
        />
<br />
        <label>Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows="3"
        ></textarea>

        <button type="submit" style={{ marginTop: "10px" }}>
          Save Changes
        </button>
      </form>

      <button 
        onClick={handleLogout}
        style={{ marginTop: "15px", background: "crimson", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
}
