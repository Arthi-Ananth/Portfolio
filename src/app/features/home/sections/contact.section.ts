import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService, NotConfiguredError } from '@core/contact.service';
import { SITE } from '@data/site.data';
import { RevealDirective } from '@shared/reveal.directive';
import { IconComponent } from '@shared/icon.component';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'not-configured';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective, IconComponent],
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
})
export class ContactSection {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);
  protected readonly site = SITE;

  protected readonly status = signal<Status>('idle');
  protected readonly errorText = signal('');
  protected readonly copied = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  get f() {
    return this.form.controls;
  }

  invalid(name: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  async submit(): Promise<void> {
    if (this.status() === 'sending') return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    this.errorText.set('');
    try {
      await this.contact.send(this.form.getRawValue());
      this.status.set('success');
      this.form.reset();
    } catch (err) {
      if (err instanceof NotConfiguredError) {
        this.status.set('not-configured');
      } else {
        this.status.set('error');
        this.errorText.set(
          err instanceof Error ? err.message : 'Something went wrong on the way out.',
        );
      }
    }
  }

  reset(): void {
    this.status.set('idle');
  }

  mailto(): string {
    return this.contact.mailtoHref(this.form.getRawValue());
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.site.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard blocked — the address is visible anyway */
    }
  }
}
