import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, MessageSquare, ArrowUpRight, Zap, ShieldCheck, Users, Globe } from 'lucide-react';
import { FAQS } from '../data/site';
import { useInquiry } from '../context/Inquiry';
import useIsMobile from '../hooks/useIsMobile';
import Magnet from './react-bits/Magnet';
import { gsap, SplitText, isReducedMotion } from '../utils/gsapConfig';

const ease = [0.16, 1, 0.3, 1];
const PERKS = [
  { Icon: Zap, label: 'Quick Response' },
  { Icon: ShieldCheck, label: 'Friendly Support' },
  { Icon: Users, label: 'Real People' },
  { Icon: Globe, label: 'Global Clients' },
];

function DotField() {
  const d = [];
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      const dist = Math.hypot(r - 6.5, c - 6.5);
      if (dist > 7) continue;
      d.push(
        <circle key={`${r}-${c}`} cx={10 + c * 19} cy={10 + r * 19} r="2.2"
          fill="#7FB3E8" opacity={Math.max(0.06, 0.5 - dist * 0.06)} />
      );
    }
  }
  return <svg className="faq-dots" width="280" height="280" viewBox="0 0 280 280" aria-hidden="true">{d}</svg>;
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const headingRef = useRef(null);
  const asideRef = useRef(null);
  const listRef = useRef(null);
  const { openInquiry } = useInquiry();
  const isMobile = useIsMobile();
  /* On mobile one question is always open, so the section reads as a single
     prominent card rather than a wall of collapsed rows. */
  const active = open < 0 ? 0 : open;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      // Subtle parallax on decorative elements
      if (!reduced) {
        const dots = el.querySelector('.faq-dots');
        const arc = el.querySelector('.faq-arc');
        if (dots) {
          gsap.to(dots, {
            y: -25,
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
            y: 20,
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

      const isMobileScreen = window.innerWidth <= 768;

      if (isMobileScreen) {
        if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
        if (listRef.current) {
          const items = listRef.current.querySelectorAll('.faq-item');
          gsap.set(items, { opacity: 1, y: 0 });
        }
        return;
      }

      // Heading SplitText line reveal
      if (headingRef.current && !reduced) {
        const split = new SplitText(headingRef.current, {
          type: 'lines',
          linesClass: 'split-line',
        });

        gsap.fromTo(
          split.lines,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headRef.current || headingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Aside and FAQ items reveal
      if (!reduced) {
        if (asideRef.current) {
          gsap.fromTo(
            asideRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: asideRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        if (listRef.current) {
          const items = listRef.current.querySelectorAll('.faq-item');
          gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.06,
              scrollTrigger: {
                trigger: listRef.current,
                start: 'top 85%',
                once: true,
              },
              onComplete: () => {
                gsap.set(items, { clearProps: 'transform' });
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <DotField />
      <svg className="faq-arc" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="400" cy="200" r="240" fill="none" stroke="#E3EDF7" strokeWidth="1.4" />
      </svg>

      <div className="shell">
        <div className="sec-head" ref={headRef}>
          <span className="pill"><span className="pdot" />Frequently Asked Questions</span>
          <h2 ref={headingRef}>
            Got Questions?
            <br />
            We've Got <span className="b">Answers</span><span className="acc">.</span>
          </h2>
          <p>
            Here are some of the most common questions we get from businesses
            like yours. Can't find what you're looking for? Feel free to reach out.
          </p>
        </div>

        <div className="faq-layout">
          {/* ---- left rail ---- */}
          <aside className="faq-aside" ref={asideRef}>
            <span className="faq-scribble">
              <em>Still have<br />questions?</em>
              <svg viewBox="0 0 90 60" fill="none">
                <path d="M4 10c22-6 48 2 62 22" stroke="#2E86F0" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M60 36l7-6 2 9" stroke="#2E86F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <div className="faq-talk">
              <span className="faq-talk-ico"><MessageSquare size={22} strokeWidth={2.2} /></span>
              <h3>Let's Talk</h3>
              <p>Still have a question?<br />We're here to help.</p>
              <Magnet magnetStrength={0.2} padding={25}>
                <button className="btn btn-lime faq-talk-btn" onClick={openInquiry}>
                  Contact Us <span className="ico"><ArrowUpRight size={17} strokeWidth={2.6} /></span>
                </button>
              </Magnet>
            </div>

            <ul className="faq-perks">
              {PERKS.map(({ Icon, label }) => (
                <li key={label}><Icon size={19} strokeWidth={2.2} />{label}</li>
              ))}
            </ul>
          </aside>

          {/* Mobile: ONLY ONE FAQ VISIBLE AT A TIME per requirement #8 */}
          {isMobile ? (
            <div className="faq-mobile-single-view">
              {/* Progress Indicator */}
              <div className="faq-prog" aria-label={`Question ${active + 1} of ${FAQS.length}`}>
                <span className="faq-prog-txt">
                  <b>{String(active + 1).padStart(2, '0')}</b> / {String(FAQS.length).padStart(2, '0')}
                </span>
                <span className="faq-prog-track">
                  <span
                    className="faq-prog-fill"
                    style={{ width: `${((active + 1) / FAQS.length) * 100}%` }}
                  />
                </span>
              </div>

              {/* Single FAQ Card */}
              <div className="faq-mobile-card-slot">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -22 }}
                    transition={{ duration: 0.28, ease }}
                    className="faq-mobile-card"
                  >
                    <div className="faq-mobile-card-header">
                      <span className="faq-n">{String(active + 1).padStart(2, '0')}</span>
                      <h3 className="faq-mobile-q-title">{FAQS[active].q}</h3>
                    </div>
                    <div className="faq-mobile-card-body">
                      <p>{FAQS[active].a}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Navigation Controls */}
              <div className="faq-mobile-nav-controls">
                {active > 0 && (
                  <button
                    type="button"
                    className="faq-mobile-prev-btn"
                    onClick={() => setOpen(active - 1)}
                    aria-label="Previous question"
                  >
                    <ChevronLeft size={18} strokeWidth={2.4} />
                    <span>Prev</span>
                  </button>
                )}
                <button
                  type="button"
                  className="faq-mobile-next-btn"
                  onClick={() => setOpen((active + 1) % FAQS.length)}
                  aria-label={active === FAQS.length - 1 ? 'Go to question 1' : `Go to question ${active + 2}`}
                >
                  <span>{active === FAQS.length - 1 ? 'Start Over (01/07)' : 'Next Question'}</span>
                  <ChevronRight size={18} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          ) : (
            /* ---- Desktop Accordion ---- */
            <div className="faq-list" ref={listRef}>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`faq-item${isOpen ? ' is-open' : ''}`}
                  >
                    <button
                      className="faq-q"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="faq-t">{f.q}</span>
                      <motion.span
                        className="faq-c"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.36, ease }}
                      >
                        <ChevronDown size={19} strokeWidth={2.3} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-a"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                        >
                          <p>{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
