import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface EquationData {
  equation: string;
  answer: number;
  difficulty: string;
  hint: string;
}

export async function generateEquations(
  mode: string,
  grade: string,
  count: number = 20
): Promise<EquationData[]> {
  const prompt = `Generate ${count} math equations for a rhythm-based math game.
  Mode: ${mode}
  Grade Level: ${grade}
  
  The equations should progressively get slightly harder or vary in style within the chosen grade level to keep it engaging.
  Return a JSON array of objects.
  Return only clean numbers for the answer (e.g. 5, not "x=5" or "5.0"). If the answer is a fraction, try to constrain the game mode such that it evaluates to a whole number, OR provide the answer as a decimal if necessary, but whole numbers are highly preferred for the input box. Actually, for this game format, please stick to equations that result in integer answers.
  
  Format:
  [
    {
      "equation": "string (e.g. '8 + 5', '3x = 12')",
      "answer": number (e.g. 13, 4),
      "difficulty": "string (e.g. 'easy', 'medium', 'hard')",
      "hint": "string (e.g. 'Think about 8 + 2 + 3')"
    }
  ]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              equation: { type: Type.STRING },
              answer: { type: Type.NUMBER },
              difficulty: { type: Type.STRING },
              hint: { type: Type.STRING },
            },
            required: ["equation", "answer", "difficulty", "hint"],
          },
        },
      },
    });

    const text = response.text || "[]";
    const data: EquationData[] = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error generating equations:", error);
    // Fallback data if API fails to prevent game crash
    return Array.from({ length: count }).map((_, i) => ({
      equation: `${i + 1} + ${i * 2}`,
      answer: (i + 1) + (i * 2),
      difficulty: "easy",
      hint: "Basic addition",
    }));
  }
}
