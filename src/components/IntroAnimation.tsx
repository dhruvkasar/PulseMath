import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Kinetic Typography Timing Sequence
    const sequence = [
      { step: 1, time: 300 },   // RHYTHM
      { step: 2, time: 1000 },  // CROSS (X)
      { step: 3, time: 1500 },  // LOGIC
      { step: 4, time: 2200 },  // Blank
      { step: 5, time: 2500 },  // PULSEMATH
      { step: 6, time: 4200 }   // Start fade out sequence
    ];

    const timeouts = sequence.map(s => setTimeout(() => setStep(s.step), s.time));
    
    const endTimeout = setTimeout(() => {
      onComplete();
    }, 4800); // Give time for the exit animation of PULSEMATH

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimeout);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#fafaf9] text-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-graph-paper opacity-60 z-0 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="rhythm"
            initial={{ scale: 0.8, opacity: 0, fontVariationSettings: '"wght" 400' }}
            animate={{ scale: 1, opacity: 1, fontVariationSettings: '"wght" 900' }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="absolute font-display text-7xl md:text-9xl uppercase tracking-tighter"
          >
            Rhythm
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="meets"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute font-math font-black text-8xl md:text-9xl text-slate-300"
          >
            &times;
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="logic"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="absolute font-math text-7xl md:text-9xl font-bold bg-slate-800 text-white px-8 py-4 rounded-[2rem] transform -rotate-3 shadow-[8px_8px_0_#38bdf8]"
          >
            LOGIC
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute flex flex-col items-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-slate-800 uppercase tracking-tighter leading-[0.9] relative z-10 text-center">
              Pulse<br/>Math
            </h1>
            {/* Animated Highlighter */}
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "75%" }}
               transition={{ delay: 0.6, duration: 0.6, ease: "circOut" }}
               className="absolute bottom-1 right-0 h-[30%] hl-yellow -z-10 transform -rotate-2 rounded-sm opacity-80 mix-blend-multiply origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
