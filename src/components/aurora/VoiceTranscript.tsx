import { motion } from "framer-motion";

interface VoiceTranscriptProps {
  text: string;
  isListening: boolean;
}

export function VoiceTranscript({ text, isListening }: VoiceTranscriptProps) {
  return (
    <motion.div
      className="glass rounded-lg px-3 py-2 max-w-md"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isListening ? "bg-aurora-observe animate-pulse-glow" : "bg-muted-foreground/30"}`} />
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {isListening ? "Listening" : "Transcript"}
        </span>
      </div>
      <p className="text-xs text-secondary-foreground/80 leading-relaxed font-mono">
        {text}
        {isListening && (
          <motion.span
            className="inline-block w-0.5 h-3 bg-primary ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </p>
    </motion.div>
  );
}
