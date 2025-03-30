"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { AILogo, UserIcon } from "./ui/icons";
import Unfurl from "./unfurl";

interface ChatMessageProps {
  messages: { role: string; content: string }[];
  isLoading: boolean;
}

export default function ChatMessage({ messages, isLoading }: ChatMessageProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to extract URL from message.content
  const extractUrlFromContent = (content: string): string | null => {
    const urlMatch = content.match(/href="([^"]+)"/);
    return urlMatch ? urlMatch[1] : null;
  };

  return (
    <div
      id="scroller"
      className="w-full overflow-y-scroll overflow-x-hidden h-full"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className="w-full flex flex-col overflow-x-hidden min-h-full justify-end">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: { type: "spring", bounce: 0.3, duration: 0.2 },
            }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-3 items-center">
              {message.role === "user" && (
                <div className="flex items-end w-full gap-3">
                  <span
                    className="bg-gray-200 p-3 rounded-md w-full max-w-xs overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                  <Avatar className="flex justify-center items-center overflow-hidden w-12 h-12 rounded-full bg-gray-200">
                    <UserIcon />
                  </Avatar>
                </div>
              )}
              {message.role === "assistant" && (
                <div className="flex items-end gap-2">
                  <Avatar className="flex justify-center items-center overflow-hidden w-12 h-12 rounded-full bg-gray-200">
                    <AILogo className="object-contain" width={32} height={32} />
                  </Avatar>
                  <div className="p-3 md:w-[30vw] w-[80vw] overflow-x-auto">
                    {(() => {
                      // const blinkApiUrl = extractUrlFromContent(
                      //   message.content
                        
                      // );
                      const blinkApiUrl="https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fjupiter.dial.to%2Fswap%2FSOL-JUP%3F_brf%3D86997d43-6c13-4ec9-93e1-bed3e7a0b8d0%26_bin%3D75acf2be-2dcf-40ce-a652-654892fa2146"
                      return blinkApiUrl ? (
                        <Unfurl blinkApiUrl={blinkApiUrl} />
                      ) : (
                        <span>Error: Could not load Blink URL</span>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex pl-4 pb-4 gap-2 items-center">
            <div className="bg-gray-200 p-3 rounded-md max-w-xs overflow-x-auto">
              <div className="flex gap-1">
                <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
                <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite] dark:bg-slate-300"></span>
                <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div id="anchor" ref={bottomRef} className="my-4"></div>
    </div>
  );
}
