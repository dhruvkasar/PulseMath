import React, { useEffect, useState, useRef } from 'react';
import { HUD } from './HUD';
import { audioEngine } from '../utils/audio';
import { fireCorrectConfetti } from '../utils/confetti';
import { EquationData } from '../utils/ai';

interface GameScreenProps {
  equations: EquationData[];
  bpm: number;
  onGameOver: (score: number, maxCombo: number) => void;
}

const BEATS_PER_EQUATION = 8;

export const GameScreen: React.FC<GameScreenProps> = ({ equations, bpm, onGameOver }) => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [lives, setLives] = useState(3);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<'none' | 'success' | 'error'>('none');
  const [timeLeftPercentage, setTimeLeftPercentage] = useState(100);

  const currentEq = equations[currentIndex];
  const inputRef = useRef<HTMLInputElement>(null);
  const eqStartTime = useRef<number>(0);

  useEffect(() => {
    // Only init inside the component setup
    audioEngine.setBPM(bpm);
    
    const secondsPerEquation = (60 / bpm) * BEATS_PER_EQUATION;
    eqStartTime.current = Date.now();

    const timer = setInterval(() => {
      const elapsed = (Date.now() - eqStartTime.current) / 1000;
      const left = Math.max(0, 100 - (elapsed / secondsPerEquation) * 100);
      setTimeLeftPercentage(left);

      if (left === 0 && lives > 0) {
         handleMiss();
      }
    }, 50);

    // Audio Engine was started in App.tsx but we ensure it plays beats here
    audioEngine.start();
    
    // Focus after slight dom delay
    setTimeout(() => { if(inputRef.current) inputRef.current.focus(); }, 100);

    return () => {
      clearInterval(timer);
      audioEngine.stop();
    };
  }, [currentIndex, bpm, lives]);

  const handleMiss = () => {
    audioEngine.playWrongBuzz();
    setFlash('error');
    setShake(true);
    setTimeout(() => {
      setFlash('none');
      setShake(false);
    }, 400);

    setCombo(0);
    setMultiplier(1);
    
    const newLives = lives - 1;
    setLives(newLives);
    
    if (newLives <= 0) {
      audioEngine.stop();
      onGameOver(score, maxCombo);
    } else {
      nextEquation();
    }
  };

  const nextEquation = () => {
    setInputValue('');
    if (currentIndex + 1 >= equations.length) {
      audioEngine.stop();
      onGameOver(score, maxCombo);
    } else {
      setCurrentIndex(currentIndex + 1);
      eqStartTime.current = Date.now();
      setTimeout(() => { if(inputRef.current) inputRef.current.focus(); }, 50);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !currentEq) return;

    const parsed = parseFloat(inputValue);
    if (Math.abs(parsed - currentEq.answer) < 0.01) {
      // Success
      audioEngine.playCorrectChime();
      fireCorrectConfetti('equation-card');
      
      setFlash('success');
      setTimeout(() => setFlash('none'), 300);

      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      let newMult = multiplier;
      if (newCombo >= 24) newMult = 8;
      else if (newCombo >= 12) newMult = 4;
      else if (newCombo >= 6) newMult = 2;
      else newMult = 1;

      if (newMult > multiplier && newMult >= 4) {
          audioEngine.playComboHorn();
      }
      setMultiplier(newMult);

      const secondsPerEquation = (60 / bpm) * BEATS_PER_EQUATION;
      const elapsed = (Date.now() - eqStartTime.current) / 1000;
      const timeBonus = Math.max(1, Math.floor((1 - elapsed/secondsPerEquation) * 100));

      setScore(s => s + (100 * newMult) + timeBonus);
      nextEquation();
    } else {
      handleMiss();
    }
  };

  // The CSS heartbeat animation property duration
  const beatDuration = `${60/bpm}s`;

  if (!currentEq) return null;

  const isLowTime = timeLeftPercentage < 25;
  const strokeColor = flash === 'error' ? '#FF6B6B' : flash === 'success' ? '#69DB7C' : isLowTime ? '#FFE066' : 'currentColor';

  return (
    <div className={`h-full w-full relative flex flex-col items-center justify-center pt-[80px] pb-4 px-4 transition-colors duration-300 ${flash === 'error' ? 'bg-red-100 dark:bg-red-900/40' : flash === 'success' ? 'bg-green-100 dark:bg-green-900/40' : ''}`}>
      
      <HUD score={score} combo={combo} multiplier={multiplier} lives={lives} />

      <div className="flex-1 w-full max-w-sm relative flex flex-col items-center justify-center py-6">
        
        {/* Pulsing Back Ring for Rhythm Visual */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square border-4 border-slate-300 dark:border-slate-700 rounded-full z-0" 
          style={{ 
            animation: `expandRing ${beatDuration} cubic-bezier(0, 0.55, 0.45, 1) infinite` 
          }}
        ></div>

        {/* Timer Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[360px] md:h-[360px] z-0 text-slate-800 dark:text-slate-100">
           <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
             <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2.5" />
             <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke={strokeColor} 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeDasharray="301.5"
                strokeDashoffset={301.5 - (301.5 * timeLeftPercentage) / 100}
                className="transition-all duration-75 ease-linear"
             />
           </svg>
        </div>

        {/* Math Flash Card */}
        <div 
          id="equation-card"
          className={`math-card relative z-10 w-full flex flex-col items-center p-8 transition-transform ${shake ? 'animate-shake border-red-500' : ''}`}
        >
          {/* Difficulty Tag */}
          <div className="absolute -top-3 -right-3 px-3 py-1 bg-yellow-200 border-2 border-slate-800 dark:border-slate-100 transform rotate-6 rounded text-xs font-ui font-black uppercase text-slate-800">
            {currentEq.difficulty}
          </div>

          <h2 className="text-4xl md:text-5xl font-math font-bold text-slate-800 dark:text-slate-100 my-8 text-center drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {currentEq.equation}
          </h2>

          <form onSubmit={handleSubmit} className="w-full relative px-4">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9.\-]*"
              maxLength={10}
              value={inputValue}
              onChange={e => {
                 // Allow only numbers, decimals, and negative signs
                 const val = e.target.value.replace(/[^0-9.\-]/g, '');
                 if (val.length <= 10) setInputValue(val);
              }}
              className="w-full text-center text-4xl font-math font-bold py-3 bg-slate-50 dark:bg-slate-800 border-b-4 border-slate-300 dark:border-slate-600 focus:border-slate-800 dark:focus:border-slate-100 focus:bg-white dark:focus:bg-slate-700 focus:outline-none transition-all text-slate-900 dark:text-slate-100 placeholder-slate-300 dark:placeholder-slate-500"
              placeholder="?"
              autoFocus
              onBlur={() => {
                // Keep mobile keyboard open if desired
              }}
            />
          </form>

          <div className="h-6 mt-6 w-full text-center flex items-center justify-center">
             {isLowTime && currentEq.hint && (
                <p className="inline-flex bg-slate-800 dark:bg-slate-100 text-yellow-300 dark:text-yellow-600 font-ui text-[10px] font-black uppercase px-2 py-1 rounded">
                   HINT: {currentEq.hint}
                </p>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};
