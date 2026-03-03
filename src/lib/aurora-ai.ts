import { supabase } from "@/integrations/supabase/client";

interface SlideData {
  num: number;
  title: string;
  content: string;
}

export interface AuroraAnalysis {
  perceived: string[];
  inferred: string[];
  decided: string[];
  suggestions: { slideNum: number; issue: string; fix: string }[];
}

export async function analyzeSlides(slides: SlideData[]): Promise<AuroraAnalysis> {
  const { data, error } = await supabase.functions.invoke("aurora-analyze", {
    body: { slides },
  });

  if (error) throw error;
  return data as AuroraAnalysis;
}
