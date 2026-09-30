import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

/* Minimal inline brand marks — small, subtle, no giant logos. */

const React_ = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="#00A3FF" />
    <g stroke="#00A3FF" strokeWidth="1" fill="none">
      <ellipse cx="12" cy="12" rx="10.5" ry="4" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
    </g>
  </svg>
);

const Next = () => (
  <svg width="26" height="26" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#0A0F1D" />
    <path d="M8.4 16.4V7.8h1.5l5.6 7.3V7.8" stroke="#fff" strokeWidth="1.3" fill="none" />
    <path d="M8.4 16.4V7.8" stroke="#fff" strokeWidth="1.3" />
  </svg>
);

const Node = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l8.7 5v10L12 22 3.3 17V7z" stroke="#3C873A" strokeWidth="1.4" />
    <path d="M9.4 15.4c.5.6 1.4.9 2.5.9 1.6 0 2.6-.7 2.6-1.9 0-1-.6-1.5-2.2-1.8l-.9-.2c-1.4-.3-2-.8-2-1.8 0-1.1 1-1.8 2.4-1.8 1 0 1.8.3 2.3.8" stroke="#3C873A" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const Laravel = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M2 6.4l4.3-2.5 4.3 2.5-4.3 2.5L2 6.4zm4.3 2.9v5.1l4.3 2.5v-5.1L6.3 9.3z" stroke="#FF2D20" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M10.6 11.8l4.3-2.5 4.3 2.5-4.3 2.5-4.3-2.5zm4.3 2.9v5.1l-4.3 2.5" stroke="#FF2D20" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const Python = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5c-3 0-4.6.9-4.6 3v2.2h4.8v.8H5.6c-2 0-3.1 1.4-3.1 4s1 3.9 3.1 3.9h1.6v-2.6c0-2.1 1.6-3.3 3.6-3.3h3.8c1.8 0 3-1.3 3-3V5.5c0-2-1.6-3-4.6-3z" fill="#3776AB" />
    <path d="M12 21.5c3 0 4.6-.9 4.6-3v-2.2h-4.8v-.8h6.6c2 0 3.1-1.4 3.1-4s-1-3.9-3.1-3.9h-1.6v2.6c0 2.1-1.6 3.3-3.6 3.3H9.4c-1.8 0-3 1.3-3 3v2.9c0 2 1.6 3.1 4.6 3.1z" fill="#FFD343" />
  </svg>
);

const Flutter = () => (
  <svg width="26" height="26" viewBox="0 0 24 24">
    <path d="M14.3 1.5L4 11.8l3.2 3.2L20.6 1.5h-6.3z" fill="#47C5FB" />
    <path d="M14.2 11.2l-5.4 5.4 3.3 3.4 3.2-3.2h6.3l-7.4-5.6z" fill="#00569E" opacity=".9" />
    <path d="M11.9 20.1l2.4 2.4h6.3l-5.4-5.4-3.3 3z" fill="#47C5FB" />
  </svg>
);

const TECH = [
  {
    name: 'React',
    category: 'Frontend',
    role: 'Interactive Web Applications',
    desc: 'High-speed reactive client interfaces, design systems, and responsive single-page web applications with fluid 60fps micro-animations.',
    caps: ['Component Architecture', 'Framer Motion', 'State Management', 'Sub-second Load'],
    Mark: React_,
  },
  {
    name: 'Next.js',
    category: 'Full-Stack',
    role: 'Server-Side Rendered Platforms',
    desc: 'Modern production SaaS platforms, server actions, and search-engine optimized web portals engineered for global scalability.',
    caps: ['Server Components', 'Edge Caching', 'ISR & SEO', 'Enterprise Security'],
    Mark: Next,
  },
  {
    name: 'Node.js',
    category: 'Backend',
    role: 'Scalable Microservices & APIs',
    desc: 'High-concurrency backend services, asynchronous queues, and real-time streaming architectures with robust fault tolerance.',
    caps: ['REST & GraphQL', 'Event-Driven Systems', 'High Concurrency', 'Low Latency'],
    Mark: Node,
  },
  {
    name: 'Python',
    category: 'AI & Data',
    role: 'Autonomous AI & Workflow Automation',
    desc: 'Custom LLM agents, intelligent business automation pipelines, document processing, and background worker systems.',
    caps: ['AI Agents & Tooling', 'Workflow Automation', 'FastAPI Services', 'Data Extraction'],
    Mark: Python,
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    role: 'Native Cross-Platform Apps',
    desc: 'iOS and Android applications compiled from a single performant codebase with smooth native gestures and offline support.',
    caps: ['iOS & Android Native', 'Offline-First Sync', '120Hz Animation', 'Hardware Access'],
    Mark: Flutter,
  },
  {
    name: 'Laravel',
    category: 'Web Services',
    role: 'Enterprise Portals & Backends',
    desc: 'Structured relational backends, automated payment pipelines, and custom administrative control dashboards.',
    caps: ['Relational Data Models', 'Payment Gateways', 'Queue Workers', 'Enterprise Auth'],
    Mark: Laravel,
  },
];

function Row() {
  return (
    <div className="marquee-row">
      {TECH.map(({ name, Mark }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
          <span className="tech-item">
            <Mark />
            {name}
          </span>
          <span className="tech-sep" />
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const [selectedTech, setSelectedTech] = useState(TECH[0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onComplete: () => {
            gsap.set(el, { clearProps: 'transform' });
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tech" ref={sectionRef} aria-label="Technologies we use">
      <div className="marquee">
        <Row />
        <Row />
      </div>

      {/* Interactive Technology Ecosystem Explorer */}
      <div className="tech-eco">
        <div className="tech-nodes-grid" role="tablist" aria-label="Technology ecosystem selection">
          {TECH.map((t) => {
            const isCurrent = selectedTech.name === t.name;
            const Mark = t.Mark;
            return (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                className={`tech-node-btn${isCurrent ? ' is-active' : ''}`}
                onClick={() => setSelectedTech(t)}
                onMouseEnter={() => setSelectedTech(t)}
              >
                <Mark />
                <span>{t.name}</span>
                <span className="tech-node-badge">{t.category}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedTech && (
            <motion.div
              key={selectedTech.name}
              className="tech-detail-card"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="tech-detail-icon" aria-hidden="true">
                <selectedTech.Mark />
              </div>
              <div className="tech-detail-content">
                <h4>
                  {selectedTech.name} &mdash; <span>{selectedTech.role}</span>
                </h4>
                <p>{selectedTech.desc}</p>
                <div className="tech-caps-row">
                  {selectedTech.caps.map((cap) => (
                    <span key={cap} className="tech-cap-pill">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
