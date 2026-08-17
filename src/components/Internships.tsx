import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, Award, Zap } from 'lucide-react';
import { Internship, ThemeMode } from '../types/portfolio';

interface InternshipsProps {
  internships: Internship[];
  theme: ThemeMode;
}

export const Internships: React.FC<InternshipsProps> = ({ internships, theme }) => {
  return (
    <section id="internships" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practical Industry Exposure</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Internship Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {internships.map((intern, index) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-black/40 hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 shadow-md hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {intern.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400">
                        {intern.company}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {intern.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{intern.location}</span>
                </div>

                {/* Achievement Highlight Box */}
                {intern.keyAchievement && (
                  <div className={`p-3 rounded-xl text-xs font-medium mb-5 border flex items-start gap-2 ${
                    theme === 'dark'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Key Milestone:</strong> {intern.keyAchievement}</span>
                  </div>
                )}

                {/* Responsibilities List */}
                <div className="space-y-2 mb-6">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Core Responsibilities & Deliverables:
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm">
                    {intern.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Tag Bar */}
              <div className="pt-4 border-t border-slate-800/50">
                <div className="flex flex-wrap gap-1.5">
                  {intern.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
