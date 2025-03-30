"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, Square } from "lucide-react";
import { useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  chatId: string;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  messages: { role: string; content: string }[];
}

export function ChatInput({
  chatId,
  userInput,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  return (
    <div
      className={cn(
        "mx-auto w-full",
        messages.length > 0 ? "h-full flex items-end" : "w-full"
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "max-w-3xl w-full mx-auto",
          messages.length > 0 ? "pb-4" : ""
        )}
      >
        <div className="relative flex flex-col w-full gap-2 bg-gray-100 rounded-3xl border border-gray-300">
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="Ask a question..."
            spellCheck={false}
            value={userInput}
            className="resize-none w-full min-h-12 bg-transparent border-0 px-4 py-3 text-sm placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing) {
                if (userInput.trim().length === 0) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            disabled={isLoading}
          />
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2">
              <Button
                type={isLoading ? "button" : "submit"}
                size={"icon"}
                variant={"outline"}
                className={cn(
                  isLoading && "animate-pulse",
                  "rounded-full border-gray-300"
                )}
                disabled={isLoading || !userInput.trim()}
              >
                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
