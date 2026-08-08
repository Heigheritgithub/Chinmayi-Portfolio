import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Send,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Sparkles,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';
import { PersonalInfo, ThemeMode } from '../types/portfolio';

interface HeroProps {
  personalInfo: PersonalInfo;
  theme: ThemeMode;
  onOpenResumeModal: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  personalInfo,
  theme,
  onOpenResumeModal,
  onNavigateToContact,
}) => {
  // Typewriter state
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const titles = personalInfo.typedTitles.length > 0
      ? personalInfo.typedTitles
      : ["Full Stack Developer", "Software Engineer", "Computer Science Engineer", "Problem Solver"];

    const targetTitle = titles[titleIndex % titles.length];

    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(targetTitle.substring(0, currentText.length + 1));
        if (currentText.length + 1 === targetTitle.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setCurrentText(targetTitle.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, personalInfo.typedTitles]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-24 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio, Typewriter, CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Status Chip */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${
                theme === 'dark'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Name & Title */}
            <div>
              <h2
                className={`text-sm sm:text-base uppercase tracking-widest font-mono font-bold ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Hello, I&apos;m
              </h2>
              <h1
                className={`text-4xl sm:text-6xl font-extrabold tracking-tight mt-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {personalInfo.name}
              </h1>
            </div>

            {/* Animated Typing Role */}
            <div className="h-12 flex items-center">
              <span
                className={`text-xl sm:text-3xl font-bold font-mono bg-gradient-to-r ${
                  theme === 'dark'
                    ? 'from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text'
                    : 'from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'
                }`}
              >
                {currentText}
              </span>
              <span className="ml-1 w-1 h-7 bg-cyan-400 animate-pulse inline-block" />
            </div>

            {/* Short Introduction */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {personalInfo.shortBio}
            </p>

            {/* Key Skill Highlights Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['B.E. Computer Science', 'Java SE', 'SQL Server'].map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenResumeModal}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Resume / CV</span>
              </button>

              <button
                onClick={onNavigateToContact}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-200 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-blue-400 shadow-sm'
                }`}
              >
                <Send className="w-4 h-4 text-cyan-500" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <span className={`text-xs uppercase font-mono tracking-wider font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                Connect:
              </span>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:text-blue-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:text-blue-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:text-blue-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Image Avatar with Floating Tech Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Outer Glowing Glass Frame */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-3xl p-3 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-2xl shadow-cyan-500/20 group">
              <div
                className={`w-full h-full rounded-2xl overflow-hidden relative shadow-inner ${
                  theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
                }`}
              >
                <img
                  src={
                    personalInfo.avatarUrl
                      ? personalInfo.avatarUrl
                          .replace('github.com/', 'raw.githubusercontent.com/')
                          .replace('/blob/', '/')
                      : '/src/assets/images/profile_avatar_1785841139954.jpg'
                  }
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('profile_avatar')) {
                      target.src = '/src/assets/images/profile_avatar_1785841139954.jpg';
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                
                {/* Bottom Badge inside avatar */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">{personalInfo.degree}</span>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold">GPA {personalInfo.cgpa.split('/')[0]}</span>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md text-cyan-400 shadow-lg text-xs font-mono font-bold flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Full Stack Developer</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Down Arrow Scroll Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          className={`p-2 rounded-full border transition-transform hover:translate-y-1 ${
            theme === 'dark' ? 'border-slate-800 text-slate-400 hover:text-cyan-400' : 'border-slate-200 text-slate-600'
          }`}
          aria-label="Scroll to About Section"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
