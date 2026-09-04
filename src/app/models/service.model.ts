export interface ServiceItem {
  id: string;
  title: string;
  build: string;
  useCase: string;
  tech: string[];
  /** slug of a representative project, or null for proprietary work. */
  exampleSlug: string | null;
  exampleLabel: string;
}
