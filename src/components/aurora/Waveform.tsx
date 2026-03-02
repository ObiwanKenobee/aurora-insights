import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { AuroraMode } from "@/types/aurora";

const modeColors: Record<AuroraMode, string> = {
  observe: "var(--aurora-observe)",
  assist: "var(--aurora-assist)",
  act: "var(--aurora-act)",
  explain: "var(--aurora-explain)",
};

interface WaveformProps {
  mode: AuroraMode;
  isListening: boolean;
  isSpeaking: boolean;
}

export function Waveform({ mode, isListening, isSpeaking }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const color = modeColors[mode];
    const hsl = getComputedStyle(canvas).getPropertyValue(`--aurora-${mode}`).trim();

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      phaseRef.current += 0.03;
      const bars = 32;
      const barWidth = w / bars - 1;
      const intensity = isSpeaking ? 0.9 : isListening ? 0.5 : 0.15;

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + 1);
        const wave = Math.sin(phaseRef.current + i * 0.3) * 0.5 + 0.5;
        const wave2 = Math.sin(phaseRef.current * 1.5 + i * 0.2) * 0.3 + 0.5;
        const barH = Math.max(2, (wave * wave2 * h * 0.8) * intensity);
        const y = (h - barH) / 2;

        ctx.fillStyle = `hsl(${hsl} / ${0.3 + wave * 0.7})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 1);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mode, isListening, isSpeaking]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}
