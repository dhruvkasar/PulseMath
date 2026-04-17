# 🎵 PulseMath

PulseMath is an educational rhythm-based math game where equations appear in sync with music beats. Designed to make mental math highly engaging, students and puzzle-solvers must calculate the correct answers to a pulse-pounding rhythm before time runs out.

## 🚀 Features
- **Dynamic Math Engine:** Automatically generates arithmetic and algebraic challenges across Elementary, Middle, and High School levels.
- **Rhythm-based Gameplay:** Countdown timers and visual cues are perfectly synchronized to the selected BPM (Beats Per Minute).
- **Fallback System:** Insulated against API timeouts with a robust local dictionary of 80+ handcrafted math questions.
- **Kinetic Typography:** A striking, responsive design built with Framer Motion, utilizing brutalist typography and dynamic CSS themes.
- **Audio Integration:** Synthesizes beat frequencies, correct/incorrect chimes, and combo-breaking sound effects utilizing the browser's Web Audio API.

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (featuring a custom Educational Brutalism/Highlighter theme)
- **Animations:** framer-motion & canvas-confetti
- **AI/Logic:** @google/genai SDK (Gemini)
- **Icons:** lucide-react

## 📦 Usage
To run the project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your generated Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎮 How to Play
1. Select a **Math Mode** (Addition, Multiplication, Fractions, Algebra).
2. Choose your **Difficulty/Tempo** (Elementary, Middle, High).
3. Type the exact answer to the mathematical equation as fast as possible before the timer ring expires.
4. Try not to miss! String consecutive correct answers together to build up your combo multiplier and set a new high score.

## 📄 License
MIT License
