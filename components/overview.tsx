import { motion } from "framer-motion";
import { AILogo } from "@/components/ui/icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto mb-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col gap-4 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <AILogo width={48} height={48} />
        </p>
        <p className="text-center text-lg text-gray-500">
          With which blink can I help you today?
        </p>
      </div>
    </motion.div>
  );
};
