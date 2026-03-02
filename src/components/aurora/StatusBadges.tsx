import { motion, AnimatePresence } from "framer-motion";
import type { AuroraMode } from "@/types/aurora";

interface StatusBadgesProps {
  mode: AuroraMode;
  visionActive: boolean;
  actionActive: boolean;
  isThinking: boolean;
}

export function StatusBadges({ visionActive, actionActive, isThinking }: StatusBadgesProps) {
  const badges = [
    { key: "vision", active: visionActive, label: "Vision", icon: "👁" },
    { key: "action", active: actionActive, label: "Action", icon: "⚡" },
    { key: "thinking", active: isThinking, label: "Thinking", icon: "💭" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <AnimatePresence>
        {badges
          .filter((b) => b.active)
          .map((badge) => (
            <motion.div
              key={badge.key}
              initial={{ opacity: 0, scale: 0.8, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -8 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full glass text-[10px] font-mono text-muted-foreground"
            >
              <span>{badge.icon}</span>
              <span className="uppercase tracking-wider">{badge.label}</span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
