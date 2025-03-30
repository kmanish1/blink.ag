"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { memo } from "react";
import { Overview } from "./overview";

interface SuggestedActionsProps {
  chatId: string;
  onAction: (action: string) => Promise<void>;
}

function PureSuggestedActions({ chatId, onAction }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "",
      label: "I want to flip a coin",
      action: "I want to flip a coin",
    },
    {
      title: "",
      label: "I want to purchase .sol domain",
      action: "I want to purchase .sol domain",
    },
    {
      title: "",
      label: "I want to swap sol to jup",
      action: "I want to swap sol to jup",
    },
    {
      title: "",
      label: "Create a blink for my address",
      action: "Create a blink for my address",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-3xl mx-auto p-4">
      <Overview />
      <div className="grid sm:grid-cols-2 gap-2 w-full">
        {suggestedActions.map((suggestedAction, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * index }}
            key={`suggested-action-${suggestedAction.title}-${index}`}
            className={index > 1 ? "hidden sm:block" : "block"}
          >
            <Button
              variant="outline"
              onClick={async () => {
                await onAction(suggestedAction.action);
              }}
              className="text-left border border-gray-300 rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start bg-gray-100 hover:bg-gray-200"
            >
              <span className="font-medium">{suggestedAction.title}</span>
              <span className="text-gray-500">{suggestedAction.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
