import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { slides } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Aurora, a cognitive AI assistant that analyzes presentation slides. 
Given slide content, provide structured analysis in this exact JSON format:
{
  "perceived": ["observation 1", "observation 2"],
  "inferred": ["inference 1", "inference 2"],
  "decided": ["action 1", "action 2"],
  "suggestions": [{"slideNum": 4, "issue": "brief issue", "fix": "brief fix suggestion"}]
}
Be concise. Each item should be under 15 words. Focus on real pitch deck weaknesses: vague language, missing data, weak positioning.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze these pitch deck slides:\n${JSON.stringify(slides)}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_slides",
              description: "Return structured slide analysis",
              parameters: {
                type: "object",
                properties: {
                  perceived: { type: "array", items: { type: "string" } },
                  inferred: { type: "array", items: { type: "string" } },
                  decided: { type: "array", items: { type: "string" } },
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        slideNum: { type: "number" },
                        issue: { type: "string" },
                        fix: { type: "string" },
                      },
                      required: ["slideNum", "issue", "fix"],
                    },
                  },
                },
                required: ["perceived", "inferred", "decided", "suggestions"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_slides" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let analysis;

    if (toolCall?.function?.arguments) {
      analysis = JSON.parse(toolCall.function.arguments);
    } else {
      analysis = { perceived: [], inferred: [], decided: [], suggestions: [] };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aurora-analyze error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
