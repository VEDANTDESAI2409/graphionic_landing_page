/* Company facts — exactly as supplied by the client. Nothing invented. */

export const COMPANY = {
  name: 'Graphionic Infotech',
  email: 'hello@graphionic.com',
  phone: '6351903380',
  address: ['312, Times Corner, VIP Rd, Vesu,', 'Surat, Gujarat 395007, India'],
};

export const GOOGLE = {
  rating: '4.5',
  outOf: '5',
  count: 17,
  url: 'https://www.google.com/maps/search/?api=1&query=Graphionic+Infotech+Vesu+Surat',
};

export const WHY = [
  { title: 'Business-first thinking', desc: 'We build around your actual business objectives.', accent: 'blue', icon: 'target' },
  { title: 'Modern engineering', desc: 'Scalable, maintainable technology.', accent: 'lime', icon: 'code' },
  { title: 'Performance focused', desc: 'Fast, responsive digital experiences.', accent: 'blue', icon: 'gauge' },
  { title: 'Long-term partnership', desc: "Support doesn't stop after launch.", accent: 'lime', icon: 'users' },
];

export const FAQS = [
  {
    q: 'What type of projects do you build?',
    a: 'We build custom websites, web applications, mobile apps, SaaS platforms and digital solutions for businesses across different industries. Whether you need a brand new product or want to improve an existing one, we can help.',
  },
  {
    q: 'How long does a project usually take?',
    a: 'Timelines depend on scope. A focused website typically moves faster than a multi-module platform. After we understand your requirements we share a clear, phased schedule with milestones before any work begins.',
  },
  {
    q: 'Do you provide UI/UX design?',
    a: 'Yes. Design and engineering sit together on every project. We handle research, wireframes, interface design and prototypes, then carry that design through to production code.',
  },
  {
    q: 'Can you work with an existing website or application?',
    a: 'Absolutely. We regularly take over existing codebases to improve performance, add features, modernise the stack or redesign the interface without starting from scratch.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Support does not stop at launch. We offer ongoing maintenance, monitoring, updates and feature development so your product keeps improving over time.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. We work with clients globally and adapt our communication and overlap hours to your timezone. Global thinking, local impact.',
  },
  {
    q: 'How do I start a project with Graphionic?',
    a: 'Share your idea using the project inquiry form. We will get back to you within 24 hours for a free, no-obligation consultation to discuss scope, approach and next steps.',
  },
];

/* Engagement models — edit copy/prices here, one place.
   Set `price: null` to hide the price chip, or use a string like 'from $1.9k'. */
export const ENGAGEMENT_MODELS = [
  {
    title: 'Fixed-Scope Project',
    icon: 'target',
    desc: 'Clear deliverables, defined timeline, one transparent quote.',
    points: ['Milestone-based delivery', 'Dedicated project manager', 'Post-launch warranty'],
    price: null,
    best: 'New product builds',
  },
  {
    title: 'Dedicated Team',
    icon: 'users',
    desc: 'Your own monthly engineering team that scales as you do.',
    points: ['Senior engineers only', 'Flexible scale up / down', 'Weekly demos & reports'],
    price: null,
    best: 'Ongoing product work',
  },
  {
    title: 'Hourly / Support',
    icon: 'clock',
    desc: 'Flexible expert help for fixes, upgrades and audits.',
    points: ['No long-term lock-in', 'Priority response window', 'Transparent time logs'],
    price: null,
    best: 'Existing systems',
  },
];
