export interface Project {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  detail: string;
  stack: string;
  image: string;
  highlights: string[];
  metrics?: string;
  demoUrl: string;
  repoUrl: string;
  category: 'web' | 'mobile' | 'system' | 'tool';
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Systems & DevOps' | 'Core' | 'Mobile';
  description: string;
  proficiency: string;
}

export interface CredentialItem {
  index: string;
  title: string;
  institution: string;
  year: string;
  image: string;
  type: 'Degree' | 'Certification' | 'Award' | 'Achievement';
}

export interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
}

export const personalData = {
  name: 'Robert Terquin Laqui',
  monogram: 'RT',
  role: 'Full-Stack Software Engineer & Mobile Developer',
  focus: 'Cross-Platform Mobile · Web Architecture · Cloud Systems',
  location: 'Cavite, Philippines',
  timezone: 'Asia/Manila',
  coordinates: '14.2829° N, 120.9167° E',
  availability: 'Available for new opportunities',
  shortBio:
    'Full-stack software engineer specializing in cross-platform mobile and web systems with Flutter, React, Node.js, and cloud backends. Focused on building clean, high-performance applications with thoughtful user experiences.',
  email: 'business.treevor@gmail.com',
  github: 'https://github.com/robertterquin',
  linkedin: 'https://www.linkedin.com/in/robertterquinlaqui/',
  resumeUrl: '#',
  status: 'Available for work',
  year: '2026',
};

export const projectsData: Project[] = [
  {
    id: 'oncosense',
    number: '01',
    title: 'ONCOSENSE',
    tag: 'HEALTHCARE MOBILE APP',
    category: 'mobile',
    description: 'A Flutter mobile platform for cancer education, prevention tips, and daily guidance.',
    detail:
      'A cross-platform Flutter application engineered to deliver cancer prevention literacy, lifestyle tracking, and daily wellness habits. Integrated with Supabase for user state and profile persistence, designed with a clean, high-legibility interface tailored for everyday health routines.',
    stack: 'Flutter · Dart · Supabase · Cloud DB',
    image: '/projects/oncosense-showcase.png',
    highlights: [
      'Daily wellness habit tracker and prevention checklist with persistent progress state',
      'Supabase cloud synchronization with offline tolerance for low-connectivity environments',
      'Structured educational modules and verified cancer prevention guidance resources',
    ],
    metrics: 'Featured Health Mobile Platform',
    demoUrl: 'https://github.com/robertterquin/ONCOSENSE',
    repoUrl: 'https://github.com/robertterquin/ONCOSENSE',
  },
  {
    id: 'chainly',
    number: '02',
    title: 'Chainly',
    tag: 'CYCLING & MAINTENANCE',
    category: 'mobile',
    description: 'Maintenance companion tracking service records, bike condition, and reminders.',
    detail:
      'A dedicated Flutter mobile companion designed for cyclists to track component wear, log workshop service records, and trigger preventative maintenance reminders before mechanical failures happen on the road.',
    stack: 'Flutter · Dart · Supabase · Local Sync',
    image: '/projects/chainly-showcase.png',
    highlights: [
      'Automated service reminders based on component lifespan and riding frequency',
      'Granular maintenance cost accounting and complete workshop service history',
      'Multi-bike profile management with individual component wear tracking',
    ],
    metrics: 'Preventative Maintenance Workflow',
    demoUrl: 'https://github.com/robertterquin/Chainly',
    repoUrl: 'https://github.com/robertterquin/Chainly',
  },
  {
    id: 'ridetrack',
    number: '03',
    title: 'RideTrack',
    tag: 'FITNESS & TELEMETRY',
    category: 'mobile',
    description: 'Mobile cycling platform tracking ride statistics, distance goals, and progress.',
    detail:
      'A mobile cycling platform engineered with Flutter to record real-time ride sessions, monitor weekly distance milestones, and visualize performance telemetry with optimized battery usage.',
    stack: 'Flutter · Dart · Supabase · Geolocation',
    image: '/projects/ridetrack-showcase.png',
    highlights: [
      'Real-time session recording tracking velocity, distance, and duration metrics',
      'Weekly distance target pacing bars with dynamic milestone feedback',
      'Comparative workout history ledger for tracking endurance progression',
    ],
    metrics: 'Low-latency route & session logging',
    demoUrl: 'https://github.com/robertterquin/RideTrack',
    repoUrl: 'https://github.com/robertterquin/RideTrack',
  },
  {
    id: 'spendly',
    number: '04',
    title: 'Spendly',
    tag: 'FINTECH & BUDGET',
    category: 'mobile',
    description: 'Personal budget companion for monitoring spending, accounts, and financial habits.',
    detail:
      'A personal finance app built to help users track transactions, organize multiple payment accounts, and make clearer day-to-day budget decisions with an integrated AI budget assistant.',
    stack: 'Flutter · Supabase · AI Assistant',
    image: '/projects/spendly-showcase.png',
    highlights: [
      'Multi-account balance overview and categorized spending breakdown',
      'Automated expense classification and monthly budget alerts',
      'AI budget assistant offering tailored saving insights',
    ],
    metrics: 'Full offline cashflow reconciliation',
    demoUrl: 'https://github.com/robertterquin',
    repoUrl: 'https://github.com/robertterquin',
  },
  {
    id: 'hunch',
    number: '05',
    title: 'Hunch',
    tag: 'AI SECURITY & EDTECH',
    category: 'web',
    description: 'AI-powered safety inspector evaluating OJT and student internship opportunities.',
    detail:
      'An AI-powered verification tool that helps students inspect job and internship listings for warning signs, scam signals, and predatory terms before sharing sensitive personal info or accepting offers.',
    stack: 'React · TypeScript · AI Integration',
    image: '/projects/hunch-showcase.png',
    highlights: [
      'Listing scam signal detection using natural language evaluation models',
      'Evidence-based safety scoring and comprehensive student checklist',
      'Deployed live on Vercel with responsive desktop & mobile support',
    ],
    metrics: 'Live Production: hunchh.vercel.app',
    demoUrl: 'https://hunchh.vercel.app/',
    repoUrl: 'https://github.com/robertterquin',
  },
  {
    id: 'hapag',
    number: '06',
    title: 'Hapag',
    tag: 'AI CULINARY ASSISTANT',
    category: 'web',
    description: 'AI-powered Filipino meal assistant generating recipes from pantry ingredients.',
    detail:
      'An intelligent recipe platform celebrating Filipino culinary culture. Allows users to enter whatever ingredients they currently have on hand to generate authentic Filipino meals, dietary substitutes, and cooking steps.',
    stack: 'React · TypeScript · AI Integration',
    image: '/projects/hapag-showcase.png',
    highlights: [
      'Pantry-based ingredient matching algorithm optimized for Filipino dishes',
      'Dietary and portion-size preference adjustments in real time',
      'Step-by-step AI cooking guide with local ingredient substitutions',
    ],
    metrics: 'Live Production: hapagg.vercel.app',
    demoUrl: 'https://hapagg.vercel.app/',
    repoUrl: 'https://github.com/robertterquin',
  },
];

export const skillsData: SkillItem[] = [
  {
    name: 'Flutter & Dart',
    category: 'Mobile',
    proficiency: 'Core',
    description: 'Cross-platform mobile applications, state architecture, and offline SQLite/Supabase synchronization.',
  },
  {
    name: 'React',
    category: 'Frontend',
    proficiency: 'Advanced',
    description: 'Component-driven user interfaces, custom hook design, performant rendering, and state management.',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    proficiency: 'Advanced',
    description: 'Strict type safety, generative interfaces, and preventing runtime defects during build time.',
  },
  {
    name: 'Node.js & Express',
    category: 'Backend',
    proficiency: 'Proficient',
    description: 'RESTful API architectures, asynchronous event loops, authentication middleware, and service routing.',
  },
  {
    name: 'Supabase & Firebase',
    category: 'Database',
    proficiency: 'Core',
    description: 'Cloud PostgreSQL schemas, real-time database listeners, auth providers, and secure cloud storage.',
  },
  {
    name: 'MySQL & Databases',
    category: 'Database',
    proficiency: 'Certified',
    description: 'Relational database schema modeling, SQL query optimization, indexes, and transactional consistency.',
  },
  {
    name: 'Java (Oracle Certified)',
    category: 'Core',
    proficiency: 'Advanced',
    description: 'Object-oriented programming, design patterns, robust software structure, and backend services.',
  },
  {
    name: 'Python',
    category: 'Core',
    proficiency: 'Proficient',
    description: 'Automation scripts, rapid prototyping, AI integration pipelines, and data scraping.',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    proficiency: 'Certified Specialist',
    description: 'Semantic markup, modern CSS grid/flexbox, accessibility standards, and responsive web systems.',
  },
  {
    name: 'TailwindCSS',
    category: 'Frontend',
    proficiency: 'Advanced',
    description: 'Scalable utility token systems, bespoke design tokens, and smooth micro-interaction styling.',
  },
  {
    name: 'Git & GitHub',
    category: 'Systems & DevOps',
    proficiency: 'Advanced',
    description: 'Version control branch management, pull request reviews, and GitHub deployment pipelines.',
  },
  {
    name: 'Vercel & Cloud',
    category: 'Systems & DevOps',
    proficiency: 'Proficient',
    description: 'Edge network deployment, custom domain DNS, environment variable isolation, and CI/CD triggers.',
  },
  {
    name: 'C Programming',
    category: 'Core',
    proficiency: 'Intermediate',
    description: 'Low-level memory management, pointers, and foundational computer architecture concepts.',
  },
  {
    name: 'Cybersecurity Fundamentals',
    category: 'Systems & DevOps',
    proficiency: 'Specialist',
    description: 'Threat modeling, web vulnerability mitigation, secure authentication, and defense best practices.',
  },
  {
    name: 'Android Studio & Mobile SDKs',
    category: 'Mobile',
    proficiency: 'Proficient',
    description: 'Native mobile build pipelines, Android emulation, permissions management, and APK signing.',
  },
];

export const credentialsData: CredentialItem[] = [
  {
    index: '01',
    title: 'HackForGov 2025 - CALABARZON',
    institution: 'Government Cybersecurity Challenge Finalist',
    year: '2025',
    image: '/certificates/hackforgov-2025.jpg',
    type: 'Award',
  },
  {
    index: '02',
    title: 'National Programming Challenge 2025',
    institution: 'CodeChum National Programming Competition',
    year: '2025',
    image: '/certificates/codechum-2025.jpg',
    type: 'Award',
  },
  {
    index: '03',
    title: 'National Programming Challenge 2024',
    institution: 'CodeChum National Programming Competition',
    year: '2024',
    image: '/certificates/codechum-2024.png',
    type: 'Award',
  },
  {
    index: '04',
    title: 'IT Specialist in Databases',
    institution: 'Certiport Industry Certification',
    year: '2025',
    image: '/certificates/it-specialist-databases.png',
    type: 'Certification',
  },
  {
    index: '05',
    title: 'Cybersecurity Specialist',
    institution: 'Industry Certified Track',
    year: '2025',
    image: '/certificates/cybersecurity-specialist.png',
    type: 'Certification',
  },
  {
    index: '06',
    title: 'HTML and CSS Specialist',
    institution: 'Certiport Web Standards Certification',
    year: '2025',
    image: '/certificates/html-css-specialist.png',
    type: 'Certification',
  },
  {
    index: '07',
    title: 'Oracle Java Foundations',
    institution: 'Oracle Certified Foundations Associate',
    year: '2025',
    image: '/certificates/oracle-java-foundations.jpg',
    type: 'Certification',
  },
  {
    index: '08',
    title: 'PowerPoint 2019 Associate',
    institution: 'Microsoft Office Specialist',
    year: '2024',
    image: '/certificates/microsoft-powerpoint-2019.jpg',
    type: 'Certification',
  },
];

export const timelineData: TimelineEvent[] = [
  {
    year: '2026 — Present',
    role: 'Full-Stack Software Engineer',
    organization: 'Independent & Client Systems Development',
    description:
      'Architecting cross-platform Flutter applications (Spendly, Chainly) and AI-powered web systems (Hunch, Hapag).',
  },
  {
    year: '2025',
    role: 'Competitive Programmer & Cybersecurity Finalist',
    organization: 'HackForGov 2025 & CodeChum NPC',
    description:
      'Finalist in HackForGov CALABARZON and CodeChum NPC 2025. Earned certifications in Databases, Cybersecurity, and HTML/CSS.',
  },
  {
    year: '2024',
    role: 'Systems & Algorithmic Foundations',
    organization: 'National Programming Challenge 2024',
    description:
      'Competed in National Programming Challenge 2024. Deep-dived into Java OOP, relational database schemas, and web standards.',
  },
];


