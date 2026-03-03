import { motion, AnimatePresence } from "framer-motion";
import type { AuroraMode, SlideHighlight } from "@/types/aurora";
import { ScanningOverlay } from "./ScanningOverlay";

interface DemoWorkspaceProps {
  mode: AuroraMode;
  highlights: SlideHighlight[];
}

export function DemoWorkspace({ mode, highlights }: DemoWorkspaceProps) {
  const slides = [
    { num: 3, title: "Market Opportunity", content: "Total addressable market estimated at $4.2B with 23% CAGR" },
    { num: 4, title: "Value Proposition", content: "Our platform enables teams to move faster with AI-powered workflows" },
    { num: 5, title: "Traction", content: "250+ customers, $1.2M ARR, 40% MoM growth" },
    { num: 6, title: "Financial Projections", content: "Targeting $10M ARR by end of Year 2" },
  ];

  return (
    <div className="min-h-screen bg-background p-8 overflow-hidden">
      {/* Ambient grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        className="max-w-2xl mx-auto mt-12 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
          Demo Workspace — Pitch Deck Editor
        </div>

        {slides.map((slide, i) => {
          const hl = highlights.find((h) => h.slideNum === slide.num);
          const isPerceived = hl?.type === "perceive";
          const isExplain = hl?.type === "explain";
          const isAct = hl?.type === "act";

          return (
            <motion.div
              key={slide.num}
              className={`relative glass rounded-xl p-5 transition-all duration-500 ${
                isPerceived ? "ring-1 ring-aurora-observe/50 glow-observe" :
                isExplain ? "ring-1 ring-aurora-explain/50 glow-explain" :
                isAct ? "ring-1 ring-aurora-act/50 glow-act" : ""
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              {/* Scanning overlay for perceived slides */}
              <ScanningOverlay active={isPerceived} />
              {/* Bounding box corners for perceived slides */}
              <AnimatePresence>
                {isPerceived && (
                  <>
                    {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, ci) => (
                      <motion.span
                        key={ci}
                        className={`absolute ${pos} w-3 h-3 border-aurora-observe/60 ${
                          ci === 0 ? "border-t-2 border-l-2 rounded-tl-md" :
                          ci === 1 ? "border-t-2 border-r-2 rounded-tr-md" :
                          ci === 2 ? "border-b-2 border-l-2 rounded-bl-md" :
                          "border-b-2 border-r-2 rounded-br-md"
                        }`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ delay: ci * 0.05 }}
                      />
                    ))}
                    <motion.div
                      className="absolute -top-5 left-2 text-[9px] font-mono text-aurora-observe px-1.5 py-0.5 rounded bg-aurora-observe/10"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👁 Aurora perceiving
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Slide {slide.num}
                </span>
                {hl?.label && (
                  <motion.span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isExplain ? "text-aurora-explain bg-aurora-explain/10" :
                      isAct ? "text-aurora-act bg-aurora-act/10" :
                      "text-aurora-observe bg-aurora-observe/10"
                    }`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {hl.label}
                  </motion.span>
                )}
              </div>

              {/* Title with optional replacement fade */}
              <div className="relative mb-1">
                <AnimatePresence mode="wait">
                  {isExplain && hl?.replacementText ? (
                    <motion.h3
                      key="replacement"
                      className="text-sm font-semibold text-aurora-explain"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                    >
                      {hl.replacementText}
                    </motion.h3>
                  ) : (
                    <motion.h3
                      key="original"
                      className={`text-sm font-semibold text-foreground ${isExplain ? "text-aurora-explain" : ""}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {slide.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{slide.content}</p>

              {/* Interleaved chart visual during explain */}
              <AnimatePresence>
                {isExplain && slide.num === 6 && (
                  <motion.div
                    className="mt-3 rounded-lg bg-secondary/40 p-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="text-[9px] font-mono text-aurora-explain mb-2 uppercase tracking-wider">
                      Generated: TAM/SAM/SOM Breakdown
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[
                        { label: "TAM", h: "100%", val: "$4.2B" },
                        { label: "SAM", h: "55%", val: "$2.3B" },
                        { label: "SOM", h: "22%", val: "$920M" },
                      ].map((bar, bi) => (
                        <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end">
                          <span className="text-[8px] font-mono text-muted-foreground mb-0.5">{bar.val}</span>
                          <motion.div
                            className="w-full rounded-t bg-aurora-explain/40"
                            initial={{ height: 0 }}
                            animate={{ height: bar.h }}
                            transition={{ delay: 0.3 + bi * 0.15, duration: 0.5 }}
                          />
                          <span className="text-[8px] font-mono text-muted-foreground mt-0.5">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
