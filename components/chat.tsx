"use client";

import { useState } from "react";
import ChatMessage from "./chat-message";
import { ChatInput } from "@/components/chat-input";
import { SuggestedActions } from "@/components/suggested-actions";
import { motion } from "framer-motion";

export function Chat({ id }: { id: string }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

    try {
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: input }),
      // });
      // const data = await response.json();
      const data = {
        link: "https://example.com/flip-coin",
      };
      const assistantMessage = {
        role: "assistant",
        content: `<div><a href="${data.link}" target="_blank">${data.link}</a></div>`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error getting response",
        },
      ]);
    }
    console.log(messages);
    setIsLoading(false);
  };

  const handleSuggestedAction = async (action: string) => {
    const userMessage = { role: "user", content: action };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: action }),
      });
      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: `<div><a href="${data.link}" target="_blank">Click here</a></div>`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error getting response",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-screen max-w-7xl mx-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col h-full justify-center items-center">
          <SuggestedActions chatId={id} onAction={handleSuggestedAction} />
          <div className="w-full max-w-3xl px-4">
            <ChatInput
              chatId={id}
              userInput={input}
              handleInputChange={(e) => setInput(e.target.value)}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              messages={messages}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row h-full md:items-center">
          <motion.div
            className="w-full md:w-1/2 md:pr-4"
            initial={{ x: "50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="hidden md:block">
              <SuggestedActions chatId={id} onAction={handleSuggestedAction} />
            </div>

            <ChatInput
              chatId={id}
              userInput={input}
              handleInputChange={(e) => setInput(e.target.value)}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              messages={messages}
            />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 md:pl-4"
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <ChatMessage isLoading={isLoading} messages={messages} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
