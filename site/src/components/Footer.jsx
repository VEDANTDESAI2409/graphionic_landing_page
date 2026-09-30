import { useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '../data/site';
import { useInquiry, scrollToId } from '../context/Inquiry';
import Magnet from './react-bits/Magnet';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const NAV = [
  { label: 'Home', id: 'top' },
  { label: 'Services', id: 'services' },
  { label: 'About Us', id: 'about' },
  { label: 'Our Work', id: 'projects' },
  { label: 'Why Graphionic?', id: 'why' },
  { label: 'FAQ', id: 'faq' },
];

const SERVICE_LINKS = [
  'Web & E-commerce', 'Web Apps', 'Mobile Apps',
  'Automation', 'AI Solutions', 'Support', 'SEO & Growth',
];

export default function Footer() {
  const footerRef = useRef(null);
  const { openInquiry } = useInquiry();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const cols = el.querySelectorAll('.foot-brand, .foot-col');

      if (reduced) {
        gsap.set(cols, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cols,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
          onComplete: () => {
            gsap.set(cols, { clearProps: 'transform' });
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="foot" ref={footerRef}>
      <div className="shell">
        <div className="foot-grid">
          {/* brand */}
          <div className="foot-brand">
            <span className="foot-logo">
              <svg viewBox="0 0 96 108" fill="none" aria-hidden="true">
                <path d="M48 3 L91 27.5 V80.5 L48 105 L5 80.5 V27.5 Z"
                  stroke="#fff" strokeWidth="7" strokeLinejoin="round" fill="none" />
                <path d="M70 40.5 A26 26 0 1 0 74 55.5 H48"
                  stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>
                <strong>GRAPHIONIC</strong>
                <em>INFOTECH</em>
              </span>
            </span>
            <p className="foot-blurb">
              A global engineering partner building smarter, adaptive digital
              solutions — web, mobile, and intelligent automation.
            </p>
            <Magnet magnetStrength={0.2} padding={25}>
              <button className="btn btn-lime foot-cta" onClick={openInquiry}>
                Start Your Project <span className="ico"><ArrowUpRight size={16} strokeWidth={2.6} /></span>
              </button>
            </Magnet>
          </div>

          {/* nav */}
          <div className="foot-col">
            <p className="foot-h">Navigation</p>
            <ul>
              {NAV.map((n) => (
                <li key={n.label}>
                  <button onClick={() => scrollToId(n.id)}>{n.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div className="foot-col">
            <p className="foot-h">Services</p>
            <ul>
              {SERVICE_LINKS.map((s) => (
                <li key={s}><button onClick={() => scrollToId('services')}>{s}</button></li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="foot-col foot-contact">
            <p className="foot-h">Get in Touch</p>
            <ul>
              <li>
                <a href={`mailto:${COMPANY.email}`}>
                  <Mail size={16} strokeWidth={2.1} />{COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone size={16} strokeWidth={2.1} />{COMPANY.phone}
                </a>
              </li>
              <li className="foot-addr">
                <MapPin size={16} strokeWidth={2.1} />
                <span>{COMPANY.address.map((l) => <span key={l}>{l}</span>)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Global Thinking · Local Impact</p>
        </div>
      </div>
    </footer>
  );
}
