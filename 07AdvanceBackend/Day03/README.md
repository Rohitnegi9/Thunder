# Cloudinary Starter — Teaching-Friendly Auth Base

This is the **starter** code. It implements signup/login/logout and session restore. **Cloudinary upload, webhook and media database models are intentionally absent** so students implement them in class.

## Tech stack

- `frontend/` — React + Vite + Tailwind + React Router + Zustand + Axios (runs on `5173`)
- `backend/` — Express + MongoDB/Mongoose + JWT HTTP-only cookies + Redis (runs on `5000`)
- Frontend and backend are **separate applications**. Install and start each independently.

## Setup (Node.js 22.12+)

First, run MongoDB and Redis locally, **or** set `MONGO_URI` (MongoDB Atlas) and `REDIS_URL` (Redis Cloud). A Redis TLS URL usually begins with `rediss://`.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Replace credentials in `backend/.env`. Use a strong random JWT secret:

```bash
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

In a **different terminal**:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173`. Use **localhost for both apps**, not a mix of `localhost` and `127.0.0.1`, so browser cookies behave consistently.

## Backend endpoints

| Method | URL | Purpose |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create user, issue JWT cookie |
| POST | `/api/auth/login` | Authenticate, issue JWT cookie |
| GET | `/api/auth/me` | Verify JWT, blocklist, fetch current user |
| POST | `/api/auth/logout` | Blocklist current JWT in Redis until expiry; clear cookie |
| GET | `/api/health` | Check API response |

## What Redis does

1. **Rate limiting:** Fixed one-minute window: 10 signup/login attempts per IP; 20 requests to protected endpoints per user. Uses direct `INCR` and first-request `EXPIRE`, deliberately without third-party rate-limit libraries or Lua. This simple version is not perfectly atomic and may need improvement under heavy concurrency. Express's `req.ip` needs careful trusted-proxy setup before deploying behind a reverse proxy.
2. **Logout invalidation:** A verified JWT is hashed (SHA-256) to form a Redis blocklist key. Logout writes the key with `EX` equal to the token's remaining lifetime. Every protected request checks the blocklist. Redis TTL deletes the revocation entry after JWT expiry.
3. **JWT expiry:** The JWT's own `exp` field is enforced by `jwt.verify`. Redis **does not** extend or replace JWT expiry. This sample uses 7-day JWTs for ease of teaching.

## Teaching conventions

- Main server connects **MongoDB → Redis → starts listening**. Startup fails if either connection fails.
- No Helmet, X-Powered-By configuration, Zod, controller/service layers or unnecessary dependencies.
- Clear router and middleware functions in ordinary JavaScript.
- Frontend uses Axios with `withCredentials: true`, and Zustand for session state.
- The dashboard is frontend-only scaffolding; upload buttons are placeholders.

## Security limitations before deploying publicly

This is a classroom starter, **not a complete production auth system**. Before production, add CSRF protection/origin validation appropriate to your deployment, robust validation and password policies, proxy-aware client IP configuration, a more reliable atomic rate limiter, anti-enumeration measures, logging/monitoring and tests. Rate-limiter is applied to auth routes and protected routes here, not all endpoints. Redis outages fail protected authentication checks rather than allowing blocklisted tokens.

**Cloudinary API keys and secrets must never go into the React frontend.**
