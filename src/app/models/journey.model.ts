export type JourneyKind = 'education' | 'work' | 'build' | 'now';

export interface JourneyStop {
  id: string;
  kind: JourneyKind;
  period: string;
  title: string;
  place?: string;
  detail: string;
  points?: string[];
}
