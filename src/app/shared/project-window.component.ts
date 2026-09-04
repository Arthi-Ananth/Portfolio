import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Project } from '@models/project.model';
import { SKILLS } from '@data/skills.data';
import { IconComponent } from './icon.component';
import { FrameComponent } from './frame.component';
import { SchematicComponent } from './schematic.component';
import { TiltDirective } from './tilt.directive';

const SKILL_LABEL = new Map(SKILLS.map((s) => [s.id, s.label]));

const GROUP_LABEL: Record<Project['group'], string> = {
  'full-application': 'Full application',
  dashboard: 'Dashboard & data UI',
  backend: 'Backend / API',
  professional: 'Professional work',
};

@Component({
  selector: 'app-project-window',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    IconComponent,
    FrameComponent,
    SchematicComponent,
    TiltDirective,
  ],
  templateUrl: './project-window.component.html',
  styleUrl: './project-window.component.scss',
})
export class ProjectWindowComponent {
  readonly project = input.required<Project>();
  readonly compact = input(false);

  protected readonly shot = computed(() => this.project().shots[0]);
  protected readonly live = computed(() =>
    this.project().links.find((l) => l.kind === 'live'),
  );
  protected readonly source = computed(() =>
    this.project().links.find((l) => l.kind === 'source'),
  );
  protected readonly stackLabels = computed(() =>
    this.project()
      .stack.slice(0, this.compact() ? 4 : 7)
      .map((id) => SKILL_LABEL.get(id) ?? id),
  );
  protected readonly hasCase = computed(() => !!this.project().caseStudy);
  protected readonly groupLabel = computed(() => GROUP_LABEL[this.project().group]);

  frameUrl(): string {
    try {
      return this.live() ? new URL(this.live()!.url).host : 'github.com';
    } catch {
      return 'github.com';
    }
  }
}
