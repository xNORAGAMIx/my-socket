//importing packages
import express from "express";
import http from "http";
import { Server } from "socket.io";

//creating instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//serving the static file
app.use(express.static("public"));

//create a connection
io.on("connection", (client) => {
  console.log("User connected!");

  client.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  client.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

//start the server
const port = 4000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
