// index.js
// node --watch index.js
import express from "express";
import path from "path";
import http from "http";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";

// --- ESM __dirname helper (use this instead of import.meta.dirname if needed)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Automatically parse JSON (accept any content-type)
app.use(express.json({ type: "*/*" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`NEW REQUEST: ${req.method} ${req.url}`);
  next();
});

// ------------------- API routes (examples)
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/pets", (req, res) => {
  console.log("req.body:", req.body);
  res.send("hello");
});

// ------------------- Serve React in production
const distDir = path.join(__dirname, "../frontend/dist");
const reactHtml = path.join(distDir, "index.html");

// Serve static assets
app.use(express.static(distDir));

// Frontend routes that should return index.html (SPA fallback)
const frontendRoutes = ["/"];
for (const route of frontendRoutes) {
  app.get(route, (_req, res) => res.sendFile(reactHtml));
}

// ------------------- Create HTTP server & attach WebSocket
const server = http.createServer(app);

// WebSocket server at ws://<host>/ws
const wss = new WebSocketServer({ server, path: "/ws" });

// Broadcast helper
function broadcast(payload, except) {
  const data = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client !== except && client.readyState === client.OPEN) {
      client.send(data);
    }
  }
}

wss.on("connection", (socket, req) => {
  console.log("WS connected:", req.socket.remoteAddress);

  // Send a welcome message to the newly connected client
  socket.send(
    JSON.stringify({
      type: "system",
      text: "Welcome! You are connected to the chat.",
      ts: Date.now(),
    })
  );

  // Notify others that a user joined
  broadcast(
    { type: "system", text: "A user joined the chat.", ts: Date.now() },
    socket
  );

  socket.on("message", (raw) => {
    // Expecting JSON: { type: "chat", user: "Alice", text: "Hello" }
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return socket.send(
        JSON.stringify({ type: "error", text: "Invalid JSON" })
      );
    }

    if (msg?.type === "chat" && typeof msg.text === "string") {
      const payload = {
        type: "chat",
        user: msg.user || "Anonymous",
        text: msg.text.slice(0, 1000), // simple guard
        ts: Date.now(),
      };
      // Echo back to sender and broadcast to others
      socket.send(JSON.stringify(payload));
      broadcast(payload, socket);
    }
  });

  socket.on("close", () => {
    console.log("WS disconnected");
    broadcast({
      type: "system",
      text: "A user left the chat.",
      ts: Date.now(),
    });
  });

  // Keepalive (optional)
  const pingInterval = setInterval(() => {
    if (socket.readyState === socket.OPEN) {
      socket.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, 30000);
});

// ------------------- Start server
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`HTTP+WS listening on ${PORT}`);
});
