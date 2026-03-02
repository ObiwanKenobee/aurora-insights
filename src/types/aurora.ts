export type AuroraMode = "observe" | "assist" | "act" | "explain" | "pressure";

export interface TimelineEvent {
  id: string;
  lane: "perceived" | "inferred" | "decided" | "executed";
  content: string;
  timestamp: number;
}

export interface SessionContext {
  objective: string;
  activeApps: string[];
  openThreads: string[];
  recentShifts: string[];
}

export interface IncidentAlert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  timeToImpact: number; // seconds
  confidence: number; // 0-100
  riskClass: string;
}

export interface SlideHighlight {
  slideNum: number;
  type: "perceive" | "explain" | "act";
  label?: string;
  replacementText?: string;
}
