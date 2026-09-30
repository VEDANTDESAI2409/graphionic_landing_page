import { useEffect, useRef } from 'react';
import { Play, ArrowUpRight, Star } from 'lucide-react';
import Sky from './Sky';
import { useInquiry, scrollToId } from '../context/Inquiry';
import ServiceFan from './ServiceFan';
import Aurora from './react-bits/Aurora';
import Magnet from './react-bits/Magnet';
import ShinyText from './react-bits/ShinyText';
import { gsap, SplitText, isReducedMotion, isTouchDevice } from '../utils/gsapConfig';

export default function Hero() {
  const { openInquiry } = useInquiry();
  const heroRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Small hero eyebrow/badge appears first
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, delay: 0.1 }
      );

      // 2. Main heading reveals line-by-line using SplitText
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: 'lines',
          linesClass: 'split-line',
        });

        tl.fromTo(
          split.lines,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '-=0.45'
        );
      }

      // 3. Highlight "Digital Growth" text subtle emphasis
      tl.fromTo(
        '.hero-h1 .lime',
        { opacity: 0.7, textShadow: '0 0 0px rgba(210, 255, 40, 0)' },
        {
          opacity: 1,
          textShadow: '0 6px 28px rgba(210, 255, 40, 0.42)',
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // 4. Supporting paragraph fades/slides upward
      tl.fromTo(
        '.hero-sub',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.45'
      );

      // 5. CTA buttons reveal with a slight stagger
      tl.fromTo(
        '.hero-ctas .btn',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
        '-=0.45'
      );

      // 6. Trust proof badge
      tl.fromTo(
        '.hero-proof',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

      // 7. Decorative side elements
      tl.fromTo(
        '.hero-words',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.85 },
        '-=0.5'
      );
      tl.fromTo(
        '.hero-scribble',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.85 },
        '-=0.75'
      );

      // 8. Mouse parallax on desktop (subtle ±5-8px via gsap.quickTo)
      if (!isTouchDevice()) {
        const xToCard = gsap.quickTo('.fan-wrap', 'x', { duration: 0.7, ease: 'power2.out' });
        const yToCard = gsap.quickTo('.fan-wrap', 'y', { duration: 0.7, ease: 'power2.out' });
        const xToScribble = gsap.quickTo('.hero-scribble', 'x', { duration: 0.9, ease: 'power2.out' });
        const yToScribble = gsap.quickTo('.hero-scribble', 'y', { duration: 0.9, ease: 'power2.out' });
        const xToWords = gsap.quickTo('.hero-words', 'x', { duration: 0.9, ease: 'power2.out' });
        const yToWords = gsap.quickTo('.hero-words', 'y', { duration: 0.9, ease: 'power2.out' });

        const onMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const nx = (clientX / innerWidth - 0.5) * 2;
          const ny = (clientY / innerHeight - 0.5) * 2;

          xToCard(nx * 7);
          yToCard(ny * 6);
          xToScribble(-nx * 8);
          yToScribble(-ny * 7);
          xToWords(nx * 6);
          yToWords(ny * 5);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMouseMove);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <Sky />
      <Aurora colorStops={['#007AFF', '#00A3FF', '#7CD400']} speed={0.65} />
      <div className="hero-glow" />
      <div className="hero-vignette" />

      {/* decorative left keywords */}
      <div className="hero-words" aria-hidden="true">
        <span>Build</span>
        <span>Develop</span>
        <span>Automate</span>
        <span>Grow</span>
      </div>

      {/* decorative right scribble */}
      <div className="hero-scribble" aria-hidden="true">
        <svg viewBox="0 0 70 60" fill="none">
          <path
            d="M4 4c14 2 30 8 38 20 5 8 3 17-4 20-5 2-9-2-7-7 3-7 14-11 26-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M57 26l-4 2.5 4.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <em>
          Ideas
          <br />
          Into Impact
        </em>
      </div>

      <div className="hero-content">
        <div className="shell">
          <div className="hero-copy">
            {/* eyebrow pill */}
            <div>
              <span className="hero-eyebrow">
                <i className="hero-eyebrow-dot" aria-hidden="true" />
                <ShinyText speed={4}>Full-Stack Product Studio</ShinyText>
              </span>
            </div>

            <h1 className="hero-h1" ref={headingRef}>
              <span style={{ display: 'block' }}>Building the Future of</span>
              <span className="line2" style={{ display: 'block' }}>
                Web, Apps &amp; <span className="lime">Digital Growth</span>
              </span>
            </h1>

            <p className="hero-sub">
              We help businesses scale through custom full-stack web applications,
              mobile apps, and intelligent business automation systems.
            </p>

            <div className="hero-ctas">
              <Magnet magnetStrength={0.25} padding={40}>
                <button className="btn btn-lime" onClick={openInquiry}>
                  Get Started
                  <span className="ico">
                    <ArrowUpRight size={17} strokeWidth={2.6} />
                  </span>
                </button>
              </Magnet>
              <Magnet magnetStrength={0.2} padding={30}>
                <button className="btn btn-glass" onClick={() => scrollToId('projects')}>
                  View Work
                  <span className="ico">
                    <Play size={13} fill="currentColor" strokeWidth={0} />
                  </span>
                </button>
              </Magnet>
            </div>

            {/* trust signal, lifted into the first fold */}
            <div className="hero-proof">
              <span className="stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="#FFCE1F" color="#F2B705" strokeWidth={1} />
                ))}
              </span>
              <p>Rated 4.9/5 by 100+ Clients</p>
            </div>
          </div>
        </div>

        <div className="fan-wrap" id="services">
          <ServiceFan />
        </div>
      </div>
    </section>
  );
}
