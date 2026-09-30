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
    image: '/projects/vr-system.jpg',
    category: 'Business Website',
    description:
      'Security and networking company site covering CCTV, access control, fire alarm and public address systems, with a product catalogue and industry-wise service pages.',
    tech: ['WordPress', 'Elementor'],
    url: 'https://vrsystemandsolution.com/',
    accent: 'blue',
  },
  {
    name: 'Rapid Electric',
    image: '/projects/rapid-electric.jpg',
    category: 'E-commerce',
    description:
      'Online store for modular switches, MCBs, plates and electrical accessories, with category browsing, product pages and a top-sellers showcase.',
    tech: ['WordPress', 'WooCommerce'],
    url: 'https://rapidelectric.in/',
    accent: 'navy',
  },
  {
    name: 'Fastlane Freedom',
    image: '/projects/fastlane.jpg',
    category: 'Content Platform',
    description:
      'Ad-free publishing platform on mindset, money and personal growth, organised into topic categories with a long-form article archive.',
    tech: ['WordPress'],
    url: 'https://fastlanefreedom.com/',
    accent: 'lime',
  },
  {
    name: 'BiO-G',
    image: '/projects/biog.jpg',
    category: 'E-commerce',
    description:
      'Direct-to-consumer storefront for biodegradable anti-odor socks, featuring product collections, variant selection and cart checkout.',
    tech: ['WordPress', 'WooCommerce'],
    url: 'https://shopbiog.com/',
    accent: 'blue',
  },
  {
    name: 'Sunflower Inn and Suites',
    image: '/projects/sunflower.jpg',
    category: 'Hospitality Website',
    description:
      'Hotel website for a Salina, Kansas property with room listings and nightly rates, facilities pages and direct booking integration.',
    tech: ['WordPress'],
    url: 'https://sunflowerinnsalina.com/',
    accent: 'navy',
  },
];

export const ACCENTS = {
  blue: { from: '#007AFF', to: '#0056C7', fg: '#fff' },
  lime: { from: '#D2FF28', to: '#A8D400', fg: '#0A0F1D' },
  navy: { from: '#16223C', to: '#0A0F1D', fg: '#fff' },
};
