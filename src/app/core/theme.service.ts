import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ThemeId } from '@models/theme.model';
import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY } from '@data/themes.data';
import { isBrowser, readStorage, writeStorage } from './platform';

const VALID = new Set<ThemeId>(THEMES.map((t) => t.id));

function isTheme(value: string | null): value is ThemeId {
  return !!value && VALID.has(value as ThemeId);
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly browser = isBrowser();

  private readonly _theme = signal<ThemeId>(this.initial());
  readonly theme = this._theme.asReadonly();
  readonly themes = THEMES;

  readonly meta = computed(() => THEMES.find((t) => t.id === this._theme())!);
  readonly mode = computed(() => this.meta().mode);

  private initial(): ThemeId {
    if (!this.browser) return DEFAULT_THEME as ThemeId;
    const stored = readStorage(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : (DEFAULT_THEME as ThemeId);
  }

  set(id: ThemeId): void {
    if (!VALID.has(id) || id === this._theme()) return;
    this.apply(id, true);
  }

  /** Quick day/night toggle — swaps between Light and Midnight. */
  toggleMode(): void {
    this.set(this.mode() === 'day' ? 'midnight' : 'light');
  }

  private apply(id: ThemeId, animate: boolean): void {
    const commit = () => {
      this._theme.set(id);
      const root = this.doc.documentElement;
      root.setAttribute('data-theme', id);
      const swatch = THEMES.find((t) => t.id === id)?.swatch[0];
      if (swatch) {
        this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', swatch);
      }
      writeStorage(THEME_STORAGE_KEY, id);
    };

    const vt = (this.doc as Document & { startViewTransition?: (cb: () => void) => void })
      .startViewTransition;
    if (animate && this.browser && typeof vt === 'function' && !this.doc.hidden) {
      try {
        vt.call(this.doc, commit);
      } catch {
        commit();
      }
    } else {
      commit();
    }
  }

  /** Called once on boot to sync the signal with whatever the inline script set. */
  syncFromDom(): void {
    if (!this.browser) return;
    const attr = this.doc.documentElement.getAttribute('data-theme');
    if (isTheme(attr) && attr !== this._theme()) this._theme.set(attr);
  }
}
