import React from 'react';
import { motion } from 'motion/react';
import { Award, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Experience as ExperienceType, ThemeMode } from '../types/portfolio';

interface ExperienceProps {
  experienceList: ExperienceType[];
  theme: ThemeMode;
}

export const Experience: React.FC<ExperienceProps> = ({ experienceList, theme }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Professional Career Journey</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Modern Card Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceList.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 shadow-xl'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              {/* Left Color Indicator Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {exp.position}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 flex items-center gap-2 mt-0.5">
                    <Building2 className="w-4 h-4" /> {exp.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {exp.duration}
                  </span>
                </div>
              </div>

              <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {exp.description}
              </p>

              {/* Responsibilities */}
              <div className="space-y-2 mb-6">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                  Key Achievements & Highlights:
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/50">
                {exp.technologies.map((tech) => (
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

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
