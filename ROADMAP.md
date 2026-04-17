# Synk — roadmap & learning backlog

This document captures a **priority-ordered** plan to finish core chat features, harden the app, then add **AI** and **modern stack** experiments for learning.

## Current snapshot

- **Backend:** Express 5, MongoDB/Mongoose, JWT (httpOnly cookies), rate limits, Cloudinary, Resend email, bcrypt.
- **Frontend:** React 19, Vite 7, Zustand, Tailwind 4 + DaisyUI, protected routes, chat UI shell.
- **Known gaps:** `socket.io` is listed in dependencies but not integrated; `MessageInput.jsx` is a placeholder; real-time messaging TODO in `message.controller.js`; align `msg.image` shape (object vs string) in the UI with the API.

---

## Priority 0 — Complete the product (do first)

1. **Implement `MessageInput`** — Text + optional image; `POST /messages/send/:id`; loading/error states; refetch or optimistic updates.
2. **Fix message image rendering** — API uses `image: { url, public_id }`; ensure the client reads `msg.image?.url` (or equivalent).
3. **Wire Socket.IO end-to-end** — HTTP server + Socket.IO, auth handshake, user rooms, emit on send, client subscribes and updates Zustand.
4. **Online presence / typing (optional)** — `user:online`, `typing:start` / `typing:end` for Socket.IO practice.
5. **Forgot password** — Reset tokens, email link, reset endpoint (templates/service already referenced in codebase).

*Rationale:* AI and advanced features should sit on a working chat loop (send, receive, realtime).

---

## Priority 1 — Quality, security, deploy

6. **Environment docs** — `.env.example` for backend and frontend; document `PORT` (e.g. macOS AirPlay vs port 5000); no secrets in git.
7. **Input validation** — Zod, express-validator, or similar on auth and messages; consistent API errors.
8. **Automated tests** — Vitest + React Testing Library (UI); Supertest (or similar) for auth and messaging APIs.
9. **CI** — GitHub Actions: `lint` + `test` on push/PR.
10. **Observability** — Structured logging (e.g. pino), optional error tracking (e.g. Sentry) when deployed.
11. **Deployment** — Host API + static frontend; Atlas MongoDB; WebSocket URL for Socket.IO; production CORS and cookie (`secure` / `sameSite`) settings.

---

## Priority 2 — AI features (pick 2–3; ship vertically)

12. **Smart reply suggestions** — Server calls an LLM with recent thread context; return short suggestions; user taps to send. *Skills:* prompting, token limits, optional streaming.
13. **Summarize this chat** — Summarize last N messages on demand. *Skills:* long context, caching (optional Redis).
14. **Tone rewrite** — “Friendlier / shorter / formal” before send. *Skills:* LLM as editor; **never** expose provider API keys in the browser.
15. **Moderation** — Moderation API before persist or async job; flag/block. *Skills:* safety, background processing.
16. **Semantic search** — Embeddings for messages; Atlas Vector Search or Pinecone / Weaviate / pgvector. *Skills:* RAG basics, chunking, hybrid search.
17. **Local AI (optional)** — Ollama + open models on your machine for zero API cost while learning. *Skills:* latency vs quality tradeoffs.

---

## Priority 3 — Modern stack experiments (after P1–P2)

18. **TypeScript** — Frontend first, then backend; shared types for API contracts.
19. **OpenAPI + codegen** — Contract-first REST; generated client.
20. **Alternative API layer (pick one)** — tRPC + TanStack Query in a monorepo, or a small GraphQL slice.
21. **Prisma + Postgres (branch experiment)** — Migrate or duplicate a slice; learn SQL and migrations vs Mongoose-only.
22. **Redis** — Rate limiting, session/cache, Socket.IO adapter for horizontal scale, AI response cache.
23. **Push notifications** — Web Push or FCM when the tab is inactive.
24. **E2E tests** — Playwright: signup → chat → send message.
25. **Mobile shell** — Capacitor or Expo reusing the same API.

---

## Suggested learning sprints

| Sprint   | Focus |
|----------|--------|
| **1**    | P0: `MessageInput`, image fix, Socket.IO |
| **2**    | P0: forgot password + P1: env examples, validation, tests, CI |
| **3**    | One AI vertical: smart replies **or** chat summarize |
| **4**    | Embeddings + search **or** Redis **or** TypeScript migration |

---

## Notes

- **MongoDB** is not inherently “Mac vs Windows”; use the same Atlas URI and Network Access rules on every machine.
- Prefer **one big learning thread per sprint** (e.g. don’t combine full GraphQL rewrite + AI + Redis in the same week).

Last updated from project analysis — adjust dates and checkboxes as you complete work.
  