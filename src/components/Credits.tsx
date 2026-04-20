import React, { useState, useRef, useEffect } from 'react';
import { Github, Instagram } from 'lucide-react';

const Creator: React.FC<{ name: string; github: string; insta: string }> = ({ name, github, insta }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block mx-1" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="font-bold cursor-pointer underline decoration-2 decoration-cyan-400 dark:decoration-cyan-600 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
      >
        {name}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#94a3b8] flex gap-2 border-2 border-slate-900 dark:border-slate-300 animate-bounce-in z-50">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md text-slate-800 dark:text-white transition-colors"
            title={`${name}'s GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href={insta} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/50 dark:hover:bg-pink-900/80 rounded-md text-pink-600 dark:text-pink-300 transition-colors"
            title={`${name}'s Instagram`}
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
};

export const Credits: React.FC = () => {
  return (
    <div className="text-slate-600 dark:text-slate-400 font-ui text-sm text-center font-medium bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
      build by
      <Creator name="aditya" github="https://github.com/adimestry" insta="https://www.instagram.com/aditya_mestry_x007/" />
      and
      <Creator name="dhruv" github="https://github.com/dhruvkasar" insta="https://www.instagram.com/dhruvvkasar/" />
    </div>
  );
};
