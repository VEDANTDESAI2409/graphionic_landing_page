import { useReducedMotion } from 'framer-motion';

/**
 * BorderTrail — Inspired by React Bits BorderTrail component.
 * Renders a subtle light beam that glides continuously along the border perimeter
 * of a featured card, guiding visitor attention to high-value focal items.
 */
export default function BorderTrail({
  className = '',
  size = 120,
  duration = 8,
  color = '#D2FF28',
  trailOpacity = 0.85,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className={`border-trail-container ${className}`} aria-hidden="true">
      <div
        className="border-trail-beam"
        style={{
          '--trail-size': `${size}px`,
          '--trail-duration': `${duration}s`,
          '--trail-color': color,
          '--trail-opacity': trailOpacity,
        }}
      />
    </div>
  );
}
