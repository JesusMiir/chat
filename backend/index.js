// https://nodejs.org/en/learn/getting-started/websocket
// node --watch index
import express from "express";

const app = express();

// app configuation

// Automatically parsing JSON
// If you don't do this, your req.body will be undefined
// app.use(express.json()); // { type: "*/*" } makes it so you don't have to have the "Content-Type": "application/json" in your headers
app.use(express.json({ type: "*/*" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`NEW REQUEST: ${req.method} ${req.url}`);
  next();
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

/*
    To test with curl
    curl POST http://localhost:8800/api/pets --data '{"a": 1, "b": 2}'
*/
app.post("/api/pets", (req, res) => {
  console.log("req.body:", req.body);
  res.send("hello");
});

// Keep at bottom
app.listen("8800", () => {
  console.log("now listening on 8800");
});
