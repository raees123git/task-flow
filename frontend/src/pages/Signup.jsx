import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function handleSignup(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      console.log("Signup response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      console.log("Signup successful");
      navigate("/dashboard");

    } catch (error) {
      alert("Signup failed with error: \n" + error.message);
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Create an account to start managing your tasks.
        </p>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

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

          <button className="signup-button" type="submit">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>

        <p className="home-text">
            <Link to="/">Back to Home</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;