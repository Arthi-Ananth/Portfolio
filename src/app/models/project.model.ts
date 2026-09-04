export type ProjectGroup =
  | 'full-application'
  | 'dashboard'
  | 'backend'
  | 'professional';

export type LinkKind = 'live' | 'source' | 'case-study';

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  url: string;
}

export interface ProjectShot {
  /** Path under assets/screenshots, or empty when a schematic is drawn instead. */
  src?: string;
  alt: string;
  /** When true the UI renders a stylised wireframe schematic, not a photo. */
  schematic?: boolean;
  frame?: 'browser' | 'device' | 'plain';
}

export interface CaseStudySection {
  heading: string;
  body: string;
  points?: string[];
}

export interface Project {
  slug: string;
  name: string;
  group: ProjectGroup;
  featured: boolean;
  year: string;
  /** One-line product statement. */
  statement: string;
  role: string;
  /** Canonical tech tags — must line up with skills.data ids. */
  stack: string[];
  links: ProjectLink[];
  shots: ProjectShot[];
  /** Short teaser for cards / universe. */
  summary: string;
  /** Long-form case study, rendered on /work/:slug. */
  caseStudy?: {
    problem: string;
    solution: string;
    features: string[];
    engineering: CaseStudySection[];
    learned: string[];
  };
  /** Accent hue rotation for visual variety (0–360). */
  hue: number;
}
