import React, { useState } from 'react';
import { ChevronLeft, Play, Calculator, Headphones } from 'lucide-react';

const modes = [
  { id: 'addition', name: 'Addition', symbol: '+' },
  { id: 'multiplication', name: 'Multiply', symbol: '×' },
  { id: 'fractions', name: 'Fractions', symbol: '½' },
  { id: 'algebra', name: 'Algebra', symbol: 'x' }
];

const grades = [
  { id: 'elementary', name: 'Elementary', bpm: 100 },
  { id: 'middle', name: 'Middle', bpm: 120 },
  { id: 'high', name: 'High', bpm: 140 }
];

export const ModeSelector: React.FC<{ 
  onBack: () => void, 
  onSelect: (mode: string, grade: string, bpm: number) => void 
}> = ({ onBack, onSelect }) => {
  const [selectedMode, setSelectedMode] = useState<string>('addition');
  const [selectedGrade, setSelectedGrade] = useState<string>('elementary');

  const selectedBpm = grades.find(g => g.id === selectedGrade)?.bpm || 100;

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 overflow-y-auto relative z-10 max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="self-start flex items-center font-ui font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-2 transition-colors py-2"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> BACK
      </button>

      <div className="flex-1 flex flex-col pt-4 pb-12 w-full animate-bounce-in">
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-800 dark:text-slate-100 mb-8 uppercase tracking-tight relative inline-block self-start">
          <span className="relative z-10">Configure Session</span>
          <div className="absolute bottom-0 right-0 w-full h-[40%] hl-cyan -z-10 -rotate-1 rounded-sm mix-blend-multiply dark:mix-blend-screen opacity-80"></div>
        </h2>

        <div className="space-y-10">
          {/* Modes area */}
          <div>
            <div className="flex items-center text-slate-800 dark:text-slate-100 font-bold font-ui mb-4 uppercase tracking-widest text-sm border-b-2 border-slate-200 dark:border-slate-700 pb-2">
              <Calculator className="w-5 h-5 mr-2" /> Module Selection
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {modes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`push-btn relative p-4 rounded-xl flex flex-col items-start transition-colors
                    ${selectedMode === mode.id ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  <span className={`text-2xl font-math font-bold mb-2 ${selectedMode === mode.id ? 'text-cyan-300 dark:text-blue-600' : 'text-slate-400 dark:text-slate-500'}`}>
                    {mode.symbol}
                  </span>
                  <span className="font-display font-bold text-lg">{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grades / BPM Area */}
          <div>
            <div className="flex items-center text-slate-800 dark:text-slate-100 font-bold font-ui mb-4 uppercase tracking-widest text-sm border-b-2 border-slate-200 dark:border-slate-700 pb-2">
              <Headphones className="w-5 h-5 mr-2" /> Target Frequency
            </div>
            
            <div className="flex flex-col gap-3">
              {grades.map(grade => (
                <button
                  key={grade.id}
                  onClick={() => setSelectedGrade(grade.id)}
                  className={`push-btn p-4 rounded-xl flex justify-between items-center transition-colors
                    ${selectedGrade === grade.id ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 border-2 border-slate-800 dark:border-slate-100' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  <span className="font-display font-bold text-lg">{grade.name}</span>
                  <span className={`font-math text-sm px-3 py-1 rounded-md bg-opacity-20 dark:bg-opacity-20 ${selectedGrade === grade.id ? 'bg-white text-yellow-300 dark:text-yellow-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {grade.bpm} BPM
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button 
            onClick={() => onSelect(selectedMode, selectedGrade, selectedBpm)}
            className="push-btn w-full flex items-center justify-center p-5 font-display font-black text-xl text-slate-800 bg-yellow-300 hover:bg-yellow-400 dark:hover:bg-yellow-400 rounded-xl transition-colors"
          >
            <Play className="w-6 h-6 mr-2 fill-slate-800" />
            INITIALIZE
          </button>
        </div>
      </div>
    </div>
  );
};
