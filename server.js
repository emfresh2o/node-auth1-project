const express = require("express");
const cors = require("cors");

const server = express();

// Router
const usersRouter = require("../routers/users-router");
const authRouter = require("../routers/auth-router");

// Middleware
const restricted = require("../middleware/restrictedMiddleware");

server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;