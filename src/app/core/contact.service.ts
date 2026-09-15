import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { SITE } from '@data/site.data';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export class NotConfiguredError extends Error {
  constructor() {
    super('Contact form is not configured');
    this.name = 'NotConfiguredError';
  }
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  get configured(): boolean {
    const { serviceId, templateId, publicKey } = environment.emailjs;
    return !!serviceId && !!templateId && !!publicKey;
  }

  mailtoHref(payload?: Partial<ContactPayload>): string {
    const subject = encodeURIComponent(
      payload?.name ? `Portfolio enquiry from ${payload.name}` : 'Portfolio enquiry',
    );
    const body = encodeURIComponent(payload?.message ?? '');
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  async send(payload: ContactPayload): Promise<void> {
    if (!this.configured) throw new NotConfiguredError();
    const { serviceId, templateId, publicKey } = environment.emailjs;
    const emailjs = (await import('@emailjs/browser')).default;
    await emailjs.send(
      serviceId,
      templateId,
      {
        // Sent under both naming conventions so this works regardless of
        // which variable names the EmailJS template itself was built with.
        name: payload.name,
        from_name: payload.name,
        email: payload.email,
        reply_to: payload.email,
        message: payload.message,
      },
      { publicKey },
    );
  }
}
