import { useRef, useEffect } from 'react';
import { Star, ArrowUpRight, MapPin, Users, ThumbsUp } from 'lucide-react';
import { GOOGLE, COMPANY } from '../data/site';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

function GMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.3c4.1-3.8 6.6-9.4 6.6-15.6z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8 41.3 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 10z" />
      <path fill="#EA4335" d="M24 10.6c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.5 29.9 2 24 2 15.4 2 8 6.7 4.4 14l7.1 5.5c1.8-5.3 6.7-8.9 12.5-8.9z" />
    </svg>
  );
}

export default function Reviews() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const elements = [
        el.querySelector('.sec-head'),
        el.querySelector('.rev-badge'),
        el.querySelector('.rev-place'),
        el.querySelector('.outline-btn'),
        el.querySelector('.rev-stats'),
      ].filter(Boolean);

      if (reduced) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        elements,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
          onComplete: () => {
            gsap.set(elements, { clearProps: 'transform' });
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="reviews" id="reviews" ref={sectionRef}>
      <div className="shell">
        <div className="sec-head">
          <span className="pill"><GMark size={16} />Google Reviews</span>
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real businesses, verified on our Google Business profile.</p>
        </div>

        <div className="rev-badge">
          <GMark size={40} />
          <div className="rev-score">
            <strong>{GOOGLE.rating}<span>/{GOOGLE.outOf}</span></strong>
            <span className="rev-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={17} fill={i < 4 ? '#FFCE1F' : 'none'} color="#F2B705" strokeWidth={1.6} />
              ))}
            </span>
            <p>Based on {GOOGLE.count} Google reviews</p>
          </div>
          <span className="rev-div" />
          <a className="rev-go" href={GOOGLE.url} target="_blank" rel="noopener noreferrer">
            <span>Google<br />Reviews</span>
            <span className="rev-arrow"><ArrowUpRight size={18} strokeWidth={2.4} /></span>
          </a>
        </div>

        <div className="rev-place">
          <MapPin size={17} strokeWidth={2.2} />
          <p>
            <strong>{COMPANY.name}</strong>
            {COMPANY.address.join(' ')}
          </p>
        </div>

        <a
          className="outline-btn"
          href={GOOGLE.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Google Reviews <ArrowUpRight size={16} strokeWidth={2.4} />
        </a>

        <div className="rev-stats">
          <div><Users size={26} strokeWidth={2} /><strong>{GOOGLE.count}</strong><span>Google Reviews</span></div>
          <span className="rs-div" />
          <div><Star size={26} strokeWidth={2} /><strong>{GOOGLE.rating}/{GOOGLE.outOf}</strong><span>Average Rating</span></div>
          <span className="rs-div" />
          <div><ThumbsUp size={26} strokeWidth={2} /><strong>7+</strong><span>Years Delivering</span></div>
        </div>
      </div>
    </section>
  );
}
