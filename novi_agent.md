# Novi AI Agent Hub — System & Architecture Documentation

## 🌟 Overview
**Novi** is a modern, modular AI Agent platform designed to host multiple specialized AI agents under a unified, responsive dashboard UI. The platform provides seamless navigation across agents, with persistent multi-document management, contextual chat, and a high-aesthetic landing & authentication flow.

---

## 🚀 Key Implemented Features

### 1. 🏠 Landing Page (`/` - Root)
- **Modern Hero Section**: Dynamic glowing backdrop, gradient branding typography, clear CTAs ("Get Started Free", "Sign In").
- **Live Metric Counter**: Showcases agent counts, max upload limits, and capability stats.
- **Agent Capabilities Showcase**: 6 agent capability highlights with responsive grid cards.
- **3-Step Workflow ("How it Works")**: Clear visual progression explaining agent selection, context feeding, and iterative Q&A.
- **CTA Banner & Footer**: Unified dark-purple container with quick links and legal/contact footers.

### 2. 🔐 Authentication Flow (`/login`, `/register`)
- Dual-mode split card authentication (Sign In & Sign Up).
- Dynamic password visibility toggles.
- Real-time password confirmation validation.
- Responsive mobile adaptation.

### 3. 🖥️ Dashboard Shell (`DashboardLayout`)
- **Collapsible Sidebar**:
  - Smooth animation with toggle collapse/expand (260px $\leftrightarrow$ 72px).
  - Navigation links:
    - 🗂️ **Agent Hub** (`/home`)
    - 📄 **PDF Reader Agent** (`/agents/pdf-reader`)
    - 💬 **Chat Agent** (Coming Soon)
    - 💻 **Code Assistant** (Coming Soon)
    - 🎨 **Image Gen** (Coming Soon)
  - User identity badge with avatar & role details.
- **Top Bar**: Dynamic route breadcrumb title, contextual search, and notification indicator.

### 4. 🧭 AI Agent Hub (`/home`)
- Grid-based catalog displaying available and upcoming AI agent cards.
- Gradient color-coded icons, badges (`Active` vs. `Coming Soon`).
- Interactive click-throughs directly routing to active agents like PDF Reader.

### 5. 📄 PDF Reader Agent (`/agents/pdf-reader`)
- **Empty State & Dropzone**:
  - Drag-and-drop or click-to-browse PDF upload.
  - File validation (PDF format check) and max size indicators.
  - Quick feature value propositions.
- **Multi-PDF History & Management**:
  - **Document Drawer**: Keeps a chronological history of all uploaded PDFs.
  - **Per-Document Metadata**: Displays file name, formatted byte size, upload relative timestamp, and user question counter.
  - **Independent Chat Sessions**: Each uploaded PDF maintains its own dedicated chat history and message state.
  - **Live Switching**: Seamlessly switch between different PDFs without losing previous conversations.
  - **Inline Document Deletion**: Remove specific PDFs and their associated conversation history.
  - **New Document Upload**: Add more documents anytime via the sidebar "+ Upload New PDF" trigger.
- **Interactive Document Q&A**:
  - Document header with quick suggestion pills (e.g., *“Main topic?”*, *“Summarize”*, *“Key findings”*).
  - Clean conversational UI with user & assistant avatar bubbles.
  - Animated pulsing 3-dot typing indicator during AI response generation.
  - Auto-scroll to latest response on new questions.
  - Keyboard shortcut: <kbd>Enter</kbd> to send, <kbd>Shift</kbd>+<kbd>Enter</kbd> for multi-line input.

---

## 📁 File Structure & Implementation Map

```
ai/
├── index.html                           # App entry with updated metadata
├── package.json                         # Dependencies (React 19, React Router 7, Vite 8)
├── novi_agent.md                        # Complete app implementation documentation
├── pdf_reader_agent.md                  # PDF Reader Agent specific specification
├── src/
│   ├── App.jsx                          # Main App entry wrapping AppRouter
│   ├── main.jsx                         # React DOM mount point
│   ├── components/
│   │   ├── Card.jsx                     # Reusable card component
│   │   └── DashboardLayout.jsx          # Collapsible sidebar + topbar dashboard shell
│   ├── pages/
│   │   ├── AgentHub.jsx                 # AI Agent catalog & hub
│   │   ├── AuthPage.jsx                 # Login & Registration page
│   │   ├── PdfReaderAgent.jsx           # Multi-PDF history & contextual Q&A agent
│   │   └── Root.jsx                     # Public landing page with hero & features
│   ├── routes/
│   │   ├── router.jsx                   # BrowserRouter & ProtectedRoutes wrapper
│   │   └── routes.jsx                   # Public & protected route configurations
│   └── style/
│       ├── AgentHub.css                 # Styling for agent catalog
│       ├── App.css                      # App utilities
│       ├── AuthPage.css                 # Auth styles
│       ├── DashboardLayout.css          # Sidebar, topbar & responsive shell CSS
│       ├── index.css                    # Base typography, reset & theme variables
│       ├── PdfReaderAgent.css           # Dropzone, multi-document sidebar & chat UI
│       └── Root.css                     # Landing page styling
```

---

## 🎨 Theme & Design System
- **Color Palette**:
  - Primary Accent: `#7154dc` / `#8b6ce0` (Purple Gradient)
  - Dark Surface: `#1e1b35` $\rightarrow$ `#312a56` (Sidebar gradient)
  - Surface Light: `#f4f5f9` (Dashboard backdrop), `#ffffff` (Card background)
  - Typography: `#20233b` (Headings), `#85889b` (Muted/Subtitles)
- **Typography**: Clean modern sans-serif (`Inter`, `system-ui`)
- **Transitions**: Smooth cubic-bezier transitions for sidebar resizing, card hover lifts, and message appearances.
