import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful");
      console.log("Token:", data.token);

      localStorage.setItem("token", data.token);
      console.log("SignIn successful");
      navigate("/dashboard");

    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue managing your tasks.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>

        <p className="home-text">
            <Link to="/">Back to Home</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;