export type ThemeId = 'light' | 'midnight' | 'aurora' | 'ocean' | 'sunset' | 'mono';

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  hint: string;
  /** Three swatch colours for the switcher preview tile. */
  swatch: [string, string, string];
  mode: 'day' | 'night';
}
