import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (kind() === 'browser') {
      <div class="chrome" aria-hidden="true">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <span class="url">{{ url() || 'localhost:4200' }}</span>
      </div>
    }
    <div class="screen" [class.screen--device]="kind() === 'device'">
      <ng-content />
    </div>
  `,
  styleUrl: './frame.component.scss',
})
export class FrameComponent {
  readonly kind = input<'browser' | 'device' | 'plain'>('browser');
  readonly url = input('');
}
