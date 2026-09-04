import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '@data/services.data';
import { SKILLS } from '@data/skills.data';
import { RevealDirective } from '@shared/reveal.directive';
import { IconComponent } from '@shared/icon.component';

const SKILL_LABEL = new Map(SKILLS.map((s) => [s.id, s.label]));

@Component({
  selector: 'app-services-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, IconComponent],
  templateUrl: './services.section.html',
  styleUrl: './services.section.scss',
})
export class ServicesSection {
  protected readonly services = SERVICES;
  protected readonly open = signal(0);

  toggle(i: number): void {
    this.open.update((cur) => (cur === i ? -1 : i));
  }

  techLabel(id: string): string {
    return SKILL_LABEL.get(id) ?? id;
  }
}
