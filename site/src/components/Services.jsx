import { useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES } from './ServiceFan';
import SpotlightCard from './react-bits/SpotlightCard';
import EngagementModels from './EngagementModels';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

export default function Services() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const track = useRef(null);

  /* Gentle auto-advance on touch/mobile only. Any manual interaction
     (touch, wheel, drag, control click) pauses it permanently for the
     session so it never fights the user. */
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const coarse = window.matchMedia('(hover: none)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!coarse || reduce) return;

    let paused = false;
    const pause = () => { paused = true; };
    ['touchstart', 'wheel', 'pointerdown'].forEach((e) =>
      el.addEventListener(e, pause, { passive: true })
    );

    const id = setInterval(() => {
      if (paused || document.hidden) return;
      const max = el.scrollWidth - el.clientWidth;
      const card = el.querySelector('.srv');
      const step = card ? card.offsetWidth + 14 : 220;
      const next = el.scrollLeft + step;
      el.scrollTo({ left: next > max - 4 ? 0 : next, behavior: 'smooth' });
    }, 3200);

    return () => {
      clearInterval(id);
      ['touchstart', 'wheel', 'pointerdown'].forEach((e) => el.removeEventListener(e, pause));
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      // Section header entrance
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

      // Services track cards entrance
      if (track.current) {
        const srvCards = track.current.querySelectorAll('.srv');
        if (reduced) {
          gsap.set(srvCards, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            srvCards,
            { opacity: 0, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: track.current,
                start: 'top 85%',
                once: true,
              },
              onComplete: () => {
                gsap.set(srvCards, { clearProps: 'transform' });
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nudge = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('.srv');
    const step = card ? card.offsetWidth + 18 : 260;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="shell">
        <div className="sec-head" ref={headRef}>
          <span className="pill"><span className="pdot" />What We Do</span>
          <h2>
            Services Built Around <span className="b">Your Goals</span>
            <span className="acc">.</span>
          </h2>
          <p>
            From first line of code to long-term growth — everything you need to build,
            automate and scale a modern digital product.
          </p>
        </div>
      </div>

      <div className="srv-shell" tabIndex={0} aria-label="Services carousel">
        <div className="srv-track" ref={track}>
          {SERVICES.map((s, i) => {
            const { Icon, tint } = s;
            const title = s.title.replace('\n', ' ');
            return (
              <SpotlightCard
                key={title}
                as="article"
                className="srv"
                spotlightColor={`${tint}22`}
              >
                <span className="srv-ico" style={{ background: `${tint}14`, color: tint }}>
                  <Icon size={24} strokeWidth={2.1} />
                </span>
                <h3>{title}</h3>
                <span className="srv-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="srv-rule" style={{ background: tint }} />
                <span className="srv-go"><ArrowRight size={16} strokeWidth={2.3} /></span>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      <div className="shell srv-ctrls">
        <button onClick={() => nudge(-1)} aria-label="Previous services"><ChevronLeft size={18} strokeWidth={2.4} /></button>
        <button onClick={() => nudge(1)} aria-label="Next services"><ChevronRight size={18} strokeWidth={2.4} /></button>
      </div>

      {/* ---- how we engage (expandable cards redesign) ---- */}
      <EngagementModels />
    </section>
  );
}
