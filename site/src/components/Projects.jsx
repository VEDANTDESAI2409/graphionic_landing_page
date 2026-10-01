import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useInquiry } from '../context/Inquiry';

const TECH_DOT_COLORS = ['#8B5CF6', '#007AFF', '#06B6D4', '#10B981', '#F59E0B'];

function GitHubIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    return <ShieldCheck size={16} strokeWidth={2.4} color="#007AFF" />;
  }
  if (iconType === 'zap' || index === 1) {
    return <Zap size={16} strokeWidth={2.4} color="#007AFF" />;
  }
  return <Users size={16} strokeWidth={2.4} color="#007AFF" />;
}

export default function Projects() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openInquiry } = useInquiry();
  const total = PROJECTS.length;

  // Track scroll progress through the pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Synchronize scroll progress with active project index
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (isProgrammaticScroll.current) return;
    if (total <= 1) return;

    // Distribute projects evenly along the scroll track
    const rawIdx = Math.round(progress * (total - 1));
    const clamped = Math.min(total - 1, Math.max(0, rawIdx));
    if (clamped !== activeIndex) {
      setActiveIndex(clamped);
    }
  });

  // Programmatic smooth scroll to specific project
  const scrollToIndex = useCallback(
    (targetIndex) => {
      const clamped = Math.min(total - 1, Math.max(0, targetIndex));
      setActiveIndex(clamped);

      const track = trackRef.current;
      if (!track) return;

      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 750);

      const rect = track.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const trackTop = rect.top + scrollTop;
      const availableScroll = track.offsetHeight - window.innerHeight;

      if (availableScroll <= 0) return;

      const progressRatio = total > 1 ? clamped / (total - 1) : 0;
      const targetScrollY = Math.round(trackTop + progressRatio * availableScroll);

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScrollY, {
          duration: 0.75,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    const prev = activeIndex === 0 ? total - 1 : activeIndex - 1;
    scrollToIndex(prev);
  }, [activeIndex, total, scrollToIndex]);

  const handleNext = useCallback(() => {
    const next = activeIndex === total - 1 ? 0 : activeIndex + 1;
    scrollToIndex(next);
  }, [activeIndex, total, scrollToIndex]);

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

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  // Dynamic pinned track height: ~70vh scroll headroom per transition
  const trackHeightVh = Math.max(100, 100 + (total - 1) * 70);

  return (
    <section
      className="projects prj-pinned-track"
      id="projects"
      ref={trackRef}
      style={{ height: `${trackHeightVh}vh` }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="prj-sticky-viewport">
        {/* Ambient background glows */}
        <div className="prj-bg-glow prj-bg-glow--tl" aria-hidden="true" />
        <div className="prj-bg-glow prj-bg-glow--br" aria-hidden="true" />
        <div className="prj-bg-dot prj-bg-dot--1" aria-hidden="true" />
        <div className="prj-bg-dot prj-bg-dot--2" aria-hidden="true" />

        <div className="shell prj-shell prj-shell--compact">
          {/* Section Header */}
          <div className="prj-header-center">
            <div className="prj-eyebrow-pill">
              <span className="prj-eyebrow-dot" />
              <span className="prj-eyebrow-text">OUR PROJECTS</span>
            </div>

            <h2 className="prj-heading">
              What We’ve{' '}
              <span className="prj-heading-accent">
                Built
                {/* Lime spark burst rays */}
                <span className="prj-spark-rays" aria-hidden="true">
                  <svg width="24" height="22" viewBox="0 0 28 26" fill="none">
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

          {/* Centered Showcase Stage with Depth Cards & Arrows */}
          <div
            className="prj-stage-area"
            tabIndex={0}
            role="region"
            aria-label="Pinned projects showcase"
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
              <ChevronLeft size={20} strokeWidth={2.4} />
            </button>

            {/* Circular Floating Arrow: Next */}
            <button
              type="button"
              className="prj-nav-arrow prj-arrow-next prj-arrow-btn"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight size={20} strokeWidth={2.4} />
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
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.name}
                className="prj-showcase-card position-center is-active"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
                  {/* Category pill badge & index counter */}
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
                      <ArrowRight size={16} strokeWidth={2.4} className="prj-btn-arrow" />
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
            </AnimatePresence>
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
                  aria-label={`Jump to project ${idx + 1}: ${project.name}`}
                  className={`prj-page-dot ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => scrollToIndex(idx)}
                />
              ))}
            </div>

            {/* Mobile swipe affordance indicator */}
            <p className="prj-swipe" aria-hidden="true">
              <i /> Swipe to explore projects <i />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
