export type SkillGroupId =
  | 'core-frontend'
  | 'angular-spa'
  | 'app-development'
  | 'ui-styling'
  | 'backend'
  | 'tools-deploy';

export interface Skill {
  id: string;
  label: string;
  group: SkillGroupId;
  /** Short note shown when the tech is inspected. */
  note: string;
  /** Confidence weight, drives node size only — never shown as a percentage. */
  weight: 1 | 2 | 3;
}

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  blurb: string;
}
