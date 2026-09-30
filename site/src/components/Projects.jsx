import { useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, FolderOpen } from 'lucide-react';
import { PROJECTS, ACCENTS } from '../data/projects';
import { useInquiry } from '../context/Inquiry';
import SpotlightCard from './react-bits/SpotlightCard';
import Magnet from './react-bits/Magnet';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

function Tile({ p }) {
  const a = ACCENTS[p.accent] || ACCENTS.blue;
  if (p.image) {
    return <img className="prj-img" src={p.image} alt={p.name} loading="lazy" />;
  }
  // Branded gradient placeholder — never a fake screenshot.
  return (
    <div
      className="prj-img prj-img--ph"
      style={{ background: `linear-gradient(150deg, ${a.from} 0%, ${a.to} 100%)`, color: a.fg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 240" preserveAspectRatio="none">
        <g fill="currentColor" opacity="0.12">
          <circle cx="330" cy="40" r="90" />
          <circle cx="60" cy="210" r="70" />
        </g>
      </svg>
      <span className="prj-ph-mark">{p.name.charAt(0)}</span>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);
  const { openInquiry } = useInquiry();
  const has = PROJECTS.length > 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

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

      // Independent project cards reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.prj-case-card, .prj');
        if (reduced) {
          gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        } else {
          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 60, scale: 0.94 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                delay: (index % 3) * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 86%',
                  once: true,
                },
                onComplete: () => {
                  gsap.set(card, { clearProps: 'transform' });
                },
              }
            );
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="shell">
        <div className="prj-head" ref={headRef}>
          <div>
            <span className="eyebrow"><span className="dot" />Our Projects</span>
            <h2>
              Turning Ideas
              <br />
              Into <span className="b">Real Products.</span>
            </h2>
          </div>
          <div className="prj-head-right">
            <p>
              Explore some of the digital products we've built for businesses
              across different industries.
            </p>
            <Magnet magnetStrength={0.2} padding={25}>
              <button className="ghost-btn" onClick={openInquiry}>
                Start a Project <ArrowRight size={16} strokeWidth={2.3} />
              </button>
            </Magnet>
          </div>
        </div>

        {has ? (
          <div className="prj-case-grid" ref={gridRef}>
            {PROJECTS.map((p, index) => {
              const isReversed = index % 2 === 1;
              return (
                <SpotlightCard
                  key={p.name}
                  as="article"
                  className={`prj-case-card${isReversed ? ' is-reversed' : ''}`}
                  spotlightColor="rgba(0, 122, 255, 0.12)"
                >
                  <div className="prj-case-shot">
                    <Tile p={p} />
                  </div>

                  <div className="prj-case-content">
                    {p.category && <span className="prj-cat">{p.category}</span>}
                    <h3>{p.name}</h3>
                    {p.description && <p>{p.description}</p>}

                    {(p.metric || p.result) && (
                      <div className="prj-metric">
                        {p.metric && <strong>{p.metric}</strong>}
                        {p.result && <span>{p.result}</span>}
                      </div>
                    )}

                    {p.tech?.length > 0 && (
                      <ul className="prj-tech">
                        {p.tech.map((t) => <li key={t}>{t}</li>)}
                      </ul>
                    )}

                    <div className="prj-foot">
                      {p.url ? (
                        <Magnet magnetStrength={0.2} padding={20}>
                          <a className="prj-link" href={p.url} target="_blank" rel="noopener noreferrer">
                            View live project <ArrowUpRight size={15} strokeWidth={2.4} />
                          </a>
                        </Magnet>
                      ) : <span />}
                      <span className="prj-go"><ArrowRight size={16} strokeWidth={2.3} /></span>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        ) : null}

        {has ? (
          /* mobile-only affordance for the swipe carousel */
          <p className="prj-swipe" aria-hidden="true">
            <i /> Swipe to explore <i />
          </p>
        ) : (
          <div className="prj-empty">
            <span><FolderOpen size={26} strokeWidth={1.9} /></span>
            <h3>Projects coming soon</h3>
            <p>
              This section renders every entry in <code>src/data/projects.js</code> and
              scales to any number of projects. Add your real projects there and they'll
              appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
