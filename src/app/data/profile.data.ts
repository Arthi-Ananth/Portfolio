export interface ProfileModule {
  index: string;
  title: string;
  body: string;
  tags: string[];
}

export const PROFILE_MODULES: ProfileModule[] = [
  {
    index: '01',
    title: 'What I build',
    body: 'Front-end for real applications — admin panels, role-based dashboards, listing and management screens. The kind of UI that has state, permissions and a backend behind it, not just a landing page.',
    tags: ['Angular apps', 'Dashboards', 'Role-based UI', 'API integration'],
  },
  {
    index: '02',
    title: 'How I think',
    body: 'Start from what the user is trying to do, then work backwards to components and data flow. Reusable pieces, typed contracts, predictable routing. If a screen needs a comment to explain it, the screen is wrong.',
    tags: ['Component architecture', 'Typed contracts', 'RxJS', 'Reactive forms'],
  },
  {
    index: '03',
    title: 'What I care about',
    body: 'That it stays obvious on the tenth visit, not just the first. Responsive without excuses, quick on a mid-range laptop, and accessible enough that keyboard users are not an afterthought.',
    tags: ['Responsive', 'Performance', 'Accessibility', 'Clean CSS'],
  },
  {
    index: '04',
    title: 'Where I am going',
    body: 'Deeper into product-focused frontend — design systems, state architecture, the seam between Figma and shipped Angular. Open to frontend, Angular and UI developer roles.',
    tags: ['Design systems', 'State', 'Figma to code', 'Open to roles'],
  },
];
