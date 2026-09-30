import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Users, ShieldCheck, Lightbulb, FileText, Code2 } from 'lucide-react';
import { useInquiry } from '../context/Inquiry';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const PERKS = [
  { Icon: Zap, t: 'Quick Response', s: 'Within 24 Hours' },
  { Icon: Users, t: 'Free Consultation', s: 'Discuss Your Ideas' },
  { Icon: ShieldCheck, t: 'No Obligation', s: 'Just a Conversation' },
];

const STEPS = [
  { Icon: Lightbulb, t: 'Idea', s: "Let's discuss" },
  { Icon: FileText, t: 'Plan', s: 'Turn it into a strategy' },
  { Icon: Code2, t: 'Build', s: 'Make it real' },
];

function DotGlobe() {
  const dots = [];
  const R = 96;
  for (let lat = -78; lat <= 78; lat += 9) {
    const rad = (lat * Math.PI) / 180;
    const r = Math.cos(rad) * R;
    const y = Math.sin(rad) * R;
    const n = Math.max(6, Math.round(Math.cos(rad) * 36));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const z = Math.sin(a) * r;
      if (z < -R * 0.2) continue;
      const depth = (z + R) / (2 * R);
      dots.push(
        <circle key={`${lat}-${i}`} cx={110 + Math.cos(a) * r} cy={110 + y}
          r={0.8 + depth * 0.7} fill="#5EA8FF" opacity={0.1 + depth * 0.5} />
      );
    }
  }
  return (
    <svg className="cta-globe" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '110px', originY: '110px' }}>
        {dots}
      </motion.g>
    </svg>
  );
}

export default function FinalCta() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const { openInquiry } = useInquiry();

  useEffect(() => {
    const el = wrapRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      if (reduced) {
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(card, { opacity: 0, y: 50, scale: 0.94 });

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

      // Stagger existing small decorative/UI elements
      const leftElements = card.querySelectorAll('.cta-left > *');
      const perks = card.querySelectorAll('.cta-perks li');
      const rightVisuals = [
        card.querySelector('.cta-panel'),
        card.querySelector('.cta-card'),
        card.querySelector('.cta-scribble'),
      ].filter(Boolean);

      tl.fromTo(
        leftElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      tl.fromTo(
        perks,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      tl.fromTo(
        rightVisuals,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(rightVisuals, { clearProps: 'transform' });
          },
        },
        '-=0.5'
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-wrap" id="contact" ref={wrapRef}>
      <div className="shell">
        <div className="cta" ref={cardRef}>
          {/* ---- left ---- */}
          <div className="cta-left">
            <span className="pill pill--dark"><span className="pdot" />Let's Work Together</span>
            <h2>
              Have an idea?
              <br />
              Let's <span className="b">build it</span><span className="acc">.</span>
            </h2>
            <p>Tell us what you're trying to build, improve or automate.</p>

            <button className="btn btn-lime cta-btn" onClick={openInquiry}>
              Start Your Project
              <span className="ico"><ArrowUpRight size={18} strokeWidth={2.6} /></span>
            </button>

            <ul className="cta-perks">
              {PERKS.map(({ Icon, t, s }) => (
                <li key={t}>
                  <span className="cta-perk-ico"><Icon size={18} strokeWidth={2.2} /></span>
                  <span><strong>{t}</strong>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- right visual ---- */}
          <div className="cta-right" aria-hidden="true">
            <DotGlobe />

            <div className="cta-panel">
              <span className="cta-dots"><i /><i /><i /></span>
              {STEPS.map(({ Icon, t, s }) => (
                <div className="cta-step" key={t}>
                  <span><Icon size={17} strokeWidth={2.1} /></span>
                  <div><strong>{t}</strong><em>{s}</em></div>
                </div>
              ))}
            </div>

            <motion.div
              className="cta-card"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="cta-card-mark">G</span>
              <h4>Your Next<br />Big Project<br />Starts <span>Here</span>.</h4>
              <span className="cta-avatars">
                {['#C9D6E5', '#E3D2C3', '#D4C7E8', '#F0D9C7'].map((c, i) => (
                  <i key={i} style={{ background: `radial-gradient(circle at 50% 34%, #fff 0%, ${c} 46%, rgba(0,0,0,.18) 100%)` }} />
                ))}
                <b>+</b>
              </span>
            </motion.div>

            <span className="cta-scribble">
              <em>From Ideas<br />to Impact</em>
              <svg viewBox="0 0 120 12" fill="none">
                <path d="M4 8c30-6 82-6 112 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
