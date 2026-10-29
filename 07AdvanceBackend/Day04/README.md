# Cloudinary Studio

React and Express app for uploading images and videos to Cloudinary. Signed-in users can name uploads and view their completed media in a personal library.

## Tech stack

- `frontend/` — React + Vite + Tailwind + React Router + Zustand + Axios (runs on `5173`)
- `backend/` — Express + MongoDB/Mongoose + JWT HTTP-only cookies + Redis (runs on `3000`)
- Frontend and backend are **separate applications**. Install and start each independently.

## Setup (Node.js 22.12+)

Set `MONGO_URI`, `REDIS_URL`, `JWT_SECRET`, `PORT=3000`, `CLIENT_ORIGIN=http://localhost:5173`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `CLOUDINARY_WEBHOOK_URL` in `backend/.env`. The webhook URL must be the public HTTPS URL of your tunnel followed by `/api/webhooks/cloudinary`.

```bash
cd backend
npm install
npm start
```

Use a strong random JWT secret:

```bash
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

In a **different terminal**:

```bash
cd frontend
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
| POST | `/api/uploads/signature` | Create a pending Media record with a name and return signed upload parameters |
| GET | `/api/uploads/media` | List the signed-in user's completed uploads |
| POST | `/api/webhooks/cloudinary` | Verify Cloudinary's notification and complete the matching Media record |

The frontend uploads file bytes directly to Cloudinary. Cloudinary sends a webhook to the backend, which marks the pending Media record as completed. The library refreshes automatically and also has a Refresh button.

## What Redis does

1. **Rate limiting:** Fixed one-minute window: 10 signup/login attempts per IP; 20 requests to protected endpoints per user. Uses direct `INCR` and first-request `EXPIRE`, deliberately without third-party rate-limit libraries or Lua. This simple version is not perfectly atomic and may need improvement under heavy concurrency. Express's `req.ip` needs careful trusted-proxy setup before deploying behind a reverse proxy.
2. **Logout invalidation:** A verified JWT is hashed (SHA-256) to form a Redis blocklist key. Logout writes the key with `EX` equal to the token's remaining lifetime. Every protected request checks the blocklist. Redis TTL deletes the revocation entry after JWT expiry.
3. **JWT expiry:** The JWT's own `exp` field is enforced by `jwt.verify`. Redis **does not** extend or replace JWT expiry. This sample uses 7-day JWTs for ease of teaching.

## Teaching conventions

- Main server connects **MongoDB → Redis → starts listening**. Startup fails if either connection fails.
- No Helmet, X-Powered-By configuration, Zod, controller/service layers or unnecessary dependencies.
- Clear router and middleware functions in ordinary JavaScript.
- Frontend uses Axios with `withCredentials: true`, and Zustand for session state.
- Upload names are stored in MongoDB. The Cloudinary `public_id` stays independent of the display name.

## Security limitations before deploying publicly

This is a classroom starter, **not a complete production auth system**. Before production, add CSRF protection/origin validation appropriate to your deployment, robust validation and password policies, proxy-aware client IP configuration, a more reliable atomic rate limiter, anti-enumeration measures, logging/monitoring and tests. Rate-limiter is applied to auth routes and protected routes here, not all endpoints. Redis outages fail protected authentication checks rather than allowing blocklisted tokens.

**Keep the Cloudinary API secret on the backend.** The API key is included in signed upload requests from the frontend.
