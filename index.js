//importing packages
import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

//creating instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//serving the html file
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//define a connection event handler
io.on("connection", (client) => {
  console.log("User connected!");

  //emit a message to the client
  client.emit("message", "Welcome to the server!");

  client.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

//start the server
const port = 4000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
