import { useState } from "react";

function ForgotPassword({ onLogin }) {

  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter your username");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">
          <div className="brand-logo">RB</div>

          <div>
            <h2>RoomBook</h2>
            <span>Campus Booking System</span>
          </div>
        </div>

        <div className="auth-hero">

          <span className="auth-tag">
            ACCOUNT RECOVERY
          </span>

          <h1>
            Get back into
            <br />
            your account.
          </h1>

          <p>
            Don't worry. Enter your username and follow the
            recovery steps to reset your password.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="login-card">

          <div className="recovery-icon">
            ↻
          </div>

          <div className="login-heading">

            <span>RESET PASSWORD</span>

            <h2>
              Forgot your password?
            </h2>

            <p>
              Enter your username to continue with
              password recovery.
            </p>

          </div>

          {!submitted ? (

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label>Username</label>

                <div className="input-wrapper">

                  <span>♙</span>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                  />

                </div>

              </div>

              <button className="login-button">
                Continue
                <span>→</span>
              </button>

            </form>

          ) : (

            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <h3>Request received</h3>

              <p>
                Your password recovery request has been
                submitted. Follow the recovery instructions
                provided by the system.
              </p>

            </div>

          )}

          <div className="register-text">

            <button onClick={onLogin}>
              ← Back to Sign In
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;