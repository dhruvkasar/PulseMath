import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { ModeSelector } from './components/ModeSelector';
import { GameScreen } from './components/GameScreen';
import { GameOver } from './components/GameOver';
import { generateEquations, EquationData } from './utils/ai';
import { audioEngine } from './utils/audio';
import { Loader2 } from 'lucide-react';
import { IntroAnimation } from './components/IntroAnimation';

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'home' | 'modes' | 'loading' | 'playing' | 'gameover'>('intro');
  const [equations, setEquations] = useState<EquationData[]>([]);
  const [bpm, setBpm] = useState(100);
  
  const [finalScore, setFinalScore] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [selectedMode, setSelectedMode] = useState('');

  const handleIntroComplete = () => setGameState('home');
  const handleStartModes = () => setGameState('modes');
  const handleBackHome = () => setGameState('home');

  const handleModeSelect = async (mode: string, grade: string, selectedBpm: number) => {
    // Initialize audio context synchronously here
    audioEngine.init();
    
    setGameState('loading');
    setBpm(selectedBpm);
    setSelectedMode(mode);

    try {
      const data = await generateEquations(mode, grade, 20); // Get 20 questions
      setEquations(data);
      setGameState('playing');
    } catch (err) {
      console.error(err);
      // Handled by fallback empty array or mocked data in ai.ts
      setGameState('home');
    }
  };

  const handleGameOver = (score: number, combo: number) => {
    setFinalScore(score);
    setMaxCombo(combo);
    setGameState('gameover');
  };

  const handleRetry = async () => {
    // Ideally we re-fetch new equations, or reuse if they didn't finish them.
    // Let's just go back to mode selection to re-trigger seamlessly or if we saved the grade, we could just reload.
    setGameState('modes');
  };

  return (
    <div className="h-[100dvh] w-[100vw] overflow-hidden font-ui bg-[#fafaf9] text-slate-800 relative">
      <div className="absolute inset-0 bg-graph-paper opacity-60 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {gameState === 'intro' && <IntroAnimation onComplete={handleIntroComplete} />}
        
        {gameState === 'home' && <Hero onStart={handleStartModes} />}
        
        {gameState === 'modes' && (
          <ModeSelector 
            onBack={handleBackHome} 
            onSelect={handleModeSelect} 
          />
        )}

        {gameState === 'loading' && (
          <div className="h-full w-full flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <Loader2 className="w-16 h-16 animate-spin text-slate-800 mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase text-slate-800 relative inline-block">
              <span className="relative z-10">Formatting Document...</span>
              <div className="absolute bottom-1 left-0 w-full h-3 hl-yellow -z-10 rotate-1"></div>
            </h2>
            <p className="mt-4 font-math text-slate-500 text-sm">Generating mathematical variables.</p>
          </div>
        )}

        {gameState === 'playing' && (
          <GameScreen 
            equations={equations}
            bpm={bpm}
            onGameOver={handleGameOver}
          />
        )}

        {gameState === 'gameover' && (
          <GameOver 
            score={finalScore} 
            maxCombo={maxCombo}
            mode={selectedMode}
            onRetry={handleRetry}
            onHome={handleBackHome}
          />
        )}
      </div>
    </div>
  );
}
