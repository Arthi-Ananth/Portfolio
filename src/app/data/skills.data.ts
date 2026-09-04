import { Skill, SkillGroup } from '@models/skill.model';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'core-frontend',
    label: 'Core frontend',
    blurb: 'The everyday tools — the ones every project here is built with.',
  },
  {
    id: 'angular-spa',
    label: 'Angular & SPA',
    blurb: 'How I structure single-page applications that grow past a few screens.',
  },
  {
    id: 'app-development',
    label: 'Application development',
    blurb: 'Making the frontend talk to a backend and behave under real data.',
  },
  {
    id: 'ui-styling',
    label: 'UI & styling',
    blurb: 'Layout, responsiveness and the visual layer.',
  },
  {
    id: 'backend',
    label: 'Backend collaboration',
    blurb: 'Enough Node to build the API my frontend needs and work with backend devs.',
  },
  {
    id: 'tools-deploy',
    label: 'Tools & deployment',
    blurb: 'Version control and getting things onto the internet.',
  },
];

export const SKILLS: Skill[] = [
  // core-frontend
  { id: 'angular', label: 'Angular', group: 'core-frontend', weight: 3, note: 'Primary framework. Standalone components, routing, guards, DI, RxJS.' },
  { id: 'typescript', label: 'TypeScript', group: 'core-frontend', weight: 3, note: 'Typed models and service contracts across every app.' },
  { id: 'javascript', label: 'JavaScript', group: 'core-frontend', weight: 3, note: 'ES2020+, the language under everything including the React builds.' },
  { id: 'html', label: 'HTML5', group: 'core-frontend', weight: 3, note: 'Semantic structure, landmarks, accessible forms.' },
  { id: 'scss', label: 'CSS / SCSS', group: 'core-frontend', weight: 3, note: 'Design tokens, custom properties, no framework required.' },

  // angular-spa
  { id: 'standalone', label: 'Standalone components', group: 'angular-spa', weight: 2, note: 'Module-free architecture, lazy by default.' },
  { id: 'routing', label: 'Routing & guards', group: 'angular-spa', weight: 3, note: 'Route-level access control for role-based sessions.' },
  { id: 'lazy', label: 'Lazy loading', group: 'angular-spa', weight: 2, note: 'Split bundles by feature and route.' },
  { id: 'forms', label: 'Reactive forms', group: 'angular-spa', weight: 3, note: 'Typed form groups, custom validators, dynamic controls.' },
  { id: 'rxjs', label: 'RxJS', group: 'angular-spa', weight: 2, note: 'Observables for async data streams and live updates.' },
  { id: 'signals', label: 'Signals', group: 'angular-spa', weight: 2, note: 'Signal-based state and change detection in newer builds.' },
  { id: 'cli', label: 'Angular CLI', group: 'angular-spa', weight: 2, note: 'Schematics, build targets, gh-pages deploys.' },

  // app-development
  { id: 'rest', label: 'REST API integration', group: 'app-development', weight: 3, note: 'HttpClient, interceptors, error and loading states.' },
  { id: 'auth', label: 'Auth & JWT', group: 'app-development', weight: 3, note: 'Token handling, refresh, protected routes.' },
  { id: 'rbac', label: 'Role-based access', group: 'app-development', weight: 3, note: 'Admin / teacher / student style permission models.' },
  { id: 'state', label: 'State & data flow', group: 'app-development', weight: 2, note: 'Service state, Context in React, predictable updates.' },
  { id: 'charts', label: 'Charts & data viz', group: 'app-development', weight: 2, note: 'Chart.js and Recharts for analytics screens.' },

  // ui-styling
  { id: 'responsive', label: 'Responsive design', group: 'ui-styling', weight: 3, note: 'Flexbox, Grid, container-aware layouts, mobile-first.' },
  { id: 'a11y', label: 'Accessibility', group: 'ui-styling', weight: 2, note: 'Focus management, ARIA where needed, reduced motion.' },
  { id: 'tailwind', label: 'Tailwind CSS', group: 'ui-styling', weight: 2, note: 'Used across the React projects.' },
  { id: 'bootstrap', label: 'Bootstrap', group: 'ui-styling', weight: 1, note: 'Grid and components for the Figma dashboard build.' },
  { id: 'motion', label: 'UI animation', group: 'ui-styling', weight: 2, note: 'GSAP, Framer Motion, CSS transforms — with a purpose.' },
  { id: 'figma', label: 'Figma to code', group: 'ui-styling', weight: 2, note: 'Turning a design file into pixel-accurate, responsive UI.' },

  // backend
  { id: 'node', label: 'Node.js', group: 'backend', weight: 2, note: 'Runtime for the APIs behind my full-stack projects.' },
  { id: 'express', label: 'Express', group: 'backend', weight: 2, note: 'REST routes, middleware, controllers.' },
  { id: 'mongo', label: 'MongoDB / Mongoose', group: 'backend', weight: 2, note: 'Schemas, relations, queries for app data.' },
  { id: 'react', label: 'React', group: 'backend', weight: 2, note: 'Secondary framework — Vite, hooks, Context, three shipped builds.' },

  // tools-deploy
  { id: 'git', label: 'Git & GitHub', group: 'tools-deploy', weight: 3, note: 'Branching, PRs, code review, day-to-day workflow.' },
  { id: 'vscode', label: 'VS Code', group: 'tools-deploy', weight: 2, note: 'Primary editor.' },
  { id: 'ghpages', label: 'GitHub Pages', group: 'tools-deploy', weight: 2, note: 'Static deploys with base-href and SPA fallback.' },
  { id: 'vercel', label: 'Vercel', group: 'tools-deploy', weight: 1, note: 'Hosting for the finance dashboard build.' },
  { id: 'postman', label: 'REST clients', group: 'tools-deploy', weight: 2, note: 'Postman / Thunder Client for exercising APIs.' },
];
