import React, { useState, useEffect } from 'react';
import { Heart, Zap } from 'lucide-react';

interface HUDProps {
  score: number;
  combo: number;
  multiplier: number;
  lives: number;
}

export const HUD: React.FC<HUDProps> = ({ score, combo, multiplier, lives }) => {
  const [scoreScale, setScoreScale] = useState(1);

  useEffect(() => {
    if (score > 0) {
      setScoreScale(1.1);
      const t = setTimeout(() => setScoreScale(1), 150);
      return () => clearTimeout(t);
    }
  }, [score]);

  return (
    <div className="w-full h-20 flex justify-between items-start p-4 fixed top-0 left-0 right-0 z-50">
      
      {/* Score Tag */}
      <div className="bg-white border-2 border-slate-800 rounded-lg shadow-[3px_3px_0_#0f172a] px-3 py-1.5 flex flex-col transform -rotate-2 min-w-[90px]">
        <span className="text-[10px] font-ui font-black uppercase text-slate-500 tracking-wider">Score</span>
        <span 
          className="font-math font-bold text-lg text-slate-800 origin-left transition-transform duration-100"
          style={{ transform: `scale(${scoreScale})` }}
        >
          {String(score).padStart(6, '0')}
        </span>
      </div>

      {/* Combo / Multiplier Tag */}
      <div className={`border-2 border-slate-800 rounded-lg px-4 py-1.5 flex flex-col items-center transform rotate-1 transition-colors
                      ${multiplier >= 8 ? 'bg-teal-200' : multiplier >= 4 ? 'bg-yellow-200' : 'bg-white shadow-[3px_3px_0_#0f172a]'}`}>
        <span className="text-[10px] font-ui font-black uppercase tracking-wider mb-0.5 text-slate-600">Streak {combo}</span>
        <div className="flex items-center gap-1">
          <span className="font-display font-black text-2xl text-slate-800 leading-none">
            {multiplier}x
          </span>
          {multiplier >= 4 && <Zap className="w-4 h-4 fill-slate-800 text-slate-800 animate-pulse ml-1" />}
        </div>
      </div>

      {/* Lives Tag */}
      <div className="bg-white border-2 border-slate-800 rounded-lg shadow-[3px_3px_0_#0f172a] px-2 py-2 flex items-center justify-end min-w-[90px] transform -rotate-1">
        <div className="flex justify-center w-full gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
            <Heart 
                key={i} 
                className={`w-5 h-5 transition-colors duration-300 ${i < lives ? 'fill-red-400 text-red-500' : 'fill-slate-100 text-slate-300'}`} 
            />
            ))}
        </div>
      </div>

    </div>
  );
};
