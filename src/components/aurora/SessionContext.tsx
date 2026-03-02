import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionContext as SessionContextType } from "@/types/aurora";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SessionContextProps {
  context: SessionContextType;
}

export function SessionContextPanel({ context }: SessionContextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div className="glass rounded-xl overflow-hidden" layout>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 glass-hover"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          🧠 Session Context
        </span>
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Objective
                </div>
                <div className="text-xs text-foreground">{context.objective}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Active Apps
                </div>
                <div className="flex flex-wrap gap-1">
                  {context.activeApps.map((app) => (
                    <span key={app} className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-secondary-foreground">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Open Threads
                </div>
                {context.openThreads.map((thread) => (
                  <div key={thread} className="text-xs text-secondary-foreground/70">
                    • {thread}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Recent Shifts
                </div>
                {context.recentShifts.map((shift) => (
                  <div key={shift} className="text-xs text-secondary-foreground/70">
                    ↳ {shift}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
