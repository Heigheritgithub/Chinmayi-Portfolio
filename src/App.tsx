import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PersonalInfo,
  StatItem,
  EducationItem,
  SkillCategory,
  Project,
  Internship,
  Experience as ExperienceType,
  Certification,
  ThemeMode,
  ToastNotification
} from './types/portfolio';
import {
  initialPersonalInfo,
  initialStats,
  initialEducation,
  initialSkillCategories,
  initialProjects,
  initialInternships,
  initialExperience,
  initialCertifications,
  loadPortfolioState,
  savePortfolioState
} from './data/portfolioData';

import { BackgroundParticles } from './components/BackgroundParticles';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerModal } from './components/CustomizerModal';
import { Toast } from './components/Toast';

export default function App() {
  // App Preloader State
  const [isLoading, setIsLoading] = useState(true);

  // Active Tab Page State
  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
    return validTabs.includes(hash) ? hash : 'home';
  });

  // Sync Hash in URL on HashChange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Portfolio Theme State ('dark' as default per requirements)
  const [theme, setTheme] = useState<ThemeMode>(() => loadPortfolioState<ThemeMode>('theme', 'dark'));

  // Main Data States with localStorage persistence
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() =>
    loadPortfolioState<PersonalInfo>('personalInfo', initialPersonalInfo)
  );
  const [stats] = useState<StatItem[]>(initialStats);
  const [educationList] = useState<EducationItem[]>(initialEducation);
  const [skillCategories] = useState<SkillCategory[]>(initialSkillCategories);
  const [projects] = useState<Project[]>(initialProjects);
  const [internships] = useState<Internship[]>(initialInternships);
  const [experienceList] = useState<ExperienceType[]>(initialExperience);
  const [certifications] = useState<Certification[]>(initialCertifications);

  // Modals & Overlay States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalTab, setProjectModalTab] = useState<'overview' | 'architecture' | 'simulator'>('overview');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const handleOpenProjectModal = (
    proj: Project,
    initialTab: 'overview' | 'architecture' | 'simulator' = 'overview'
  ) => {
    setSelectedProject(proj);
    setProjectModalTab(initialTab);
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Toggle Theme Mode
  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    savePortfolioState('theme', nextTheme);
  };

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle Save Personal Info from Customizer Modal
  const handleSavePersonalInfo = (updated: PersonalInfo) => {
    setPersonalInfo(updated);
    savePortfolioState('personalInfo', updated);
  };

  // Handle Reset Defaults
  const handleResetDefaults = () => {
    setPersonalInfo(initialPersonalInfo);
    savePortfolioState('personalInfo', initialPersonalInfo);
    savePortfolioState('theme', 'dark');
    setTheme('dark');
  };

  return (
    <div
      className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-500 relative ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Initial Preloader Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            onComplete={() => setIsLoading(false)}
            name={personalInfo.name}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Animated Particles & Shaders Background */}
      <BackgroundParticles theme={theme} />

      {/* Sticky Top Navbar & Tab Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
      />

      {/* Main Tabbed Content Pages */}
      <main className="relative z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <Hero
                personalInfo={personalInfo}
                theme={theme}
                onOpenResumeModal={() => setIsResumeOpen(true)}
                onNavigateToContact={() => handleSelectTab('contact')}
              />
            )}

            {activeTab === 'about' && (
              <About
                personalInfo={personalInfo}
                stats={stats}
                theme={theme}
              />
            )}

            {activeTab === 'experience' && (
              <Experience
                experienceList={experienceList}
                theme={theme}
              />
            )}

            {activeTab === 'education' && (
              <Education
                educationList={educationList}
                theme={theme}
              />
            )}

            {activeTab === 'skills' && (
              <Skills
                categories={skillCategories}
                theme={theme}
              />
            )}

            {activeTab === 'projects' && (
              <Projects
                projects={projects}
                theme={theme}
                onSelectProject={handleOpenProjectModal}
              />
            )}

            {activeTab === 'contact' && (
              <Contact
                personalInfo={personalInfo}
                theme={theme}
                onShowToast={showToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <Footer
        personalInfo={personalInfo}
        theme={theme}
        onSelectTab={handleSelectTab}
      />

      {/* OVERLAY MODALS */}
      {/* Interactive Project Details & Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        theme={theme}
        initialTab={projectModalTab}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curriculum Vitae / Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        personalInfo={personalInfo}
        educationList={educationList}
        skillCategories={skillCategories}
        internships={internships}
        experienceList={experienceList}
        projects={projects}
        theme={theme}
        onShowToast={showToast}
      />

      {/* Developer / User Portfolio Data Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        personalInfo={personalInfo}
        onSavePersonalInfo={handleSavePersonalInfo}
        onResetDefaults={handleResetDefaults}
        theme={theme}
        onShowToast={showToast}
      />

      {/* Toast Notification Floating Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
