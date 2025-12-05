import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("⚠️ No account found! Please register first.");
      return;
    }

    if (email === user.email && pass === user.pass) {
      alert("✔ Login Successful!");
      navigate("/account");
    } else {
      alert("❌ Incorrect Email or Password!");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Enter Password"
          value={pass} onChange={(e) => setPass(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
