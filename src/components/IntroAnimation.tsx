import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Highly kinetic sequence timings
    const timings = [
      { p: 1, t: 1200 }, // 1.2s: Marquees intensely collapse
      { p: 2, t: 1400 }, // 1.4s: PULSE text slams in rapidly
      { p: 3, t: 1800 }, // 1.8s: MATH text slams in rapidly
      { p: 4, t: 2500 }, // 2.5s: Highlighter stripe slashes across
      { p: 5, t: 3100 }, // 3.1s: Complete dark canvas slides upward seamlessly
    ];
    
    const timers = timings.map(({ p, t }) => setTimeout(() => setPhase(p), t));
    const endTimer = setTimeout(onComplete, 4000); // Trigger cleanup and unmount

    return () => { 
        timers.forEach(clearTimeout); 
        clearTimeout(endTimer); 
    };
  }, [onComplete]);

  const marquees = [
    { text: "0101 + 0101 = 1010  //  0101 + 0101 = 1010  //  ", color: "hl-yellow text-slate-900" },
    { text: "× × × × × / × / CALCULATE / × / × × × × ×  //  ", color: "hl-cyan text-slate-900" },
    { text: "ƒ(x) = y² // ∫(rhythm) // ƒ(x) = y² // ∫(rhythm) //  ", color: "hl-pink text-slate-900" },
  ];

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div 
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth exponential drop off
          className="fixed inset-0 z-[100] bg-slate-900 overflow-hidden flex flex-col pointer-events-none"
        >
          
          {/* Phase 0 & 1: Giant Fullscreen Marquee Stripes */}
          <div className="absolute inset-0 flex flex-col z-0">
            {marquees.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ height: '33.34vh' }}
                animate={{ height: phase >= 1 ? '0vh' : '33.34vh' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`${m.color} border-slate-900 border-b-[8px] flex items-center overflow-hidden`}
              >
                <motion.div
                  animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                  transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                  className="flex whitespace-nowrap font-math font-black text-7xl md:text-9xl tracking-tighter mix-blend-color-burn opacity-80"
                >
                  <span className="pr-10">{m.text}</span>
                  <span className="pr-10">{m.text}</span>
                  <span className="pr-10">{m.text}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Phase 2, 3, 4: Giant Kinetic Typography Lock In */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
             
             {/* PULSE: Staggered Stomp Animation */}
             <div className="flex overflow-hidden pb-1 -mb-4 sm:-mb-8 md:-mb-12">
                {'PULSE'.split('').map((char, i) => (
                   <motion.span
                     key={'p'+i}
                     initial={{ y: '100%', opacity: 0, rotate: 15 }}
                     animate={phase >= 2 ? { y: '0%', opacity: 1, rotate: 0 } : {}}
                     transition={{ delay: i * 0.05, duration: 0.5, type: 'spring', bounce: 0.5 }}
                     className="font-display font-black text-[22vw] leading-[0.8] text-white tracking-tighter shadow-black mix-blend-exclusion"
                   >
                     {char}
                   </motion.span>
                ))}
             </div>
             
             {/* MATH: Staggered Stomp Animation */}
             <div className="flex overflow-hidden pt-1">
                {'MATH'.split('').map((char, i) => (
                   <motion.span
                     key={'m'+i}
                     initial={{ y: '-100%', opacity: 0, rotate: -15 }}
                     animate={phase >= 3 ? { y: '0%', opacity: 1, rotate: 0 } : {}}
                     transition={{ delay: i * 0.05, duration: 0.5, type: 'spring', bounce: 0.5 }}
                     className="font-display font-black text-[22vw] leading-[0.8] text-yellow-300 tracking-tighter"
                   >
                     {char}
                   </motion.span>
                ))}
             </div>

             {/* Dynamic Highlighter Slash Effect */}
             <motion.div 
               initial={{ scaleX: 0 }}
               animate={phase >= 4 ? { scaleX: 1 } : {}}
               transition={{ duration: 0.4, ease: "circOut" }}
               className="absolute left-0 w-[150vw] h-[25vh] hl-cyan mix-blend-difference transform -rotate-12 origin-left -translate-x-[10vw]"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
