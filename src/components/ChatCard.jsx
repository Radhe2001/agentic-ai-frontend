import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatCard = ({ role, msg, time }) => {
  const isAssistant = role === "assistant";

  const formatDate = (value) => {
    if (!value) return "";

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const diff = Date.now() - date.getTime();

    if (diff >= 0 && diff < 60000) return "Just now";
    if (diff >= 0 && diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    }
    if (diff >= 0 && diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="chat-message-bubble"
      style={
        isAssistant
          ? {
              backgroundColor: "#f7f9fc",
              border: "1px solid #e5eaf2",
              borderRadius: "12px",
              padding: "16px 20px",
              color: "#1f2937",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
              width: "100%",
              boxSizing: "border-box",
            }
          : {
              backgroundColor: "#e8f0fe",
              border: "1px solid #d6e4ff",
              borderRadius: "18px 18px 4px 18px",
              padding: "11px 16px",
              color: "#1e293b",
            }
      }
    >
      {isAssistant ? (
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {typeof msg === "string" ? msg : ""}
          </ReactMarkdown>
        </div>
      ) : (
        <p>{typeof msg === "string" ? msg : ""}</p>
      )}
    </div>
  );
};

export default ChatCard;
