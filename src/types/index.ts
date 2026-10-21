export type Theme = 'night' | 'day';

export interface PersonalData {
  name: string;
  role: string;
  specialty: string;
  location: string;
  shortBio: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tag: string;
  category: 'web' | 'mobile' | 'system' | 'tool';
  description: string;
  detail: string;
  stack: string;
  image: string;
  highlights: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface CapabilityTool {
  name: string;
}

export interface CapabilityGroup {
  code: string;
  category: string;
  focus: string;
  tools: CapabilityTool[];
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
  role: string;
  organization: string;
  period: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture?: boolean;
}

export interface GithubApiResponse {
  total?: { [key: string]: number };
  contributions?: ContributionDay[];
}

