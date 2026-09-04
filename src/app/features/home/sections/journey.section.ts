import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JOURNEY } from '@data/journey.data';
import { JourneyKind } from '@models/journey.model';
import { RevealDirective } from '@shared/reveal.directive';
import { CounterComponent } from '@shared/counter.component';
import { IconComponent } from '@shared/icon.component';

const KIND_ICON: Record<JourneyKind, 'layers' | 'code' | 'boxes' | 'sparkles'> = {
  education: 'layers',
  work: 'code',
  build: 'boxes',
  now: 'sparkles',
};

@Component({
  selector: 'app-journey-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, CounterComponent, IconComponent],
  templateUrl: './journey.section.html',
  styleUrl: './journey.section.scss',
})
export class JourneySection {
  protected readonly stops = JOURNEY;
  protected readonly open = signal<string | null>('bornwizh');

  protected readonly stats = [
    { value: 1, suffix: '+', label: 'year building for the web professionally' },
    { value: 4, suffix: '', label: 'projects with a live demo you can open' },
    { value: 5, suffix: '', label: 'builds documented as case studies' },
    { value: 2, suffix: '', label: 'of them full-stack, front to database' },
  ];

  icon(kind: JourneyKind): 'layers' | 'code' | 'boxes' | 'sparkles' {
    return KIND_ICON[kind];
  }

  toggle(id: string): void {
    this.open.update((cur) => (cur === id ? null : id));
  }
}
