import { Project } from '@models/project.model';

/**
 * Every fact here is drawn from Arthi's public GitHub repositories and resume.
 * No live URL or feature is listed that could not be verified.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'student-management-system',
    name: 'Student Management System',
    group: 'full-application',
    featured: true,
    year: '2026',
    hue: 250,
    statement: 'A role-based platform where an institute runs admissions, courses and people from one place.',
    role: 'Solo — Angular frontend, REST API and the Express/Mongo backend.',
    stack: ['angular', 'typescript', 'routing', 'forms', 'rxjs', 'rest', 'auth', 'rbac', 'charts', 'node', 'express', 'mongo'],
    links: [
      { kind: 'live', label: 'Live demo', url: 'https://arthi-ananth.github.io/student-management-frontend/' },
      { kind: 'source', label: 'Frontend source', url: 'https://github.com/Arthi-Ananth/student-management-frontend' },
      { kind: 'source', label: 'Backend source', url: 'https://github.com/Arthi-Ananth/student-management-backend' },
    ],
    shots: [
      { src: 'screenshots/student-management-1.webp', alt: 'Student Management System dashboard', frame: 'browser' },
      { src: 'screenshots/student-management-2.webp', alt: 'Student Management System login screen', frame: 'browser' },
    ],
    summary:
      'Angular SPA plus an Express/MongoDB API. JWT auth and route guards drive separate admin, teacher and student dashboards over shared course and user data.',
    caseStudy: {
      problem:
        'Small institutes juggle student records, course lists and staff access across spreadsheets and disconnected tools. Everyone sees everything, or no one can find anything.',
      solution:
        'One application with three faces. A single Angular SPA authenticates against an Express API, decodes the JWT, and routes each person to the dashboard their role is allowed to see — admin, teacher or student — over one shared data layer.',
      features: [
        'JWT login with token decoding and protected routes',
        'Route guards that gate whole dashboard trees by role',
        'Admin view: manage users and courses',
        'Teacher and student views scoped to their own data',
        'Course and user services with typed models',
        'Chart.js analytics on the dashboard',
        'Email flows on the backend via Nodemailer',
        'Password hashing with bcrypt',
      ],
      engineering: [
        {
          heading: 'Access control at the router',
          body: 'Rather than hiding buttons, permission is enforced where navigation happens. A guard reads the decoded token and blocks the route before the component ever loads, so the three dashboards stay genuinely separate.',
        },
        {
          heading: 'Thin services, typed contracts',
          body: 'api.service centralises the HttpClient calls; auth, course and user services layer intent on top. Every response maps to an interface, so a shape change surfaces at compile time, not in production.',
          points: ['api.service.ts — transport', 'auth.service.ts — session', 'course.service.ts / user.service.ts — domain'],
        },
        {
          heading: 'One backend, real auth',
          body: 'The Express 5 API uses Mongoose models for users and courses, bcrypt for password storage, JSON Web Tokens for sessions and Nodemailer for account email — a full auth surface rather than a mock.',
        },
      ],
      learned: [
        'Designing a permission model before writing screens saves a rewrite later.',
        'Guards are the honest place to enforce access; template *ngIf is only cosmetics.',
        'Owning both sides of the API makes the contract easier to keep clean.',
      ],
    },
  },

  {
    slug: 'knowledge-nexus',
    name: 'KnowledgeNexus',
    group: 'full-application',
    featured: true,
    year: '2026',
    hue: 160,
    statement: 'A help centre that stays fast and findable as the article count grows.',
    role: 'Solo — component system, layout and content model.',
    stack: ['react', 'javascript', 'tailwind', 'responsive', 'state', 'a11y'],
    links: [
      { kind: 'live', label: 'Live demo', url: 'https://arthi-ananth.github.io/KnowledgeNexus/' },
      { kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/KnowledgeNexus' },
    ],
    shots: [{ src: 'screenshots/knowledge-nexus-1.webp', alt: 'KnowledgeNexus help centre home', frame: 'browser' }],
    summary:
      'React and Tailwind help-centre UI. A small set of reusable primitives — Card, Modal, Sidebar, Form — renders a data-driven article catalogue with search and sidebar navigation.',
    caseStudy: {
      problem:
        'Documentation sites tend to start clean and rot fast — every new article is a new bespoke page, and the layout drifts.',
      solution:
        'A component system, not a pile of pages. Six reusable primitives (Button, Card, Form, Header, Modal, Sidebar) compose every screen, and articles live in a single data file so adding content never touches layout code.',
      features: [
        'Reusable primitive components across the whole UI',
        'Data-driven article catalogue (articles.js)',
        'Search over article content',
        'Persistent sidebar navigation',
        'Modal detail view',
        'Custom hooks and shared layouts',
        'Responsive from phone to desktop',
      ],
      engineering: [
        {
          heading: 'Content as data',
          body: 'Articles are a typed array, not JSX. The catalogue, search and detail views all read the same source, so the site scales by editing one file.',
        },
        {
          heading: 'Layout / page / component split',
          body: 'layouts hold the shell, pages compose sections, components stay generic. Nothing reaches across that boundary, which keeps each piece swappable.',
        },
      ],
      learned: [
        'A documentation site lives or dies by its information architecture, not its styling.',
        'Six good primitives beat sixty one-off components.',
      ],
    },
  },

  {
    slug: 'finance-dashboard',
    name: 'Finance Dashboard UI',
    group: 'dashboard',
    featured: true,
    year: '2026',
    hue: 190,
    statement: 'An analytics dashboard where the numbers animate into place instead of just appearing.',
    role: 'Solo — data-viz UI and client-side state.',
    stack: ['react', 'javascript', 'charts', 'motion', 'tailwind', 'state', 'responsive'],
    links: [
      { kind: 'live', label: 'Live demo', url: 'https://finance-dashboard-ui-orpin.vercel.app' },
      { kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/Finance-Dashboard-UI-' },
    ],
    shots: [{ src: 'screenshots/finance-dashboard-1.webp', alt: 'Finance Dashboard UI overview', frame: 'browser' }],
    summary:
      'React 19 dashboard with Recharts and Framer Motion. A single finance context feeds every chart and card, and transitions are motion-designed rather than default.',
    caseStudy: {
      problem:
        'Most dashboard UIs dump every chart on screen at once and call it done. Nothing guides the eye, and state is scattered across components.',
      solution:
        'One FinanceContext owns the data; charts and stat cards subscribe to it. Framer Motion stages the entrance so the layout reads in order, and Recharts handles the plotting.',
      features: [
        'Global finance state via React Context',
        'Recharts line, area and bar visualisations',
        'Framer Motion staged entrance and transitions',
        'Stat cards with trend direction',
        'Lucide icon set',
        'Responsive grid that reflows on small screens',
      ],
      engineering: [
        {
          heading: 'Single source of truth',
          body: 'FinanceContext.jsx holds the numbers once. Every widget is a pure reader — no prop-drilling, no duplicated fetch logic, and theming or data swaps happen in one place.',
        },
        {
          heading: 'Motion with intent',
          body: 'Animation is used to sequence information: header, then KPIs, then charts. It is a reading order, not decoration, and it respects reduced-motion.',
        },
      ],
      learned: [
        'Deciding what animates — and in what order — is a design decision, not a styling afterthought.',
        'Context is enough state management for a dashboard this size; reaching for more would be noise.',
      ],
    },
  },

  {
    slug: 'figma-dashboard',
    name: 'Figma Dashboard',
    group: 'dashboard',
    featured: true,
    year: '2025',
    hue: 25,
    statement: 'A Figma admin design rebuilt in Angular, close enough that you have to look twice.',
    role: 'Solo — Figma-to-Angular implementation (interview build).',
    stack: ['angular', 'typescript', 'standalone', 'bootstrap', 'charts', 'responsive', 'figma'],
    links: [
      { kind: 'live', label: 'Live demo', url: 'https://arthi-ananth.github.io/dashboard-ui/' },
      { kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/dashboard-ui' },
    ],
    shots: [{ src: 'screenshots/figma-dashboard-1.webp', alt: 'Figma Dashboard Angular recreation', frame: 'browser' }],
    summary:
      'Angular 18 standalone components recreating a Figma admin dashboard — sidebar, breadcrumb header, stat cards, line and donut charts, data table and an activity panel, matched on colour, spacing and type.',
    caseStudy: {
      problem:
        'The brief was a single Figma frame and a deadline: rebuild it in Angular, pixel-accurate, with a structure that would survive real data later.',
      solution:
        'Broke the frame into standalone components — sidebar, header, stat cards, chart sections, table, right panel — matched the Inter type scale and spacing, and wired Chart.js for the line and donut visualisations. All content comes from mock data shaped like a future API response.',
      features: [
        'Sidebar with section labels, active states and submenus',
        'Header with breadcrumbs and a search field with shortcut hint',
        'Stat cards for orders, sales, profit and growth with trend indicators',
        'Line chart (this year vs last) and a spendings donut',
        'Traffic-by-source progress bars',
        'Product status table with custom badge styling',
        'Right panel: notifications, activity, contacts',
        'Responsive — side panels collapse on smaller screens',
      ],
      engineering: [
        {
          heading: 'Component boundaries first',
          body: 'Every visually distinct block became its own standalone component before any styling. That made the pixel work parallelisable and the result easy to reason about.',
        },
        {
          heading: 'Mock data shaped like an API',
          body: 'Card values and table rows live in typed arrays in the component files, structured the way a real endpoint would return them — so swapping in HttpClient is a change of source, not a rewrite.',
        },
        {
          heading: 'Matching, not eyeballing',
          body: 'Pulled the exact hex values, spacing steps and font sizes from the design rather than approximating, which is what makes a recreation hold up next to the original.',
        },
      ],
      learned: [
        'Pixel-accuracy is mostly discipline about tokens — colour, spacing, type — not clever CSS.',
        'Structuring mock data like the real API keeps "make it look right" and "make it work" from fighting each other.',
      ],
    },
  },

  {
    slug: 'minimal-todo',
    name: 'Minimal Efficient ToDo',
    group: 'full-application',
    featured: true,
    year: '2026',
    hue: 300,
    statement: 'A full-stack task app that stays out of your way — auth, CRUD, and a bit of momentum.',
    role: 'Solo — React + TypeScript frontend and Express/Mongo backend.',
    stack: ['react', 'typescript', 'javascript', 'tailwind', 'rest', 'auth', 'node', 'express', 'mongo', 'responsive'],
    links: [{ kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/ToDo-App' }],
    shots: [{ src: '', alt: 'Minimal Efficient ToDo interface schematic', schematic: true, frame: 'browser' }],
    summary:
      'React + TypeScript client with an Express/MongoDB API. JWT register and login, protected task CRUD, bcrypt-hashed passwords and small gamification touches to keep the list moving.',
    caseStudy: {
      problem:
        'Todo apps are a cliché, which is exactly why they are a good full-stack exercise — auth, protected routes and CRUD with nowhere to hide.',
      solution:
        'A typed React frontend and a clean Express backend. Users register, the password is bcrypt-hashed, a JWT is issued and sent as a Bearer token on every protected task route. Utility functions add light gamification on top of plain task data.',
      features: [
        'Register and login with JWT',
        'Passwords hashed with bcrypt',
        'Bearer token on protected routes',
        'Task CRUD — GET / POST / PUT / DELETE /api/tasks',
        'Home, Login and Signup pages',
        'API service layer on the client',
        'Gamification utilities',
        'Tailwind styling, responsive layout',
      ],
      engineering: [
        {
          heading: 'Clean backend layering',
          body: 'Routes, controllers, middleware, models and db config are each their own folder. Auth middleware validates the token once and everything protected sits behind it.',
        },
        {
          heading: 'A real service layer on the client',
          body: 'Components never call fetch directly — a services module owns the API surface and token attachment, so the UI stays about UI.',
        },
      ],
      learned: [
        'The boring parts — token refresh, error states, 401 handling — are where a full-stack app is actually won.',
        'TypeScript on the client pays for itself the moment the API shape changes.',
      ],
    },
  },

  // ── Backend / API, shown in the universe ──────────────────────
  {
    slug: 'student-api',
    name: 'Student Management API',
    group: 'backend',
    featured: false,
    year: '2026',
    hue: 250,
    statement: 'The Express + MongoDB service behind the student platform.',
    role: 'Solo — API design, auth, data model.',
    stack: ['node', 'express', 'mongo', 'auth', 'rest'],
    links: [{ kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/student-management-backend' }],
    shots: [],
    summary:
      'Express 5 REST API with Mongoose models, JWT sessions, bcrypt password hashing, CORS and Nodemailer email. The backend half of the Student Management System.',
  },

  {
    slug: 'todo-api',
    name: 'ToDo API',
    group: 'backend',
    featured: false,
    year: '2026',
    hue: 300,
    statement: 'A small, tidy Express API for authenticated task data.',
    role: 'Solo — routes, controllers, middleware.',
    stack: ['node', 'express', 'mongo', 'auth', 'rest'],
    links: [{ kind: 'source', label: 'Source', url: 'https://github.com/Arthi-Ananth/ToDo-App' }],
    shots: [],
    summary:
      'Express/Mongoose API with a route–controller–middleware split, JWT auth middleware and full task CRUD. Ships with the Minimal Efficient ToDo frontend.',
  },
];

export interface ProfessionalWork {
  company: string;
  role: string;
  period: string;
  project: string;
  summary: string;
  points: string[];
  stack: string[];
}

/** Proprietary employment work — described, never linked. */
export const PROFESSIONAL_WORK: ProfessionalWork = {
  company: 'BornWizh Technologies',
  role: 'Frontend Developer (Web Application Developer)',
  period: 'Nov 2024 — Present',
  project: 'Education Website Application',
  summary:
    'The day job: building and maintaining modules of an education platform in Angular — dashboards, listing screens and management panels used by different types of users.',
  points: [
    'Multiple Angular modules built and maintained to a shared code standard',
    'Responsive dashboards, listing screens and management panels (HTML5, CSS3, Flexbox, media queries)',
    'REST API integration for dynamic data, auth flows and role-based access control',
    'Reusable components and injectable services for long-term maintainability',
    'Routing, lazy loading and route guards for role-specific sessions',
    'RxJS observables for async data streams and live updates',
    'Debugging and root-cause analysis to bring the defect count down',
    'Day-to-day collaboration with backend developers and QA — stand-ups, code reviews',
  ],
  stack: ['angular', 'typescript', 'rxjs', 'rest', 'rbac', 'routing', 'lazy', 'responsive', 'git'],
};

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const PRERENDER_SLUGS = PROJECTS.filter((p) => p.featured).map((p) => p.slug);
