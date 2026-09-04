import { JourneyStop } from '@models/journey.model';

export const JOURNEY: JourneyStop[] = [
  {
    id: 'bca',
    kind: 'education',
    period: '2018 — 2021',
    title: 'BCA, 80%',
    place: 'Aries Arts & Science College for Women, Chidambaram',
    detail: 'Bachelor of Computer Applications. Where the programming actually clicked.',
  },
  {
    id: 'mca',
    kind: 'education',
    period: '2022 — 2024',
    title: 'MCA, 86%',
    place: 'Quaid-E-Millath Government College for Women (Autonomous), Chennai',
    detail: 'Master of Computer Applications — deeper into software engineering and the web stack.',
  },
  {
    id: 'bornwizh',
    kind: 'work',
    period: 'Nov 2024 — Present',
    title: 'Frontend Developer',
    place: 'BornWizh Technologies, Chidambaram',
    detail: 'Web Application Developer on an education platform, working across Angular modules with backend and QA.',
    points: [
      'Angular modules built and maintained to a shared standard',
      'Responsive dashboards, listing and management panels',
      'REST integration, auth flows and role-based access control',
      'Reusable components, injectable services, route guards, RxJS',
    ],
  },
  {
    id: 'builds-2025',
    kind: 'build',
    period: '2025',
    title: 'Figma Dashboard',
    detail: 'Rebuilt a Figma admin design in Angular 18 standalone components — pixel-accurate, with Chart.js and a structure ready for real data.',
  },
  {
    id: 'builds-2026',
    kind: 'build',
    period: '2026',
    title: 'A run of full builds',
    detail: 'Student Management System (full-stack Angular + Express/Mongo), KnowledgeNexus help centre, Finance Dashboard UI and a full-stack todo — auth, dashboards, data viz.',
    points: [
      'Student Management System — role-based, full-stack',
      'KnowledgeNexus — component-driven help centre',
      'Finance Dashboard UI — Recharts + motion',
      'Minimal Efficient ToDo — JWT, protected CRUD',
    ],
  },
  {
    id: 'now',
    kind: 'now',
    period: 'Now',
    title: 'Open to roles',
    detail: 'Looking for frontend, Angular or UI developer work where the frontend is treated as product, not decoration.',
  },
];
