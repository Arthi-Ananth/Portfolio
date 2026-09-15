import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { isBrowser } from './platform';
import { SoundService } from './sound.service';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const WORD = 'retro';

/** Secret easter egg: type "retro" or the Konami code to flip a CRT/neon mode on or off. */
@Injectable({ providedIn: 'root' })
export class RetroModeService {
  private readonly doc = inject(DOCUMENT);
  private readonly sound = inject(SoundService);

  readonly active = signal(false);

  private buffer: string[] = [];
  private started = false;

  init(): void {
    if (!isBrowser() || this.started) return;
    this.started = true;
    this.doc.addEventListener('keydown', this.onKeydown);
  }

  private onKeydown = (e: KeyboardEvent): void => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    this.buffer.push(key);
    if (this.buffer.length > KONAMI.length) this.buffer.shift();

    const typedTail = this.buffer.slice(-WORD.length).join('');
    const matchesWord = typedTail === WORD;
    const matchesKonami =
      this.buffer.length === KONAMI.length &&
      this.buffer.every((k, i) => k === KONAMI[i]);

    if (matchesWord || matchesKonami) {
      this.buffer = [];
      this.toggle();
    }
  };

  private toggle(): void {
    const next = !this.active();
    this.active.set(next);
    this.doc.documentElement.toggleAttribute('data-retro-mode', next);
    if (next) this.sound.chime();
  }
}
