import React from 'react';

/* ============================================================
   GRAPHIONIC INFOTECH — TECHNOLOGY STACK DATA
   ------------------------------------------------------------
   Accurate representation of the modern technology stack
   used across client projects (Web Apps, Mobile Apps,
   Full-Stack Systems, and Enterprise Automations).
   ============================================================ */

const BASE_TECHNOLOGIES = [
  {
    name: 'React',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 180 180" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="90" cy="90" r="90" fill="#0A0F1D" />
        <path d="M149.5 157.4L69.9 54H54v72h12.3V69.4l73.6 95.4c3.4-2.2 6.6-4.7 9.6-7.4z" fill="#FFFFFF" />
        <rect x="115" y="54" width="12" height="72" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
        <path
          d="M16 2.8L3.8 9.8v14.4L16 31.2l12.2-7V9.8L16 2.8z"
          stroke="#5FA04E"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="rgba(95, 160, 78, 0.08)"
        />
        <path
          d="M11 19.5V13.2c0-1.4 1-2.2 2.3-2.2s2.3.8 2.3 2.2v6.3M15.6 14.5c.8-1 1.9-1.5 3.1-1.5 1.8 0 3.1 1.2 3.1 3v3.5"
          stroke="#5FA04E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    icon: (
      <svg viewBox="0 0 50 50" width="22" height="22" fill="#FF2D20" aria-hidden="true">
        <path d="M49.6 15.3c-.2-.4-.5-.7-.9-.9l-13-7.5c-.7-.4-1.6-.4-2.3 0L24.8 12 16.2 7c-.7-.4-1.6-.4-2.3 0l-13 7.5c-.6.3-.9.9-.9 1.6v15c0 .7.4 1.3.9 1.6l13 7.5c.4.2.8.3 1.2.3s.8-.1 1.2-.3l8.6-5 8.6 5c.4.2.8.3 1.2.3s.8-.1 1.2-.3l13-7.5c.6-.3.9-.9.9-1.6v-15c-.1-.7-.4-1.3-.9-1.6zM15 36.8L3.9 30.4V17.6L15 24v12.8zm1.1-14.8L5 15.6l10-5.8 10 5.8-9.9 5.6zm10 2.2l-8.9-5.1 8.9-5.1 8.9 5.1-8.9 5.1zm1.1 12.6V24l11.1-6.4v12.8L27.2 36.8zm18.9-6.4l-6.7 3.9V21.6l6.7-3.9v12.7z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3l.1 2.3h4.9v.7H5.2S2 6.9 2 12.1c0 5.3 2.8 5.1 2.8 5.1h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V4.7S17.3 2 11.9 2zm-1.4 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3l-.1-2.3H12v-.7h6.8s3.2.4 3.2-4.8c0-5.3-2.8-5.1-2.8-5.1h-1.7v2.4s.1 2.8-2.8 2.8H9.9s-2.7-.1-2.7 2.6v4.7s-.5 2.7 4.9 2.7zm1.4-1.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
          fill="#FFD438"
        />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M14.3 2.5L4.5 12.3l3.6 3.6L21.5 2.5h-7.2z" fill="#47C5FB" />
        <path d="M14.3 11.5l-5.4 5.4 3.6 3.6 5.4-5.4h3.6l-7.2-7.2v3.6z" fill="#47C5FB" opacity="0.85" />
        <path d="M8.9 16.9l3.6 3.6-3.6 3.6h-7.2l7.2-7.2z" fill="#02569B" />
        <path d="M12.5 20.5l3.6 3.5h7.2l-7.2-7.1-3.6 3.6z" fill="#01579B" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M11.5 10.5H5.8V8.7h13.2v1.8h-5.7V20h-1.8v-9.5zM14.2 16.5c.6.9 1.5 1.5 2.7 1.5 1.1 0 1.8-.5 1.8-1.2 0-.8-.7-1.1-1.9-1.6l-.7-.3c-1.8-.7-2.9-1.6-2.9-3.3 0-1.8 1.4-3.1 3.6-3.1 1.5 0 2.6.5 3.4 1.7l-1.4 1c-.5-.7-1.1-1-1.9-1-.9 0-1.5.5-1.5 1.1 0 .7.6 1 1.7 1.4l.7.3c2 .8 3.1 1.7 3.1 3.5 0 2-1.5 3.3-3.9 3.3-1.8 0-3.1-.7-3.9-2l1.2-1.3z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'WordPress',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#21759B" />
        <path
          d="M2.8 12c0 3.8 2.4 7.1 5.8 8.4L4.3 8.3C3.3 9.4 2.8 10.6 2.8 12zm14.8-.4c0-1.1-.4-1.9-.7-2.5-.5-.8-.9-1.5-.9-2.3 0-.9.7-1.7 1.7-1.7.1 0 .1 0 .2 0-1.8-1.5-4.1-2.4-6.7-2.4-3.6 0-6.8 1.8-8.6 4.6 0 0 .5 0 .7 0 1.1 0 2.8-.1 2.8-.1.6 0 .7.8.1.9 0 0-.6.1-1.2.1l3.9 11.6 2.4-7.1-1.7-4.5c-.6 0-1.1-.1-1.1-.1-.6 0-.5-.9.1-.9 0 0 1.7.1 2.7.1 1.1 0 2.8-.1 2.8-.1.6 0 .7.8.1.9 0 0-.6.1-1.2.1l3.9 11.5 1.1-3.6c.6-1.8.8-3.1.8-4.1zm-8.8 7.9l-3.3-9.5 3.3 9.5zm5.7-1.3l-3.2-9.4 3.1 9.2c.1.1.1.2.1.2zm-2.5 2.6c1.3.4 2.7.5 4.1.2l-3.2-9.3-1.9 5.7.9 3.4h.1zm7.3-3.5c1.2-1.5 1.9-3.3 1.9-5.3 0-1.9-.6-3.7-1.7-5.1l-4.5 13.1c1.8-.7 3.3-1.6 4.3-2.7z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
];

/* Repeat the sequence twice inside each track unit so the unit width
   (16 items * ~190px = ~3040px) comfortably spans even 1440p and ultra-wide
   viewports without ever exposing an empty gap before the loop resets. */
const MARQUEE_ITEMS = [...BASE_TECHNOLOGIES, ...BASE_TECHNOLOGIES];

function TechnologyList({ ariaHidden }) {
  return (
    <div className="tech-marquee-list" aria-hidden={ariaHidden ? 'true' : undefined}>
      {MARQUEE_ITEMS.map((tech, index) => (
        <span key={`${tech.name}-${index}`} className="tech-marquee-item-wrapper">
          <span className="tech-item">
            <span className="tech-icon">{tech.icon}</span>
            <span className="tech-name">{tech.name}</span>
          </span>
          <span className="tech-separator" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function TechnologyMarquee() {
  return (
    <section
      className="tech-marquee-section"
      aria-label="Technology stack we engineer with"
    >
      <div className="tech-marquee">
        {/* Soft edge fade masks for seamless entrance & exit */}
        <div className="tech-marquee-fade tech-marquee-fade-left" aria-hidden="true" />
        <div className="tech-marquee-fade tech-marquee-fade-right" aria-hidden="true" />

        {/* Infinite hardware-accelerated animated track */}
        <div className="tech-marquee-track">
          {/* Primary accessible list */}
          <TechnologyList ariaHidden={false} />
          {/* Cloned secondary list to ensure 100% gapless continuous flow */}
          <TechnologyList ariaHidden={true} />
        </div>
      </div>
    </section>
  );
}
