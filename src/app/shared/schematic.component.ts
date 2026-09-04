import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A deliberately stylised wireframe — used when a project has no live site and
 * no committed screenshots. It never pretends to be a real screenshot.
 */
@Component({
  selector: 'app-schematic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 320 200" role="img" [attr.aria-label]="label()">
      <defs>
        <linearGradient id="sch-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--accent)" />
          <stop offset="1" stop-color="var(--accent-2)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="320" height="200" fill="var(--surface-2)" />
      <rect x="0" y="0" width="64" height="200" fill="var(--surface)" />
      @for (r of rows; track $index) {
        <rect [attr.x]="12" [attr.y]="20 + $index * 20" width="40" height="6" rx="3"
          fill="var(--text-subtle)" opacity="0.5" />
      }

      <rect x="76" y="14" width="120" height="8" rx="4" fill="var(--text-subtle)" opacity="0.6" />
      <rect x="264" y="12" width="44" height="12" rx="6" fill="url(#sch-accent)" />

      @if (variant() === 'dashboard') {
        <rect x="76" y="36" width="72" height="40" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="156" y="36" width="72" height="40" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="236" y="36" width="72" height="40" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="76" y="86" width="150" height="98" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <polyline points="88,160 112,140 136,150 160,120 184,132 208,104"
          fill="none" stroke="url(#sch-accent)" stroke-width="2.5" />
        <rect x="236" y="86" width="72" height="98" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="272" cy="128" r="22" fill="none" stroke="url(#sch-accent)" stroke-width="6"
          stroke-dasharray="90 140" />
      } @else {
        <rect x="76" y="36" width="232" height="26" rx="6" fill="var(--surface)" stroke="var(--border)" />
        @for (r of rows; track $index) {
          <rect x="76" [attr.y]="70 + $index * 24" width="232" height="16" rx="4"
            fill="var(--surface)" stroke="var(--border)" />
          <circle cx="90" [attr.cy]="78 + $index * 24" r="4" fill="url(#sch-accent)" />
        }
      }
    </svg>
  `,
  styles: [
    `:host { display: block; width: 100%; height: 100%; }
     svg { width: 100%; height: 100%; display: block; }`,
  ],
})
export class SchematicComponent {
  readonly variant = input<'dashboard' | 'app'>('app');
  readonly label = input('Interface wireframe');
  readonly rows = [0, 1, 2, 3];
}
