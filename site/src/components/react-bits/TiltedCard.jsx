import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

/**
 * TiltedCard — Inspired by React Bits TiltedCard component.
 * Gives cards tactile 3D perspective tilt and specular reflection on hover.
 * Gracefully reverts to standard card on touch screens and prefers-reduced-motion.
 */
export default function TiltedCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.16,
  scaleOnHover = 1.02,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.innerWidth <= 860
    );
  });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig);

  const glareX = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouch || shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = Math.max(0, Math.min(1, clientX / rect.width));
      const normY = Math.max(0, Math.min(1, clientY / rect.height));

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [isTouch, shouldReduceMotion, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    if (!isTouch && !shouldReduceMotion) {
      setIsHovered(true);
    }
  }, [isTouch, shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  if (isTouch || shouldReduceMotion) {
    return (
      <div className={`tilted-card ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: `${perspective}px`, transformStyle: 'preserve-3d' }}
      className="tilted-card-perspective-wrapper"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className={`tilted-card ${className}`}
        {...props}
      >
        {children}

        {glare && isHovered && (
          <motion.div
            className="tilted-card-glare"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.7) 0%, transparent 65%)`,
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}
