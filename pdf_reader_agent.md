# PDF Reader Agent (`pdf_reader_agent.md`)

## 📌 Agent Overview
The **PDF Reader Agent** is an interactive document intelligence interface designed to let users upload PDF documents, browse through previously uploaded document history, and ask questions with contextual answers generated per document.

---

## ⚡ Implemented Capabilities

### 1. Multi-Document History & Management
- **Persistent In-Memory Document Store**:
  - Each uploaded PDF is assigned a unique identifier, uploaded timestamp, and isolated conversation thread.
  - History is displayed in a dedicated left drawer with document metadata (file name, formatted file size in KB/MB, upload time, and question count badge).
- **Document Switching**:
  - Selecting any document from the list switches the chat area to that document's specific conversation.
  - Chat state is preserved independently across all uploaded documents.
- **Continuous Upload Support**:
  - Users can upload additional PDFs at any time via the sidebar button without losing their active session.
- **Document Deletion**:
  - Users can remove individual documents from history along with their message threads.
  - If the active document is deleted, the agent automatically falls back to the next available document or the clean upload state.

### 2. Document Ingestion & Drag-and-Drop
- **Interactive Dropzone**:
  - Drag-and-drop support with visual highlight on hover/drag over.
  - Click-to-browse file picker accepting `.pdf` / `application/pdf`.
- **Validation**:
  - Automatic filtering verifying MIME types and providing clear upload guidelines.

### 3. Contextual Chat & Q&A Interface
- **Independent Conversation Threads**:
  - Document-specific prompt history containing both user and assistant interactions.
- **Suggested Question Pills**:
  - Quick-action prompt chips in the header:
    - *What is the main topic?*
    - *Summarize the document*
    - *Key findings*
- **Typing Indicator & Feedback**:
  - Smooth bouncing 3-dot typing animation during AI response processing.
  - Message bubble distinction with timestamps.
  - Auto-scroll lock to keep the latest message in view.
- **Input Controls**:
  - Multi-line capable auto-sizing textarea with send button.
  - <kbd>Enter</kbd> to submit, <kbd>Shift</kbd> + <kbd>Enter</kbd> for line breaks.

---

## 📐 Component Architecture

```
PdfReaderAgent (src/pages/PdfReaderAgent.jsx)
 │
 ├── Empty State (rendered when pdfs.length === 0)
 │    ├── Icon & Header
 │    ├── Drag-and-drop Dropzone
 │    └── Feature Highlight Badges
 │
 └── Active Multi-Document State (rendered when pdfs.length > 0)
      ├── pdf-sidebar (Left Drawer)
      │    ├── Header & Document Counter
      │    ├── "+ Upload New PDF" Button & Hidden File Input
      │    └── Document List
      │         └── Document Card (Active Highlight, Icon, Name, Size, Time, Msg Count, Delete)
      │
      └── pdf-chat-area (Right Panel)
           ├── pdf-chat-header (Current Doc Details + Suggestion Pills)
           ├── pdf-chat-messages (Message Bubble Stream + Typing Indicator)
           └── pdf-chat-input-area (Text Input + Send Trigger + Disclaimer)
```

---

## 🎨 Stylesheet Specifications (`src/style/PdfReaderAgent.css`)
- **Layout**: Flexible split screen (`pdf-sidebar` at `290px` width, `pdf-chat-area` taking the remaining width).
- **Theme**: Gradient purple accent (`#7154dc` to `#8b6ce0`) matching the Novi design language.
- **Responsive Adaptations**:
  - Collapses into a horizontal scrollable strip on mobile devices (`max-width: 640px`).
  - Hides suggestion pills on smaller viewports to maximize message reading area.
