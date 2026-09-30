import { useEffect, useState } from 'react';

/**
 * True when the viewport is at or below `max` px.
 * Used to switch on mobile-only behaviour without touching desktop paths.
 * SSR/first-paint safe: starts false, corrects on mount.
 */
export default function useIsMobile(max = 720) {
  const [is, setIs] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${max}px)`);
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [max]);

  return is;
}
