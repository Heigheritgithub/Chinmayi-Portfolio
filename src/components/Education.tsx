import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';
import { EducationItem, ThemeMode } from '../types/portfolio';

interface EducationProps {
  educationList: EducationItem[];
  theme: ThemeMode;
}

export const Education: React.FC<EducationProps> = ({ educationList, theme }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Education Timeline
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Line */}
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-800'
                : 'bg-gradient-to-b from-blue-400 via-indigo-300 to-slate-200'
            }`}
          />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {educationList.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-10 flex items-center justify-center border-2 shadow-lg ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-cyan-400 text-cyan-400 shadow-cyan-500/30'
                        : 'bg-white border-blue-600 text-blue-600 shadow-blue-500/20'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  {/* Card Box */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div
                      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                        theme === 'dark'
                          ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-black/40 hover:border-cyan-500/40'
                          : 'bg-white border-slate-200 shadow-md hover:border-blue-300 hover:shadow-lg'
                      }`}
                    >
                      {/* Year */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h3 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p className={`text-sm font-semibold mt-1 text-cyan-400`}>
                        {item.institution}
                      </p>

                      <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.boardOrUniversity}
                      </p>

                      {/* Score CGPA / Percentage */}
                      <div className={`mt-3 py-1.5 px-3 rounded-xl inline-block font-mono text-sm font-bold ${
                        theme === 'dark' ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        Score: {item.score} ({item.scoreType})
                      </div>

                      {/* Description */}
                      <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item.description}
                      </p>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
