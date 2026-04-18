import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import rateLimit from "express-rate-limit";
import { GoogleGenAI, Type } from "@google/genai";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini directly on the server to prevent client-side exposure!
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Basic In-Memory Cache to prevent repeated API calls for the same configuration
const equationsCache = new Map<string, any>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Rate Limiting Middleware
  const generationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes window
    max: 10, // Limit each IP to 10 equation requests per window (since we cache, 10 is plenty)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please use the fallback library." },
  });

  // API routes FIRST
  app.get("/api/equations", generationLimiter, async (req, res) => {
    const { mode = 'addition', grade = 'elementary', count = '20' } = req.query;
    const cacheKey = `${mode}-${grade}-${count}`;

    // 2. Caching Implementation
    if (equationsCache.has(cacheKey)) {
      console.log(`Serving ${cacheKey} from server cache...`);
      res.json(equationsCache.get(cacheKey));
      return;
    }

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
      const data = JSON.parse(text);
      
      // Save data into memory cache
      equationsCache.set(cacheKey, data);
      
      res.json(data);
    } catch (error) {
      console.error("API call on server failed:", error);
      res.status(500).json({ error: 'Failed to generate equations via Gemini API' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
