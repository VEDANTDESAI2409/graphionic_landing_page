import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { PROJECTS, ACCENTS } from '../data/projects';
import { useInquiry } from '../context/Inquiry';
import Magnet from './react-bits/Magnet';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

/**
 * Individual Floating Project Card
 * Implements the exact visual language of the reference design:
 * - Vertical rounded card floating above the background
 * - Full-bleed screenshot with smooth 5-stop gradient overlay
 * - Centered indicator dots (• • •)
 * - Clean white typography and pill badge
 * - Metadata pill tags with glassmorphism
 * - Prominent full-width bottom CTA button with magnetic hover
 * - Subtle 3D pointer tilt with spring physics
 */
function ProjectFloatingCard({
  project,
  position, // 'left' | 'center' | 'right' | 'hidden'
  diff,
  isActive,
  onClick,
  onOpenInquiry,
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

  // 3D Pointer Tilt Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 22, stiffness: 280, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-5, 5]);

  const handlePointerMove = useCallback(
    (e) => {
      if (isTouch || shouldReduceMotion || !cardRef.current || !isActive) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mouseX.set(x);
      mouseY.set(y);
    },
    [isTouch, shouldReduceMotion, isActive, mouseX, mouseY]
  );

  const handlePointerEnter = useCallback(() => {
    if (!isTouch && !shouldReduceMotion) setIsHovered(true);
  }, [isTouch, shouldReduceMotion]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const a = ACCENTS[project.accent] || ACCENTS.blue;
  const isClickableSide = position === 'left' || position === 'right';

  // Responsive dimension calculations
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Horizontal step spacing between card centers
  let step = 360; // Desktop
  let cardWidth = 330;
  if (isTablet) {
    step = 330;
    cardWidth = 300;
  } else if (isMobile) {
    step = Math.min(windowWidth - 36, 350) + 20;
    cardWidth = Math.min(windowWidth - 36, 350);
  }

  const isOffstage = isMobile ? diff !== 0 : Math.abs(diff) > 1;

  // Animation values based on circular distance (diff) from active card
  let targetX = diff * step;
  let targetScale = 1;
  let targetOpacity = 1;
  let targetZIndex = 1;

  if (diff === 0) {
    targetX = 0;
    targetScale = isMobile ? 1 : 1.025;
    targetOpacity = 1;
    targetZIndex = 4;
  } else if (Math.abs(diff) === 1) {
    targetScale = isMobile ? 0.92 : 0.96;
    targetOpacity = isMobile ? 0 : 0.9;
    targetZIndex = 2;
  } else {
    // Hidden cards
    targetScale = 0.88;
    targetOpacity = 0;
    targetZIndex = 1;
  }

  return (
    <motion.article
      ref={cardRef}
      className={`prj-card-item position-${position}${isActive ? ' is-active' : ''}${
        isClickableSide ? ' is-clickable-side' : ''
      }`}
      aria-hidden={isOffstage ? 'true' : 'false'}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={isClickableSide ? onClick : undefined}
      initial={false}
      animate={{
        x: targetX,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZIndex,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', damping: 26, stiffness: 240, mass: 0.8 }
      }
      style={{
        width: `${cardWidth}px`,
        display: isOffstage ? 'none' : 'block',
        pointerEvents: targetOpacity === 0 ? 'none' : 'auto',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="prj-card-inner"
        style={{
          rotateX: isTouch || shouldReduceMotion || !isActive ? 0 : rotateX,
          rotateY: isTouch || shouldReduceMotion || !isActive ? 0 : rotateY,
        }}
      >
        {/* Full-bleed Screenshot / Media */}
        <div className="prj-card-media">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="prj-card-img"
              loading="lazy"
            />
          ) : (
            <div
              className="prj-card-img prj-card-img--ph"
              style={{
                background: `linear-gradient(150deg, ${a.from} 0%, ${a.to} 100%)`,
                color: a.fg,
              }}
              aria-hidden="true"
            >
              <span>{project.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Seamless 5-stop Gradient Overlay */}
        <div className="prj-card-gradient" aria-hidden="true" />

        {/* Subtle Accent Glow */}
        <div
          className="prj-card-accent-tint"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${a.from}30 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Specular Glare Sheen on Active Hover */}
        {!isTouch && !shouldReduceMotion && isActive && isHovered && (
          <div
            className="prj-card-glare"
            style={{
              background: `radial-gradient(circle at ${
                smoothMouseX.get() * 100
              }% ${
                smoothMouseY.get() * 100
              }%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Embedded Card Content */}
        <div className="prj-card-content">
          {/* Centered Indicator Dots • • • */}
          <div className="prj-card-dots" aria-hidden="true">
            <span className="prj-card-dot is-active" />
            <span className="prj-card-dot" />
            <span className="prj-card-dot" />
          </div>

          {/* Title and Category Badge Row */}
          <div className="prj-card-header">
            <h3 className="prj-card-title">{project.name}</h3>
            {project.category && (
              <span className="prj-card-badge">{project.category}</span>
            )}
          </div>

          {/* Project Description */}
          {project.description && (
            <p className="prj-card-desc">{project.description}</p>
          )}

          {/* Metadata Pill Tags */}
          {project.tech?.length > 0 && (
            <div className="prj-card-tags" aria-label="Technologies and features">
              {project.tech.map((t) => (
                <span key={t} className="prj-card-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Full-Width Prominent Bottom CTA Button */}
          <div className="prj-card-cta-wrap">
            <Magnet magnetStrength={0.2} padding={12}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prj-card-cta"
                  tabIndex={isOffstage ? -1 : 0}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <ArrowUpRight size={16} strokeWidth={2.4} />
                </a>
              ) : (
                <button
                  type="button"
                  className="prj-card-cta"
                  tabIndex={isOffstage ? -1 : 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInquiry();
                  }}
                >
                  <span>Inquire About Project</span>
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>
              )}
            </Magnet>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1); // Default to second project as center
  const { openInquiry } = useInquiry();
  const has = PROJECTS.length > 0;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  // Keyboard navigation when stage is focused
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
  };

  // GSAP scroll trigger entrance for the section header
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      if (headRef.current) {
        if (reduced) {
          gsap.set(headRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            headRef.current,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="shell">
        {/* Section Header */}
        <div className="prj-head" ref={headRef}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Our Work
            </span>
            <h2>
              Turning Ideas
              <br />
              Into <span className="b">Real Products.</span>
            </h2>
          </div>
          <div className="prj-head-right">
            <p>
              Explore some of the digital products we've built for businesses
              across different industries.
            </p>
            <div className="prj-head-controls">
              {/* Carousel Arrow Controls */}
              <div className="prj-nav-arrows" aria-label="Project navigation">
                <button
                  type="button"
                  className="prj-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} strokeWidth={2.4} />
                </button>
                <span className="prj-counter" aria-live="polite">
                  <span className="prj-counter-cur">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="prj-counter-sep">/</span>
                  <span className="prj-counter-tot">
                    {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                </span>
                <button
                  type="button"
                  className="prj-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  <ChevronRight size={18} strokeWidth={2.4} />
                </button>
              </div>

              {/* Start Project Consultation CTA */}
              <Magnet magnetStrength={0.2} padding={20}>
                <button className="ghost-btn" onClick={openInquiry}>
                  Start a Project <ArrowRight size={16} strokeWidth={2.3} />
                </button>
              </Magnet>
            </div>
          </div>
        </div>

        {has ? (
          <div className="prj-showcase-container">
            {/* The 3-Card Floating Showcase Stage */}
            <div
              className="prj-cards-stage"
              tabIndex={0}
              role="region"
              aria-label="Projects showcase carousel"
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {PROJECTS.map((project, index) => {
                // Calculate circular distance from active center
                let diff = index - activeIndex;
                if (diff < -2) diff += PROJECTS.length;
                if (diff > 2) diff -= PROJECTS.length;

                let position = 'hidden';
                if (diff === 0) position = 'center';
                else if (diff === -1) position = 'left';
                else if (diff === 1) position = 'right';

                return (
                  <ProjectFloatingCard
                    key={project.name}
                    project={project}
                    position={position}
                    diff={diff}
                    isActive={diff === 0}
                    onClick={diff === -1 ? handlePrev : diff === 1 ? handleNext : undefined}
                    onOpenInquiry={openInquiry}
                  />
                );
              })}
            </div>

            {/* Bottom Pagination Dots */}
            <div
              className="prj-pagination"
              role="tablist"
              aria-label="Project slider indicators"
            >
              {PROJECTS.map((project, idx) => (
                <button
                  key={project.name}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Jump to ${project.name}`}
                  className={`prj-page-dot${idx === activeIndex ? ' is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>

            {/* Mobile swipe affordance indicator */}
            <p className="prj-swipe" aria-hidden="true">
              <i /> Swipe to explore projects <i />
            </p>
          </div>
        ) : (
          <div className="prj-empty">
            <span>
              <FolderOpen size={26} strokeWidth={1.9} />
            </span>
            <h3>Projects coming soon</h3>
            <p>
              This section renders every entry in <code>src/data/projects.js</code> and
              scales to any number of projects. Add your real projects there and they'll
              appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
