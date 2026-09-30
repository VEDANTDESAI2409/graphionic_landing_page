import { motion, useReducedMotion } from 'framer-motion';

/**
 * ScrollRevealWords — Inspired by React Bits ScrollReveal text pattern.
 * Reveals editorial words progressively as they enter view, turning
 * subdued typography into crisp, focused reading.
 */
export default function ScrollRevealWords({
  children,
  className = '',
  threshold = 0.2,
  stagger = 0.035,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (typeof children !== 'string' || shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0.2, y: 10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      className={`scroll-reveal-words ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '-60px' }}
      style={{ display: 'inline' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          style={{ display: 'inline-block', willChange: 'opacity, transform, filter' }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}
