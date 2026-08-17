import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PersonalInfo, ThemeMode } from '../types/portfolio';

interface FooterProps {
  personalInfo: PersonalInfo;
  theme: ThemeMode;
  onSelectTab?: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ personalInfo, theme, onSelectTab }) => {
  const handleLinkClick = (id: string) => {
    if (onSelectTab) {
      onSelectTab(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      className={`border-t py-12 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-800/80 text-slate-400'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <h3 className={`text-xl font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {personalInfo.name}
            </h3>
            <p className="text-xs max-w-sm leading-relaxed">
              Computer Science Engineering Graduate & Full Stack Developer specializing in Web Development, React, Node.js, and Database Architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button onClick={() => handleLinkClick('home')} className="hover:text-cyan-400 text-left">Home</button>
              <button onClick={() => handleLinkClick('about')} className="hover:text-cyan-400 text-left">About Me</button>
              <button onClick={() => handleLinkClick('education')} className="hover:text-cyan-400 text-left">Education</button>
              <button onClick={() => handleLinkClick('skills')} className="hover:text-cyan-400 text-left">Skills</button>
              <button onClick={() => handleLinkClick('projects')} className="hover:text-cyan-400 text-left">Projects</button>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-cyan-400 text-left">Contact</button>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              Social Channels
            </h4>
            <div className="flex space-x-3">
              <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400">
                <Github className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
