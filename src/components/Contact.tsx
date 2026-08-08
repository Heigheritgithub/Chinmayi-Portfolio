import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PersonalInfo, ThemeMode } from '../types/portfolio';

interface ContactProps {
  personalInfo: PersonalInfo;
  theme: ThemeMode;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ personalInfo, theme, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast(`Message sent successfully! ${personalInfo.name.split(' ')[0]} will get back to you soon.`, 'success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (err) {
        console.error('Confetti error', err);
      }

      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards, Information & Google Map Embed */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className={`p-5 rounded-2xl border flex items-center space-x-4 transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Direct Email
                  </h4>
                  <p className={`text-sm font-semibold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className={`p-5 rounded-2xl border flex items-center space-x-4 transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Phone / WhatsApp
                  </h4>
                  <p className={`text-sm font-semibold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              <div
                className={`p-5 rounded-2xl border flex items-center space-x-4 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Primary Location
                  </h4>
                  <p className={`text-sm font-semibold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl border overflow-hidden shadow-lg h-56 relative bg-slate-900">
              <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(personalInfo.location)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Social Links Bar */}
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className={`text-xs font-mono font-bold uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Social Profiles:
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-10 rounded-3xl border shadow-xl relative ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <h3 className={`text-2xl font-bold tracking-tight mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Send a Direct Message
              </h3>
              <p className={`text-xs sm:text-sm mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Have a project idea, job opportunity, or tech query? Fill out the form below to reach out directly.
              </p>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-emerald-400">Message Received!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. {personalInfo.name.split(' ')[0]} will review your message and reply via email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Full Stack Engineering Opportunity / Project Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500'
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={`Hi ${personalInfo.name.split(' ')[0]}, I would like to discuss a project...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none ${
                        theme === 'dark'
                          ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500'
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
