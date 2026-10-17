import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/AuthPage.css";
import { createUser, loginUser } from "../services/authService";

const AuthPage = ({ mode }) => {
  const isRegistering = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isRegistering) {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setNotice("Your passwords don't match. Please try again.");
        return;
      }
    }

    if (!event.currentTarget.checkValidity()) {
      setNotice("Please fill out all required fields correctly.");
      return;
    }
    setIsSubmitting(true);
    let resp;
    if (isRegistering)
      resp = await createUser({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
    else
      resp = await loginUser({
        email: formData.get("email"),
        password: formData.get("password"),
      });

    if (resp) {
      if (resp?.success) navigate("/home");
      else setNotice(resp?.message);
    } else setNotice("Oops!! Something went wrong. Please try again.");

    setIsSubmitting(false);
  };

  return (
    <main className="auth-page">
      <section
        className="auth-card"
        aria-labelledby="auth-heading"
        data-mode={mode}
      >
        <aside className="auth-showcase">
          <Link className="auth-brand" to="/" aria-label="HiveMind AI home">
            <span className="auth-brand-mark" aria-hidden="true">
              H
            </span>
            <span>HiveMind AI</span>
          </Link>

          <div className="showcase-copy">
            <span className="showcase-eyebrow">A little more room to grow</span>
            <h2>Make space for your next big idea.</h2>
            <p>
              A calmer place to bring your work together, find your focus, and
              make meaningful progress.
            </p>
          </div>

          <div className="showcase-note">
            <span className="showcase-note-icon" aria-hidden="true">
              ✦
            </span>
            <p>
              “The best work happens when everything finally feels in its
              place.”
            </p>
          </div>
          <div
            className="showcase-orbit showcase-orbit-one"
            aria-hidden="true"
          />
          <div
            className="showcase-orbit showcase-orbit-two"
            aria-hidden="true"
          />
        </aside>

        <div className="auth-content">
          <div className="auth-heading">
            <span className="auth-kicker">
              {isRegistering ? "GET STARTED" : "WELCOME BACK"}
            </span>
            <h1 id="auth-heading">
              {isRegistering ? "Create your account" : "Sign in to HiveMind AI"}
            </h1>
            <p>
              {isRegistering
                ? "Your next chapter starts with a few details."
                : "Pick up where you left off. Your space is waiting."}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <label className="auth-field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <span className="auth-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={
                    isRegistering ? "At least 3 characters" : "Your password"
                  }
                  autoComplete={
                    isRegistering ? "new-password" : "current-password"
                  }
                  minLength={isRegistering ? 3 : undefined}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            {isRegistering ? (
              <label className="auth-field">
                <span>Confirm password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  minLength={3}
                  required
                />
              </label>
            ) : (
              <div className="auth-form-options">
                {/* <label className="remember-option">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label> */}
                {/* <a  href="mailto:support@novi.example?subject=Password%20reset">
                  Forgot password?
                </a> */}
              </div>
            )}

            {notice && (
              <p className="auth-notice" role="status">
                {notice}
              </p>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loader" aria-label="Loading" role="status" />
              ) : (
                <Fragment>
                  {isRegistering ? "Create account" : "Sign in"}
                  <span aria-hidden="true">→</span>
                </Fragment>
              )}
            </button>
          </form>

          <p className="auth-switch">
            {isRegistering ? "Already have an account?" : "New to HiveMind AI?"}{" "}
            <Link to={isRegistering ? "/login" : "/register"}>
              {isRegistering ? "Sign in" : "Create an account"}
            </Link>
          </p>

          <p className="auth-legal">
            By continuing, you agree to our <a href="#terms">Terms</a> and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
