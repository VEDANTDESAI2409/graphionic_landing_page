import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Code2, Gauge, Users, ArrowUpRight } from 'lucide-react';
import { WHY } from '../data/site';
import { useInquiry } from '../context/Inquiry';
import useIsMobile from '../hooks/useIsMobile';
import TiltedCard from './react-bits/TiltedCard';
import Magnet from './react-bits/Magnet';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const ICONS = { target: Target, code: Code2, gauge: Gauge, users: Users };

function DotField() {
  const d = [];
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const dist = Math.hypot(r - 5.5, c - 5.5);
      if (dist > 6.2) continue;
      d.push(
        <circle key={`${r}-${c}`} cx={12 + c * 20} cy={12 + r * 20} r="2.4"
          fill="#7FB3E8" opacity={Math.max(0.08, 0.55 - dist * 0.07)} />
      );
    }
  }
  return <svg className="why-dots" width="260" height="260" viewBox="0 0 260 260" aria-hidden="true">{d}</svg>;
}

/* The visual face of a Why card — identical on desktop and mobile.
   `bare` = the parent already provides the .why-card shell. */
function CardFace({ w, i, bare = false }) {
  const Icon = ICONS[w.icon];
  const lime = w.accent === 'lime';
  const inner = (
    <>
      <span className="why-num">{String(i + 1).padStart(2, '0')}</span>
      <span
        className="why-ico"
        style={{
          background: lime ? 'var(--lime)' : 'var(--blue)',
          color: lime ? 'var(--navy)' : '#fff',
          boxShadow: lime
            ? '0 12px 26px -12px rgba(150,190,20,0.85)'
            : '0 12px 26px -12px rgba(0,110,235,0.75)',
        }}
      >
        <Icon size={26} strokeWidth={2.2} />
      </span>
      <h3>{w.title}</h3>
      <p>{w.desc}</p>
      <span className="why-rule" style={{ background: lime ? '#A8D400' : 'var(--blue)' }} />
    </>
  );
  if (bare) return inner;
  return <article className={`why-card${lime ? ' is-lime' : ''}`}>{inner}</article>;
}

export default function WhyGraphionic() {
  const [activeWhy, setActiveWhy] = useState(0);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const { openInquiry } = useInquiry();
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      // Subtle parallax on decorative background elements
      if (!reduced) {
        const dots = el.querySelector('.why-dots');
        const arc = el.querySelector('.why-arc');
        if (dots) {
          gsap.to(dots, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
        if (arc) {
          gsap.to(arc, {
            y: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      }

      // Header entrance
      if (headRef.current) {
        if (reduced) {
          gsap.set(headRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            headRef.current,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      // Desktop cards sequential reveal
      if (!isMobile && gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.why-card');
        if (reduced) {
          gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 45, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 82%',
                once: true,
              },
              onComplete: () => {
                gsap.set(cards, { clearProps: 'transform' });
              },
            }
          );
        }
      }

      // CTA button entrance
      if (ctaRef.current) {
        if (reduced) {
          gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section className="why" id="why" ref={sectionRef}>
      <DotField />
      <svg className="why-arc" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="600" cy="300" r="290" fill="none" stroke="#DCE7F3" strokeWidth="1.4" />
        <circle cx="600" cy="300" r="380" fill="none" stroke="#E8F0F8" strokeWidth="1.4" />
      </svg>

      <div className="shell">
        <div className="sec-head" ref={headRef}>
          <span className="pill"><span className="pdot" />Why Graphionic?</span>
          <h2>
            More Than Development,
            <br />
            A <span className="b">Smarter</span> Partnership<span className="acc">.</span>
          </h2>
          <p>
            We combine business understanding with modern technology
            to build digital solutions that create real impact.
          </p>
        </div>

        {/* Mobile: Single card presentation with 01-04 user-controlled navigation. Desktop: original 3D tilted grid. */}
        {isMobile ? (
          <div className="why-mobile-container">
            {/* Number Navigation Tabs (01 02 03 04) */}
            <div className="why-mobile-nav" role="tablist" aria-label="Why Graphionic pillars">
              {WHY.map((item, idx) => {
                const isActive = activeWhy === idx;
                const numStr = String(idx + 1).padStart(2, '0');
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Pillar ${numStr}: ${item.title}`}
                    className={`why-nav-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveWhy(idx)}
                  >
                    <span className="why-nav-tab-num">{numStr}</span>
                  </button>
                );
              })}
            </div>

            {/* Single Active Card with Smooth Transition */}
            <div className="why-mobile-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWhy}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="why-mobile-card-slot"
                >
                  <article className={`why-card${WHY[activeWhy].accent === 'lime' ? ' is-lime' : ''}`}>
                    <CardFace w={WHY[activeWhy]} i={activeWhy} bare />
                  </article>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="why-grid" ref={gridRef}>
            {WHY.map((w, i) => (
              <TiltedCard
                key={w.title}
                maxTilt={8}
                glare={true}
                glareOpacity={w.accent === 'lime' ? 0.2 : 0.12}
              >
                <article
                  className={`why-card${w.accent === 'lime' ? ' is-lime' : ''}`}
                >
                  <CardFace w={w} i={i} bare />
                </article>
              </TiltedCard>
            ))}
          </div>
        )}

        <div className="why-cta" ref={ctaRef}>
          <Magnet magnetStrength={0.25} padding={35}>
            <button className="btn btn-navy" onClick={openInquiry}>
              Let's Build Together
              <span className="ico"><ArrowUpRight size={17} strokeWidth={2.6} /></span>
            </button>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
