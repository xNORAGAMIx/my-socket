import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [messages, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <>
      <h1>Basic Chat App</h1>

      <input
        type="text"
        value={messageInput}
        placeholder="Enter Message"
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {/**Render all messages */}

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </>
  );
}

export default App;
