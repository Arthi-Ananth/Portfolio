export const SITE = {
  name: 'Arthi A',
  role: 'Frontend / Angular Developer',
  location: 'Chidambaram, Tamil Nadu',
  tagline: 'Building interfaces people actually understand.',
  intro:
    'I build the front of the product — dashboards, role-based platforms and the screens people use every day. Angular and TypeScript are home base.',
  baseUrl: 'https://arthi-ananth.github.io/Portfolio/',
  resumePath: 'assets/resume/Arthi_A.pdf',
  email: 'arthiananth1101@gmail.com',
  phone: '+918610328781',
  phoneDisplay: '+91 86103 28781',
  github: 'https://github.com/Arthi-Ananth',
  githubHandle: 'Arthi-Ananth',
  // TODO(arthi): replace with your real LinkedIn URL.
  linkedin: 'https://www.linkedin.com/in/arthi-a',
} as const;

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const NAV: NavItem[] = [
  { id: 'hero', label: 'Home', index: '01' },
  { id: 'profile', label: 'Profile', index: '02' },
  { id: 'featured', label: 'Work', index: '03' },
  { id: 'universe', label: 'Universe', index: '04' },
  { id: 'toolkit', label: 'Toolkit', index: '05' },
  { id: 'services', label: 'Services', index: '06' },
  { id: 'journey', label: 'Journey', index: '07' },
  { id: 'lab', label: 'Lab', index: '08' },
  { id: 'contact', label: 'Contact', index: '09' },
];
