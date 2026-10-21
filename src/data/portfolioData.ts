import type {
  PersonalData,
  Project,
  CapabilityGroup,
  CredentialItem,
  TimelineEvent,
} from '../types';

export const personalData: PersonalData = {
  name: 'Robert Terquin Laqui',
  location: 'Philippines',
  shortBio:
    'Software engineer specializing in cross-platform mobile and web systems with Flutter, React, Node.js, and cloud backends. Focused on building clean, high-performance applications with thoughtful user experiences.',
  email: 'terquinlaqui@gmail.com',
  phone: '+63 926 029 4838',
  whatsapp: 'https://wa.me/639260294838',
  github: 'https://github.com/robertterquin',
  linkedin: 'https://www.linkedin.com/in/robertterquinlaqui/',
  resumeUrl: '/Robert_Terquin_Laqui_Resume.pdf',
};

export const projectsData: Project[] = [
  {
    id: 'oncosense',
    number: '01',
    title: 'OncoSense',
    tag: 'HEALTHCARE MOBILE APP',
    category: 'mobile',
    description: 'Cancer awareness and support app combining prevention guides, a personal treatment journey tracker, and a community Q&A forum.',
    detail:
      'Built with Flutter and Riverpod on Supabase Auth and PostgreSQL. Journey data is cached on the device and synced to Supabase, scheduled local notifications deliver daily health tips and reminders, and the GNews API powers a live cancer news feed.',
    stack: 'Flutter · Dart · Riverpod · Supabase',
    image: '/projects/oncosense-showcase.webp',
    highlights: [
      'Journey tracker for diagnosis, treatments with session counts and side effects, daily mood, pain and symptoms, and cancer-free milestones',
      'Prevention tips, self-check guides, and a cancer type library, backed by scheduled health tips and reminders',
      'Community Q&A forum, a GNews-powered news feed, and bookmarks for saved questions, articles, and resources',
    ],
    demoUrl: 'https://github.com/robertterquin/ONCOSENSE',
    repoUrl: 'https://github.com/robertterquin/ONCOSENSE',
  },
  {
    id: 'chainly',
    number: '02',
    title: 'Chainly',
    tag: 'CYCLING & MAINTENANCE',
    category: 'mobile',
    description: 'Bike maintenance companion that tracks rides, service history, and mileage-based reminders across a multi-bike garage.',
    detail:
      'Logged rides add to each bike\'s total mileage, which is checked against built-in service intervals, from chain lubrication every 100 km to chain replacement around 2,500 km, to raise usage-based and time-based reminders. Built with Flutter, Riverpod, and Supabase, with Firebase Cloud Messaging and local notifications for service alerts.',
    stack: 'Flutter · Dart · Riverpod · Supabase · Firebase',
    image: '/projects/chainly-showcase.webp',
    highlights: [
      'Usage-based (km) and time-based maintenance reminders driven by recommended service intervals',
      'Service history log with costs, categorized by chain, brakes, tires, and general service',
      'Multi-bike garage with per-bike mileage, ride logging by distance and duration, and cycling tips',
    ],
    demoUrl: 'https://github.com/robertterquin/Chainly',
    repoUrl: 'https://github.com/robertterquin/Chainly',
  },
  {
    id: 'spendly',
    number: '03',
    title: 'Spendly',
    tag: 'FINTECH & BUDGET',
    category: 'mobile',
    description: 'Personal finance tracker with multiple accounts, category charts, and an AI assistant that manages transactions from plain-language chat.',
    detail:
      'The assistant runs on Groq\'s Llama 3.3 70B. Each message is sent with the user\'s accounts and recent transactions, and the model replies with a structured JSON action (add, edit, or delete a transaction, set a balance, or transfer between accounts) that the app then applies. Built feature-first with Riverpod and Supabase.',
    stack: 'Flutter · Dart · Riverpod · Supabase · Groq',
    image: '/projects/spendly-showcase.webp',
    highlights: [
      'Bank, e-wallet, and cash accounts with income and expense tracking and full transaction history',
      'Chat assistant that adds, edits, deletes, and transfers transactions or answers spending questions, with saved chat sessions',
      'Dashboard balance summary and category breakdown charts',
    ],
    demoUrl: 'https://github.com/robertterquin/Spendly',
    repoUrl: 'https://github.com/robertterquin/Spendly',
  },
  {
    id: 'hunch',
    number: '04',
    title: 'Hunch',
    tag: 'AI SECURITY & EDTECH',
    category: 'web',
    description: 'Scam checker that helps students review internship and OJT listings for warning signs before they apply.',
    detail:
      'A deterministic rule engine scores each listing from 0 to 100 across eight warning signs, including fees before starting, requests for IDs or bank details, urgency pressure, and chat-only hiring, and highlights the evidence in the text. OpenAI then writes a plain-language explanation using structured outputs, with a rules-only fallback when the AI is unavailable.',
    stack: 'React · TypeScript · OpenAI · Supabase · Vercel',
    image: '/projects/hunch-showcase.webp',
    highlights: [
      'Paste a listing or a public link; links are fetched server-side with limits on redirects, page size, and private addresses',
      'Risk score, evidence highlights, and a checklist, saved privately to a Supabase account and comparable side by side',
      'Rate-limited Vercel functions and a Vitest suite covering the rule engine, API, and link extractor',
    ],
    demoUrl: 'https://hunchh.vercel.app/',
    repoUrl: 'https://github.com/robertterquin/Hunch',
  },
  {
    id: 'hapag',
    number: '05',
    title: 'Hapag',
    tag: 'AI CULINARY ASSISTANT',
    category: 'web',
    description: 'Filipino cooking assistant that turns the ingredients you already have into ulam ideas with recipes, peso cost estimates, and substitutions.',
    detail:
      'Ingredients typed in English, Tagalog, or Taglish are normalized and matched against a catalog of Filipino dishes, then OpenAI, called through a Supabase Edge Function, writes full recipes grounded in those matches. Each result includes Filipino measurements, step-by-step instructions, serving-size scaling, dietary notes, and a per-ingredient cost breakdown.',
    stack: 'React · TypeScript · OpenAI · Supabase',
    image: '/projects/hapag-showcase.webp',
    highlights: [
      'Budget modes for meals under ₱100 or ₱200, with missing ingredients turned into a priced shopping list',
      'Full-screen cooking mode with step timers, read-aloud steps, and a screen that stays awake',
      'Saved recipes, kusina staples synced to your account, and leftover-to-new-meal suggestions',
    ],
    demoUrl: 'https://hapagg.vercel.app/',
    repoUrl: 'https://github.com/robertterquin/Hapag',
  },
  {
    id: 'bakas',
    number: '06',
    title: 'Bakas',
    tag: 'CIVIC TECH & ROAD RADAR',
    category: 'web',
    description: 'Crowdsourced road hazard map with no-login 1-tap reporting, offline-first sync, and hazards that expire unless the community confirms them.',
    detail:
      'An offline-first PWA that queues reports in IndexedDB and syncs them in the background once back online. Supabase and PostGIS load only hazards within 5 km, and each hazard type has its own lifetime, from 24 hours for road obstructions to 7 days for potholes, extended by community upvotes and cleared by resolve votes.',
    stack: 'React · TypeScript · Supabase · PostGIS · Leaflet',
    image: '/projects/bakas-showcase.webp',
    highlights: [
      '1-tap reporting with no account, plus a 15-meter rule that prompts an upvote instead of a duplicate pin',
      'Works in dead zones with an IndexedDB queue, background sync, and cached CartoDB Dark Matter map tiles',
      'Self-cleaning map with per-category expiry, upvote extensions, and community "mark resolved" decay',
    ],
    demoUrl: 'https://bakass.vercel.app/',
    repoUrl: 'https://github.com/robertterquin/Bakas',
  },
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    code: '01',
    category: 'Mobile Systems & Architecture',
    focus: 'Cross-platform engineering, offline-first synchronization, and state management.',
    tools: [
      { name: 'Flutter & Dart' },
      { name: 'Android Studio & SDKs' },
      { name: 'SQLite' },
      { name: 'Riverpod & Provider' },
      { name: 'Maps & Geolocation' },
    ],
  },
  {
    code: '02',
    category: 'Web & Full-Stack Interfaces',
    focus: 'Component architecture, strict typing, and high-performance rendering.',
    tools: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'JavaScript (ESNext)' },
      { name: 'Tailwind CSS' },
      { name: 'Next.js & Vite' },
      { name: 'HTML5 & Modern CSS' },
      { name: 'PWA & IndexedDB' },
      { name: 'Leaflet' },
    ],
  },
  {
    code: '03',
    category: 'Backend & Data Infrastructure',
    focus: 'Relational schema modeling, REST APIs, AI integrations, and secure authentication.',
    tools: [
      { name: 'Node.js & Express' },
      { name: 'MongoDB' },
      { name: 'Supabase & Firebase' },
      { name: 'PostgreSQL & PostGIS' },
      { name: 'OpenAI & Groq APIs' },
      { name: 'Cloudinary' },
      { name: 'Vercel' },
    ],
  },
  {
    code: '04',
    category: 'Core Engineering & Security',
    focus: 'Defensive cybersecurity standards, version control, and automated testing.',
    tools: [
      { name: 'Java' },
      { name: 'Python' },
      { name: 'C Programming' },
      { name: 'Cybersecurity Fundamentals' },
      { name: 'Git & GitHub' },
      { name: 'Vitest' },
    ],
  },
];

export const credentialsData: CredentialItem[] = [
  {
    index: '01',
    title: 'HackForGov 2025: CALABARZON',
    institution: '2nd Runner-Up · DICT Cybersecurity Challenge',
    year: '2025',
    image: '/certificates/hackforgov-2025.jpg',
    type: 'Award',
  },
  {
    index: '02',
    title: 'National Programming Challenge 2025',
    institution: 'CodeChum National Programming Competition',
    year: '2025',
    image: '/certificates/codechum-2025.webp',
    type: 'Award',
  },
  {
    index: '03',
    title: 'National Programming Challenge 2024',
    institution: 'CodeChum National Programming Competition',
    year: '2024',
    image: '/certificates/codechum-2024.webp',
    type: 'Award',
  },
  {
    index: '04',
    title: 'IT Specialist in Databases',
    institution: 'Certiport Industry Certification',
    year: '2025',
    image: '/certificates/it-specialist-databases.webp',
    type: 'Certification',
  },
  {
    index: '05',
    title: 'IT Specialist in Cybersecurity',
    institution: 'Certiport Industry Certification',
    year: '2026',
    image: '/certificates/cybersecurity-specialist.webp',
    type: 'Certification',
  },
  {
    index: '06',
    title: 'HTML and CSS Specialist',
    institution: 'Certiport Web Standards Certification',
    year: '2026',
    image: '/certificates/html-css-specialist.webp',
    type: 'Certification',
  },
  {
    index: '07',
    title: 'Oracle Java Foundations',
    institution: 'Oracle Certified Foundations Associate',
    year: '2024',
    image: '/certificates/oracle-java-foundations.webp',
    type: 'Certification',
  },
];

export const timelineData: TimelineEvent[] = [
  {
    role: 'Mobile & Web Developer',
    organization: 'Freelance',
    period: '2024 — Present',
  },
  {
    role: 'BS Information Technology',
    organization: 'St. Dominic College of Asia',
    period: '2023 — 2027',
  },
];
