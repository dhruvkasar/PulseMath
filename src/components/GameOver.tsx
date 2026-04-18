import React, { useState, useEffect } from 'react';
import { RotateCcw, Home, Trophy } from 'lucide-react';
import { fireComboConfetti } from '../utils/confetti';

interface GameOverProps {
  score: number;
  maxCombo: number;
  mode: string;
  onRetry: () => void;
  onHome: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, maxCombo, mode, onRetry, onHome }) => {
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    fireComboConfetti();
    const key = `pulsemath-highscore-${mode}`;
    const stored = parseInt(localStorage.getItem(key) || '0', 10);
    if (score > stored) {
      localStorage.setItem(key, score.toString());
      setHighScore(score);
    } else {
      setHighScore(stored);
    }
  }, [score, mode]);

  const isNewHighScore = score >= highScore && score > 0;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 relative z-10 overflow-y-auto">
      
      <div className="math-card w-full max-w-sm p-8 flex flex-col items-center text-center animate-bounce-in z-10">
        
        <div className="relative mb-6">
          <h2 className="text-4xl font-display font-black uppercase text-slate-800 dark:text-slate-100 tracking-tight z-10 relative">
            Session Ended
          </h2>
          <div className="absolute bottom-1 right-0 w-3/4 h-[30%] hl-pink -z-10 transform -rotate-1 rounded-sm mix-blend-multiply dark:mix-blend-screen opacity-80"></div>
        </div>
        
        {isNewHighScore ? (
          <div className="inline-flex items-center text-xs font-ui font-black bg-yellow-300 dark:bg-yellow-600 text-slate-800 dark:text-slate-100 px-3 py-1 rounded-sm border-2 border-slate-800 dark:border-slate-100 mb-8 transform -rotate-2 shadow-[2px_2px_0_#1e293b] dark:shadow-[2px_2px_0_#94a3b8] animate-shake">
            <Trophy className="w-4 h-4 mr-2" />
            NEW RECORD
          </div>
        ) : (
            <div className="h-8 mb-8 mt-2"></div>
        )}

        <div className="w-full flex justify-between items-center bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-3">
          <span className="text-slate-500 dark:text-slate-400 font-ui font-bold text-xs uppercase tracking-widest">Final Score</span>
          <span className="text-3xl font-math font-bold text-slate-800 dark:text-slate-100">{score}</span>
        </div>
        
        <div className="w-full flex justify-between items-center bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-10">
          <span className="text-slate-500 dark:text-slate-400 font-ui font-bold text-xs uppercase tracking-widest">Max Combo</span>
          <span className="text-xl font-math font-bold text-slate-800 dark:text-slate-100">{maxCombo}x</span>
        </div>

        <div className="w-full flex gap-3 flex-col sm:flex-row">
          <button 
            onClick={onRetry}
            className="push-btn flex-1 flex justify-center items-center py-4 font-ui font-black text-sm bg-teal-200 dark:bg-teal-900 text-slate-800 dark:text-slate-100 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> RESTART
          </button>
          <button 
            onClick={onHome}
            className="push-btn flex-1 flex justify-center items-center py-4 font-ui font-black text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl"
          >
            <Home className="w-5 h-5 mr-2" /> MENU
          </button>
        </div>
      </div>
    </div>
  );
};
