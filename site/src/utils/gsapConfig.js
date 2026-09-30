import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const isReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
    window.innerWidth <= 860);

export { gsap, ScrollTrigger, SplitText };
