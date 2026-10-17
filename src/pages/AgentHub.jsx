import { useNavigate } from "react-router-dom";
import "../style/AgentHub.css";

const AGENTS = [
  {
    id: "pdf-reader",
    name: "PDF Reader",
    description:
      "Upload any PDF and ask questions about its content. Get instant, accurate answers powered by AI.",
    status: "active",
    icon: (
      <svg
        width="28"
        height="28"
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
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "chat",
    name: "Chat Agent",
    description:
      "Have natural conversations with an AI assistant. Get help with writing, brainstorming, and more.",
    status: "coming-soon",
    icon: (
      <svg
        width="28"
        height="28"
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
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "code",
    name: "Code Assistant",
    description:
      "Get help writing, debugging, and explaining code across multiple programming languages.",
    status: "coming-soon",
    icon: (
      <svg
        width="28"
        height="28"
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
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "image",
    name: "Image Generator",
    description:
      "Generate stunning images from text descriptions. Create art, illustrations, and design assets.",
    status: "coming-soon",
    icon: (
      <svg
        width="28"
        height="28"
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
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "summarizer",
    name: "Text Summarizer",
    description:
      "Condense long articles, reports, and documents into clear, concise summaries in seconds.",
    status: "coming-soon",
    icon: (
      <svg
        width="28"
        height="28"
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
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "translator",
    name: "Translator",
    description:
      "Translate text between 100+ languages with context-aware, high-quality AI translation.",
    status: "coming-soon",
    icon: (
      <svg
        width="28"
        height="28"
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
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
];

const AgentHub = () => {
  const navigate = useNavigate();

  return (
    <div className="agent-hub">
      <div className="agent-hub-header">
        <h2 className="agent-hub-title">AI Agents</h2>
        <p className="agent-hub-subtitle">
          Select an agent to get started. More agents are being added regularly.
        </p>
      </div>

      <div className="agent-grid">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            className={`agent-card ${agent.status === "coming-soon" ? "agent-card--disabled" : ""}`}
            onClick={() =>
              agent.status === "active" && navigate(`/agents/${agent.id}`)
            }
            disabled={agent.status === "coming-soon"}
          >
            <div
              className="agent-card-icon"
              style={{ background: agent.gradient }}
            >
              {agent.icon}
            </div>
            <div className="agent-card-body">
              <div className="agent-card-top">
                <h3 className="agent-card-name">{agent.name}</h3>
                {agent.status === "coming-soon" && (
                  <span className="agent-card-badge">Coming Soon</span>
                )}
                {agent.status === "active" && (
                  <span className="agent-card-badge agent-card-badge--active">
                    Active
                  </span>
                )}
              </div>
              <p className="agent-card-desc">{agent.description}</p>
            </div>
            {agent.status === "active" && (
              <span className="agent-card-arrow" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgentHub;
