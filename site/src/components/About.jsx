import { useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { gsap, SplitText, isReducedMotion } from '../utils/gsapConfig';

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

      if (reduced) {
        gsap.set([eyebrow, headingRef.current, desc, badge], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: 'lines',
          linesClass: 'split-line',
        });
        tl.fromTo(
          split.lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.3'
        );
      }

      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );
      }

      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="shell">
        <span className="eyebrow">
          <span className="dot" />
          About Us
        </span>

        {/* The {' '} before each <br /> keeps a real word space when the
            breaks are removed on mobile. Wording is unchanged. */}
        <h2 ref={headingRef}>
          <span className="strong">A global engineering partner</span>{' '}
          <br />
          dedicated to building <span className="b">smarter</span>{' '}
          <br />
          <span className="muted">&amp;</span> <span className="strong">adaptive</span>{' '}
          <span className="muted">digital solutions.</span>
        </h2>

        <p>
          We combine strategy, design, and technology to create high-performing
          digital products that help businesses grow, automate, and stay ahead
          in a rapidly changing world.
        </p>

        {/* Global Presence — compact badge, sits between the description
            and the statistics cards. */}
        <div className="globe-badge">
          <span className="globe-badge-ico" aria-hidden="true">
            <Globe size={20} strokeWidth={2.1} />
          </span>
          <span className="globe-badge-copy">
            <strong>USA · UK · AU · UAE</strong>
            <em>Global Presence</em>
          </span>
        </div>
      </div>
    </section>
  );
}
