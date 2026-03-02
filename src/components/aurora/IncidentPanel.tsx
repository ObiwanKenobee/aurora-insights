import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IncidentAlert } from "@/types/aurora";
import { AlertTriangle, Shield, Clock, ChevronDown, ChevronUp } from "lucide-react";

const severityConfig = {
  critical: { color: "bg-destructive", text: "text-destructive", glow: "shadow-[0_0_12px_hsl(var(--destructive)/0.4)]" },
  high: { color: "bg-aurora-explain", text: "text-aurora-explain", glow: "shadow-[0_0_12px_hsl(var(--aurora-explain)/0.3)]" },
  medium: { color: "bg-primary", text: "text-primary", glow: "" },
  low: { color: "bg-muted-foreground", text: "text-muted-foreground", glow: "" },
};

const demoAlerts: IncidentAlert[] = [
  { id: "a1", severity: "critical", title: "Auth Token Leak Detected", description: "Exposed bearer token in client-side logs", timeToImpact: 180, confidence: 94, riskClass: "DATA_BREACH" },
  { id: "a2", severity: "high", title: "Rate Limit Bypass Attempt", description: "Unusual traffic pattern from 3 IPs", timeToImpact: 600, confidence: 78, riskClass: "DDOS" },
  { id: "a3", severity: "medium", title: "Stale SSL Certificate", description: "Certificate expires in 48 hours", timeToImpact: 172800, confidence: 100, riskClass: "COMPLIANCE" },
];

function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const urgent = remaining < 300;

  return (
    <span className={`font-mono text-[11px] tabular-nums ${urgent ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
      {m}:{s.toString().padStart(2, "0")}
    </span>
  );
}

export function IncidentPanel() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden ring-1 ring-destructive/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 glass-hover"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
          <span className="text-xs font-mono uppercase tracking-widest text-destructive">
            Incident Response
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-destructive/20 text-destructive text-[10px] font-mono">
            {demoAlerts.length}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
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
            <div className="px-4 pb-4 space-y-2">
              {demoAlerts.map((alert, i) => {
                const sev = severityConfig[alert.severity];
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-lg bg-secondary/50 p-3 space-y-2 ${sev.glow}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${sev.color}`} />
                        <span className="text-xs font-semibold text-foreground">{alert.title}</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase ${sev.text} bg-secondary`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <Countdown seconds={alert.timeToImpact} />
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[11px] font-mono text-muted-foreground">{alert.confidence}%</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full bg-accent text-[9px] font-mono text-accent-foreground">
                        {alert.riskClass}
                      </span>
                    </div>
                    {/* Confidence bar */}
                    <div className="h-1 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${sev.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${alert.confidence}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
