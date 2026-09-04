import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'download'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'phone'
  | 'sun'
  | 'moon'
  | 'close'
  | 'menu'
  | 'chevron-right'
  | 'chevron-down'
  | 'play'
  | 'layers'
  | 'code'
  | 'gauge'
  | 'sparkles'
  | 'boxes'
  | 'route'
  | 'terminal'
  | 'check'
  | 'copy'
  | 'alert'
  | 'send'
  | 'grid'
  | 'wrench';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <use [attr.href]="'#i-' + name()" [attr.xlink:href]="'#i-' + name()" />
  </svg>`,
  styles: [
    `:host {
      display: inline-flex;
      width: 1.2em;
      height: 1.2em;
      line-height: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }`,
  ],
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
