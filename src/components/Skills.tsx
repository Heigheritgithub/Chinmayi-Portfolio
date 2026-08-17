import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Search,
  Terminal,
  Layout,
  Server,
  Database,
  Wrench,
  BookOpen,
  Coffee,
  Code2,
  FileCode2,
  Cpu,
  Atom,
  Palette,
  Globe,
  LayoutGrid,
  Layers,
  ServerCog,
  Zap,
  Network,
  Box,
  Workflow,
  DatabaseBackup,
  Table,
  HardDrive,
  Activity,
  GitBranch,
  Monitor,
  AppWindow,
  Container,
  Send,
  Boxes,
  Binary,
  Smartphone,
  Compass
} from 'lucide-react';
import { SkillCategory, ThemeMode } from '../types/portfolio';

interface SkillsProps {
  categories: SkillCategory[];
  theme: ThemeMode;
}

export const Skills: React.FC<SkillsProps> = ({ categories, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'FileCode2': return <FileCode2 className="w-4 h-4 text-yellow-400" />;
      case 'Code': case 'Code2': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'FileCode': return <FileCode2 className="w-4 h-4 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Atom': return <Atom className="w-4 h-4 text-cyan-400" />;
      case 'Palette': return <Palette className="w-4 h-4 text-teal-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-orange-400" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4 text-indigo-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-purple-400" />;
      case 'ServerCog': return <ServerCog className="w-4 h-4 text-blue-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Network': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'Box': return <Box className="w-4 h-4 text-green-500" />;
      case 'Workflow': return <Workflow className="w-4 h-4 text-cyan-400" />;
      case 'DatabaseBackup': return <DatabaseBackup className="w-4 h-4 text-blue-400" />;
      case 'Table': return <Table className="w-4 h-4 text-sky-400" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-emerald-500" />;
      case 'Database': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-rose-400" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-orange-500" />;
      case 'Monitor': return <Monitor className="w-4 h-4 text-blue-400" />;
      case 'AppWindow': return <AppWindow className="w-4 h-4 text-purple-400" />;
      case 'Container': return <Container className="w-4 h-4 text-sky-400" />;
      case 'Send': return <Send className="w-4 h-4 text-orange-400" />;
      case 'Boxes': return <Boxes className="w-4 h-4 text-purple-400" />;
      case 'Binary': return <Binary className="w-4 h-4 text-cyan-400" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-blue-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Languages': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Frontend': return <Layout className="w-5 h-5 text-blue-400" />;
      case 'Backend': return <Server className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Tools': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Core Concepts': return <BookOpen className="w-5 h-5 text-rose-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((cat) =>
    (selectedCategory === 'All' || cat.category === selectedCategory) && cat.skills.length > 0
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Languages', 'Frontend', 'Backend', 'Database', 'Tools', 'Core Concepts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. Java)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500'
                  : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
              }`}
            />
          </div>

        </div>

        {/* Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 shadow-lg shadow-black/30'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-800/50">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  {getCategoryIcon(category.category)}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {category.title}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {category.skills.length} skills listed
                  </p>
                </div>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2">
                        {renderIcon(skill.iconName)}
                        <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                          theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {skill.level}
                        </span>
                        <span className="text-cyan-400 font-mono font-bold">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800/40 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
