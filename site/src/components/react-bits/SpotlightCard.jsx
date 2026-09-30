import { useRef, useState, useCallback } from 'react';

/**
 * SpotlightCard — Inspired by React Bits SpotlightCard component.
 * Features a subtle radial spotlight gradient that tracks the user's cursor across
 * the card surface, creating tactile interactivity.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 122, 255, 0.14)',
  spotlightSize = 360,
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.innerWidth <= 860
    );
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setOpacity(1);
    },
    [isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {!isTouch && (
        <div
          className="spotlight-layer"
          style={{
            opacity,
            background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
