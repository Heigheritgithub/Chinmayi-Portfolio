import {
  PersonalInfo,
  StatItem,
  EducationItem,
  SkillCategory,
  Project,
  Internship,
  Experience,
  Certification
} from '../types/portfolio';

// Generated image paths with fallbacks
const AVATAR_IMAGE = '/src/assets/images/profile_avatar_1785835511608.jpg';
const DASHBOARD_IMAGE = '/src/assets/images/project_dashboard_1785835532417.jpg';
const ENTERPRISE_IMAGE = '/src/assets/images/project_enterprise_1785835548883.jpg';
const CODE_EDITOR_IMAGE = '/src/assets/images/code_editor_preview_1785844316056.jpg';

export const initialPersonalInfo: PersonalInfo = {
  name: "CHINMAYI HOSAPETI",
  title: "Full Stack Software Developer & CS Engineer",
  typedTitles: [
    "Full Stack Developer",
    "Computer Science Engineer",
    "Problem Solver & Tech Enthusiast"
  ],
  shortBio: "Graduate Engineering Apprentice at Hindustan Aeronautics Limited (HAL), Bangalore & CS Engineer passionate about building responsive full-stack applications.",
  fullBio: "I am a Computer Science Engineering graduate (2025) currently working as a Graduate Engineering Apprentice at Hindustan Aeronautics Limited (HAL), Bangalore (Feb 2026 - Present). I am passionate about building responsive and user-friendly web applications, with hands-on experience in HTML, CSS, JavaScript, React.js, ASP.NET Core, C#, SQL Server, and MySQL. I enjoy learning new technologies, solving complex software challenges, and building scalable software solutions.",
  careerObjective: "Seeking opportunities to grow as a software developer and contribute to innovative projects by leveraging skills in full stack web development, databases, and problem solving.",
  email: "chinmayihosapeti02@gmail.com",
  phone: "+91 8431238468",
  location: "Bengaluru, Karnataka, India",
  degree: "B.E. Computer Science Engineering",
  university: "Visvesvaraiah Tehnological University, Belagavi",
  graduationYear: "2025",
  cgpa: "8.6 / 10.0",
  languages: ["English (Fluent)","Kannada(Native/Fluent)", "Hindi (Conversational)"],
  availability: "Available Immediately for Full-Time Roles",
  githubUrl: "https://github.com/Heigheritgithub/Heigheritgithub",
  linkedinUrl: "https://www.linkedin.com/in/chinmayi-hosapeti-844b132a1/", 
  avatarUrl: "https://raw.githubusercontent.com/Heigheritgithub/Portfolio/main/cc.jpg",
  resumeUrl: "https://raw.githubusercontent.com/Heigheritgithub/Portfolio/main/CHINMAYI%20RESUME.pdf"
};

export const initialStats: StatItem[] = [
  {
    id: "1",
    label: "Projects Completed",
    value: 24,
    suffix: "+",
    description: "Full stack web, desktop & enterprise Java apps",
    iconName: "FolderGit2"
  },
  {
    id: "2",
    label: "Technologies Mastered",
    value: 18,
    suffix: "+",
    description: "Languages, frameworks, databases & DevOps tools",
    iconName: "Code2"
  },
  {
    id: "3",
    label: "Internship Experience",
    value: 2,
    suffix: " Yrs",
    description: "Real-world engineering at fast-paced tech firms",
    iconName: "Briefcase"
  },
  {
    id: "4",
    label: "Certifications",
    value: 8,
    suffix: "+",
    description: "AWS, Azure, Java SE & React Certified",
    iconName: "Award"
  }
];

export const initialEducation: EducationItem[] = [
  {
    id: "edu-1",
    degree: "B.E. Computer Science & Engineering",
    institution: "Government Engineering College, Majali, Karwar",
    boardOrUniversity: "Visvesvaraiah Technological University, Belagavi",
    year: "2021 - 2025",
    score: "8.6",
    scoreType: "CGPA",
    description: "Specialized in Software Engineering, Data Structures & Algorithms, Database Management, Cloud Computing, and Web Application Development."
  },
  {
    id: "edu-2",
    degree: "Pre-University Science (PCMB)",
    institution: "Annadaneshwar Pre-University College, Naregal, Dist||Gadag",
    boardOrUniversity: "Department of Pre-University Education",
    year: "2018 - 2020",
    score: "78.4%",
    scoreType: "Percentage",
    description: "Major focus in Physics, Chemistry, Mathematics, and Biology."
  },
  {
    id: "edu-3",
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "Kalidas English Medium School Badami, Dist||Bagalkot",
    boardOrUniversity: "State Secondary Education Examination Board",
    year: "2017 - 2018",
    score: "84.5%",
    scoreType: "Percentage",
    description: "Comprehensive secondary education with distinction across Science, Mathematics, English, and Social Studies."
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    id: "cat-1",
    category: "Languages",
    title: "Programming Languages",
    iconName: "Terminal",
    skills: [
      { name: "Java", percentage: 92, level: "Intermediate", iconName: "Coffee" },
      { name: "JavaScript / TypeScript", percentage: 90, level: "Intermediate", iconName: "FileCode2" },
      { name: "Python", percentage: 85, level: "Intermediate", iconName: "FileCode" },
      { name: "MySQL", percentage: 85, level: "Intermediate", iconName: "Database" },
      { name: "HTML", percentage: 90, level: "Intermediate", iconName: "Globe" },
      { name: "CSS", percentage: 90, level: "Intermediate", iconName: "Palette" }



    ]
  },
  {
    id: "cat-2",
    category: "Frontend",
    title: "Frontend Engineering",
    iconName: "Layout",
    skills: [
      { name: "React.js", percentage: 94, level: "Expert", iconName: "Atom" },
      { name: "CSS", percentage: 95, level: "Expert", iconName: "Palette" },
      { name: "HTML5 / CSS3", percentage: 95, level: "Expert", iconName: "Globe" },
      { name: "Bootstrap", percentage: 88, level: "Advanced", iconName: "LayoutGrid" }
    ]
  },
  {
    id: "cat-3",
    category: "Backend",
    title: "Backend Frameworks & APIs",
    iconName: "Server",
    skills: [
      { name: "ASP.NET Core", percentage: 90, level: "Expert", iconName: "ServerCog"},
      { name: "Node.js ", percentage: 88, level: "Advanced", iconName: "Zap" },
      { name: "RESTful API Architecture", percentage: 95, level: "Expert", iconName: "Network" },
      { name: "Spring Boot (Java)", percentage: 82, level: "Advanced", iconName: "Box" },
      { name: "Microservices", percentage: 78, level: "Intermediate", iconName: "Workflow" }
    ]
  },
  {
    id: "cat-4",
    category: "Database",
    title: "Database Systems",
    iconName: "Database",
    skills: [
      { name: "SQL Server (T-SQL)", percentage: 90, level: "Intermediate", iconName: "DatabaseBackup" },
      { name: "MySQL", percentage: 88, level: "Intermediate", iconName: "Table" },
      { name: "MongoDB", percentage: 82, level: "Intermediate", iconName: "HardDrive" },
      { name: "PLSQL", percentage: 82, level: "Intermediate", iconName: "HardDrive" }

    ]
  },
  {
    id: "cat-5",
    category: "Tools",
    title: "DevOps & Developer Tools",
    iconName: "Wrench",
    skills: [
      { name: "Git & GitHub", percentage: 95, level: "Expert", iconName: "GitBranch" },
      { name: "VS Code", percentage: 98, level: "Expert", iconName: "Monitor" },
      { name: "Visual Studio", percentage: 90, level: "Advanced", iconName: "AppWindow" },
      { name: "Docker & Containers", percentage: 80, level: "Intermediate", iconName: "Container" },
      { name: "Postman API Testing", percentage: 92, level: "Expert", iconName: "Send" }
    ]
  },
  {
    id: "cat-6",
    category: "Core Concepts",
    title: "Computer Science Foundations",
    iconName: "BookOpen",
    skills: [
      { name: "Object-Oriented Programming (OOP)", percentage: 96, level: "Expert", iconName: "Boxes" },
      { name: "Data Structures & Algorithms", percentage: 90, level: "Advanced", iconName: "Binary" },
      { name: "Responsive Web Design", percentage: 98, level: "Expert", iconName: "Smartphone" },
      { name: "Software Design Patterns", percentage: 86, level: "Advanced", iconName: "Compass" },
      { name: "System Architecture", percentage: 82, level: "Advanced", iconName: "Cpu" }
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Collaborative Code Editor",
    category: "Web",
    shortDescription: "Built a real-time collaborative code editor enabling multiple users to code together with live synchronization.",
    fullDescription: "Developed a real-time collaborative code editor that enables multiple users to write and edit code simultaneously with live synchronization, featuring user authentication, syntax highlighting, and secure session management, built using React.js, Node.js, Socket.IO, and Tailwind CSS to deliver a responsive and interactive coding experience.",
    imageUrl: CODE_EDITOR_IMAGE,
    technologies: ["React.js", "Javascript", " CSS", "Node.js", "MongoDB", "Socket.io"],
    features: [
      "Real-time collaborative code editing with multiple users",
      "User authentication and secure coding sessions",
      "Live code synchronization using Socket.IO",
      "Syntax highlighting and responsive code editor interface",
      "Fast, responsive, and cross-device compatible web application"
    ],
    githubUrl: "https://github.com/Heigheritgithub/Collaborative-code-editor",
    liveDemoUrl: "https://collaborative-code-editor-wheat.vercel.app/",
    featured: true,
    architectureNotes: "A real-time collaborative web application where the React frontend communicates with a Node.js/Express backend using Socket.IO for live code synchronization, with MongoDB handling user authentication and session management.",
    codeSnippet: `// Express.js API - Create Collaboration Room
export async function createRoom(req, res) {
  try {
    const { roomName, userId } = req.body;

    const room = await Room.create({
      roomName,
      owner: userId
    });

    return res.status(201).json({
      success: true,
      roomId: room._id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create room"
    });
  }
}`
  },
  
];

export const initialInternships: Internship[] = [];
export const initialExperience: Experience[] = [
  {
    id: "exp-1",
    company: "Hindustan Aeronautics Limited (HAL)",
    position: "Apprentice",
    duration: "Feb 02, 2026 - Present",
    location: "Bangalore, Karnataka, India",
    type: "Apprenticeship",
    description: "Graduate Engineering Apprentice at Hindustan Aeronautics Limited (HAL), Bangalore, gaining hands-on engineering experience in defense software systems, avionics data processing, and enterprise software solutions.",
    responsibilities: [
      "Engaging in software engineering and systems development tasks within defense & aerospace domain.",
      "Assisting in software testing, database management, and developing internal utilities to streamline engineering workflows.",
      "Collaborating with cross-functional technical teams on system diagnostics, documentation, and software maintenance.",
      "Applying full-stack web development and core computer science principles to solve real-world engineering challenges at HAL."
    ],
    technologies: ["Software Engineering", "Java", "C#", "ASP.NET Core", "SQL Server", "Web Development"]
  }
];
export const initialCertifications: Certification[] = [];


// Helper to save and load state from localStorage so changes made in CustomizerModal persist smoothly!
export function loadPortfolioState<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`portfolio_${key}`);
    if (saved) return JSON.parse(saved) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
  }
  return fallback;
}

export function savePortfolioState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage`, err);
  }
}
