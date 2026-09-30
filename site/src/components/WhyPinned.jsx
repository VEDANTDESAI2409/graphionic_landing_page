import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/* ============================================================================
   MOBILE-ONLY pinned + scrubbed reveal for the Why Graphionic cards.

   Equivalent of GSAP's `ScrollTrigger { pin: true, scrub: 1 }`, built on the
   scroll primitives already in the project (framer-motion) instead of pulling
   in GSAP:

     - the outer .whyp element is a tall scroll track  -> supplies scroll length
     - the inner .whyp-stage is `position: sticky`     -> that IS the pin
     - useScroll() maps track progress to 0..1
     - each card's opacity/y/scale is driven by that progress -> that IS scrub
     - `damping` on the spring gives the same eased lag as scrub: 1

   The cards land in a 2x2 grid, so all four end up visible in roughly one
   screen instead of a 4-card vertical stack. Card markup is rendered by the
   parent and passed in as children — design, content, icons, colours and
   order are untouched.
   ========================================================================= */

const STEP = 1 / 4; // four cards share the track equally

export default function WhyPinned({ items }) {
  const trackRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // start pinning when the track's top hits the top of the viewport,
    // release when its bottom reaches the bottom
    offset: ['start start', 'end end'],
  });

  return (
    <div className="whyp" ref={trackRef}>
      <div className="whyp-stage">
        <div className="whyp-grid">
          {items.map((node, i) => (
            <Card key={i} i={i} progress={scrollYProgress} reduce={reduce}>
              {node}
            </Card>
          ))}
        </div>

        <Progress progress={scrollYProgress} count={items.length} />
      </div>
    </div>
  );
}

function Card({ i, progress, reduce, children }) {
  // card i occupies [i*STEP, i*STEP + STEP] of the track, with a little
  // overlap so consecutive reveals feel continuous rather than stepped
  const start = i * STEP;
  const end = start + STEP * 0.85;

  /* Explicit three-point ranges with a hold at 1: once a card has been
     revealed it STAYS revealed for the rest of the pin, so scrolling
     forward never un-reveals an earlier card. */
  const opacity = useTransform(progress, [start, end, 1], [0, 1, 1]);
  const y = useTransform(progress, [start, end, 1], [46, 0, 0]);
  const scale = useTransform(progress, [start, end, 1], [0.94, 1, 1]);

  if (reduce) return <div className="whyp-card">{children}</div>;

  return (
    <motion.div className="whyp-card" style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

function Progress({ progress, count }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <div className="whyp-bar" aria-hidden="true">
      <motion.span className="whyp-bar-fill" style={{ width }} />
      <span className="whyp-bar-count">{count} reasons</span>
    </div>
  );
}
