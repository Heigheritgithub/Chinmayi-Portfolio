import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Eye,
  Code2,
  Layers,
  Cpu,
  Play
} from 'lucide-react';
import { Project, ThemeMode } from '../types/portfolio';

interface ProjectsProps {
  projects: Project[];
  theme: ThemeMode;
  onSelectProject: (project: Project, initialTab?: 'overview' | 'architecture' | 'simulator') => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, theme, onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'Web'>('All');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Web') return p.category === 'Web' || p.category === 'React';
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Software Engineering Works</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Projects Portfolio
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Filter Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Web'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {cat === 'All' ? 'All Projects' : `${cat} Apps`}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-black/40 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
                    : 'bg-white border-slate-200 shadow-md hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Image Container with Hover Overlay */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80" />

                    {/* Category Tag Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Featured Tag */}
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                      </span>
                    )}

                    {/* Quick View Button overlay on hover */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 backdrop-blur-xs p-4">
                      <button
                        onClick={() => onSelectProject(project, 'overview')}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900/90 text-white border border-slate-700 flex items-center gap-1.5 shadow-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-cyan-400" /> Details
                      </button>
                      <a
                        href={project.liveDemoUrl || project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-1.5 shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <h3 className={`text-lg font-bold tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {project.shortDescription}
                    </p>

                    {/* Technologies Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-medium border ${
                            theme === 'dark'
                              ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className={`p-4 px-6 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-slate-800/60 bg-slate-950/40' : 'border-slate-100 bg-slate-50/50'
                }`}>
                  <button
                    onClick={() => onSelectProject(project, 'architecture')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" /> Details & Architecture
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                      }`}
                      title="View GitHub Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveDemoUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors flex items-center gap-1"
                      title="Open Live Demo App (collaborative-code-editor-wheat.vercel.app)"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Live Demo</span>
                    </a>
                    <button
                      onClick={() => onSelectProject(project, 'simulator')}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        theme === 'dark'
                          ? 'text-cyan-400 hover:text-cyan-300 hover:bg-slate-800'
                          : 'text-cyan-600 hover:text-cyan-800 hover:bg-slate-200'
                      }`}
                      title="Open In-App Live Simulator"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
