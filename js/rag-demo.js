/* ==========================================================================
   SAGAR BHEDA - PREMIUM PERSONAL PORTFOLIO
   Interactive Mock RAG Chat Demo Simulator (KnowledgeBase AI)
   ========================================================================== */

(function () {
  'use strict';

  const chatContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendChatBtn');
  const chips = document.querySelectorAll('.prompt-chip');

  if (!chatContainer || !chatInput || !sendBtn) return;

  let isGenerating = false;

  const RAG_RESPONSES = {
    auth: {
      query: "What are the main authentication mechanisms described in the uploaded documents?",
      answer: "Based on the retrieved documents, the system implements a stateless JWT-based authentication architecture with role-based access control (RBAC). User sessions and refresh tokens are managed securely, while protected API endpoints enforce authorization middleware before routing requests to backend controllers or RAG retrieval services.",
      source: "document-authentication.pdf",
      section: "Section 3.2: JWT Auth & Permissions",
      page: "Page 4",
      score: "0.912"
    },
    chunking: {
      query: "How does the document chunking and embedding pipeline work?",
      answer: "Documents (PDF, TXT, Markdown, Web URLs, OCR images) are ingested and converted to clean text. The text is partitioned using a sliding window strategy configured at 800 characters per chunk with a 150-character overlap to preserve semantic continuity. Each chunk is transformed into a 768-dimensional vector embedding via the nomic-embed-text model and stored in PostgreSQL with the pgvector extension.",
      source: "rag-pipeline-spec.md",
      section: "Section 2.1: Text Extraction & Sliding Window Chunking",
      page: "Page 2",
      score: "0.948"
    },
    schema: {
      query: "What database schema is used for vector search and session persistence?",
      answer: "The architecture employs a hybrid database strategy: MongoDB serves as the operational store holding Users, Documents, Chat Sessions, Message logs, and User Feedback collections. In parallel, PostgreSQL + pgvector is dedicated to document chunks and vector embeddings, utilizing cosine distance indexes (<=>) for sub-second semantic retrieval.",
      source: "system-architecture-guide.pdf",
      section: "Section 4.1: Hybrid MongoDB & PostgreSQL/pgvector Topology",
      page: "Page 6",
      score: "0.895"
    }
  };

  // Preset chips click
  chips.forEach(chip => {
    chip.addEventListener('click', function () {
      if (isGenerating) return;
      const key = this.getAttribute('data-prompt-key');
      if (RAG_RESPONSES[key]) {
        runRAGQuery(RAG_RESPONSES[key]);
      }
    });
  });

  // Send button click
  sendBtn.addEventListener('click', () => {
    handleCustomInput();
  });

  // Enter key
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomInput();
    }
  });

  function handleCustomInput() {
    if (isGenerating) return;
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';

    // Check if matching preset key words
    const lower = text.toLowerCase();
    let matchedData = null;
    if (lower.includes('auth') || lower.includes('jwt') || lower.includes('token')) {
      matchedData = { ...RAG_RESPONSES.auth, query: text };
    } else if (lower.includes('chunk') || lower.includes('embed') || lower.includes('pipeline')) {
      matchedData = { ...RAG_RESPONSES.chunking, query: text };
    } else if (lower.includes('schema') || lower.includes('mongo') || lower.includes('postgres') || lower.includes('db')) {
      matchedData = { ...RAG_RESPONSES.schema, query: text };
    } else {
      matchedData = {
        query: text,
        answer: "Retrieved relevant context from KnowledgeBase AI vector store. The backend processed the query through nomic-embed-text (768 dimensions), executed pgvector cosine similarity matching, and synthesized the answer with local Ollama llama3.2 using grounded prompt construction.",
        source: "knowledgebase-manual.pdf",
        section: "Section 1.0: System Core Principles",
        page: "Page 1",
        score: "0.873"
      };
    }

    runRAGQuery(matchedData);
  }

  function runRAGQuery(data) {
    isGenerating = true;
    chatInput.disabled = true;
    sendBtn.disabled = true;

    // 1. Append User Message
    appendUserMessage(data.query);

    // 2. Append AI Pending Message with Status Pipeline
    const aiMessageWrapper = createAIMessageSkeleton();
    chatContainer.appendChild(aiMessageWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const statusEl = aiMessageWrapper.querySelector('.ai-pipeline-status');
    const textEl = aiMessageWrapper.querySelector('.ai-text-body');
    const citationsEl = aiMessageWrapper.querySelector('.citations-box');

    // Simulate RAG Steps
    setTimeout(() => {
      statusEl.innerHTML = `🔍 <em>Embedding query (nomic-embed-text 768d)...</em>`;
    }, 250);

    setTimeout(() => {
      statusEl.innerHTML = `⚡ <em>Querying PostgreSQL + pgvector (Cosine Sim: ${data.score})...</em>`;
    }, 700);

    setTimeout(() => {
      statusEl.innerHTML = `🤖 <em>Streaming response via SSE (llama3.2)...</em>`;
      streamResponse(textEl, data.answer, () => {
        statusEl.remove();
        // Show Citations
        citationsEl.innerHTML = `
          <span class="citations-label">Grounded Sources & Citations:</span>
          <div class="citation-card">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <strong>${data.source}</strong> • ${data.section} (${data.page}) • <span class="text-cyan">Score: ${data.score}</span>
          </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        isGenerating = false;
        chatInput.disabled = false;
        sendBtn.disabled = false;
        chatInput.focus();
      });
    }, 1200);
  }

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message user-msg';
    msg.innerHTML = `
      <div class="chat-avatar">U</div>
      <div class="chat-bubble">
        <p>${escapeHTML(text)}</p>
      </div>
    `;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function createAIMessageSkeleton() {
    const msg = document.createElement('div');
    msg.className = 'chat-message ai-msg';
    msg.innerHTML = `
      <div class="chat-avatar">AI</div>
      <div class="chat-bubble">
        <div class="ai-pipeline-status mono" style="font-size:0.75rem; color:var(--accent-cyan); margin-bottom:8px;"></div>
        <div class="ai-text-body"></div>
        <div class="citations-box"></div>
      </div>
    `;
    return msg;
  }

  function streamResponse(targetEl, fullText, onComplete) {
    let index = 0;
    const speed = 14; // ms per char
    const cursor = document.createElement('span');
    cursor.className = 'streaming-indicator';
    targetEl.appendChild(cursor);

    function step() {
      if (index < fullText.length) {
        cursor.before(fullText.charAt(index));
        index++;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        setTimeout(step, speed);
      } else {
        cursor.remove();
        if (onComplete) onComplete();
      }
    }
    step();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
})();
