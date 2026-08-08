import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  User,
  GraduationCap,
  MapPin,
  Languages,
  Calendar,
  CheckCircle,
  Brain,
  Zap,
  Target,
  Sparkles,
  FolderGit2,
  Code2,
  Briefcase,
  Award
} from 'lucide-react';
import { PersonalInfo, StatItem, ThemeMode } from '../types/portfolio';

interface AboutProps {
  personalInfo: PersonalInfo;
  stats: StatItem[];
  theme: ThemeMode;
}

// Counter helper component
const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono font-extrabold text-3xl sm:text-4xl text-cyan-400">
      {count}{suffix}
    </span>
  );
};

export const About: React.FC<AboutProps> = ({ personalInfo, stats, theme }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'FolderGit2': return <FolderGit2 className="w-6 h-6 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-blue-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-purple-400" />;
      case 'Award': return <Award className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Discover My Background</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* 2-Column Grid: Summary & Objective vs Personal Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Summary & Career Objective */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Professional Summary
                </h3>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                {personalInfo.fullBio}
              </p>
            </div>

            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Career Objective
                </h3>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                {personalInfo.careerObjective}
              </p>
            </div>

            {/* Technical Strengths & Soft Skills Badges */}
            <div
              className={`p-6 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                <Zap className="w-4 h-4 text-amber-400" /> Core Technical & Soft Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Full Stack Web Development',
                  'REST API Architecture',
                  'Database Design & Optimization',
                  'Clean Code & OOP',
                  'Agile / Scrum',
                  'Problem Solving',
                  'Team Collaboration',
                  'Fast Adaptability'
                ].map((strength) => (
                  <span
                    key={strength}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700/80 text-cyan-300'
                        : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Personal Information & Quick Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <User className="w-5 h-5 text-cyan-400" /> Personal Details
              </h3>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" /> Current Role:
                  </span>
                  <span className={`font-bold text-right text-xs sm:text-sm text-cyan-400`}>
                    Apprentice @ HAL Bangalore (Feb 2026 - Present)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" /> Full Name:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" /> Degree:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.degree}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" /> Graduation:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.graduationYear} (CGPA: {personalInfo.cgpa})
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Location:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.location.split('(')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-cyan-400" /> Languages:
                  </span>
                  <span className={`font-bold text-right ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.languages.map((l) => l.split('(')[0]).join(', ')}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
