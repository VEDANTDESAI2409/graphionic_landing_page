import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnet — Inspired by React Bits Magnet component.
 * Attracts child element toward mouse cursor within a magnetic threshold.
 * Uses spring physics for natural return on mouse leave.
 * Automatically disabled on touch devices and when prefers-reduced-motion is active.
 */
export default function Magnet({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 0.35,
  springConfig = { damping: 18, stiffness: 220, mass: 0.2 },
  className = '',
  active = true,
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.innerWidth <= 860
    );
  });

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (disabled || shouldReduceMotion || isTouch || !active || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDistance) {
        x.set(distanceX * magnetStrength);
        y.set(distanceY * magnetStrength);
        if (!isHovered) setIsHovered(true);
      } else {
        x.set(0);
        y.set(0);
        if (isHovered) setIsHovered(false);
      }
    },
    [disabled, shouldReduceMotion, isTouch, active, padding, magnetStrength, x, y, isHovered]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  if (disabled || shouldReduceMotion || isTouch) {
    return (
      <div className={`magnet-wrap ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`magnet-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
