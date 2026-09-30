import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart, Code2, Smartphone, Settings, Brain, Headphones, BarChart3,
  ChevronLeft, ChevronRight, ArrowUpRight,
} from 'lucide-react';
import { PREVIEWS } from './ServicePreviews';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

/* ---------------------------------------------------------------
   Preserve existing SERVICES export for Services.jsx compatibility.
---------------------------------------------------------------- */
export const SERVICES = [
  { title: 'Web &\nE-commerce', Icon: ShoppingCart, tint: '#007AFF' },
  { title: 'Web\nApps', Icon: Code2, tint: '#007AFF', boxed: true },
  { title: 'Mobile\nApps', Icon: Smartphone, tint: '#12B3A0' },
  { title: 'Automation', Icon: Settings, tint: '#007AFF' },
  { title: 'AI\nSolutions', Icon: Brain, tint: '#8B5CF6' },
  { title: 'Support', Icon: Headphones, tint: '#1F2A44' },
  { title: 'SEO &\nGrowth', Icon: BarChart3, tint: '#22C55E' },
];

/* ---------------------------------------------------------------
   Exactly 5 cards arranged along a smooth rounded/semi-circular curve.
   Center card (Automation) is the visual focal point.
---------------------------------------------------------------- */
export const FIVE_CARDS = [
  {
    id: 'web-apps',
    title: 'Web Apps',
    subtitle: 'High-Performance SaaS',
    Icon: Code2,
    tint: '#007AFF',
    boxed: true,
    previewIndex: 1, // PrevWebApp
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    subtitle: 'iOS & Android Native',
    Icon: Smartphone,
    tint: '#12B3A0',
    boxed: false,
    previewIndex: 2, // PrevMobile
  },
  {
    id: 'automation',
    title: 'Automation',
    subtitle: 'Intelligent Workflows',
    Icon: Settings,
    tint: '#007AFF',
    boxed: false,
    previewIndex: 3, // PrevAutomation (Center focal point)
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    subtitle: 'Custom LLMs & Agents',
    Icon: Brain,
    tint: '#8B5CF6',
    boxed: false,
    previewIndex: 4, // PrevAi
  },
  {
    id: 'seo-growth',
    title: 'SEO & Growth',
    subtitle: 'Organic Traffic & Scale',
    Icon: BarChart3,
    tint: '#22C55E',
    boxed: false,
    previewIndex: 6, // PrevSeo
  },
];

// Brand approved easing curve
const ease = [0.22, 1, 0.36, 1];

function getCurveParams(p, viewportWidth) {
  const isDesktop = viewportWidth > 1100;
  const isLaptop = viewportWidth <= 1100 && viewportWidth > 860;
  const isTablet = viewportWidth <= 860 && viewportWidth > 540;
  const isMobile = viewportWidth <= 540;

  // Horizontal spacing between adjacent card centers
  const xSpacing = isDesktop ? 222 : isLaptop ? 176 : isTablet ? 120 : 82;
  // Arc drop factor
  const yFactor = isDesktop ? 15.5 : isLaptop ? 13.5 : isTablet ? 11 : 8.5;
  // Fan rotation degrees per slot
  const rotFactor = isDesktop ? 5.8 : isLaptop ? 5.0 : isTablet ? 4.2 : 3.5;
  // 3D perspective rotation (curving inwards toward camera)
  const rotYFactor = isDesktop ? -4.5 : isLaptop ? -3.8 : isTablet ? -2.6 : -1.8;

  const absP = Math.abs(p);

  const x = p * xSpacing;
  const y = Math.pow(absP, 1.85) * yFactor;
  const rotateZ = p * rotFactor;
  const rotateY = p * rotYFactor;

  // Scale: Center focal card (p=0) is largest and prominent
  const scaleStep = isDesktop ? 0.11 : isLaptop ? 0.10 : isTablet ? 0.09 : 0.08;
  const scale = Math.max(0.72, 1.08 - absP * scaleStep);

  // Elevation hierarchy: Apex center card highest (z=10), flanking cards lower
  const zIndex = Math.max(1, Math.round(10 - absP * 2.5));

  // Opacity: full for visible 5 cards, tailored for mobile viewports
  let opacity = 1;
  if (absP > 2.3) {
    opacity = 0;
  } else if (absP > 1.8) {
    opacity = isMobile ? 0.35 : isTablet ? 0.75 : 0.92;
  }

  return { x, y, rotateZ, rotateY, scale, zIndex, opacity };
}

function CardInner({ item, focal }) {
  const { Icon, title, subtitle, tint, boxed, previewIndex } = item;
  const Preview = PREVIEWS[previewIndex];

  return (
    <>
      <div className="svc-top">
        <div className="svc-top-left">
          <span
            className="svc-icon-box"
            style={{
              background: boxed ? tint : `${tint}15`,
              color: boxed ? '#FFFFFF' : tint,
            }}
          >
            <Icon size={focal ? 21 : 19} strokeWidth={boxed ? 2.5 : 2.2} />
          </span>
          <div className="svc-title-wrap">
            <h3 className="svc-title">{title}</h3>
            <span className="svc-sub">{subtitle}</span>
          </div>
        </div>

        <span className="svc-arrow" aria-hidden="true">
          <ArrowUpRight size={14} strokeWidth={2.4} />
        </span>
      </div>

      <div className="svc-prev" aria-hidden="true">
        {Preview ? <Preview /> : null}
      </div>
    </>
  );
}

export default function ServiceFan() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const [activeStep, setActiveStep] = useState(2); // Center on Automation (index 2) initially
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const touchStartX = useRef(null);

  // Responsive window resize tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle ScrollTrigger entrance for the curved fan section
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onComplete: () => {
            gsap.set(el, { clearProps: 'transform' });
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // Continuous smooth auto-advance along the curved path
  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveStep((prev) => prev + 1);
    }, 3400);

    return () => clearInterval(timer);
  }, [paused, reduce]);

  const stepTo = useCallback((targetIndex) => {
    const activeIndex = ((activeStep % 5) + 5) % 5;
    const diff = targetIndex - activeIndex;
    const shortestDiff = diff > 2 ? diff - 5 : diff < -2 ? diff + 5 : diff;
    setDirection(shortestDiff >= 0 ? 1 : -1);
    setActiveStep((prev) => prev + shortestDiff);
  }, [activeStep]);

  const handleCardClick = (slotOffset) => {
    if (slotOffset === 0) return;
    setDirection(slotOffset > 0 ? 1 : -1);
    setActiveStep((prev) => prev + slotOffset);
  };

  const handleTouchStart = (e) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setPaused(false);
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setDirection(1);
        setActiveStep((s) => s + 1);
      } else {
        setDirection(-1);
        setActiveStep((s) => s - 1);
      }
    }
    touchStartX.current = null;
  };

  // 5 visible slots: -2, -1, 0, 1, 2
  const visibleSlots = [-2, -1, 0, 1, 2];
  const activeFocalIndex = ((activeStep % 5) + 5) % 5;

  return (
    <div
      className="fan-wrap"
      id="services"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive services showcase"
    >
      <div className="fan">
        <div className="fan-track">
          <AnimatePresence initial={false}>
            {visibleSlots.map((slot) => {
              const itemIndex = (((activeStep + slot) % 5) + 5) % 5;
              const item = FIVE_CARDS[itemIndex];
              const isFocal = slot === 0;
              const curve = getCurveParams(slot, windowWidth);

              return (
                <motion.article
                  key={`${item.id}-${activeStep + slot}`}
                  className={`svc${isFocal ? ' is-focal' : ''}`}
                  style={{
                    zIndex: curve.zIndex,
                  }}
                  initial={
                    reduce
                      ? false
                      : {
                          x: getCurveParams(slot + (direction > 0 ? 1 : -1), windowWidth).x,
                          y: getCurveParams(slot + (direction > 0 ? 1 : -1), windowWidth).y,
                          rotateZ: getCurveParams(slot + (direction > 0 ? 1 : -1), windowWidth).rotateZ,
                          rotateY: getCurveParams(slot + (direction > 0 ? 1 : -1), windowWidth).rotateY,
                          scale: getCurveParams(slot + (direction > 0 ? 1 : -1), windowWidth).scale,
                          opacity: 0.35,
                        }
                  }
                  animate={{
                    x: curve.x,
                    y: curve.y,
                    rotateZ: curve.rotateZ,
                    rotateY: curve.rotateY,
                    scale: curve.scale,
                    opacity: curve.opacity,
                  }}
                  exit={
                    reduce
                      ? false
                      : {
                          x: getCurveParams(slot - (direction > 0 ? 1 : -1), windowWidth).x,
                          y: getCurveParams(slot - (direction > 0 ? 1 : -1), windowWidth).y,
                          rotateZ: getCurveParams(slot - (direction > 0 ? 1 : -1), windowWidth).rotateZ,
                          rotateY: getCurveParams(slot - (direction > 0 ? 1 : -1), windowWidth).rotateY,
                          scale: getCurveParams(slot - (direction > 0 ? 1 : -1), windowWidth).scale,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: reduce ? 0 : 1.15,
                    ease,
                  }}
                  onClick={() => handleCardClick(slot)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(slot);
                    }
                  }}
                  aria-label={`${item.title} service card${isFocal ? ', currently selected' : ''}`}
                >
                  <motion.div
                    className="svc-float"
                    animate={
                      reduce
                        ? undefined
                        : {
                            y: isFocal ? [0, -6, 0] : [0, -4, 0],
                          }
                    }
                    transition={{
                      duration: 4.8 + Math.abs(slot) * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: Math.abs(slot) * 0.25,
                    }}
                  >
                    <CardInner item={item} focal={isFocal} />
                  </motion.div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation controls / dots */}
      <div className="fan-nav" aria-label="Services carousel controls">
        <button
          className="fan-ctrl-btn"
          onClick={() => {
            setDirection(-1);
            setActiveStep((s) => s - 1);
          }}
          aria-label="Previous service"
        >
          <ChevronLeft size={16} strokeWidth={2.4} />
        </button>

        <div className="fan-dots">
          {FIVE_CARDS.map((card, idx) => {
            const isActive = activeFocalIndex === idx;
            return (
              <button
                key={card.id}
                className={`fan-dot${isActive ? ' is-active' : ''}`}
                onClick={() => stepTo(idx)}
                aria-label={`View ${card.title}`}
                aria-current={isActive ? 'true' : undefined}
              />
            );
          })}
        </div>

        <button
          className="fan-ctrl-btn"
          onClick={() => {
            setDirection(1);
            setActiveStep((s) => s + 1);
          }}
          aria-label="Next service"
        >
          <ChevronRight size={16} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
