import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PROFILE_MODULES } from '@data/profile.data';
import { SITE } from '@data/site.data';
import { RevealDirective } from '@shared/reveal.directive';

@Component({
  selector: 'app-profile-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, NgOptimizedImage],
  templateUrl: './profile.section.html',
  styleUrl: './profile.section.scss',
})
export class ProfileSection {
  protected readonly modules = PROFILE_MODULES;
  protected readonly site = SITE;
  protected readonly open = signal(0);

  select(i: number): void {
    this.open.set(i);
  }
}
