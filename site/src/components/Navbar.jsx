import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import { useInquiry, scrollToId } from '../context/Inquiry';

const LINKS = [
  { label: 'Home', id: 'top' },
  { label: 'Services', id: 'services' },
  { label: 'About Us', id: 'about' },
  { label: 'Our Work', id: 'projects' },
];

/* Mobile-only: every major section that actually exists on the page.
   Each id is present in the DOM — verified against the section markup. */
const MOBILE_LINKS = [
  { label: 'Home', id: 'top' },
  { label: 'Services', id: 'services' },
  { label: 'About Us', id: 'about' },
  { label: 'Impact & Numbers', id: 'stats' },
  { label: 'Experience', id: 'experience' },
  { label: 'Our Work', id: 'projects' },
  { label: 'Why Graphionic', id: 'why' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

function Logo() {
  return (
    <span className="brand-mark">
      <svg viewBox="0 0 96 108" fill="none" aria-hidden="true">
        {/* outer hexagon ring */}
        <path
          d="M48 3 L91 27.5 V80.5 L48 105 L5 80.5 V27.5 Z"
          stroke="currentColor" strokeWidth="7"
          strokeLinejoin="round" fill="none"
        />
        {/* inner hexagonal G */}
        <path
          d="M70 40.5 A26 26 0 1 0 74 55.5 H48"
          stroke="currentColor" strokeWidth="9"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openInquiry } = useInquiry();
  const [stuck, setStuck] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    if (!open) return;
    const onResize = () => window.innerWidth > 980 && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 30);
      const hero = document.getElementById('top');
      const limit = hero ? hero.offsetTop + hero.offsetHeight - 90 : 700;
      setOnLight(window.scrollY > limit);

      // highlight whichever section is currently under the navbar
      const line = window.scrollY + 140;
      let current = 'top';
      for (const l of MOBILE_LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= line) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`nav${stuck ? ' is-stuck' : ''}${onLight ? ' on-light' : ''}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => scrollToId('top')}
            aria-label="Graphionic Infotech home"
          >
            <Logo />
            <span className="brand-text">
              <span className="brand-top">GRAPHIONIC</span>
              <br />
              <span className="brand-bottom">INFOTECH</span>
            </span>
          </button>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.label}
                className={`nav-link${active === l.id ? ' active' : ''}`}
                onClick={() => scrollToId(l.id)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button className="nav-cta" onClick={openInquiry}>
            Start Your Project
            <ArrowRight size={16} strokeWidth={2.6} />
          </button>

          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-inner">
              <span className="mm-label">Navigate</span>

              <nav className="mm-links" aria-label="Mobile sections">
                {MOBILE_LINKS.map((l, i) => (
                  <button
                    key={l.id}
                    className={`mm-link${active === l.id ? ' is-active' : ''}`}
                    onClick={() => { setOpen(false); setTimeout(() => scrollToId(l.id), 380); }}
                  >
                    <span className="mm-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mm-t">{l.label}</span>
                    <ChevronRight className="mm-c" size={17} strokeWidth={2.3} />
                  </button>
                ))}
              </nav>

              <button className="nav-cta mm-cta" onClick={() => { setOpen(false); openInquiry(); }}>
                Start Your Project <ArrowRight size={16} strokeWidth={2.6} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
