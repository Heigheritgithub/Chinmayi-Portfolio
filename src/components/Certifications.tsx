import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { Certification, ThemeMode } from '../types/portfolio';

interface CertificationsProps {
  certifications: Certification[];
  theme: ThemeMode;
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications, theme }) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Industry Credentials</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Certifications & Licenses
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 shadow-xl hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 shadow-md hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" /> {cert.issueDate}
                  </span>
                </div>

                {/* Title & Organization */}
                <h3 className={`text-base font-bold tracking-tight line-clamp-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-cyan-400 mt-1">
                  {cert.organization}
                </p>

                <p className="text-[11px] font-mono text-slate-500 mt-2">
                  ID: {cert.credentialId}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* View Certificate Action */}
              <div className="pt-4 mt-6 border-t border-slate-800/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCert.title}</h3>
                  <p className="text-sm text-cyan-400 font-semibold">{selectedCert.organization}</p>
                </div>
              </div>

              {/* Certificate Image Preview Box */}
              <div className="w-full h-48 rounded-xl bg-slate-950 border border-slate-800 my-4 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center p-4">
                  <ShieldCheck className="w-10 h-10 text-cyan-400 mb-2" />
                  <p className="text-xs font-mono text-cyan-300 font-bold">VERIFIED CREDENTIAL</p>
                  <p className="text-[11px] font-mono text-slate-300">ID: {selectedCert.credentialId}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Issue Date:</span>{' '}
                  <span className="font-bold">{selectedCert.issueDate}</span>
                </div>

                <div>
                  <span className="text-slate-400">Skills Verified:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Close
                </button>
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <span>Verify Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
