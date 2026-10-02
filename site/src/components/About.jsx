import { useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import ScrollRevealWords from './react-bits/ScrollRevealWords';
import Magnet from './react-bits/Magnet';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const HEADING_WORDS = [
  // Line 1
  { text: 'A', className: 'strong' },
  { text: 'global', className: 'strong' },
  { text: 'engineering', className: 'strong' },
  { text: 'partner', className: 'strong', breakAfter: true },
  // Line 2
  { text: 'dedicated', className: '' },
  { text: 'to', className: '' },
  { text: 'building', className: '' },
  { text: 'smarter', className: 'b', breakAfter: true },
  // Line 3
  { text: '&', className: 'muted' },
  { text: 'adaptive', className: 'strong' },
  { text: 'digital', className: 'muted' },
  { text: 'solutions.', className: 'muted' },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const eyebrow = el.querySelector('.eyebrow');
      const desc = el.querySelector('p');
      const badge = el.querySelector('.globe-badge');
      const words = headingRef.current ? headingRef.current.querySelectorAll('.about-word') : [];

      if (reduced) {
        gsap.set([eyebrow, desc, badge], { opacity: 1, y: 0 });
        if (words.length) {
          gsap.set(words, { filter: 'none', opacity: 1, y: 0 });
        }
        return;
      }

      // 1. Clean entrance for surrounding elements (eyebrow, paragraph, globe badge)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });

      if (eyebrow) {
        entranceTl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      if (desc) {
        entranceTl.fromTo(
          desc,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );
      }

      if (badge) {
        entranceTl.fromTo(
          badge,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 2. Animos-style scroll-driven pinned word reveal across ALL 12 words
      if (words.length) {
        const isMobile = window.innerWidth <= 768;
        const maxBlur = isMobile ? 6 : 9;
        const baseY = isMobile ? 4 : 6;
        const initialOpacity = 0.32;

        // Set initial blurred state for ALL words (0..11) from the very first word
        gsap.set(words, {
          filter: `blur(${maxBlur}px)`,
          opacity: initialOpacity,
          y: baseY,
        });

        // Scrubbed timeline linked directly to the sticky scroll track progress
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });

        // Continuous overlapping sequence from Word 0 ("A") to Word 11 ("solutions.")
        const totalWords = words.length; // 12
        const step = 0.065;
        const wordDuration = 0.15;

        words.forEach((wordEl, i) => {
          const startTime = i * step;
          revealTl.to(
            wordEl,
            {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              duration: wordDuration,
              ease: 'power1.out',
            },
            startTime
          );
        });

        // End buffer: holds the entire 12-word statement 100% sharp before section releases
        const finalWordEnd = (totalWords - 1) * step + wordDuration; // 11 * 0.065 + 0.15 = 0.865
        const holdDuration = Math.max(0.05, 1.0 - finalWordEnd); // 0.135
        revealTl.to({}, { duration: holdDuration });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about about-track" id="about" ref={sectionRef}>
      <div className="about-sticky-stage">
        <div className="shell">
          <span className="eyebrow">
            <span className="dot" />
            About Us
          </span>

          <h2 ref={headingRef} className="about-reveal-heading">
            {HEADING_WORDS.map((item, idx) => (
              <span key={idx} className="about-word-wrap">
                <span
                  className={`about-word ${item.className || ''}`}
                  data-index={idx}
                >
                  {item.text}
                </span>
                {' '}
                {item.breakAfter && <br className="about-br" />}
              </span>
            ))}
          </h2>

          <p>
            <ScrollRevealWords>
              We combine strategy, design, and technology to create high-performing
              digital products that help businesses grow, automate, and stay ahead
              in a rapidly changing world.
            </ScrollRevealWords>
          </p>

          <Magnet magnetStrength={0.2} padding={25}>
            <div className="globe-badge">
              <span className="globe-badge-ico" aria-hidden="true">
                <Globe size={20} strokeWidth={2.1} />
              </span>
              <span className="globe-badge-copy">
                <strong>USA · UK · AU · UAE</strong>
                <em>Global Presence</em>
              </span>
            </div>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
