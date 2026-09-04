/**
 * EmailJS credentials are read from here so they never sit inside a component.
 * Leave these blank in source. Fill them in a local copy, or inject them at
 * build time in CI (write this file before `ng build`). When any value is
 * blank the contact form falls back to a mailto link — nothing breaks.
 *
 * The EmailJS public key is designed to be exposed client-side; it is still
 * kept here, out of component code, per project convention.
 */
export const environment = {
  production: false,
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
};
