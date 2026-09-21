/* ==========================================================================
   SAGAR BHEDA - PREMIUM PERSONAL PORTFOLIO
   Interactive Architecture Diagram Inspector
   ========================================================================== */

(function () {
  'use strict';

  // 1. RAG Topology Architecture Inspector
  const ragNodes = document.querySelectorAll('.topo-node[data-rag-node]');
  const ragTitleEl = document.getElementById('ragInspectorTitle');
  const ragDescEl = document.getElementById('ragInspectorDesc');

  const RAG_NODE_INFO = {
    spa: {
      title: "Browser SPA / Client Interface",
      desc: "Single-page interface facilitating multi-format document ingestion (PDF, TXT, MD, Images, URLs) and real-time conversation. Listens to Server-Sent Events (SSE) for word-by-word streaming generation and displays grounded source citations with similarity rankings."
    },
    sails: {
      title: "Sails.js API Server (Node.js Runtime)",
      desc: "Central orchestration layer. Handles multipart document uploads via Multer, text extraction (pdf-parse / Tesseract OCR / Cheerio), character chunking (800 chars / 150 overlap), JWT auth verification, and LangChain JS execution pipeline coordinating vector store queries and LLM prompts."
    },
    mongo: {
      title: "MongoDB Services & Metadata Store",
      desc: "NoSQL document persistence holding operational state: User profiles, Document ingestion status, Multi-session conversation logs, Message history, and User Feedback/Ratings analytics for administrator dashboards."
    },
    postgres: {
      title: "PostgreSQL + pgvector (Vector Database)",
      desc: "High-performance vector storage layer. Stores individual text chunks alongside their 768-dimensional vector representations. Executes cosine distance queries (<=>) via pgvector index structures to return top-k most semantically relevant chunks for prompt augmentation."
    },
    ollama: {
      title: "Ollama Local LLM Runtime",
      desc: "Local, self-contained AI runtime executing llama3.2 for contextual response synthesis and nomic-embed-text for generating 768-dimensional embeddings, eliminating third-party API dependencies and ensuring document privacy."
    }
  };

  ragNodes.forEach(node => {
    node.addEventListener('click', function () {
      ragNodes.forEach(n => n.classList.remove('active-node'));
      this.classList.add('active-node');
      const key = this.getAttribute('data-rag-node');
      if (RAG_NODE_INFO[key] && ragTitleEl && ragDescEl) {
        ragTitleEl.textContent = RAG_NODE_INFO[key].title;
        ragDescEl.textContent = RAG_NODE_INFO[key].desc;
      }
    });
  });

  // 2. Production "What I Work With" Architecture Flow
  const archStages = document.querySelectorAll('.arch-stage-card[data-stage]');
  const archDetailBox = document.getElementById('archDetailText');

  const ARCH_STAGE_DETAILS = {
    clients: "Frontend & Mobile Clients: Web browsers, mobile applications (iOS/Android), and external third-party service webhooks sending RESTful requests and maintaining WebSocket connections.",
    apis: "Node.js & Sails.js API Gateway: RESTful controllers, request validation, payload sanitation, centralized error handling, and security middlewares (JWT authentication, role-based access control, OTP verification).",
    storage: "Multi-Tier Storage: PostgreSQL for relational data and strict transaction integrity; MongoDB for flexible document workflows and e-service logs; Redis for caching hot queries, agent status, and session tokens.",
    sqs: "Asynchronous Queueing with AWS SQS: Decoupling compute-heavy workflows such as mass notifications, ticket routing calculations, audit logging, and external service syncs to prevent API bottlenecks.",
    realtime: "Real-Time & Notifications Layer: Socket.io for live ticket counter updates and agent feeds; integrated dispatchers for Firebase (FCM), APNs (including Live Activities), Huawei Push Kit, and SMS Gateways."
  };

  archStages.forEach(card => {
    card.addEventListener('click', function () {
      archStages.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      const stage = this.getAttribute('data-stage');
      if (ARCH_STAGE_DETAILS[stage] && archDetailBox) {
        archDetailBox.textContent = ARCH_STAGE_DETAILS[stage];
      }
    });
  });

})();
