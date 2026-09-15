import { Injectable, computed, signal } from '@angular/core';
import { isBrowser, readSession, writeSession, clearSession } from './platform';

const INTRO_KEY = 'studio.intro-seen';

/** Whether the cinematic intro loader has already played this session. */
@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly _seen = signal(this.initial());
  readonly hasCompletedIntro = computed(() => this._seen());

  private initial(): boolean {
    if (!isBrowser()) return true;
    return readSession(INTRO_KEY) === 'true';
  }

  complete(): void {
    writeSession(INTRO_KEY, 'true');
    this._seen.set(true);
  }

  /** Clears the session flag and re-arms the loader without a page reload. */
  replay(): void {
    clearSession(INTRO_KEY);
    this._seen.set(false);
  }
}
