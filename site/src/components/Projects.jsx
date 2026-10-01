import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useInquiry } from '../context/Inquiry';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const TECH_DOT_COLORS = ['#8B5CF6', '#007AFF', '#06B6D4', '#10B981', '#F59E0B'];

function GitHubIcon({ className }) {
  return (
    <svg className={className} width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function renderMetricIcon(iconType, index) {
  if (iconType === 'shield' || index === 0) {
    return <ShieldCheck size={18} strokeWidth={2.4} color="#007AFF" />;
  }
  if (iconType === 'zap' || index === 1) {
    return <Zap size={18} strokeWidth={2.4} color="#007AFF" />;
  }
  return <Users size={18} strokeWidth={2.4} color="#007AFF" />;
}

/**
 * Calculates coordinates along the curved orbit path
 * Path parameters in viewBox 0 0 180 520
 * Curve formula: Q 170 260 65 495 from 65 25
 */
function getOrbitCoord(index, total) {
  if (total <= 1) return { x: 120, y: 260 };
  const t = index / (total - 1);
  // Quadratic bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  const p0x = 65;
  const p0y = 25;
  const p1x = 170;
  const p1y = 260;
  const p2x = 65;
  const p2y = 495;

  const mt = 1 - t;
  const x = mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x;
  const y = mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y;
  return { x: Math.round(x), y: Math.round(y) };
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  // Default to index 2 (Project 03) matching the primary reference design
  const [activeIndex, setActiveIndex] = useState(() => (PROJECTS.length > 2 ? 2 : 0));
  const { openInquiry } = useInquiry();
  const shouldReduceMotion = useReducedMotion();
  const total = PROJECTS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleSelectProject = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
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

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  return (
    <section className="projects prj-showcase-section" id="projects" ref={sectionRef}>
      {/* Ambient background glows and mesh dots */}
      <div className="prj-bg-glow prj-bg-glow--tl" aria-hidden="true" />
      <div className="prj-bg-glow prj-bg-glow--br" aria-hidden="true" />
      <div className="prj-bg-dot prj-bg-dot--1" aria-hidden="true" />
      <div className="prj-bg-dot prj-bg-dot--2" aria-hidden="true" />

      <div className="shell prj-shell">
        {/* Section Header */}
        <div className="prj-header-center" ref={headRef}>
          <div className="prj-eyebrow-pill">
            <span className="prj-eyebrow-dot" />
            <span className="prj-eyebrow-text">OUR PROJECTS</span>
          </div>

          <h2 className="prj-heading">
            What We’ve{' '}
            <span className="prj-heading-accent">
              Built
              {/* Vibrant lime spark burst rays matching reference */}
              <span className="prj-spark-rays" aria-hidden="true">
                <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
                  <path d="M7 21L1 25" stroke="#D2FF28" strokeWidth="3" strokeLinecap="round" />
                  <path d="M14 15L12 3" stroke="#D2FF28" strokeWidth="3" strokeLinecap="round" />
                  <path d="M21 17L27 11" stroke="#D2FF28" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h2>

          <p className="prj-subtitle">
            A collection of real-world projects that showcase our expertise,
            creativity and problem-solving approach.
          </p>
        </div>

        {/* Mobile Horizontal Orbit Indicator Bar */}
        <div className="prj-mobile-orbit-bar" role="tablist" aria-label="Mobile projects selector">
          {PROJECTS.map((project, idx) => {
            const isActive = idx === activeIndex;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={project.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`prj-mobile-orbit-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelectProject(idx)}
              >
                <span className="prj-mobile-orbit-num">{num}</span>
                {isActive && <span className="prj-mobile-orbit-dot" />}
              </button>
            );
          })}
        </div>

        {/* Main Composition: Orbit Navigation + Central Showcase Stage */}
        <div className="prj-layout-wrap">
          {/* LEFT ORBIT NAVIGATION */}
          <nav className="prj-orbit-nav" aria-label="Projects orbit navigation">
            <svg
              className="prj-orbit-svg"
              viewBox="0 0 180 520"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Thin light-blue curved orbit path */}
              <path
                d="M 65 25 Q 170 260 65 495"
                className="prj-orbit-path"
              />

              {/* Orbit Nodes placed along curve */}
              {PROJECTS.map((p, i) => {
                const { x, y } = getOrbitCoord(i, total);
                const isActive = i === activeIndex;
                return (
                  <g
                    key={p.name}
                    className={`prj-orbit-svg-node ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectProject(i)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive ? (
                      <>
                        <circle cx={x} cy={y} r="15" className="prj-orbit-node-aura" />
                        <circle cx={x} cy={y} r="8" className="prj-orbit-node-outer" />
                        <circle cx={x} cy={y} r="4.5" className="prj-orbit-node-inner" />
                      </>
                    ) : (
                      <circle cx={x} cy={y} r="4" className="prj-orbit-node-circle" />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Orbit Numbers and Project Labels */}
            <div className="prj-orbit-items">
              {PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;
                const num = String(index + 1).padStart(2, '0');
                const { x, y } = getOrbitCoord(index, total);

                return (
                  <button
                    key={project.name}
                    type="button"
                    className={`prj-orbit-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectProject(index)}
                    style={{ top: `${y}px`, right: `${180 - x + 16}px` }}
                    aria-label={`Select project ${num}: ${project.name}`}
                    aria-pressed={isActive}
                  >
                    <span className="prj-orbit-num">{num}</span>
                    <span className="prj-orbit-label">
                      {project.shortName || project.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* MAIN SHOWCASE STAGE */}
          <div
            className="prj-stage-area"
            tabIndex={0}
            role="region"
            aria-label="Projects showcase carousel"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Circular Floating Arrow: Previous */}
            <button
              type="button"
              className="prj-nav-arrow prj-arrow-prev prj-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={22} strokeWidth={2.4} />
            </button>

            {/* Circular Floating Arrow: Next */}
            <button
              type="button"
              className="prj-nav-arrow prj-arrow-next prj-arrow-btn"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight size={22} strokeWidth={2.4} />
            </button>

            {/* Previous Project Card Peeking in Background (Left) */}
            <aside
              className="prj-flank-card prj-flank-prev position-left is-clickable-side"
              onClick={handlePrev}
              aria-hidden="true"
            >
              <div className="prj-flank-inner">
                <div className="prj-flank-top">
                  <span className="prj-flank-badge">{prevProject.badge || 'PROJECT'}</span>
                  <h4 className="prj-flank-title">{prevProject.shortName || prevProject.name}</h4>
                </div>
                <div className="prj-flank-media">
                  <img src={prevProject.image} alt="" className="prj-flank-img" />
                </div>
              </div>
            </aside>

            {/* Next Project Card Peeking in Background (Right) */}
            <aside
              className="prj-flank-card prj-flank-next position-right is-clickable-side"
              onClick={handleNext}
              aria-hidden="true"
            >
              <div className="prj-flank-inner">
                <div className="prj-flank-top">
                  <span className="prj-flank-badge">{nextProject.badge || 'PROJECT'}</span>
                  <h4 className="prj-flank-title">{nextProject.shortName || nextProject.name}</h4>
                </div>
                <div className="prj-flank-media">
                  <img src={nextProject.image} alt="" className="prj-flank-img" />
                </div>
              </div>
            </aside>

            {/* MAIN ACTIVE PROJECT SHOWCASE CARD */}
            <motion.article
              key={activeProject.name}
              className="prj-showcase-card position-center is-active"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Card Left: Laptop Mockup Presentation */}
              <div className="prj-card-visual-col">
                <div className="prj-laptop-deck">
                  <div className="prj-laptop-screen">
                    <div className="prj-laptop-webcam" />
                    <div className="prj-laptop-display">
                      <img
                        src={activeProject.image}
                        alt={activeProject.name}
                        className="prj-laptop-img prj-card-img"
                        loading="eager"
                      />
                      <div className="prj-laptop-glass-glare" />
                    </div>
                  </div>
                  <div className="prj-laptop-base">
                    <div className="prj-laptop-notch" />
                  </div>
                  <div className="prj-laptop-shadow" />
                </div>
              </div>

              {/* Card Right: Project Information */}
              <div className="prj-card-info-col">
                {/* Centered Indicator Dots for compatibility */}
                <div className="prj-card-dots" aria-hidden="true" style={{ display: 'none' }}>
                  <span className="prj-card-dot is-active" />
                  <span className="prj-card-dot" />
                  <span className="prj-card-dot" />
                </div>

                {/* Header row: Category pill badge & index counter */}
                <div className="prj-info-meta-row">
                  <span className="prj-category-pill prj-card-badge">
                    {activeProject.category || 'WEB APPLICATION'}
                  </span>
                  <span
                    className="prj-counter-fraction"
                    aria-label={`Project ${activeIndex + 1} of ${total}`}
                  >
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="prj-main-title prj-card-title">{activeProject.name}</h3>

                {/* Project Description */}
                <p className="prj-main-desc prj-card-desc">{activeProject.description}</p>

                {/* Technology Pills */}
                <div className="prj-tech-pills prj-card-tags" aria-label="Technologies used">
                  {activeProject.tech.map((techItem, tIdx) => {
                    const dotColor = TECH_DOT_COLORS[tIdx % TECH_DOT_COLORS.length];
                    return (
                      <span key={techItem} className="prj-tech-pill prj-card-tag">
                        <span className="prj-tech-dot" style={{ backgroundColor: dotColor }} />
                        <span>{techItem}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Subtle Divider */}
                <div className="prj-info-divider" />

                {/* 3 Concise Metrics Row */}
                {activeProject.metrics && activeProject.metrics.length > 0 && (
                  <div className="prj-metrics-grid">
                    {activeProject.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="prj-metric-cell">
                        <div className="prj-metric-top">
                          <span className="prj-metric-ico">
                            {renderMetricIcon(metric.icon, mIdx)}
                          </span>
                          <span className="prj-metric-val">{metric.value}</span>
                        </div>
                        <span className="prj-metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Buttons Row */}
                <div className="prj-actions-row">
                  <a
                    href={activeProject.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prj-btn-primary prj-card-cta"
                  >
                    <span>View Project</span>
                    <ArrowRight size={17} strokeWidth={2.4} className="prj-btn-arrow" />
                  </a>

                  {activeProject.githubUrl ? (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="prj-btn-secondary"
                      aria-label={`View ${activeProject.name} on GitHub`}
                    >
                      <GitHubIcon className="prj-github-icon" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="prj-btn-secondary"
                      onClick={openInquiry}
                    >
                      <span>Inquire</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Bottom Pagination Indicators */}
        <div className="prj-bottom-pagination">
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
                className={`prj-page-dot ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => handleSelectProject(idx)}
              />
            ))}
          </div>

          {/* Mobile swipe affordance indicator */}
          <p className="prj-swipe" aria-hidden="true">
            <i /> Swipe to explore projects <i />
          </p>
        </div>

        {/* Decorative bottom curved arrow flourish */}
        <div className="prj-decorative-arrow" aria-hidden="true">
          <svg width="110" height="42" viewBox="0 0 110 42" fill="none">
            <path
              d="M 10 32 C 45 42, 80 26, 102 10"
              stroke="#93C5FD"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
            <path
              d="M 94 9 L 103 9 L 102 18"
              stroke="#93C5FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
