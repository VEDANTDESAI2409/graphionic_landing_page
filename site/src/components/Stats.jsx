import { useRef, useEffect } from 'react';
import { Box, Zap, Users, ArrowRight, ArrowUpRight, Award } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import SpotlightCard from './react-bits/SpotlightCard';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const AV = ['#C9D6E5', '#E3D2C3', '#D4C7E8', '#F0D9C7'];

export default function Stats() {
  const sectionRef = useRef(null);
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);
  const num4Ref = useRef(null);

  /* Mobile shows a 2x2 grid. The 4th tile reuses the "7+ Years Experience"
     figure that already exists in the Experience banner below — no new
     statistic is invented, and the banner itself is untouched. */
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const cards = el.querySelectorAll('.stat');

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Initial state
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
      });

      // Count-up animations (once)
      const countTargets = [
        { ref: num1Ref, end: 100, suffix: '+', duration: 1.6 },
        { ref: num2Ref, end: 100, suffix: '%', duration: 1.5 },
        { ref: num3Ref, end: 520, suffix: 'k+', duration: 1.8 },
      ];

      if (isMobile && num4Ref.current) {
        countTargets.push({ ref: num4Ref, end: 7, suffix: '+', duration: 1.2 });
      }

      countTargets.forEach(({ ref, end, suffix, duration }) => {
        if (!ref.current) return;
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent = `${Math.round(counter.val)}${suffix}`;
              }
            },
          },
          0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section className="shell" id="stats" ref={sectionRef}>
      <div className={`stats${isMobile ? ' stats--m4' : ''}`}>
        {/* CARD 1 — blue, tall */}
        <SpotlightCard as="article" className="stat stat--blue" spotlightColor="rgba(255, 255, 255, 0.18)">
          <span className="stat-n" aria-hidden="true">01</span>
          <span className="stat-badge">
            <Box size={19} strokeWidth={2.1} />
          </span>
          <div className="stat-num" ref={num1Ref}>100+</div>
          <div className="stat-label">Projects Delivered</div>
          <p className="stat-desc">Web, mobile, &amp; cloud platforms.</p>

          <svg className="stat-bars" width="150" height="130" viewBox="0 0 150 130" fill="none" aria-hidden="true">
            <rect x="6" y="62" width="34" height="68" rx="7" fill="#fff" opacity=".16" />
            <rect x="50" y="30" width="34" height="100" rx="7" fill="#fff" opacity=".2" />
            <rect x="94" y="52" width="34" height="78" rx="7" fill="#fff" opacity=".14" />
          </svg>

          <div className="stat-foot">
            <span>
              Turning Ideas{' '}
              <br />
              Into Real Solutions
            </span>
            <span className="stat-arrow">
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </span>
          </div>
        </SpotlightCard>

        {/* CARD 2 — light */}
        <SpotlightCard as="article" className="stat stat--light" spotlightColor="rgba(0, 122, 255, 0.12)">
          <span className="stat-n" aria-hidden="true">02</span>
          <span className="stat-badge">
            <Zap size={20} fill="currentColor" strokeWidth={1.6} />
          </span>
          <div className="stat-num" ref={num2Ref}>100%</div>
          <div className="stat-label">Speed &amp; Performance Focus</div>
          <p className="stat-desc">
            Optimizing TBT and{' '}
            <br />
            Core Web Vitals.
          </p>

          <div className="stat-foot">
            <div className="trust">
              <div className="avatars">
                {AV.map((c, i) => (
                  <span
                    key={i}
                    className="av"
                    style={{
                      background: `radial-gradient(circle at 50% 34%, #fff 0%, ${c} 46%, rgba(0,0,0,0.16) 100%)`,
                    }}
                  />
                ))}
              </div>
              <p>
                Trusted by{' '}
                <br />
                100+ Clients
              </p>
            </div>
            <span className="stat-arrow">
              <ArrowRight size={18} strokeWidth={2.2} />
            </span>
          </div>
        </SpotlightCard>

        {/* CARD 3 — lime */}
        <SpotlightCard as="article" className="stat stat--lime" spotlightColor="rgba(10, 15, 29, 0.08)">
          <span className="stat-n" aria-hidden="true">03</span>
          <span className="stat-badge">
            <Users size={19} strokeWidth={2.2} />
          </span>
          <div className="stat-num" ref={num3Ref}>520k+</div>
          <div className="stat-label">Monthly Users</div>
          <p className="stat-desc">
            High-traffic apps{' '}
            <br />
            that make an impact.
          </p>

          <svg className="stat-bars" width="130" height="120" viewBox="0 0 130 120" fill="none" aria-hidden="true">
            <rect x="4" y="72" width="28" height="48" rx="6" fill="#0A0F1D" opacity=".1" />
            <rect x="42" y="44" width="28" height="76" rx="6" fill="#0A0F1D" opacity=".12" />
            <rect x="80" y="16" width="28" height="104" rx="6" fill="#0A0F1D" opacity=".09" />
          </svg>

          <div className="stat-foot">
            <span />
            <span className="stat-arrow">
              <ArrowRight size={18} strokeWidth={2.4} />
            </span>
          </div>
        </SpotlightCard>

        {/* CARD 4 — mobile only: 7+ Years, sourced from the Experience banner */}
        {isMobile && (
          <SpotlightCard as="article" className="stat stat--years" spotlightColor="rgba(210, 255, 40, 0.16)">
            <span className="stat-n" aria-hidden="true">04</span>
            <span className="stat-badge">
              <Award size={19} strokeWidth={2.1} />
            </span>
            <div className="stat-num" ref={num4Ref}>7+</div>
            <div className="stat-label">Years of Experience</div>
            <p className="stat-desc">Building what's next.</p>

            <div className="stat-foot">
              <span />
              <span className="stat-arrow">
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </span>
            </div>
          </SpotlightCard>
        )}
      </div>
    </section>
  );
}
