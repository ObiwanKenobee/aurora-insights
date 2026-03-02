import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GhostCursorProps {
  active: boolean;
  targetLabel?: string;
}

export function GhostCursor({ active, targetLabel }: GhostCursorProps) {
  const [phase, setPhase] = useState<"idle" | "moving" | "clicking" | "done">("idle");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }
    setPhase("moving");
    const t1 = setTimeout(() => setPhase("clicking"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 1800);
    const t3 = setTimeout(() => setPhase("idle"), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Ghost cursor */}
          <motion.div
            className="absolute"
            initial={{ left: "30%", top: "60%" }}
            animate={
              phase === "moving"
                ? { left: "55%", top: "35%", transition: { duration: 1, ease: "easeInOut" } }
                : phase === "clicking"
                ? { scale: 0.9, transition: { duration: 0.1 } }
                : { scale: 1 }
            }
          >
            {/* Cursor shape */}
            <svg width="20" height="24" viewBox="0 0 20 24" className="drop-shadow-lg">
              <path
                d="M1 1L1 18L5.5 14L9.5 22L12.5 20.5L8.5 12.5L14 11L1 1Z"
                fill="hsl(var(--primary) / 0.6)"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
              />
            </svg>

            {/* Click ripple */}
            <AnimatePresence>
              {phase === "clicking" && (
                <motion.div
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full border border-primary"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Predictive path */}
          {phase === "moving" && (
            <svg className="absolute inset-0 w-full h-full">
              <motion.line
                x1="30%"
                y1="60%"
                x2="55%"
                y2="35%"
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          )}

          {/* Confirmation pulse */}
          <AnimatePresence>
            {phase === "done" && targetLabel && (
              <motion.div
                className="absolute glass rounded-lg px-3 py-1.5 text-xs font-mono text-aurora-act"
                style={{ left: "55%", top: "30%" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✓ {targetLabel}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
