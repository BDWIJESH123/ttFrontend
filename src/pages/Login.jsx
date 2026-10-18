
import { useState } from "react";
import "./Auth.css";

export default function Login({ onLogin, onRegister, onForgotPassword }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setError("");
    onLogin?.(username);
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <div className="auth-brand">Room<span>Book</span></div>

        <div className="showcase-content">
          <span className="showcase-label">SMART CAMPUS BOOKING</span>
          <h1>Your space.<br />Your schedule.<br /><span>Your way.</span></h1>
          <p>
            Find the right classroom or meeting room, check availability,
            and organize your campus sessions in one place.
          </p>

          <div className="feature-list">
            <div><span>✓</span> Easy room discovery</div>
            <div><span>✓</span> Simple booking management</div>
            <div><span>✓</span> One organized workspace</div>
          </div>
        </div>

        <p className="showcase-footer">ROOMBOOK · CAMPUS SPACE MANAGEMENT</p>
      </section>

      <section className="auth-form-section">
        <div className="auth-card">
          <div className="mobile-brand">Room<span>Book</span></div>
          <div className="form-icon">↗</div>

          <p className="form-eyebrow">WELCOME BACK</p>
          <h2>Sign in to your account</h2>
          <p className="form-description">
            Enter your details to access your workspace.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username or email</label>
            <input
              id="login-username"
              type="text"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />

            <div className="password-heading">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="text-button"
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="password-input">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="show-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-submit" type="submit">
              Sign In <span>→</span>
            </button>
          </form>

          <div className="form-divider"><span>NEW TO ROOMBOOK?</span></div>

          <button
            className="auth-secondary"
            type="button"
            onClick={onRegister}
          >
            Create an account
          </button>

          <p className="auth-terms">
            By continuing, you agree to use RoomBook responsibly.
          </p>
        </div>
      </section>
    </main>
  );
}
