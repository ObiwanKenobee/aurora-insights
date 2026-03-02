import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineEvent } from "@/types/aurora";
import { ChevronDown, ChevronUp } from "lucide-react";

const laneConfig = {
  perceived: { label: "Perceived", colorClass: "bg-lane-perceived", textClass: "text-lane-perceived" },
  inferred: { label: "Inferred", colorClass: "bg-lane-inferred", textClass: "text-lane-inferred" },
  decided: { label: "Decided", colorClass: "bg-lane-decided", textClass: "text-lane-decided" },
  executed: { label: "Executed", colorClass: "bg-lane-executed", textClass: "text-lane-executed" },
};

const lanes = ["perceived", "inferred", "decided", "executed"] as const;

interface CognitiveTimelineProps {
  events: TimelineEvent[];
}

export function CognitiveTimeline({ events }: CognitiveTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden"
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 glass-hover"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            🧭 Cognitive Timeline
          </span>
          <div className="flex gap-1">
            {lanes.map((lane) => (
              <span
                key={lane}
                className={`w-1.5 h-1.5 rounded-full ${laneConfig[lane].colorClass}`}
              />
            ))}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {lanes.map((lane) => {
                const laneEvents = events.filter((e) => e.lane === lane);
                const config = laneConfig[lane];
                return (
                  <div key={lane} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${config.colorClass}`} />
                      <span className={`text-[11px] font-mono uppercase tracking-wider ${config.textClass}`}>
                        {config.label}
                      </span>
                    </div>
                    <div className="pl-4 border-l border-border/50 space-y-1">
                      {laneEvents.map((event, i) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-xs text-secondary-foreground/80 leading-relaxed"
                        >
                          • {event.content}
                        </motion.div>
                      ))}
                      {laneEvents.length === 0 && (
                        <div className="text-[11px] text-muted-foreground/50 italic">
                          Awaiting input...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
