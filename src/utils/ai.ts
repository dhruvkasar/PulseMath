import { GoogleGenAI, Type } from "@google/genai";
import { fallbackQuestions } from "./fallback";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface EquationData {
  equation: string;
  answer: number;
  difficulty: string;
  hint: string;
}

const timeoutPromise = (ms: number) => 
  new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms));

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
    const apiCall = ai.models.generateContent({
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

    // Race the API call against a 20-second timeout
    const response = await Promise.race([apiCall, timeoutPromise(20000)]);

    const text = response.text || "[]";
    const data: EquationData[] = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("API failed or timed out. Falling back to local emergency data:", error);
    
    // Attempt to match the exact mode and grade first
    let matchingFallback = fallbackQuestions.filter(
      q => q.mode.toLowerCase() === mode.toLowerCase() && q.grade.toLowerCase() === grade.toLowerCase()
    );

    // If no strict match found, fallback to anything in that mode
    if (matchingFallback.length === 0) {
       matchingFallback = fallbackQuestions.filter(q => q.mode.toLowerCase() === mode.toLowerCase());
    }
    
    // If absolutely nothing matches, use everything to prevent a soft-lock
    if (matchingFallback.length === 0) {
      matchingFallback = fallbackQuestions;
    }

    // Multiply or slice the array to fulfill the exact 'count' required for the game
    const populatedSet: EquationData[] = [];
    for (let i = 0; i < count; i++) {
        const sourceEq = matchingFallback[i % matchingFallback.length];
        
        // Slightly randomize values for variations if we have to loop 
        // to prevent pure identical repeats during long sessions.
        if (i >= matchingFallback.length && sourceEq.mode === 'addition') {
             const variation = Math.floor(Math.random() * 5) + 1;
             populatedSet.push({
                 equation: `${sourceEq.equation} + ${variation}`,
                 answer: sourceEq.answer + variation,
                 difficulty: sourceEq.difficulty,
                 hint: sourceEq.hint
             });
        } else {
             populatedSet.push({ 
                 equation: sourceEq.equation, 
                 answer: sourceEq.answer, 
                 difficulty: sourceEq.difficulty, 
                 hint: sourceEq.hint 
             });
        }
    }
    
    return populatedSet;
  }
}
