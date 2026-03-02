import { DemoWorkspace } from "@/components/aurora/DemoWorkspace";
import { AuroraOverlay } from "@/components/aurora/AuroraOverlay";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <DemoWorkspace />
      <AuroraOverlay />
    </div>
  );
};

export default Index;
