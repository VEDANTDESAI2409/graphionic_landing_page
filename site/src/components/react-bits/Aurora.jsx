import { useReducedMotion } from 'framer-motion';

/**
 * Aurora — Inspired by React Bits Aurora background effect.
 * Creates smooth, organic, undulating gradient waves with restrained opacity
 * that provides creative-tech ambiance without being overpowering or neon.
 */
export default function Aurora({
  colorStops = ['#007AFF', '#00A3FF', '#7CD400'],
  speed = 0.8,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`aurora-static ${className}`}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.28,
          background: `radial-gradient(ellipse 65% 50% at 50% 0%, ${colorStops[0]} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`aurora-container ${className}`} aria-hidden="true">
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          background: `radial-gradient(circle, ${colorStops[0]} 0%, transparent 68%)`,
          animationDuration: `${16 / speed}s`,
        }}
      />
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          background: `radial-gradient(circle, ${colorStops[1]} 0%, transparent 68%)`,
          animationDuration: `${22 / speed}s`,
        }}
      />
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          background: `radial-gradient(circle, ${colorStops[2]} 0%, transparent 68%)`,
          animationDuration: `${18 / speed}s`,
        }}
      />
    </div>
  );
}
