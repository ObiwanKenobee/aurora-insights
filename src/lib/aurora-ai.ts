import { supabase } from "@/integrations/supabase/client";
import type { AuroraAnalysis, AuroraResponse } from "@/types/aurora";

interface SlideData {
  num: number;
  title: string;
  content: string;
}

export async function analyzeSlides(slides: SlideData[]): Promise<AuroraAnalysis> {
  const { data, error } = await supabase.functions.invoke("aurora-analyze", {
    body: { slides },
  });

  if (error) throw error;
  return data as AuroraAnalysis;
}

export async function getAuroraResponse(slides: SlideData[], voiceInput: string = "", currentState: any = null): Promise<AuroraResponse> {
  const analysis = await analyzeSlides(slides);
  
  return {
    spokenResponse: generateSpokenResponse(analysis),
    timeline: {
      perceived: analysis.perceived,
      inferred: analysis.inferred,
      decided: analysis.decided,
      executed: []
    },
    uiAnnotations: generateUIAnnotations(analysis),
    proposedActions: generateProposedActions(analysis),
    sessionStateUpdate: {
      objective: "Refine startup pitch deck",
      activeApps: ["Google Slides"],
      openThreads: ["Slide analysis in progress"],
      recentShifts: voiceInput ? [voiceInput] : [],
      userPreferences: [],
      recentCorrections: [],
      activePlan: "Analyze slides and suggest improvements",
      lastSuccessfulAction: "Slide analysis completed",
      unresolvedBlockers: []
    }
  };
}

function generateSpokenResponse(analysis: AuroraAnalysis): string {
  if (analysis.suggestions.length > 0) {
    const firstSuggestion = analysis.suggestions[0];
    return `I found ${analysis.suggestions.length} improvement${analysis.suggestions.length > 1 ? 's' : ''}. The first issue is on slide ${firstSuggestion.slideNum}: ${firstSuggestion.issue}.`;
  }
  return "Your pitch deck looks strong. No major issues detected.";
}

function generateUIAnnotations(analysis: AuroraAnalysis): any[] {
  return analysis.suggestions.map(suggestion => ({
    type: "highlight" as const,
    target: `slide-${suggestion.slideNum}`,
    label: suggestion.issue
  }));
}

function generateProposedActions(analysis: AuroraAnalysis): any[] {
  return analysis.suggestions.map(suggestion => ({
    label: `Fix slide ${suggestion.slideNum}: ${suggestion.issue}`,
    risk: "low" as const,
    requiresConfirmation: false,
    actionSequence: [
      {
        tool: "select_text" as const,
        target: {
          type: "text_box",
          label: "Slide content",
          locationHint: `slide ${suggestion.slideNum}`
        },
        verification: "Text selected on slide"
      },
      {
        tool: "update_field" as const,
        input: suggestion.fix,
        verification: "Content updated successfully"
      }
    ]
  }));
}
