import React from 'react';
import { Play, Activity } from 'lucide-react';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative px-6 text-center">
      {/* Decorative background element showing intersection of Rhythm + Math */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
         <Activity className="w-[120vw] max-w-[800px] h-[120vw] max-h-[800px] text-slate-800 dark:text-slate-100" strokeWidth={0.5} />
      </div>

      <div className="z-10 animate-bounce-in flex flex-col items-center max-w-[90vw]">
        
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-slate-800 dark:border-slate-100 bg-teal-100 dark:bg-cyan-900 text-slate-800 dark:text-slate-100 font-math text-xs md:text-sm uppercase tracking-widest font-bold mb-6 transform -rotate-2 shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#94a3b8]">
          <Activity className="w-4 h-4 mr-2" />
          <span>ƒ(Rhythm) = Math</span>
        </div>
        
        <div className="relative mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter leading-[0.9] relative z-10">
              Pulse<br/>Math
            </h1>
            {/* Highlighter underline effect */}
            <div className="absolute bottom-1 right-0 w-3/4 h-[30%] hl-yellow -z-10 transform -rotate-2 rounded-sm opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg max-w-sm mx-auto mb-12 font-ui font-medium leading-relaxed">
          A harmonic intersection of mental calculations and musical progression. Answer to the beat.
        </p>
        
        <button 
          onClick={onStart}
          className="push-btn flex items-center justify-center px-10 py-5 font-display font-black text-xl text-white dark:text-slate-900 bg-slate-800 dark:bg-slate-100 rounded-2xl"
        >
          <Play className="w-6 h-6 mr-3 fill-white dark:fill-slate-900" />
          START SESSION
        </button>
      </div>
    </div>
  );
};
