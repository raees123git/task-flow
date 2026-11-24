import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-card">

        <h1>Welcome to Todo App</h1>

        <p className="home-subtitle">
          Organize your tasks and stay productive.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="home-login-button">
            Login
          </Link>

          <Link to="/signup" className="home-signup-button">
            Signup
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;