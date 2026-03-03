import { motion } from "framer-motion";
import type { AuroraMode } from "@/types/aurora";

const modeColorMap: Record<AuroraMode, string> = {
  observe: "var(--aurora-observe)",
  assist: "var(--aurora-assist)",
  act: "var(--aurora-act)",
  explain: "var(--aurora-explain)",
  pressure: "var(--aurora-pressure)",
};

const loadLabels: Record<AuroraMode, string> = {
  observe: "Monitoring",
  assist: "Processing",
  act: "Executing",
  explain: "Synthesizing",
  pressure: "Alert",
};

interface AwarenessIndicatorProps {
  mode: AuroraMode;
  cognitiveLoad: number; // 0-1
  eventsCount: number;
}

export function AwarenessIndicator({ mode, cognitiveLoad, eventsCount }: AwarenessIndicatorProps) {
  const color = modeColorMap[mode];
  const pulseSpeed = 2.5 - cognitiveLoad * 1.5; // faster pulse = higher load
  const size = 6 + cognitiveLoad * 4; // 6-10px

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Outer glow ring */}
      <div className="relative" style={{ width: size + 12, height: size + 12 }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${color} / 0.3) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: pulseSpeed, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Core dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            background: `hsl(${color})`,
            boxShadow: `0 0 ${8 + cognitiveLoad * 12}px hsl(${color} / ${0.4 + cognitiveLoad * 0.4})`,
          }}
          animate={{
            scale: [1, 1.15 + cognitiveLoad * 0.2, 1],
          }}
          transition={{ duration: pulseSpeed, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="flex flex-col"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          {loadLabels[mode]}
        </span>
        <span className="text-[8px] font-mono text-muted-foreground/50">
          {eventsCount} signals
        </span>
      </motion.div>
    </motion.div>
  );
}
