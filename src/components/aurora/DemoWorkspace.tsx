import { motion } from "framer-motion";

/** A mock workspace background to demonstrate Aurora overlaying real work */
export function DemoWorkspace() {
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

      {/* Mock slide/document */}
      <motion.div
        className="max-w-2xl mx-auto mt-12 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
          Demo Workspace — Pitch Deck Editor
        </div>

        {/* Mock slide cards */}
        {[
          { num: 3, title: "Market Opportunity", content: "Total addressable market estimated at $4.2B with 23% CAGR" },
          { num: 4, title: "Value Proposition", content: "Our platform enables teams to move faster with AI-powered workflows", highlight: true },
          { num: 5, title: "Traction", content: "250+ customers, $1.2M ARR, 40% MoM growth" },
          { num: 6, title: "Financial Projections", content: "Targeting $10M ARR by end of Year 2" },
        ].map((slide, i) => (
          <motion.div
            key={slide.num}
            className={`glass rounded-xl p-5 transition-all duration-500 ${
              slide.highlight ? "ring-1 ring-aurora-explain/30 glow-explain" : ""
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-muted-foreground">
                Slide {slide.num}
              </span>
              {slide.highlight && (
                <motion.span
                  className="text-[9px] font-mono text-aurora-explain px-1.5 py-0.5 rounded-full bg-aurora-explain/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Aurora attention
                </motion.span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{slide.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{slide.content}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
