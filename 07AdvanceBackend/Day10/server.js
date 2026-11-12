import 'dotenv/config';
import express from "express";
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app); // Express and Socket.IO share one HTTP server
const io = new Server(httpServer);

const PORT = process.env.PORT || 3000;

// All rooms that have been created, e.g. Set { "a3f9c2", "7b1e04" }
const rooms = new Set();

// ─────────────────────────────────────────────
// JOB 1: Serve the frontend (public/index.html — HTML, CSS and JS in one file)
// ─────────────────────────────────────────────
app.use(express.static("public"));

// ─────────────────────────────────────────────
// JOB 2: Create a room → backend generates the room ID
// ─────────────────────────────────────────────
app.post("/api/rooms", (req, res) => {
  const roomId = randomBytes(3).toString("hex"); // 6 random characters, e.g. "a3f9c2"
  rooms.add(roomId);
  console.log("Room created:", roomId);
  res.json({ roomId });
});

// ─────────────────────────────────────────────
// JOB 3: Give the browser STUN + TURN servers
//
// TURN provider: Metered Open Relay (free, 20 GB/month).
// Username/password come from .env (start the server with: npm run dev)
// ─────────────────────────────────────────────
app.get("/api/ice-servers", (req, res) => {
  const stun = { urls: "stun:stun.relay.metered.ca:80" };

  const turn = {
    urls: [
      "turn:global.relay.metered.ca:80",                // UDP, port 80
      "turn:global.relay.metered.ca:80?transport=tcp",  // TCP, port 80
      "turn:global.relay.metered.ca:443",               // UDP, port 443
      "turns:global.relay.metered.ca:443?transport=tcp" // TLS, port 443 (looks like HTTPS)
    ],
    username: process.env.METERED_TURN_USERNAME,
    credential: process.env.METERED_TURN_PASSWORD,
  };

  // Without a username/password the browser rejects the whole config,
  // so if .env wasn't loaded, send STUN only.
  if (!turn.username || !turn.credential) {
    console.log("⚠️  TURN username/password not found in .env — sending STUN only");
    return res.json([stun]);
  }

  res.json([stun, turn]);
});

// ─────────────────────────────────────────────
// JOB 4: Signaling — pass messages between the two people in a room
// ─────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Join a room. `reply` is a callback: the browser gets the answer directly.
  socket.on("join-room", (roomId, reply) => {
    if (!rooms.has(roomId)) {
      return reply({ error: `Room "${roomId}" does not exist. Check the room ID.` });
    }

    const room = io.sockets.adapter.rooms.get(roomId); // sockets currently in this room
    const peopleInRoom = room ? room.size : 0;

    if (peopleInRoom >= 2) {
      return reply({ error: "Room is full (only 2 people allowed)." });
    }

    socket.join(roomId);
    socket.data.roomId = roomId; // remember the room for later messages
    console.log(`${socket.id} joined room ${roomId} (${peopleInRoom + 1}/2)`);

    reply({ ok: true });

    // Second person arrived → tell the FIRST person to start the call (create the offer)
    if (peopleInRoom === 1) {
      socket.to(roomId).emit("ready");
    }
  });

  // Relay offer / answer / ICE candidates to the other person in the room
  socket.on("offer", (offer) => {
    socket.to(socket.data.roomId).emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.to(socket.data.roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", (candidate) => {
    socket.to(socket.data.roomId).emit("ice-candidate", candidate);
  });

  // Hang up button
  socket.on("leave-room", () => leaveRoom(socket));

  // Tab closed / internet lost
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    leaveRoom(socket);
  });
});

function leaveRoom(socket) {
  const roomId = socket.data.roomId;
  if (!roomId) return;

  socket.to(roomId).emit("peer-left"); // tell the other person
  socket.leave(roomId);
  socket.data.roomId = null;
  console.log(`${socket.id} left room ${roomId}`);
}

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
