import { motion } from "framer-motion";
import type { AuroraMode } from "@/types/aurora";

const modeConfig: Record<AuroraMode, { label: string; colorClass: string; glowClass: string }> = {
  observe: { label: "Observing", colorClass: "bg-aurora-observe", glowClass: "glow-observe" },
  assist: { label: "Assisting", colorClass: "bg-aurora-assist", glowClass: "glow-primary" },
  act: { label: "Acting", colorClass: "bg-aurora-act", glowClass: "glow-act" },
  explain: { label: "Explaining", colorClass: "bg-aurora-explain", glowClass: "glow-explain" },
  pressure: { label: "Incident", colorClass: "bg-destructive", glowClass: "" },
};

interface ModeIndicatorProps {
  mode: AuroraMode;
  onModeChange: (mode: AuroraMode) => void;
}

export function ModeIndicator({ mode, onModeChange }: ModeIndicatorProps) {
  const modes: AuroraMode[] = ["observe", "assist", "act", "explain", "pressure"];

  return (
    <div className="flex items-center gap-1.5">
      {modes.map((m) => {
        const config = modeConfig[m];
        const isActive = m === mode;
        return (
          <motion.button
            key={m}
            onClick={() => onModeChange(m)}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              isActive
                ? `${config.glowClass} text-foreground`
                : "text-muted-foreground hover:text-secondary-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${config.colorClass}`}
              animate={isActive ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="hidden sm:inline">{config.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
