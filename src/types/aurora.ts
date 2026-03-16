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
  userPreferences: string[];
  recentCorrections: string[];
  activePlan: string;
  lastSuccessfulAction: string;
  unresolvedBlockers: string[];
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

export interface AuroraAnalysis {
  perceived: string[];
  inferred: string[];
  decided: string[];
  suggestions: { slideNum: number; issue: string; fix: string }[];
}

export interface UIAnnotation {
  type: "highlight" | "ghost_cursor" | "mock_preview" | "annotation";
  target: string;
  label?: string;
  replacementText?: string;
}

export interface ProposedAction {
  label: string;
  risk: "low" | "medium" | "high";
  requiresConfirmation: boolean;
  actionSequence?: UIInteraction[];
}

export interface UIInteraction {
  tool: "select_text" | "type_text" | "click" | "scroll" | "highlight_region" | "create_visual_mock" | "update_field";
  target?: {
    type: string;
    label?: string;
    locationHint?: string;
  };
  input?: string;
  verification?: string;
}

export interface AuroraResponse {
  spokenResponse: string;
  timeline: {
    perceived: string[];
    inferred: string[];
    decided: string[];
    executed: string[];
  };
  uiAnnotations: UIAnnotation[];
  proposedActions: ProposedAction[];
  sessionStateUpdate: Partial<SessionContext>;
}
