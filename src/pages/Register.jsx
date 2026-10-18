
import { useState } from "react";
import "./Auth.css";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(
      "Your form is valid. Account creation will work after backend integration."
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <div className="auth-brand">Room<span>Book</span></div>

        <div className="showcase-content">
          <span className="showcase-label">GET STARTED TODAY</span>
          <h1>Make room<br />for better<br /><span>planning.</span></h1>
          <p>
            Create your account to discover spaces and organize
            your classroom and meeting room bookings.
          </p>
          <div className="feature-list">
            <div><span>✓</span> One place for campus spaces</div>
            <div><span>✓</span> Organized booking requests</div>
            <div><span>✓</span> Simple and convenient access</div>
          </div>
        </div>

        <p className="showcase-footer">ROOMBOOK · CAMPUS SPACE MANAGEMENT</p>
      </section>

      <section className="auth-form-section">
        <div className="auth-card register-card">
          <div className="mobile-brand">Room<span>Book</span></div>
          <p className="form-eyebrow">CREATE YOUR ACCOUNT</p>
          <h2>Join RoomBook</h2>
          <p className="form-description">
            Fill in your details to get started.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="reg-username">Full name</label>
            <input
              id="reg-username"
              name="username"
              placeholder="Enter your full name"
              value={form.username}
              onChange={updateField}
              autoComplete="name"
              required
            />

            <label htmlFor="reg-email">University email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="you@university.edu"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              required
            />

            <label htmlFor="reg-department">Department</label>
            <select
              id="reg-department"
              name="department"
              value={form.department}
              onChange={updateField}
              required
            >
              <option value="">Select your department</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="EEE">Electrical (EEE)</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
              <option value="OTHER">Other</option>
            </select>

            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={updateField}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label htmlFor="reg-confirm">Confirm password</label>
            <input
              id="reg-confirm"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password again"
              value={form.confirmPassword}
              onChange={updateField}
              autoComplete="new-password"
              required
            />

            {error && (
              <p className={error.startsWith("Your form") ? "auth-success" : "auth-error"}>
                {error}
              </p>
            )}

            <button className="auth-submit" type="submit">
              Create Account <span>→</span>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button type="button" className="text-button" onClick={onLogin}>
              Sign in
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
