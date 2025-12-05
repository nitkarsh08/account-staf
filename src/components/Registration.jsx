import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// If you use framer-motion in your project, uncomment next line and the MotionDiv return.
// import { motion } from "framer-motion";
import "./Registration.css";

const MotionDiv = (props) => {
  // If framer-motion is available replace with: return <motion.div {...props} />;
  return <div {...props} />;
};

function speak(text) {
  try {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  } catch (e) {
    // ignore if not supported
  }
}

function readUsers() {
  try {
    const raw = localStorage.getItem("am_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeUsers(list) {
  localStorage.setItem("am_users", JSON.stringify(list));
}

export default function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (em) => /\S+@\S+\.\S+/.test(em);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Speak "Submit" when pressed
    speak("Submit");

    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = readUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError("Email already registered. Try logging in.");
        setLoading(false);
        return;
      }

      const id = Date.now();
      const newUser = {
        id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password // plain-text for demo only
      };
      users.push(newUser);
      writeUsers(users);

      const auth = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem("am_auth", JSON.stringify(auth));

      setLoading(false);
      navigate("/account");
    }, 500);
  };

  return (
    <MotionDiv className="registration-container">
      <form className="registration-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <div className="error">{error}</div>}

        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            inputMode="email"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        <div className="row">
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </MotionDiv>
  );
}
