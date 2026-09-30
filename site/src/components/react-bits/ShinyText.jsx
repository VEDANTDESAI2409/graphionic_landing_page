import { useReducedMotion } from 'framer-motion';

/**
 * ShinyText — Inspired by React Bits ShinyText component.
 * Sweeps a subtle light reflection across text, giving pill badges and headings
 * a refined, premium feel.
 */
export default function ShinyText({
  children,
  className = '',
  speed = 4,
  disabled = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (disabled || shouldReduceMotion) {
    return <span className={`shiny-text-static ${className}`}>{children}</span>;
  }

  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {children}
    </span>
  );
}
