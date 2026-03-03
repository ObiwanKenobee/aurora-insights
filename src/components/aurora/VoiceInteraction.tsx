import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AuroraMode, TimelineEvent } from "@/types/aurora";

interface VoiceInteractionProps {
  isListening: boolean;
  isSpeaking: boolean;
  mode: AuroraMode;
  onInterrupt?: () => void;
  onCognitiveShift?: (event: TimelineEvent) => void;
}

export function VoiceInteraction({
  isListening,
  isSpeaking,
  mode,
  onInterrupt,
  onCognitiveShift,
}: VoiceInteractionProps) {
  const [interrupted, setInterrupted] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(24).fill(0.1));
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);

  // Simulate audio bars
  useEffect(() => {
    const animate = () => {
      phaseRef.current += 0.06;
      setBars((prev) =>
        prev.map((_, i) => {
          const base = isListening || isSpeaking ? 0.15 : 0.05;
          const wave = Math.sin(phaseRef.current + i * 0.4) * 0.3;
          const wave2 = Math.cos(phaseRef.current * 1.3 + i * 0.25) * 0.2;
          const speaking = isSpeaking ? Math.sin(phaseRef.current * 2 + i * 0.5) * 0.4 : 0;
          const user = userSpeaking ? Math.sin(phaseRef.current * 3 + i * 0.3) * 0.5 : 0;
          return Math.max(0.05, Math.min(1, base + wave + wave2 + speaking + user));
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [isListening, isSpeaking, userSpeaking]);

  // Simulate user interruption
  useEffect(() => {
    if (!isSpeaking) return;
    const timer = setTimeout(() => {
      setUserSpeaking(true);
      setInterrupted(true);
      onInterrupt?.();
      onCognitiveShift?.({
        id: `shift-${Date.now()}`,
        lane: "perceived",
        content: "User interrupted — redirecting focus",
        timestamp: Date.now(),
      });
      setTimeout(() => {
        setUserSpeaking(false);
        setInterrupted(false);
      }, 2500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSpeaking, onInterrupt, onCognitiveShift]);

  const barColor = interrupted
    ? "var(--aurora-pressure)"
    : isSpeaking
    ? "var(--aurora-act)"
    : "var(--aurora-observe)";

  return (
    <div className="relative">
      {/* WebRTC-style audio visualization */}
      <div className="flex items-center justify-center gap-[2px] h-6">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 2,
              background: `hsl(${barColor} / ${0.4 + height * 0.6})`,
            }}
            animate={{ height: height * 20 + 2 }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        ))}
      </div>

      {/* Interruption indicator */}
      <AnimatePresence>
        {interrupted && (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-aurora-pressure/15 text-aurora-pressure">
              ⚡ Interruption detected
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Channel labels */}
      <div className="flex justify-between mt-1">
        <div className="flex items-center gap-1">
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: userSpeaking ? `hsl(var(--aurora-observe))` : `hsl(var(--muted-foreground) / 0.3)` }}
          />
          <span className="text-[8px] font-mono text-muted-foreground/60">USER</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-muted-foreground/60">AURORA</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: isSpeaking && !interrupted ? `hsl(var(--aurora-act))` : `hsl(var(--muted-foreground) / 0.3)` }}
          />
        </div>
      </div>
    </div>
  );
}
