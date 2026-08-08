import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Code2,
  Terminal,
  Play,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Copy,
  Check,
  Layers,
  Sparkles,
  Users,
  Cpu,
  Globe
} from 'lucide-react';
import { Project, ThemeMode } from '../types/portfolio';
import { CodeSyncAppSimulator } from './CodeSyncAppSimulator';

interface ProjectModalProps {
  project: Project | null;
  theme: ThemeMode;
  initialTab?: 'overview' | 'architecture' | 'simulator';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  theme,
  initialTab = 'overview',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulator'>(initialTab);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'playground' | 'iframe'>('playground');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Interactive Live Playground State
  const [editorCode, setEditorCode] = useState(`// Collaborative Code Editor Live Simulation
function calculateStats(tasks) {
  return tasks.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});
}

console.log("Connected to Realtime Room #8042");`);
  const [outputLogs, setOutputLogs] = useState<string[]>([
    '[System] Initialized Socket.IO client connection...',
    '[Socket] Joined collaboration room #8042',
    '[Sync] Synchronized 14 active code blocks'
  ]);
  const [activeUsers, setActiveUsers] = useState<number>(3);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, project]);

  if (!project) return null;

  const projectUrl = project.liveDemoUrl || project.githubUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs((prev) => [
      ...prev,
      `[${timestamp}] Executed code snippet successfully! Output: { completed: 8, pending: 2 }`,
      `[${timestamp}] Broadcasted live delta edit to ${activeUsers} active collaborators`
    ]);
  };

  const handleSimulateUserJoin = () => {
    const newUserCount = activeUsers + 1;
    setActiveUsers(newUserCount);
    setOutputLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] User_${newUserCount} joined room #8042 via WebSocket`
    ]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-4xl my-6 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Banner */}
          <div className="relative h-44 sm:h-52 w-full bg-slate-950 shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {project.category} Application
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 drop-shadow-md">
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950/80 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/50 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 transition-all"
                >
                  <span>Open Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex border-b border-slate-800/60 px-6 pt-3 bg-slate-950/40 gap-4 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" /> Overview & Features
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" /> Code & Architecture
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'simulator'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-4 h-4" /> Live Preview & Simulator
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            
            {activeTab === 'overview' && (
              <>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Project Description
                  </h3>
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {project.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                    Key Features & Functionality
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border flex items-start gap-2 text-xs ${
                          theme === 'dark' ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Technologies & Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'architecture' && (
              <>
                {project.architectureNotes && (
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                      System Design & Architecture
                    </h3>
                    <p className={`p-4 rounded-xl border font-mono text-xs leading-relaxed ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      {project.architectureNotes}
                    </p>
                  </div>
                )}

                {project.codeSnippet ? (
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-cyan-400" /> Backend Controller Code Highlight
                    </h3>
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono">
                    // Source code organized cleanly into MVC / Microservice controllers.
                  </div>
                )}
              </>
            )}

            {/* LIVE SIMULATOR & PREVIEW TAB */}
            {activeTab === 'simulator' && (
              <div className="space-y-4">
                {/* Control Bar: Simulator Modes & Device Viewports */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {/* Mode Switcher */}
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setPreviewMode('playground')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        previewMode === 'playground'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Interactive Sandbox</span>
                    </button>
                    <button
                      onClick={() => setPreviewMode('iframe')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        previewMode === 'iframe'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Embedded Web View</span>
                    </button>
                  </div>

                  {/* Device Viewport Selector */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 font-mono text-[11px] ${
                        deviceMode === 'desktop' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Desktop View (Full Width)"
                    >
                      <Monitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      onClick={() => setDeviceMode('tablet')}
                      className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 font-mono text-[11px] ${
                        deviceMode === 'tablet' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tablet View (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" /> Tablet
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 font-mono text-[11px] ${
                        deviceMode === 'mobile' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mobile View (375px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Simulated Address Bar */}
                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2 overflow-hidden truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-slate-500 select-none">https://</span>
                    <span className="text-cyan-300 font-semibold truncate">{projectUrl.replace('https://', '')}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={handleCopyLink}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Copy Project Link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setIframeKey((k) => k + 1)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Reload Simulator"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Open in New Window"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Main Simulator Display Canvas */}
                <div className="flex justify-center bg-slate-950/80 p-2 sm:p-4 rounded-2xl border border-slate-800 overflow-hidden min-h-[380px]">
                  <div
                    className={`transition-all duration-300 w-full ${
                      deviceMode === 'tablet'
                        ? 'max-w-[640px] border-x-8 border-t-8 border-slate-900 rounded-2xl shadow-2xl'
                        : deviceMode === 'mobile'
                        ? 'max-w-[360px] border-x-8 border-t-8 border-b-8 border-slate-900 rounded-3xl shadow-2xl'
                        : 'w-full'
                    }`}
                  >
                    {previewMode === 'playground' ? (
                      /* Interactive Code Sync Application Simulator */
                      <CodeSyncAppSimulator githubUrl={project.githubUrl} />
                    ) : (
                      /* Embedded Live Web Preview Iframe */
                      <div className="w-full h-[420px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                        <iframe
                          key={iframeKey}
                          title={`${project.title} Live Demo`}
                          src={projectUrl}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub Repository</span>
            </a>

            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <span>Visit Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

