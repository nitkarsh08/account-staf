import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LoginPage.css";

function LoginPage() {
  const [users, setUsers] = useState([
    { username: "nitkarsh", email: "nitkarsh@gmail.com", password: "1234" }, // demo user
  ]);

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const exists = users.some((u) => u.email === formData.email);
    if (exists) {
      alert("User with this email already exists!");
    } else {
      setUsers([...users, formData]);
      alert("User registered successfully ✅");
      setFormData({ username: "", email: "", password: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) =>
        u.username === formData.username &&
        u.email === formData.email &&
        u.password === formData.password
    );
    if (foundUser) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👋 Welcome Back
        </motion.h2>
        <p>Log in or register a new account</p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <motion.div
            className="input-group"
            whileFocus={{ scale: 1.05 }}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              list="username-suggestions"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <datalist id="username-suggestions">
              {users.map((u, index) => (
                <option key={index} value={u.username} />
              ))}
            </datalist>
          </motion.div>

          {/* Email */}
          <motion.div className="input-group" whileFocus={{ scale: 1.05 }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              list="email-suggestions"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <datalist id="email-suggestions">
              {users.map((u, index) => (
                <option key={index} value={u.email} />
              ))}
            </datalist>
          </motion.div>

          {/* Password */}
          <motion.div className="input-group" whileFocus={{ scale: 1.05 }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Buttons */}
          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            🚀 Log In
          </motion.button>

          <motion.button
            type="button"
            className="register-btn"
            onClick={handleRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            ➕ Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
