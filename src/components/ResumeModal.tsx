import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  Copy,
  Download,
  FileText,
  Mail,
  Phone,
  MapPin,
  Check,
  GraduationCap,
  Briefcase,
  Code2,
  Award
} from 'lucide-react';
import { PersonalInfo, EducationItem, SkillCategory, Internship, Experience as ExperienceType, Project, ThemeMode } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  educationList: EducationItem[];
  skillCategories: SkillCategory[];
  internships: Internship[];
  experienceList?: ExperienceType[];
  projects: Project[];
  theme: ThemeMode;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  educationList,
  skillCategories,
  internships,
  experienceList = [],
  projects,
  theme,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
${personalInfo.name} - ${personalInfo.title}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}

SUMMARY:
${personalInfo.fullBio}

CAREER OBJECTIVE:
${personalInfo.careerObjective}

EDUCATION:
${educationList.map(e => `- ${e.degree} from ${e.institution} (${e.year}) | Score: ${e.score} (${e.scoreType})`).join('\n')}

TECHNICAL SKILLS:
- Languages: Java, C#, JavaScript, TypeScript, Python, C++
- Frontend: React.js, Tailwind CSS, HTML5, CSS3, Bootstrap
- Backend: ASP.NET Core, Node.js, Express, REST APIs, Spring Boot
- Databases: SQL Server, MySQL, MongoDB, PostgreSQL

PROFESSIONAL EXPERIENCE:
${experienceList.map(exp => `- ${exp.position} at ${exp.company} (${exp.duration})\n  ${exp.description}`).join('\n')}

INTERNSHIP EXPERIENCE:
${internships.map(i => `- ${i.role} at ${i.company} (${i.duration})\n  Key Achievement: ${i.keyAchievement}`).join('\n')}

KEY PROJECTS:
${projects.map(p => `- ${p.title}: ${p.shortDescription}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    onShowToast('Resume text copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl my-8 rounded-3xl bg-white text-slate-900 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Top Control Bar */}
          <div className="p-4 px-6 bg-slate-900 text-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm">Curriculum Vitae / Resume Viewer</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Body */}
          <div className="p-8 sm:p-12 overflow-y-auto font-sans text-slate-800 space-y-6 bg-white" id="printable-cv">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-base font-bold text-blue-700 mt-1">
                  {personalInfo.title}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {personalInfo.degree} • Class of {personalInfo.graduationYear}
                </p>
              </div>

              <div className="text-xs space-y-1 text-slate-600 font-mono sm:text-right">
                <p className="flex items-center sm:justify-end gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> {personalInfo.email}</p>
                <p className="flex items-center sm:justify-end gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-600" /> {personalInfo.phone}</p>
                <p className="flex items-center sm:justify-end gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {personalInfo.location.split('(')[0]}</p>
              </div>
            </div>

            {/* Objective / Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {personalInfo.fullBio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Academic Background
              </h2>
              <div className="space-y-3 text-xs">
                {educationList.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{edu.degree}</p>
                      <p className="text-slate-600">{edu.institution} ({edu.boardOrUniversity})</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-blue-700">{edu.score} ({edu.scoreType})</p>
                      <p className="text-slate-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-3 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Core Technical Skills
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900">Languages & Frameworks:</span>
                  <p className="text-slate-700 mt-0.5">Java, C#, JavaScript, TypeScript, Python, C++, ASP.NET Core, React.js, Node.js</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Databases & DevOps:</span>
                  <p className="text-slate-700 mt-0.5">SQL Server, MySQL, MongoDB, PostgreSQL, Git, Docker, Postman, VS Code</p>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            {experienceList.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> Professional Experience
                </h2>
                <div className="space-y-4 text-xs">
                  {experienceList.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.position} — {exp.company}</span>
                        <span className="font-mono text-slate-600">{exp.duration}</span>
                      </div>
                      <p className="text-slate-700 italic text-[11px] mb-1">{exp.description}</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internship Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Internship Experience
              </h2>
              <div className="space-y-4 text-xs">
                {internships.map((intern) => (
                  <div key={intern.id} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{intern.role} - {intern.company}</span>
                      <span className="font-mono text-slate-600">{intern.duration}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      {intern.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-1 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Key Software Projects
              </h2>
              <div className="space-y-2 text-xs">
                {projects.slice(0, 3).map((p) => (
                  <div key={p.id}>
                    <span className="font-bold text-slate-900">{p.title}</span> ({p.technologies.slice(0, 4).join(', ')}):
                    <p className="text-slate-700">{p.shortDescription}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
