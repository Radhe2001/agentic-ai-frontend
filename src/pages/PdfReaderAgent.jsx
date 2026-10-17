import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import "../style/PdfReaderAgent.css";
import {
  askQuestion,
  downloadS3File,
  getMessages,
  getPdfs,
  uploadPdf,
} from "../services/pdfReaderService";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import ChatCard from "../components/ChatCard";

const PdfReaderAgent = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [pdfs, setPdfs] = useState([]);
  const [activePdfId, setActivePdfId] = useState(null);
  const [input, setInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const sidebarFileRef = useRef(null);
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState({});
  const [activeChats, setActiveChats] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // Fetch existing PDFs from the backend
      const resp = await getPdfs();

      if (resp.success && resp?.data?.documents?.length > 0) {
        setPdfs(
          resp.data.documents?.map((doc) => ({
            id: doc.id,
            file: doc.s3_key,
            name: doc.filename,
            uploadedAt: doc.created_at ? new Date(doc.created_at) : new Date(),
          })),
        );
        setActivePdfId(resp.data.documents[0].id);
      } else {
        toast.error("Failed to load PDFs. Please try again.");
      }
      setIsLoading(false);
    })();
  }, []);

  const activePdf = useMemo(
    () => pdfs.find((p) => p.id === activePdfId) || null,
    [pdfs, activePdfId],
  );

  useEffect(() => {
    if (activePdf) {
      const message = messages[activePdf?.id];

      if (!message) {
        (async () => {
          setIsLoading(true);
          const data = await getMessages(activePdf?.id);

          if (data?.success) {
            setActiveChats(data?.data || []);
            setMessages((prev) => ({ ...prev, [activePdf?.id]: data?.data }));
          }
          setIsLoading(false);
        })();
      } else {
        setActiveChats(message);
      }
    }
  }, [activePdfId]);
  console.log(activePdf, activePdfId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activePdf?.messages?.length, isLoading]);

  const addPdf = useCallback(async (file) => {
    if (!file || file.type !== "application/pdf") return;
    setIsLoading(true);
    const resp = await uploadPdf(file);

    if (
      !resp?.success ||
      !resp.data ||
      resp?.message === "Document already exists"
    ) {
      toast.error(resp?.message);
      setIsLoading(false);
      return;
    }

    const { id, filename, created_at, name } = resp?.data;

    const newPdf = {
      id,
      file: filename,
      name,
      uploadedAt: created_at ? new Date(created_at) : new Date(),
    };

    setPdfs((prev) => [newPdf, ...prev]);
    setActivePdfId(id);
    setIsLoading(false);
  }, []);

  const removePdf = (id) => {
    setPdfs((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (activePdfId === id) {
        setActivePdfId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    addPdf(file);
  };

  const handleSend = async () => {
    if (!input.trim() || !activePdf) return;

    setIsLoading(true);
    const data = await askQuestion(activePdf?.id, input.trim());
    if (data?.success) {
      setActiveChats((prev) => [...prev, data?.data]);
      setMessages((prev) => ({
        ...prev,
        [activePdf?.id]: [...prev[activePdf?.id], data?.data],
      }));
    } else {
      toast.error("Failed to send message. Please try again.");
    }
    setIsLoading(false);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDate = (d) => {
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  /* ── No PDFs: full-width empty state ── */
  if (pdfs.length === 0) {
    return (
      <div className="pdf-agent">
        <div className="pdf-empty-state">
          <div className="pdf-empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h2>PDF Reader Agent</h2>
          <p>
            Upload a PDF document to get started. Ask questions and get
            accurate, AI-powered answers from your documents.
          </p>

          <div
            className={`pdf-dropzone ${dragOver ? "pdf-dropzone--active" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                addPdf(e.target.files[0]);
                e.target.value = "";
              }}
              hidden
            />
            <div className="pdf-dropzone-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="pdf-dropzone-text">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="pdf-dropzone-hint">PDF files only • Max 50MB</p>
          </div>

          <div className="pdf-features">
            <div className="pdf-feature">
              <span className="pdf-feature-icon">⚡</span>
              <div>
                <strong>Instant Analysis</strong>
                <p>AI processes your PDF in seconds</p>
              </div>
            </div>
            <div className="pdf-feature">
              <span className="pdf-feature-icon">🎯</span>
              <div>
                <strong>Accurate Answers</strong>
                <p>Precise answers from the document</p>
              </div>
            </div>
            <div className="pdf-feature">
              <span className="pdf-feature-icon">📂</span>
              <div>
                <strong>Multi-PDF History</strong>
                <p>Upload multiple PDFs and switch between them</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main layout: sidebar + chat ── */
  return (
    <div className="pdf-agent">
      {/* ── PDF History Sidebar ── */}
      <aside className="pdf-sidebar">
        <div className="pdf-sidebar-header">
          <h3>Documents</h3>
          <span className="pdf-sidebar-count">{pdfs.length}</span>
        </div>

        <button
          className="pdf-upload-btn"
          onClick={() => sidebarFileRef.current?.click()}
        >
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Upload New PDF
        </button>
        <input
          ref={sidebarFileRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => {
            addPdf(e.target.files[0]);
            e.target.value = "";
          }}
          hidden
        />

        <div className="pdf-sidebar-list">
          {pdfs?.map((pdf) => (
            <button
              key={pdf?.id}
              className={`pdf-sidebar-item ${pdf?.id === activePdfId ? "pdf-sidebar-item--active" : ""}`}
              onClick={() => setActivePdfId(pdf?.id)}
            >
              <div className="pdf-sidebar-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="pdf-sidebar-item-info">
                <span className="pdf-sidebar-item-name" title={pdf?.file}>
                  {pdf?.file}
                </span>
                <span className="pdf-sidebar-item-meta">
                  {formatSize(pdf?.file?.size)} • {formatDate(pdf?.uploadedAt)}
                </span>
              </div>
              <div className="pdf-sidebar-item-right">
                <button onClick={() => downloadS3File(pdf?.file, pdf.name)}>
                  <span className="pdf-sidebar-item-msgs">
                    {pdf?.messages?.filter((m) => m.role === "user")?.length}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M8 13h2" />
                      <path d="M8 17h2" />
                      <path d="M14 13h2" />
                      <path d="M14 17h2" />
                      <path d="M12 11v9" />
                      <path d="m9 17 3 3 3-3" />
                    </svg>
                  </span>{" "}
                </button>

                <button
                  className="pdf-sidebar-item-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePdf(pdf?.id);
                  }}
                  aria-label={`Delete ${pdf?.file}`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Chat Area ── */}
      <div className="pdf-chat-area">
        {activePdf ? (
          <>
            {/* Active doc header */}
            <div className="pdf-chat-header">
              <div className="pdf-chat-header-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="pdf-chat-header-info">
                <h4 title={activePdf?.name}>{activePdf?.name}</h4>
                <span>{formatDate(activePdf?.uploadedAt)}</span>
              </div>
              {/* <div className="pdf-chat-header-actions">
                <button
                  className="pdf-suggestion-pill"
                  onClick={() =>
                    setInput("What is the main topic of this document?")
                  }
                >
                  Main topic?
                </button>
                <button
                  className="pdf-suggestion-pill"
                  onClick={() => setInput("Can you summarize this document?")}
                >
                  Summarize
                </button>
                <button
                  className="pdf-suggestion-pill"
                  onClick={() => setInput("What are the key findings?")}
                >
                  Key findings
                </button>
              </div> */}
            </div>
            {/* Messages */}
            {activeChats?.length ? (
              <div className="pdf-chat-messages">
                {activeChats?.map((msg) => (
                  <div key={msg.id} className="chat-pair">
                    <ChatCard
                      role="user"
                      msg={msg.question}
                      time={msg.created_at}
                    />

                    <ChatCard
                      role="assistant"
                      msg={msg.content}
                      time={msg.created_at}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div className="pdf-message pdf-message--assistant">
                    <div className="pdf-message-avatar">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                      </svg>
                    </div>
                    <div className="pdf-message-content">
                      <div className="pdf-message-bubble">
                        <div className="pdf-typing">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  placeContent: "center",
                }}
              >
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                  No data found
                </span>
              </div>
            )}

            {/* Input */}
            <div className="pdf-chat-input-area">
              <div className="pdf-chat-input-wrap">
                <textarea
                  className="pdf-chat-input"
                  placeholder={`Ask a question about "${activePdf?.name}"...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <button
                  className="pdf-send-btn"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p className="pdf-chat-disclaimer">
                AI may produce inaccurate responses. Always verify important
                information.
              </p>
            </div>
          </>
        ) : (
          <div className="pdf-no-selection">
            <p>Select a document from the sidebar to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfReaderAgent;
