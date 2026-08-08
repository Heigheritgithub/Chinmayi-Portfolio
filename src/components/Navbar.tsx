import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Settings2,
  User,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Mail,
  Briefcase,
  ChevronUp
} from 'lucide-react';
import { ThemeMode } from '../types/portfolio';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenCustomizer: () => void;
  onOpenResumeModal: () => void;
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Code2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenCustomizer,
  onOpenResumeModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
      setScrolled(currentScroll > 40);
      setShowBackToTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (id: string) => {
    setMobileMenuOpen(false);
    onSelectTab(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Header Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? theme === 'dark'
              ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
              : 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-200/50'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll Progress Indicator Bar */}
        <div className="w-full h-1 bg-slate-800/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-cyan-400 font-bold'
                        : 'text-blue-600 font-bold'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-cyan-500/10 border border-cyan-500/30'
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Customizer / Dev Panel */}
            <button
              onClick={onOpenCustomizer}
              className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-400 hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-blue-600 hover:bg-slate-200'
              }`}
              title="Customize Portfolio Content"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-900 text-amber-400 border border-slate-800 hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>

          {/* Mobile Menu Button & Controls */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-slate-900 text-amber-400' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-slate-900 text-slate-200 border border-slate-800'
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`fixed top-16 left-0 right-0 z-30 sm:hidden border-b shadow-xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800 text-white'
                : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                          : 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                        : theme === 'dark'
                        ? 'text-slate-300 hover:bg-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 flex gap-2 border-t border-slate-800/50 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  title="Customize Data"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Customize Portfolio</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back-To-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-2xl transition-all duration-300 group hover:scale-110 ${
              theme === 'dark'
                ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/30 hover:bg-cyan-400'
                : 'bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-700'
            }`}
            title="Back to Top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
