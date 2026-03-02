import { useState, useCallback } from "react";
import { DemoWorkspace } from "@/components/aurora/DemoWorkspace";
import { AuroraOverlay } from "@/components/aurora/AuroraOverlay";
import type { AuroraMode, SlideHighlight } from "@/types/aurora";

const Index = () => {
  const [mode, setMode] = useState<AuroraMode>("observe");
  const [highlights, setHighlights] = useState<SlideHighlight[]>([]);

  const handleModeChange = useCallback((newMode: AuroraMode) => setMode(newMode), []);
  const handleHighlightsChange = useCallback((newHighlights: SlideHighlight[]) => setHighlights(newHighlights), []);

  return (
    <div className="relative min-h-screen bg-background">
      <DemoWorkspace mode={mode} highlights={highlights} />
      <AuroraOverlay onModeChange={handleModeChange} onHighlightsChange={handleHighlightsChange} />
    </div>
  );
};

export default Index;
