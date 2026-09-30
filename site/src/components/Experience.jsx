import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

/* dotted-globe: latitude/longitude dot lattice projected onto a sphere */
function Globe() {
  const dots = [];
  const R = 118;
  for (let lat = -80; lat <= 80; lat += 8) {
    const rad = (lat * Math.PI) / 180;
    const r = Math.cos(rad) * R;
    const y = Math.sin(rad) * R;
    const count = Math.max(6, Math.round(Math.cos(rad) * 46));
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (z < -R * 0.15) continue; // cull far side
      const depth = (z + R) / (2 * R);
      dots.push(
        <circle
          key={`${lat}-${i}`}
          cx={140 + x}
          cy={140 + y}
          r={0.9 + depth * 0.8}
          fill="#6FA8DC"
          opacity={0.14 + depth * 0.6}
        />
      );
    }
  }
  return (
    <svg className="exp-globe" width="280" height="280" viewBox="0 0 280 280" aria-hidden="true">
      <defs>
        <radialGradient id="gcore" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#007AFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="140" r="124" fill="url(#gcore)" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '140px', originY: '140px' }}
      >
        {dots}
      </motion.g>
    </svg>
  );
}

const PROCESS_STEPS = [
  {
    num: '01',
    id: 'discover',
    name: 'Discover',
    title: 'Scope & Architecture Analysis',
    desc: 'We conduct a comprehensive discovery session to understand your business model, target users, security requirements, and technical constraints.',
    deliverables: [
      'Requirements & Scope Document',
      'Technical Architecture Blueprint',
      'Timeline & Milestone Roadmap',
    ],
    quote: 'We clarify every detail before writing code so there are never budget or timeline surprises.',
    metric: '24h Initial Scoping',
  },
  {
    num: '02',
    id: 'strategy',
    name: 'Strategy',
    title: 'System Design & Tech Selection',
    desc: 'Our engineers design the database schemas, API contracts, and cloud infrastructure, selecting the optimal modern stack for long-term scalability.',
    deliverables: [
      'Scalable Schema & API Specs',
      'Frontend / Backend Stack Selection',
      'Security & Compliance Strategy',
    ],
    quote: 'Strategic architecture decisions today prevent expensive technical debt tomorrow.',
    metric: 'Zero Scope Ambiguity',
  },
  {
    num: '03',
    id: 'design',
    name: 'Design',
    title: 'Interactive UI/UX & Prototyping',
    desc: 'Crafting brand-tailored, intuitive user experiences with high-fidelity Figma components, design tokens, micro-interactions, and accessibility standards.',
    deliverables: [
      'Interactive Clickable Prototypes',
      'Design Token System & Components',
      'WCAG 2.1 AA Usability Audit',
    ],
    quote: 'Design that does not just look beautiful, but actively drives user engagement and conversion.',
    metric: 'WCAG 2.1 AA Compliant',
  },
  {
    num: '04',
    id: 'build',
    name: 'Build',
    title: 'Full-Stack Agile Engineering',
    desc: 'Sprint-based development with clean, modular code, automated testing, type safety, and weekly staging deployments for total transparency.',
    deliverables: [
      'Clean React 19 / Modern Full-Stack',
      'Automated CI/CD Pipeline',
      'Weekly Staging Demonstrations',
    ],
    quote: 'Direct access to senior engineers throughout development with weekly demonstrable progress.',
    metric: '60+ FPS Fluidity',
  },
  {
    num: '05',
    id: 'launch',
    name: 'Launch & Scale',
    title: 'Zero-Downtime Rollout & Growth',
    desc: 'Production deployment with Core Web Vitals optimization, server hardening, real-time telemetry, and ongoing maintenance support.',
    deliverables: [
      'Edge CDN & Cloud Hardening',
      'Performance & Vitals Certification',
      'Post-Launch Warranty & Support',
    ],
    quote: 'Support does not stop at launch. We ensure your product continues to evolve and scale reliably.',
    metric: '99.9% Uptime Guarantee',
  },
];

export default function Experience() {
  const [activeStep, setActiveStep] = useState(0);
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const medalRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) {
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(card, { opacity: 0, y: 40, scale: 0.98 });
      if (medalRef.current) gsap.set(medalRef.current, { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });

      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
      });

      if (medalRef.current) {
        tl.to(
          medalRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.5)',
          },
          '-=0.6'
        );
      }

      // Smooth count-up on "7+ Years Experience"
      if (titleRef.current) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: 7,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              if (titleRef.current) {
                titleRef.current.textContent = `${Math.round(counter.val)}+ Years Experience`;
              }
            },
          },
          '-=0.7'
        );
      }

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength ? pathRef.current.getTotalLength() : 130;
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="exp-wrap" id="experience" ref={wrapRef}>
      <div className="shell">
        <div className="exp" ref={cardRef}>
          <Globe />

          <span className="exp-medal" ref={medalRef}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
              <path d="M18 4l6 18M40 4l-6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 4h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="29" cy="37" r="15" stroke="currentColor" strokeWidth="2" />
              <circle cx="29" cy="37" r="9.5" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
              <path d="M29 31.5l1.7 3.6 3.9.5-2.9 2.7.8 3.9-3.5-2-3.5 2 .8-3.9-2.9-2.7 3.9-.5 1.7-3.6z" fill="currentColor" />
            </svg>
          </span>

          <div className="exp-copy">
            <h3 ref={titleRef}>7+ Years Experience</h3>
            <p>
              Engineering custom modern digital solutions{' '}
              <span className="exp-since">
                since 2018.
                <svg viewBox="0 0 130 10" fill="none" aria-hidden="true">
                  <path
                    ref={pathRef}
                    d="M3 6.5C28 2.5 100 2 127 5.5"
                    stroke="#3B9BFF"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>
          </div>

          <div className="exp-right">
            <span className="exp-tag">
              Global
              <br />
              Thinking
              <br />
              Local Impact
            </span>
            <a className="exp-arrow" href="#top" aria-label="Learn more">
              <ArrowUpRight size={21} strokeWidth={2.3} />
            </a>
          </div>
        </div>

        {/* ---- Interactive 5-Step Process Journey ---- */}
        <div className="process-timeline" id="process">
          <div className="process-head">
            <span className="pill"><span className="pdot" />How We Work</span>
            <h3>From Idea to Scaled Product: Our Process</h3>
            <p>
              A disciplined, transparent delivery framework engineered to eliminate risk,
              maintain speed, and ensure high-craft execution at every milestone.
            </p>
          </div>

          <div className="process-steps-nav" role="tablist" aria-label="Process steps">
            <div className="process-nav-line">
              <div
                className="process-nav-fill"
                style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isDone = activeStep > idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`process-step-btn${isSelected ? ' is-active' : ''}${isDone ? ' is-done' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="process-step-circle">
                    {isDone ? <CheckCircle2 size={20} strokeWidth={2.6} /> : step.num}
                  </span>
                  <span className="process-step-label">{step.name}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={PROCESS_STEPS[activeStep].id}
              className="process-card-display"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="process-display-left">
                <h4>Phase {PROCESS_STEPS[activeStep].num} &mdash; {PROCESS_STEPS[activeStep].name}</h4>
                <h3>{PROCESS_STEPS[activeStep].title}</h3>
                <p>{PROCESS_STEPS[activeStep].desc}</p>

                <ul className="process-deliverables">
                  {PROCESS_STEPS[activeStep].deliverables.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} strokeWidth={2.4} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="process-display-right">
                <span className="process-display-right-decor">
                  <i /> Engineering Standard
                </span>
                <p className="process-right-quote">
                  &ldquo;{PROCESS_STEPS[activeStep].quote}&rdquo;
                </p>
                <span className="process-metric-tag">
                  {PROCESS_STEPS[activeStep].metric}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
