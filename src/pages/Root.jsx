import { Link } from "react-router-dom";
import "../style/Root.css";

const FEATURES = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "PDF Reader",
    desc: "Upload any PDF and have a conversation with its contents. Get instant, precise answers.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Chat Agent",
    desc: "Natural conversations for writing, brainstorming, research, and creative thinking.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Code Assistant",
    desc: "Write, debug, and explain code across dozens of programming languages.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Image Generator",
    desc: "Create stunning images, illustrations, and design assets from text prompts.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="17" y1="10" x2="3" y2="10" />
        <line x1="21" y1="6" x2="3" y2="6" />
        <line x1="21" y1="14" x2="3" y2="14" />
        <line x1="17" y1="18" x2="3" y2="18" />
      </svg>
    ),
    title: "Text Summarizer",
    desc: "Condense long documents, articles, and reports into clear summaries.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Translator",
    desc: "Context-aware, high-quality translation across 100+ languages.",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Choose Your Agent",
    desc: "Browse our growing library of specialized AI agents, each designed for a specific task.",
  },
  {
    num: "02",
    title: "Provide Context",
    desc: "Upload files, paste text, or simply describe what you need. The agent adapts to your input.",
  },
  {
    num: "03",
    title: "Get Results",
    desc: "Receive accurate, context-aware responses. Ask follow-up questions to refine results.",
  },
];

const Root = () => {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="landing-brand">
          <span className="landing-brand-mark">H</span>
          <span className="landing-brand-text">HiveMind AI</span>
        </Link>
        <div className="landing-nav-links">
          <Link to="/login" className="landing-nav-link">
            Sign in
          </Link>
          <Link to="/register" className="landing-nav-cta">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-glow" aria-hidden="true" />
        <span className="landing-badge">✦ Now in Public Beta</span>
        <h1 className="landing-headline">
          One hub for every
          <br />
          <span className="landing-gradient-text">AI agent</span> you need
        </h1>
        <p className="landing-subtitle">
          Access a growing suite of specialized AI agents — from PDF analysis to
          code generation — all from a single, beautiful interface.
        </p>
        <div className="landing-ctas">
          <Link to="/register" className="landing-btn landing-btn--primary">
            Get Started Free
            <span aria-hidden="true">→</span>
          </Link>
          <Link to="/login" className="landing-btn landing-btn--secondary">
            Sign In
          </Link>
        </div>

        <div className="landing-hero-stats">
          <div className="landing-stat">
            <strong>6+</strong>
            <span>AI Agents</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <strong>50MB</strong>
            <span>Max Upload</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <strong>∞</strong>
            <span>Questions</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <span className="landing-section-badge">Features</span>
        <h2 className="landing-section-title">
          Powerful AI agents at your fingertips
        </h2>
        <p className="landing-section-sub">
          Each agent is purpose-built to excel at its task, giving you
          expert-level results in seconds.
        </p>
        <div className="landing-features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="landing-feature-card">
              <div
                className="landing-feature-icon"
                style={{ background: f.gradient }}
              >
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="landing-section landing-section--alt">
        <span className="landing-section-badge">How It Works</span>
        <h2 className="landing-section-title">
          Three simple steps to get started
        </h2>
        <p className="landing-section-sub">
          No complicated setup. No learning curve. Just results.
        </p>
        <div className="landing-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="landing-step">
              <span className="landing-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="landing-cta-banner">
        <h2>Ready to supercharge your workflow?</h2>
        <p>
          Join thousands of users leveraging AI agents to work smarter, not
          harder.
        </p>
        <Link
          to="/register"
          className="landing-btn landing-btn--primary landing-btn--lg"
        >
          Create Free Account
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-brand">
          <span className="landing-brand-mark landing-brand-mark--sm">n</span>
          <span className="landing-brand-text">HiveMind AI</span>
        </div>
        <p className="landing-footer-copy">
          © 2026 HiveMind AI. All rights reserved.
        </p>
        <div className="landing-footer-links">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="mailto:support@hivemind.ai.example">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Root;
