//importing packages
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

//creating instances
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(cors());

//socket io stuff
io.on("connection", (client) => {
  console.log("New Client connected!");

  client.on("message", (message) => {
    console.log(`Message received, ${message}`);
    io.emit("message", message);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected!");
  });
});

//start the server
const port = 4000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
