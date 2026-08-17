export interface PersonalInfo {
  name: string;
  title: string;
  typedTitles: string[];
  shortBio: string;
  fullBio: string;
  careerObjective: string;
  email: string;
  phone: string;
  location: string;
  degree: string;
  university: string;
  graduationYear: string;
  cgpa: string;
  languages: string[];
  availability: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  avatarUrl: string;
  resumeUrl: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
}

export interface PersonalDetail {
  label: string;
  value: string;
  iconName: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  description: string;
}

export interface SkillCategory {
  id: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Core Concepts';
  title: string;
  iconName: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  percentage: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  iconName: string;
  experienceYears?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Java' | 'React' | 'ASP.NET';
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  architectureNotes?: string;
  codeSnippet?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  logoUrl?: string;
  technologies: string[];
  responsibilities: string[];
  skillsGained: string[];
  keyAchievement: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: string; // Full-time / Internship / Contract
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  skills: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export type ThemeMode = 'dark' | 'light';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
