"use client";

import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function ChatBox() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const client = useRef<any>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    client.current = Stomp.over(socket);

    client.current.connect({}, () => {
      client.current.subscribe("/topic/messages", (msg: any) => {
        setMessages(prev => [...prev, JSON.parse(msg.body)]);
      });
    });

    return () => client.current.disconnect();
  }, []);

  const send = () => {
    if (!input) return;

    client.current.send("/app/chat", {}, JSON.stringify({
      sender: "HOUSE",
      content: input
    }));

    setInput("");
  };

  return (
    <div className="p-4">

      <div className="h-80 overflow-y-auto space-y-2 border p-2">
        {messages.map((m, i) => (
          <div key={i}
            className={`p-2 rounded ${
              m.sender === "HOUSE" ? "bg-green-200 text-right" : "bg-gray-200"
            }`}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input className="border flex-1 p-2"
          value={input}
          onChange={e => setInput(e.target.value)} />

        <button onClick={send}
          className="bg-green-500 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
}