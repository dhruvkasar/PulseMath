import { fallbackQuestions } from "./fallback";

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
  try {
    const apiCall = fetch(`/api/equations?mode=${encodeURIComponent(mode)}&grade=${encodeURIComponent(grade)}&count=${count}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Server limit or failure');
        }
        return res.json();
      });

    // Race the API call against a 20-second timeout
    const data: EquationData[] = await Promise.race([apiCall, timeoutPromise(20000)]);
    return data;
  } catch (error) {
    console.error("API failed, timed out, or rate-limited. Falling back to local data:", error);
    
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
