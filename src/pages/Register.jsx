import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !pass) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const user = { name, email, pass };
    localStorage.setItem("user", JSON.stringify(user));

    alert("✔ Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="box">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Enter Name"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder="Enter Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Enter Password"
          value={pass} onChange={(e) => setPass(e.target.value)} />

        <button type="submit">Register</button>
      </form>

      <p onClick={() => navigate("/login")} className="link">
        Already have an account? Login
      </p>
    </div>
  );
}
