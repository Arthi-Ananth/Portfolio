import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, PROFESSIONAL_WORK } from '@data/projects.data';
import { SKILLS } from '@data/skills.data';
import { Project, ProjectGroup } from '@models/project.model';
import { RevealDirective } from '@shared/reveal.directive';
import { IconComponent } from '@shared/icon.component';
import { TiltDirective } from '@shared/tilt.directive';

const SKILL_LABEL = new Map(SKILLS.map((s) => [s.id, s.label]));

const GROUP_ORDER: { id: ProjectGroup; label: string }[] = [
  { id: 'full-application', label: 'Full applications' },
  { id: 'dashboard', label: 'Dashboards & data UI' },
  { id: 'backend', label: 'Backend / API' },
];

const FILTERS = ['angular', 'react', 'typescript', 'rest', 'auth', 'rbac', 'charts', 'node', 'responsive'];

@Component({
  selector: 'app-universe-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, IconComponent, TiltDirective],
  templateUrl: './universe.section.html',
  styleUrl: './universe.section.scss',
})
export class UniverseSection {
  protected readonly professional = PROFESSIONAL_WORK;
  protected readonly filters = FILTERS.map((id) => ({ id, label: SKILL_LABEL.get(id) ?? id }));
  protected readonly active = signal<string | null>(null);

  protected readonly groups = computed(() =>
    GROUP_ORDER.map((g) => ({
      ...g,
      items: PROJECTS.filter((p) => p.group === g.id),
    })).filter((g) => g.items.length),
  );

  matches(p: Project): boolean {
    const a = this.active();
    return !a || p.stack.includes(a);
  }

  toggle(id: string): void {
    this.active.update((cur) => (cur === id ? null : id));
  }

  labelFor(id: string): string {
    return SKILL_LABEL.get(id) ?? id;
  }

  liveUrl(p: Project): string | undefined {
    return p.links.find((l) => l.kind === 'live')?.url;
  }
  sourceUrl(p: Project): string | undefined {
    return p.links.find((l) => l.kind === 'source')?.url;
  }
}
