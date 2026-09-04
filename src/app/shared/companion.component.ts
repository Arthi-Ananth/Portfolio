import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ScrollService } from '@core/scroll.service';
import { MotionService } from '@core/motion.service';

interface BitState {
  say: string;
  pose: string;
}

const STATES: Record<string, BitState> = {
  hero: { say: 'booting workspace', pose: 'wake' },
  profile: { say: 'opening profile', pose: 'read' },
  featured: { say: 'unpacking builds', pose: 'push' },
  universe: { say: 'sorting projects', pose: 'scan' },
  toolkit: { say: 'wiring the toolkit', pose: 'link' },
  services: { say: 'checking the shelf', pose: 'scan' },
  journey: { say: 'walking the path', pose: 'walk' },
  lab: { say: 'lights on in the lab', pose: 'link' },
  contact: { say: 'ready to send', pose: 'send' },
};

@Component({
  selector: 'app-companion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="bit" [attr.data-pose]="state().pose" aria-hidden="true">
        <svg viewBox="0 0 48 48" class="bit__body">
          <rect x="9" y="11" width="30" height="26" rx="9" class="bit__shell" />
          <circle cx="19" cy="24" r="3" class="bit__eye" />
          <circle cx="29" cy="24" r="3" class="bit__eye" />
          <path d="M18 30q6 4 12 0" class="bit__mouth" />
          <path d="M24 11V5M24 5h4" class="bit__antenna" />
          <circle cx="28" cy="5" r="1.6" class="bit__spark" />
        </svg>
        <span class="bit__say mono">{{ state().say }}</span>
      </div>
    }
  `,
  styleUrl: './companion.component.scss',
})
export class CompanionComponent {
  private readonly scroll = inject(ScrollService);
  private readonly motion = inject(MotionService);

  private readonly mounted = signal(false);
  protected readonly visible = computed(
    () => this.mounted() && this.motion.animate && !this.motion.isCoarse,
  );

  constructor() {
    afterNextRender(() => this.mounted.set(true));
  }

  protected readonly state = computed<BitState>(
    () => STATES[this.scroll.activeSection()] ?? STATES['hero'],
  );
}
