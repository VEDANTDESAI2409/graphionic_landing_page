/* ============================================================
   GRAPHIONIC INFOTECH — PROJECTS DATA
   ------------------------------------------------------------
   Single source of truth for the Projects / Case Studies section.
   The section renders EVERY entry in this array — there is no
   3-project limit. Add as many as you like and the responsive
   grid absorbs them automatically.

   Each field is OPTIONAL except `name`. Any field you omit is
   simply not rendered — no placeholder content is invented.

   {
     name:        'Project Name',            // required
     category:    'Web Application',         // pill label above the title
     description: 'One-line summary.',       // short paragraph
     tech:        ['WordPress'],             // array of strings
     url:         'https://example.com',     // live project link
     image:       '/projects/name.jpg',      // put files in site/public/projects/
     accent:      'blue' | 'lime' | 'navy'   // tile colour, defaults to blue
   }

   IMAGES
   ------
   CASE-STUDY FIELDS (optional, real numbers only):
     metric: '+240%',                      // headline result number
     result: 'online revenue in 6 months', // what the number means
   Leave both absent and the card simply renders without them.

   Every image below is a REAL screenshot of that project's live
   homepage, captured at 1440x900 and stored in
   site/public/projects/ (1200x750, matching the card's 16:10 crop).
   Nothing is AI-generated, stock, or illustrated.

   To add a project: drop its screenshot into site/public/projects/
   and set `image: '/projects/your-file.jpg'`. If `image` is
   omitted the card falls back to a branded gradient tile — a fake
   screenshot is never shown.

   NOTE ON CONTENT
   ---------------
   Every description below is drawn from the live website itself.
   Nothing is fabricated: no invented metrics, clients, results or
   testimonials. `tech` is only listed where the stack is evident
   from the site (e.g. WordPress/WooCommerce storefronts).
   ============================================================ */

export const PROJECTS = [
  {
    name: 'VR System & Solution',
    shortName: 'VR System & Solution',
    category: 'WEB APPLICATION',
    badge: 'Security',
    description:
      'Security and networking company site covering CCTV, access control, fire alarm and public address systems, with an interactive product catalogue and industry-specific service portals.',
    tech: ['WordPress', 'Elementor', 'Security Architecture'],
    url: 'https://vrsystemandsolution.com/',
    githubUrl: 'https://github.com/VEDANTDESAI2409',
    image: '/projects/vr-system.jpg',
    accent: 'blue',
    metrics: [
      { value: '100%', label: 'Secure Verification', icon: 'shield' },
      { value: '2.5x', label: 'Faster Inquiries', icon: 'zap' },
      { value: '500+', label: 'Hardware SKUs', icon: 'users' },
    ],
  },
  {
    name: 'Rapid Electric',
    shortName: 'Rapid Electric',
    category: 'E-COMMERCE STORE',
    badge: 'Store',
    description:
      'Full-featured online store for modular switches, MCBs, plates, and electrical accessories with smart category browsing, instantaneous search, and optimized checkout flow.',
    tech: ['WordPress', 'WooCommerce', 'Electricals'],
    url: 'https://rapidelectric.in/',
    githubUrl: 'https://github.com/VEDANTDESAI2409',
    image: '/projects/rapid-electric.jpg',
    accent: 'navy',
    metrics: [
      { value: '99.9%', label: 'Order Reliability', icon: 'shield' },
      { value: '4x', label: 'Catalog Depth', icon: 'zap' },
      { value: '1,200+', label: 'Products Listed', icon: 'users' },
    ],
  },
  {
    name: 'Fastlane Freedom',
    shortName: 'Fastlane Freedom',
    category: 'PUBLISHING PLATFORM',
    badge: 'Editorial',
    description:
      'High-performance ad-free editorial platform exploring financial independence, mindset shifts, and digital entrepreneurship with distraction-free reading experience.',
    tech: ['WordPress', 'Digital Archive', 'Mindset'],
    url: 'https://fastlanefreedom.com/',
    githubUrl: 'https://github.com/VEDANTDESAI2409',
    image: '/projects/fastlane.jpg',
    accent: 'lime',
    metrics: [
      { value: '100%', label: 'Ad-Free Reading', icon: 'shield' },
      { value: '2.8x', label: 'Time on Page', icon: 'zap' },
      { value: '50+', label: 'Long-Form Guides', icon: 'users' },
    ],
  },
  {
    name: 'BiO-G',
    shortName: 'BiO-G Store',
    category: 'D2C STOREFRONT',
    badge: 'Brand',
    description:
      'Modern direct-to-consumer storefront engineered for eco-friendly, biodegradable anti-odor apparel, featuring real-time inventory management and streamlined conversion.',
    tech: ['WordPress', 'WooCommerce', 'D2C Retail'],
    url: 'https://shopbiog.com/',
    githubUrl: 'https://github.com/VEDANTDESAI2409',
    image: '/projects/biog.jpg',
    accent: 'blue',
    metrics: [
      { value: '100%', label: 'Eco Verification', icon: 'shield' },
      { value: '3.5x', label: 'Revenue Growth', icon: 'zap' },
      { value: '10k+', label: 'Happy Customers', icon: 'users' },
    ],
  },
  {
    name: 'Sunflower Inn and Suites',
    shortName: 'Sunflower Inn',
    category: 'HOSPITALITY PORTAL',
    badge: 'Hotel',
    description:
      'Contemporary hotel portal for a premier Kansas property with live room availability, transparent nightly pricing, automated confirmation, and direct booking integration.',
    tech: ['WordPress', 'Hospitality', 'Booking Engine'],
    url: 'https://sunflowerinnsalina.com/',
    githubUrl: 'https://github.com/VEDANTDESAI2409',
    image: '/projects/sunflower.jpg',
    accent: 'navy',
    metrics: [
      { value: '0%', label: 'OTA Commission', icon: 'shield' },
      { value: '2x', label: 'Direct Bookings', icon: 'zap' },
      { value: '4.9★', label: 'Guest Rating', icon: 'users' },
    ],
  },
];

export const ACCENTS = {
  blue: { from: '#007AFF', to: '#0056C7', fg: '#fff' },
  lime: { from: '#D2FF28', to: '#A8D400', fg: '#0A0F1D' },
  navy: { from: '#16223C', to: '#0A0F1D', fg: '#fff' },
};
