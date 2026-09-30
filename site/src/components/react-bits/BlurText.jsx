import { motion, useReducedMotion } from 'framer-motion';

/**
 * BlurText — Inspired by React Bits BlurText component.
 * Reveals text word-by-word with subtle blur and translation for a cinematic,
 * high-end agency feel.
 */
export default function BlurText({
  text = '',
  delay = 120,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  threshold = 0.1,
  rootMargin = '-50px',
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={`blur-text ${className}`}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 20,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      className={`blur-text ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      onAnimationComplete={onAnimationComplete}
      style={{ display: 'inline-block' }}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}
