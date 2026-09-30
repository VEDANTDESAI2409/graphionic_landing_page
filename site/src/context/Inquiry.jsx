import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const Ctx = createContext({ open: false, openInquiry: () => {}, closeInquiry: () => {} });

export function InquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openInquiry = useCallback(() => setOpen(true), []);
  const closeInquiry = useCallback(() => setOpen(false), []);

  // lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (typeof window !== 'undefined' && window.__lenis) {
      if (open) window.__lenis.stop();
      else window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <Ctx.Provider value={{ open, openInquiry, closeInquiry }}>{children}</Ctx.Provider>;
}

export const useInquiry = () => useContext(Ctx);

/* Smooth scroll helper shared by every nav link / CTA */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -76, duration: 1.15 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 76; // sticky-nav offset
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
