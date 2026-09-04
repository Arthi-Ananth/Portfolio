import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SKILLS, SKILL_GROUPS } from '@data/skills.data';
import { PROJECTS, PROFESSIONAL_WORK } from '@data/projects.data';
import { RevealDirective } from '@shared/reveal.directive';
import { IconComponent } from '@shared/icon.component';

@Component({
  selector: 'app-toolkit-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, IconComponent],
  templateUrl: './toolkit.section.html',
  styleUrl: './toolkit.section.scss',
})
export class ToolkitSection {
  protected readonly groups = SKILL_GROUPS.map((g) => ({
    ...g,
    skills: SKILLS.filter((s) => s.group === g.id),
  }));

  protected readonly selected = signal<string | null>(null);

  protected readonly selectedSkill = computed(() =>
    SKILLS.find((s) => s.id === this.selected()),
  );

  protected readonly relatedProjects = computed(() => {
    const id = this.selected();
    if (!id) return [];
    return PROJECTS.filter((p) => p.stack.includes(id));
  });

  protected readonly usedProfessionally = computed(() => {
    const id = this.selected();
    return !!id && PROFESSIONAL_WORK.stack.includes(id);
  });

  select(id: string): void {
    this.selected.update((cur) => (cur === id ? null : id));
  }

  isRelated(skillId: string): boolean {
    const projects = this.relatedProjects();
    if (!this.selected()) return false;
    return projects.some((p) => p.stack.includes(skillId)) && skillId !== this.selected();
  }
}
