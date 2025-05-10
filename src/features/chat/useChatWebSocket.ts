import { useState, useEffect, useRef } from "react";
import { useAuth } from "react-oidc-context";
import { useDispatch } from "react-redux";
import { chatApi } from "./chatApi";
import { ChatMessage } from "./Chat.types";

export const useChatWebSocket = (chatId: string) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const token = useAuth().user?.access_token;

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_REACT_APP_CHAT_SERVICE_URL;
    if (!baseUrl) {
      console.error("VITE_REACT_APP_CHAT_SERVICE_URL is not set");
      return;
    }

    // Build WebSocket URL (assuming Kong is proxying the WebSocket endpoint)
    // If using ws:// vs. wss:// adjust accordingly based on your setup.
    const wsUrl =
      baseUrl.replace(/^http/, "ws") + `/ws/chat/${chatId}?token=${token}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to chat WebSocket:", wsUrl);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const newMessage: ChatMessage = {
          id: parsedData.id || `msg${Date.now()}`,
          sender: parsedData.sender || "Server",
          content: parsedData.content || event.data,
          timestamp: parsedData.timestamp || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMessage]);
      } catch (error) {
        console.error("Błąd parsowania JSON:", error);
        // Fallback, gdy dane nie są w formacie JSON
        const fallbackMessage: ChatMessage = {
          id: `msg${Date.now()}`,
          sender: "",
          content: event.data,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      if (chatId) {
        dispatch(chatApi.util.invalidateTags([{ type: "Chats", id: chatId }]));
      }
    };

    // Cleanup on unmount or chatId change
    return () => {
      ws.close();
    };
  }, [chatId]);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return { messages, sendMessage };
};
