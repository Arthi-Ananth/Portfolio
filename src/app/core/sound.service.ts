import { Injectable, computed, signal } from '@angular/core';
import { isBrowser, readStorage, writeStorage } from './platform';

const MUTE_KEY = 'studio.sound-muted';

interface Blip {
  freq: number;
  duration: number;
  type: OscillatorType;
  glideTo?: number;
  gain?: number;
}

/**
 * Tiny sci-fi UI-sound synthesizer — no audio assets, everything generated
 * with a couple of oscillator + gain nodes. Muted by default (opt-in), and
 * the AudioContext is created lazily on the first call, which always happens
 * from a real user gesture (click handlers), satisfying autoplay policies.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private readonly browser = isBrowser();
  private readonly _muted = signal(this.initial());
  readonly muted = computed(() => this._muted());

  private ctx?: AudioContext;

  private initial(): boolean {
    if (!this.browser) return true;
    const stored = readStorage(MUTE_KEY);
    return stored === null ? true : stored === 'true';
  }

  toggle(): void {
    const next = !this._muted();
    this._muted.set(next);
    writeStorage(MUTE_KEY, String(next));
    if (!next) this.blip({ freq: 720, duration: 0.06, type: 'sine', glideTo: 980, gain: 0.05 });
  }

  /** Short neutral UI tick — nav links, mute button itself, etc. */
  click(): void {
    this.blip({ freq: 520, duration: 0.05, type: 'square', gain: 0.03 });
  }

  /** Slightly warmer confirmation tone — theme swaps. */
  toggleSound(): void {
    this.blip({ freq: 340, duration: 0.09, type: 'triangle', glideTo: 520, gain: 0.045 });
  }

  /** Rising two-note chime — intro reveal, retro-mode activation. */
  chime(): void {
    if (this._muted() || !this.browser) return;
    const ctx = this.audioContext();
    if (!ctx) return;
    this.tone(ctx, 440, ctx.currentTime, 0.12, 'sine', 0.05);
    this.tone(ctx, 660, ctx.currentTime + 0.1, 0.16, 'sine', 0.05);
  }

  private blip(b: Blip): void {
    if (this._muted() || !this.browser) return;
    const ctx = this.audioContext();
    if (!ctx) return;
    this.tone(ctx, b.freq, ctx.currentTime, b.duration, b.type, b.gain ?? 0.04, b.glideTo);
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    start: number,
    duration: number,
    type: OscillatorType,
    peakGain: number,
    glideTo?: number,
  ): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, start + duration);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(peakGain, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  private audioContext(): AudioContext | undefined {
    if (!this.browser) return undefined;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return undefined;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }
}
