import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '@core/theme.service';
import { ThemeId } from '@models/theme.model';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="wrap">
      <button
        type="button"
        class="quick"
        (click)="theme.toggleMode()"
        [attr.aria-label]="'Switch to ' + (theme.mode() === 'day' ? 'night' : 'day') + ' mode'"
        title="Quick day / night"
      >
        <app-icon [name]="theme.mode() === 'day' ? 'sun' : 'moon'" />
      </button>

      <button
        type="button"
        class="trigger"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        aria-haspopup="true"
        aria-label="Choose a visual environment"
      >
        <span class="dots" aria-hidden="true">
          <i [style.background]="theme.meta().swatch[1]"></i>
          <i [style.background]="theme.meta().swatch[2]"></i>
        </span>
        <span class="label">{{ theme.meta().label }}</span>
      </button>

      @if (open()) {
        <div class="panel" role="radiogroup" aria-label="Visual environment">
          <p class="panel__title">Pick an environment</p>
          <div class="grid">
            @for (t of theme.themes; track t.id) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="theme.theme() === t.id"
                class="swatch"
                [class.swatch--on]="theme.theme() === t.id"
                (click)="pick(t.id)"
              >
                <span
                  class="tile"
                  [style.background]="t.swatch[0]"
                  aria-hidden="true"
                >
                  <i [style.background]="t.swatch[1]"></i>
                  <i [style.background]="t.swatch[2]"></i>
                </span>
                <span class="meta">
                  <span class="name">{{ t.label }}</span>
                  <span class="hint">{{ t.hint }}</span>
                </span>
                @if (theme.theme() === t.id) {
                  <app-icon name="check" class="tick" />
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  protected readonly theme = inject(ThemeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }

  pick(id: ThemeId): void {
    this.theme.set(id);
  }

  @HostListener('document:click', ['$event'])
  onOutside(e: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(e.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.open.set(false);
  }
}
