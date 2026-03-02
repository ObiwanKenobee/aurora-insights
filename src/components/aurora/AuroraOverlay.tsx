import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AuroraMode, TimelineEvent, SessionContext } from "@/types/aurora";
import { Waveform } from "./Waveform";
import { ModeIndicator } from "./ModeIndicator";
import { StatusBadges } from "./StatusBadges";
import { CognitiveTimeline } from "./CognitiveTimeline";
import { SessionContextPanel } from "./SessionContext";
import { VoiceTranscript } from "./VoiceTranscript";
import { GhostCursor } from "./GhostCursor";
import { Mic, MicOff, Eye, Zap } from "lucide-react";

const demoTimeline: TimelineEvent[] = [
  { id: "1", lane: "perceived", content: "Slide 4 contains weak value proposition language", timestamp: 1 },
  { id: "2", lane: "perceived", content: "Competitor comparison chart missing key metrics", timestamp: 2 },
  { id: "3", lane: "inferred", content: "Deck is too product-heavy, not investor-focused", timestamp: 3 },
  { id: "4", lane: "inferred", content: "Financial projections lack market-size context", timestamp: 4 },
  { id: "5", lane: "decided", content: "Rewrite headline + compress feature slide", timestamp: 5 },
  { id: "6", lane: "decided", content: "Add TAM/SAM/SOM to projections slide", timestamp: 6 },
  { id: "7", lane: "executed", content: "Updated slide 4 headline", timestamp: 7 },
  { id: "8", lane: "executed", content: "Generated new visual mockup", timestamp: 8 },
];

const demoSession: SessionContext = {
  objective: "Refine Series A pitch deck for investor meeting",
  activeApps: ["Google Slides", "Figma", "Chrome"],
  openThreads: ["Deck restructure", "Visual refresh", "Data validation"],
  recentShifts: ["User redirected from design to content focus", "Switched from slide 2 to slide 4"],
};

const transcriptLines = [
  "I think the value proposition on slide four needs work...",
  "Can you also look at the competitor comparison?",
  "Actually, let's focus on making the headline stronger first.",
];

export function AuroraOverlay() {
  const [mode, setMode] = useState<AuroraMode>("observe");
  const [isListening, setIsListening] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [visionActive, setVisionActive] = useState(true);
  const [ghostActive, setGhostActive] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState<TimelineEvent[]>([]);

  // Simulate progressive timeline events
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    demoTimeline.forEach((event, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleEvents((prev) => [...prev, event]);
        }, 1500 + i * 800)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cycle through modes for demo
  useEffect(() => {
    const modes: AuroraMode[] = ["observe", "assist", "act", "explain"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % modes.length;
      setMode(modes[i]);
      if (modes[i] === "act") {
        setGhostActive(true);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cycle transcript
  useEffect(() => {
    const interval = setInterval(() => {
      setTranscriptIndex((i) => (i + 1) % transcriptLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleListening = useCallback(() => setIsListening((v) => !v), []);

  return (
    <>
      <GhostCursor active={ghostActive} targetLabel="Updated headline" />

      {/* Main floating overlay - bottom center */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="glass rounded-2xl p-3 glow-primary space-y-2">
          {/* Top row: mode + statuses */}
          <div className="flex items-center justify-between">
            <ModeIndicator mode={mode} onModeChange={setMode} />
            <StatusBadges
              mode={mode}
              visionActive={visionActive}
              actionActive={mode === "act"}
              isThinking={mode === "assist" || mode === "explain"}
            />
          </div>

          {/* Waveform */}
          <Waveform mode={mode} isListening={isListening} isSpeaking={isSpeaking} />

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleListening}
                className={`p-1.5 rounded-full transition-colors ${
                  isListening ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </motion.button>
              <motion.button
                onClick={() => setVisionActive((v) => !v)}
                className={`p-1.5 rounded-full transition-colors ${
                  visionActive ? "bg-aurora-observe/20 text-aurora-observe" : "bg-secondary text-muted-foreground"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                onClick={() => {
                  setGhostActive(true);
                  setMode("act");
                }}
                className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-aurora-act transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Zap className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-aurora-act animate-breath" />
              <span className="text-[10px] font-mono text-muted-foreground">
                Aurora
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right side panel: Timeline + Session + Transcript */}
      <motion.div
        className="fixed top-4 right-4 z-30 w-80 space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CognitiveTimeline events={visibleEvents} />
        <SessionContextPanel context={demoSession} />

        <AnimatePresence mode="wait">
          <motion.div key={transcriptIndex}>
            <VoiceTranscript text={transcriptLines[transcriptIndex]} isListening={isListening} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
