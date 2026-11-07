import type {
  PersonalData,
  Project,
  CapabilityGroup,
  CredentialItem,
  TimelineEvent,
} from '../types';

export const personalData: PersonalData = {
  name: 'Robert Terquin Laqui',
  role: 'Full-Stack Developer',
  specialty: 'Web Platforms & Cross-Platform Mobile',
  location: 'Philippines',
  shortBio:
    'I build cross-platform apps end to end, from Flutter mobile apps to offline-first PWAs and AI-assisted web tools, backed by Supabase and Firebase. I care about clean code and interfaces that feel effortless to use.',
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
    story: {
      problem:
        'Cancer information, treatment tracking, and peer support are scattered across different apps and sites.',
      approach:
        'One Flutter app with prevention guides, a personal journey tracker, and a community Q&A forum, with reminders and a live news feed.',
      takeaway:
        'Caching journey data on the device and syncing it to Supabase, plus scheduling local notifications that fire without a connection.',
    },
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
    id: 'spendly',
    number: '02',
    title: 'Spendly',
    tag: 'FINTECH & BUDGET',
    category: 'mobile',
    description: 'Personal finance tracker with multiple accounts, category charts, and an AI assistant that manages transactions from plain-language chat.',
    detail:
      'The assistant runs on Groq\'s Llama 3.3 70B. Each message is sent with the user\'s accounts and recent transactions, and the model replies with a structured JSON action (add, edit, or delete a transaction, set a balance, or transfer between accounts) that the app then applies. Built feature-first with Riverpod and Supabase.',
    story: {
      problem:
        'Logging every expense through forms is tedious, so tracking tends to quietly stop.',
      approach:
        'Describe what happened in plain language, like spent 200 on food, and an AI assistant applies it to the right account.',
      takeaway:
        'Getting an LLM to reply with strict JSON actions the app can safely apply, using Llama 3.3 70B on Groq.',
    },
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
    id: 'chainly',
    number: '03',
    title: 'Chainly',
    tag: 'CYCLING & MAINTENANCE',
    category: 'mobile',
    description: 'Bike maintenance companion that tracks rides, service history, and mileage-based reminders across a multi-bike garage.',
    detail:
      'Logged rides add to each bike\'s total mileage, which is checked against built-in service intervals, from chain lubrication every 100 km to chain replacement around 2,500 km, to raise usage-based and time-based reminders. Built with Flutter, Riverpod, and Supabase, with Firebase Cloud Messaging and local notifications for service alerts.',
    story: {
      problem:
        'Bike parts wear out by mileage, but maintenance is usually tracked from memory, or not at all.',
      approach:
        'Each logged ride adds to a bike\'s total distance, which is checked against service intervals, from chain lube at 100 km to a new chain near 2,500 km.',
      takeaway:
        'Turning raw ride distance into usage-based and time-based reminders, delivered through Firebase Cloud Messaging and local notifications.',
    },
    stack: 'Flutter · Dart · Riverpod · Supabase · Firebase',
    image: '/projects/chainly-showcase.png',
    highlights: [
      'Usage-based (km) and time-based maintenance reminders driven by recommended service intervals',
      'Service history log with costs, categorized by chain, brakes, tires, and general service',
      'Multi-bike garage with per-bike mileage, ride logging by distance and duration, and cycling tips',
    ],
    demoUrl: 'https://github.com/robertterquin/Chainly',
    repoUrl: 'https://github.com/robertterquin/Chainly',
  },
  {
    id: 'ridetrack',
    number: '04',
    title: 'RideTrack',
    tag: 'CYCLING & GPS TRACKING',
    category: 'mobile',
    description: 'Cycling tracker that records rides with live GPS, plans bike-friendly routes, and tracks weekly and monthly goals.',
    detail:
      'Rides are recorded from a high-accuracy GPS stream that updates every 5 meters, then saved to Firestore with the full route, distance, duration, and average speed. Routes come from OSRM\'s bicycle profile, which avoids expressways, and calories are estimated with a speed-based MET formula and the rider\'s weight. Built with Flutter, Firebase, and OpenStreetMap.',
    story: {
      problem:
        'Cyclists want to record rides, plan routes, and follow goals without juggling several apps.',
      approach:
        'A Flutter app that logs a GPS route every 5 meters to Firestore, plans bike routes with OSRM, and tracks weekly or monthly goals.',
      takeaway:
        'Working with live GPS streams and free OpenStreetMap data, and estimating calories from speed and weight with a MET formula.',
    },
    stack: 'Flutter · Dart · Firebase · OpenStreetMap',
    image: '/projects/ridetrack-showcase.png',
    highlights: [
      'Live ride recording on an OpenStreetMap map, with address search and commute or recreation ride types',
      'Distance, ride-count, and calorie goals set per week or per month',
      'Weekly and all-time statistics including total distance, time, calories, averages, and longest ride',
    ],
    demoUrl: 'https://github.com/robertterquin/RideTrack',
    repoUrl: 'https://github.com/robertterquin/RideTrack',
  },
  {
    id: 'hunch',
    number: '05',
    title: 'Hunch',
    tag: 'AI SECURITY & EDTECH',
    category: 'web',
    description: 'Scam checker that helps students review internship and OJT listings for warning signs before they apply.',
    detail:
      'A deterministic rule engine scores each listing from 0 to 100 across eight warning signs, including fees before starting, requests for IDs or bank details, urgency pressure, and chat-only hiring, and highlights the evidence in the text. OpenAI then writes a plain-language explanation using structured outputs, with a rules-only fallback when the AI is unavailable.',
    story: {
      problem:
        'Students looking for internships and OJT run into fake listings that ask for fees or ID details up front.',
      approach:
        'A rule engine scores each listing across eight warning signs and highlights the evidence, and OpenAI only writes the plain-language explanation.',
      takeaway:
        'Keeping the score deterministic and tested, with AI as the explainer and a rules-only fallback when it is unavailable.',
    },
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
    number: '06',
    title: 'Hapag',
    tag: 'AI CULINARY ASSISTANT',
    category: 'web',
    description: 'Filipino cooking assistant that turns the ingredients you already have into ulam ideas with recipes, peso cost estimates, and substitutions.',
    detail:
      'Ingredients typed in English, Tagalog, or Taglish are normalized and matched against a catalog of Filipino dishes, then OpenAI, called through a Supabase Edge Function, writes full recipes grounded in those matches. Each result includes Filipino measurements, step-by-step instructions, serving-size scaling, dietary notes, and a per-ingredient cost breakdown.',
    story: {
      problem:
        'Deciding what to cook from what is already in the kitchen, on a budget, takes more effort than it should.',
      approach:
        'Typed ingredients in English, Tagalog, or Taglish are matched to a catalog of Filipino dishes, then OpenAI writes recipes with peso costs from those matches.',
      takeaway:
        'Grounding AI output in a real dish catalog through a Supabase Edge Function, so recipes stay tied to dishes that exist.',
    },
    stack: 'React · TypeScript · OpenAI · Supabase',
    image: '/projects/hapag-showcase.webp',
    highlights: [
      'Budget modes for meals under ₱100 or ₱200, with missing ingredients turned into a priced shopping list',
      'Full-screen cooking mode with step timers, read-aloud steps, and a screen that stays awake',
      'Saved recipes, kusina staples synced to your account, and leftover-to-new-meal suggestions',
    ],
    demoUrl: 'https://hapag.site',
    repoUrl: 'https://github.com/robertterquin/Hapag',
  },
  {
    id: 'bakas',
    number: '07',
    title: 'Bakas',
    tag: 'CIVIC TECH & ROAD RADAR',
    category: 'web',
    description: 'Crowdsourced road hazard map with no-login 1-tap reporting, offline-first sync, and hazards that expire unless the community confirms them.',
    detail:
      'An offline-first PWA that queues reports in IndexedDB and syncs them in the background once back online. Supabase and PostGIS load only hazards within 5 km, and each hazard type has its own lifetime, from 24 hours for road obstructions to 7 days for potholes, extended by community upvotes and cleared by resolve votes.',
    story: {
      problem:
        'Many people see road hazards, but reporting often needs an account and a signal, and old reports linger after the hazard is gone.',
      approach:
        'One-tap reporting with no login, an offline queue that syncs later, and hazards that expire per type unless the community confirms them.',
      takeaway:
        'Offline-first sync with an IndexedDB queue and background sync, and PostGIS queries that load only hazards within 5 km.',
    },
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
  {
    id: 'skillora',
    number: '08',
    title: 'Skillora',
    tag: 'AI MICRO-LEARNING',
    category: 'web',
    description: 'Micro-learning studio where an AI owl breaks any skill, from guitar to Russian to knife sharpening, into step-by-step practice plans.',
    detail:
      'Learners ask Archimedes, the learning owl, for any skill by chat or microphone, and OpenAI GPT-4o-mini deconstructs it into a curriculum with realistic time horizons and vetted resources that lands in their Studio. Built on Next.js 14 and Supabase with row-level security, a per-learner daily AI limit, and a Supabase Edge Function that sends Resend email reminders and weekly recaps.',
    story: {
      problem:
        'Learning a new skill means piecing together plans and resources from scattered sources, then guessing what to practice.',
      approach:
        'Archimedes the owl turns any skill into a short ordered curriculum, then drives practice with flashcards, a technique coach, and voice grading.',
      takeaway:
        'Running several OpenAI features, GPT-4o-mini and Whisper, behind per-learner daily limits and Supabase row-level security.',
    },
    stack: 'Next.js · TypeScript · Tailwind · Supabase · OpenAI',
    image: '/projects/skillora-showcase.png',
    highlights: [
      '3D flashcards with diagram aids and spoken pronunciation, plus a checklist mode for step-by-step practice',
      'Technique coach, Whisper-graded pronunciation, mnemonic generator, and a daily 15-minute workout built from enrolled skills',
      'AI-generated assessments that award certificates with shareable public links, plus streaks and practice stats',
    ],
    demoUrl: 'https://skillora-studio.vercel.app/',
  },
  {
    id: 'suri',
    number: '09',
    title: 'Suri',
    tag: 'OFFLINE AI & SCAM DEFENSE',
    category: 'mobile',
    award: 'PocketDevs People\'s Choice Award · Top 15 of 281 projects, AppBuildersPH Hackathon 2026',
    description: 'Offline iPhone app that checks messages for scam warning signs on the device and shows the exact words behind each warning.',
    detail:
      'Built with my team in under 24 hours for the AppBuildersPH Hackathon. Suri reads a screenshot or pasted message with Apple Vision, runs a small Qwen3 1.7B model through llama.cpp on the phone, and quotes the exact words behind each warning, so nothing is uploaded. Incoming texts are checked automatically through App Intents and iOS Shortcuts.',
    story: {
      problem:
        'Scammers use SMS to reach people, so the tools to fight back should work the same way, without needing the internet.',
      approach:
        'An on-device model reads the message and quotes the exact words behind each warning, then drafts a short note to a trusted family member.',
      takeaway:
        'Running a small language model on an iPhone with llama.cpp, and reading screenshots with Apple Vision text recognition.',
    },
    stack: 'Swift · SwiftUI · llama.cpp · Qwen3 1.7B · Apple Vision · App Intents · iOS Shortcuts',
    image: '/projects/suri-showcase.png',
    highlights: [
      'Choose a screenshot or paste text, then fix any text the reader missed before checking',
      'Each warning quotes the exact words behind it, with a plain what-to-do step that can be read aloud',
      'Private by default: the message stays on the phone, with an optional Ask my family note and a history of checks',
    ],
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
    institution: '5th Place · CodeChum National Programming Competition',
    year: '2025',
    image: '/certificates/codechum-2025.webp',
    type: 'Award',
  },
  {
    index: '03',
    title: 'National Programming Challenge 2024',
    institution: '6th Place · CodeChum National Programming Competition',
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
    role: 'Full-Stack Developer',
    organization: 'Freelance',
    period: '2024 — Present',
  },
  {
    role: 'BS Information Technology',
    organization: 'St. Dominic College of Asia',
    period: '2023 — 2027',
  },
];
