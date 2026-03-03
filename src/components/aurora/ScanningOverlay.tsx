import { motion, AnimatePresence } from "framer-motion";

interface ScanningOverlayProps {
  active: boolean;
}

export function ScanningOverlay({ active }: ScanningOverlayProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, hsl(var(--aurora-observe) / 0.6) 30%, hsl(var(--aurora-observe)) 50%, hsl(var(--aurora-observe) / 0.6) 70%, transparent 100%)`,
              boxShadow: `0 0 8px hsl(var(--aurora-observe) / 0.5), 0 0 20px hsl(var(--aurora-observe) / 0.2)`,
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Vertical scan line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(180deg, transparent 0%, hsl(var(--aurora-observe) / 0.4) 30%, hsl(var(--aurora-observe) / 0.8) 50%, hsl(var(--aurora-observe) / 0.4) 70%, transparent 100%)`,
              boxShadow: `0 0 6px hsl(var(--aurora-observe) / 0.3)`,
            }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />

          {/* Corner brackets pulsing */}
          {[
            { top: 0, left: 0, borderDir: "border-t-2 border-l-2 rounded-tl-lg" },
            { top: 0, right: 0, borderDir: "border-t-2 border-r-2 rounded-tr-lg" },
            { bottom: 0, left: 0, borderDir: "border-b-2 border-l-2 rounded-bl-lg" },
            { bottom: 0, right: 0, borderDir: "border-b-2 border-r-2 rounded-br-lg" },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 border-aurora-observe/70 ${corner.borderDir}`}
              style={{
                top: corner.top !== undefined ? corner.top : undefined,
                bottom: corner.bottom !== undefined ? corner.bottom : undefined,
                left: corner.left !== undefined ? corner.left : undefined,
                right: corner.right !== undefined ? corner.right : undefined,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
