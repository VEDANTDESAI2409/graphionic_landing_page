import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

// Procedural SVG sky: soft cloud banks built from layered blurred ellipses.
// Purely vector — no images, no external assets.

const Puff = ({ cx, cy, rx, ry, o }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" opacity={o} />
);

function CloudBank({ x, y, s = 1, o = 0.9, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
      <Puff cx={0} cy={0} rx={150} ry={38} o={0.95} />
      <Puff cx={-95} cy={8} rx={95} ry={28} o={0.85} />
      <Puff cx={92} cy={10} rx={105} ry={26} o={0.8} />
      <Puff cx={-40} cy={-24} rx={72} ry={36} o={0.9} />
      <Puff cx={44} cy={-30} rx={62} ry={32} o={0.85} />
      <Puff cx={6} cy={-52} rx={48} ry={28} o={0.7} />
      <Puff cx={-140} cy={22} rx={80} ry={20} o={0.6} />
      <Puff cx={150} cy={24} rx={90} ry={18} o={0.55} />
    </g>
  );
}

export default function Sky() {
  const skyRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Foreground cloud deck: slightly faster scrub movement
      gsap.to('.sky-cloud-near, .sky-cloud-deck', {
        y: -35,
        x: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: skyRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Mid cloud layer: moderate scrub movement
      gsap.to('.sky-cloud-mid', {
        y: -22,
        x: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: skyRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Far high-altitude wisps: slower scrub movement
      gsap.to('.sky-cloud-far', {
        y: -12,
        x: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: skyRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, skyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-sky" ref={skyRef} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="blurA" x="-40%" y="-60%" width="180%" height="240%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="blurB" x="-40%" y="-60%" width="180%" height="240%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <filter id="blurC" x="-40%" y="-60%" width="180%" height="240%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.92" />
          </linearGradient>
        </defs>

        {/* far, very soft high-altitude wisps */}
        <g className="sky-cloud-far" filter="url(#blurB)" opacity="0.38">
          <CloudBank x={180} y={120} s={0.85} />
          <CloudBank x={1180} y={90} s={0.7} flip />
          <CloudBank x={720} y={60} s={0.55} />
        </g>

        {/* mid layer */}
        <g className="sky-cloud-mid" filter="url(#blurA)" opacity="0.55">
          <CloudBank x={90} y={330} s={1.0} />
          <CloudBank x={1330} y={300} s={1.05} flip />
          <CloudBank x={470} y={250} s={0.5} opacity={0.5} />
        </g>

        {/* lower dense cloud deck under the cards */}
        <g className="sky-cloud-near" filter="url(#blurA)" opacity="0.9">
          <CloudBank x={120} y={640} s={1.35} />
          <CloudBank x={560} y={700} s={1.15} flip />
          <CloudBank x={1000} y={655} s={1.3} />
          <CloudBank x={1380} y={710} s={1.2} flip />
        </g>

        <g className="sky-cloud-deck" filter="url(#blurC)" opacity="0.75">
          <CloudBank x={320} y={790} s={1.1} />
          <CloudBank x={840} y={815} s={1.25} flip />
          <CloudBank x={1260} y={800} s={1.0} />
        </g>

        <rect x="0" y="560" width="1440" height="340" fill="url(#haze)" />
      </svg>
    </div>
  );
}
