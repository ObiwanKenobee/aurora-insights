export type AuroraMode = "observe" | "assist" | "act" | "explain";

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
