import { useState, useCallback, useEffect } from "react";
import { DemoWorkspace } from "@/components/aurora/DemoWorkspace";
import { AuroraOverlay } from "@/components/aurora/AuroraOverlay";
import type { AuroraMode, SlideHighlight, TimelineEvent } from "@/types/aurora";
import { analyzeSlides, type AuroraAnalysis } from "@/lib/aurora-ai";
import { toast } from "sonner";

const demoSlides = [
  { num: 3, title: "Market Opportunity", content: "Total addressable market estimated at $4.2B with 23% CAGR" },
  { num: 4, title: "Value Proposition", content: "Our platform enables teams to move faster with AI-powered workflows" },
  { num: 5, title: "Traction", content: "250+ customers, $1.2M ARR, 40% MoM growth" },
  { num: 6, title: "Financial Projections", content: "Targeting $10M ARR by end of Year 2" },
];

const Index = () => {
  const [mode, setMode] = useState<AuroraMode>("observe");
  const [highlights, setHighlights] = useState<SlideHighlight[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AuroraAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleModeChange = useCallback((newMode: AuroraMode) => setMode(newMode), []);
  const handleHighlightsChange = useCallback((newHighlights: SlideHighlight[]) => setHighlights(newHighlights), []);

  // Run AI analysis on mount
  useEffect(() => {
    let cancelled = false;
    setAiLoading(true);
    analyzeSlides(demoSlides)
      .then((result) => {
        if (!cancelled) {
          setAiAnalysis(result);
          toast.success("Aurora AI analysis complete");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("AI analysis failed:", err);
          toast.error("AI analysis unavailable — using demo data");
        }
      })
      .finally(() => { if (!cancelled) setAiLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <DemoWorkspace mode={mode} highlights={highlights} />
      <AuroraOverlay
        onModeChange={handleModeChange}
        onHighlightsChange={handleHighlightsChange}
        aiAnalysis={aiAnalysis}
        aiLoading={aiLoading}
      />
    </div>
  );
};

export default Index;
