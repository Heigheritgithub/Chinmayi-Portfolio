import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Terminal, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  name: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, name }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Portfolio System...');

  useEffect(() => {
    const steps = [
      { p: 20, t: 'Loading CS Engineering Core Modules...' },
      { p: 45, t: 'Compiling ASP.NET & React Components...' },
      { p: 70, t: 'Connecting Database & Skill Matrix...' },
      { p: 90, t: 'Rendering Interactive UI & Shaders...' },
      { p: 100, t: 'Welcome to ' + name + "'s Portfolio!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].t);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [name, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans px-4 overflow-hidden"
    >
      {/* Background glow ring */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {/* Animated Brand Icon */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 animate-pulse" />
          <div className="relative flex items-center justify-center space-x-2 text-cyan-400">
            <Code2 className="w-10 h-10" />
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>

        {/* Developer Name & Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1"
        >
          {name}
        </motion.h1>

        <p className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-8 flex items-center justify-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" /> CS Engineer & Full Stack Developer
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded-full shadow-inner mb-4 relative overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/50"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>

        {/* Status text & percentage */}
        <div className="flex justify-between items-center w-full font-mono text-xs text-slate-400 px-1">
          <span className="truncate max-w-[280px] text-left">{statusText}</span>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
