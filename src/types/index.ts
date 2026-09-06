export type Theme = 'night' | 'day';

export interface PersonalData {
  name: string;
  monogram: string;
  role: string;
  focus: string;
  location: string;
  timezone: string;
  coordinates: string;
  availability: string;
  shortBio: string;
  email: string;
  phone: string;
  phoneRaw: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  status: string;
  year: string;
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
  metrics?: string;
  demoUrl: string;
  repoUrl: string;
}

export interface CapabilityTool {
  name: string;
  isCertified?: boolean;
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
}
