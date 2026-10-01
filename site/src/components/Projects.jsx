import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useInquiry } from '../context/Inquiry';
import { gsap, ScrollTrigger, SplitText, isReducedMotion } from '../utils/gsapConfig';

/**
 * Geometric brand logomarks matching the reference's minimalist agency aesthetic
 */
function ProjectLogo({ name }) {
  if (name.includes('VR')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cs-brand-icon">
        <path d="M12 2L3 7V12C3 17.5 6.8 22.1 12 23C17.2 22.1 21 17.5 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name.includes('Rapid')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cs-brand-icon">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
      </svg>
    );
  }
  if (name.includes('Fastlane')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cs-brand-icon">
        <path d="M13 5L20 12L13 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 5L12 12L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      </svg>
    );
  }
  if (name.includes('BiO')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cs-brand-icon">
        <path d="M12 2.5C12 2.5 4 10 4 15.5C4 19.1 7.1 22 12 22C16.9 22 20 19.1 20 15.5C20 10 12 2.5 12 2.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  // Sunflower Inn & Suites
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cs-brand-icon">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7.1 7.1M16.9 16.9L19.1 19.1M4.9 19.1L7.1 16.9M16.9 7.1L19.1 4.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const scrollWrapRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const trackWindowRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const { openInquiry } = useInquiry();

  const totalProjects = PROJECTS.length;

  // Keep activeIndexRef in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Smooth scroll page to a specific project's vertical scroll offset
  const scrollToIndex = useCallback((targetIdx) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;
    const clamped = Math.max(0, Math.min(totalProjects - 1, targetIdx));
    const targetProgress = clamped / Math.max(1, totalProjects - 1);
    const targetScrollY = trigger.start + targetProgress * (trigger.end - trigger.start);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScrollY, {
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    scrollToIndex(activeIndexRef.current - 1);
  }, [scrollToIndex]);

  const handleNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current + 1);
  }, [scrollToIndex]);

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

  // Setup GSAP Pinned Horizontal ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    const scrollWrap = scrollWrapRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const trackWindow = trackWindowRef.current;
    if (!section || !scrollWrap || !sticky || !track || !trackWindow) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      // Eyebrow entrance
      if (eyebrowRef.current) {
        if (reduced) {
          gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: eyebrowRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      // Heading entrance with SplitText if available
      if (headingRef.current) {
        if (reduced) {
          gsap.set(headingRef.current, { opacity: 1, y: 0 });
        } else {
          let splitInstance = null;
          try {
            if (SplitText) {
              splitInstance = new SplitText(headingRef.current, { type: 'words,lines' });
              gsap.from(splitInstance.words, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: headingRef.current,
                  start: 'top 85%',
                  once: true,
                },
              });
            }
          } catch {
            gsap.fromTo(
              headingRef.current,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: headingRef.current,
                  start: 'top 85%',
                  once: true,
                },
              }
            );
          }
        }
      }

      // If user prefers reduced motion, disable horizontal pinning and render accessible layout
      if (reduced) {
        return;
      }

      const cards = Array.from(track.querySelectorAll('.case-study-card'));
      if (cards.length === 0) return;

      const updateLayout = () => {
        const windowW = window.innerWidth;
        const windowH = window.innerHeight;
        const isMobile = windowW <= 768;
        const isTablet = windowW > 768 && windowW <= 1024;

        // Card step calculation (width + gap)
        const firstCard = cards[0];
        const secondCard = cards[1];
        let step = 0;
        if (firstCard && secondCard) {
          step = secondCard.offsetLeft - firstCard.offsetLeft;
        }
        if (!step || step <= 0) {
          const cardWidth = firstCard ? firstCard.offsetWidth : (isMobile ? windowW * 0.88 : 840);
          const gap = isMobile ? 16 : isTablet ? 32 : 48;
          step = cardWidth + gap;
        }

        const totalScrollDistance = (totalProjects - 1) * step;
        // Dynamic scroll headroom: derived from (number of projects - 1) * viewport dimension
        const verticalHeadroom = Math.round(
          (totalProjects - 1) * (isMobile ? windowH * 0.85 : Math.max(windowH * 0.9, windowW * 0.75))
        );

        scrollWrap.style.height = `${windowH + verticalHeadroom}px`;

        // Kill existing scroll trigger if updating
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }

        const st = ScrollTrigger.create({
          trigger: scrollWrap,
          start: 'top top',
          end: `+=${verticalHeadroom}`,
          pin: sticky,
          pinSpacing: false,
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1
            const currentTranslateX = -p * totalScrollDistance;

            // Move track
            gsap.set(track, { x: currentTranslateX });

            // Fractional card index: 0 to (totalProjects - 1)
            const u = p * (totalProjects - 1);
            const nearestIdx = Math.max(0, Math.min(totalProjects - 1, Math.round(u)));

            if (nearestIdx !== activeIndexRef.current) {
              setActiveIndex(nearestIdx);
            }

            // Per-card subtle internal motion & parallax
            cards.forEach((card, idx) => {
              const diff = idx - u; // 0 = active, -1 = left, +1 = right
              const absDiff = Math.abs(diff);

              const imgEl = card.querySelector('.cs-card-img');
              const infoEl = card.querySelector('.cs-card-info');

              // Image subtle parallax: approximately ±20px horizontal shift
              if (imgEl) {
                const imgShift = Math.max(-22, Math.min(22, diff * 18));
                const imgScale = Math.max(0.96, Math.min(1.02, 1.0 - absDiff * 0.04));
                imgEl.style.transform = `translateX(${imgShift}px) scale(${imgScale})`;
              }

              // Card scale and text opacity settle
              const cardScale = Math.max(0.92, 1 - Math.min(1, absDiff) * 0.06);
              card.style.transform = `scale(${cardScale})`;

              if (infoEl) {
                const infoShift = Math.max(-28, Math.min(28, diff * 24));
                const infoOpacity = Math.max(0.35, 1 - Math.min(1, absDiff * 0.85));
                infoEl.style.transform = `translateX(${infoShift}px)`;
                infoEl.style.opacity = `${infoOpacity}`;
              }
            });
          },
        });

        scrollTriggerRef.current = st;
      };

      updateLayout();
      window.addEventListener('resize', updateLayout);

      return () => {
        window.removeEventListener('resize', updateLayout);
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [totalProjects]);

  return (
    <section className="projects case-studies-section" id="projects" ref={sectionRef}>
      {/* Outer scroll container providing vertical scroll distance */}
      <div className="case-studies-scroll-container" ref={scrollWrapRef}>
        {/* Sticky viewport container pinned while scrolling */}
        <div className="case-studies-sticky" ref={stickyRef}>
          {/* Large rounded white showcase container */}
          <div className="case-studies-white-box">
            {/* Header: Eyebrow + What We've Built */}
            <header className="case-studies-header">
              <div className="case-studies-eyebrow" ref={eyebrowRef}>
                <span className="cs-eyebrow-num">005</span>
                <span className="cs-eyebrow-dot" />
                <span className="cs-eyebrow-text">CASE STUDIES</span>
              </div>
              <h2 className="case-studies-title" ref={headingRef}>
                What We've Built
              </h2>
            </header>

            {/* Center Showcase Stage */}
            <div
              className="case-studies-stage"
              tabIndex={0}
              role="region"
              aria-label="Projects pinned showcase"
              onKeyDown={handleKeyDown}
            >
              {/* Previous Navigation Arrow */}
              <button
                type="button"
                className={`cs-nav-arrow cs-arrow-prev${activeIndex === 0 ? ' is-disabled' : ''}`}
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} strokeWidth={2.4} />
              </button>

              {/* Horizontal Track Window */}
              <div className="case-studies-track-window" ref={trackWindowRef}>
                <div className="case-studies-track" ref={trackRef}>
                  {PROJECTS.map((project, idx) => (
                    <article
                      key={project.name}
                      className={`case-study-card${idx === activeIndex ? ' is-active' : ''}`}
                      data-index={idx}
                    >
                      {/* Left: Project Visual Image */}
                      <div className="cs-card-visual">
                        <div className="cs-card-img-wrap">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="cs-card-img"
                            loading={idx <= 1 ? 'eager' : 'lazy'}
                          />
                        </div>
                      </div>

                      {/* Right: Project Information */}
                      <div className="cs-card-info">
                        {/* Company Logo and Brand Name */}
                        <div className="cs-card-brand-row">
                          <div className="cs-card-logo-wrap">
                            <ProjectLogo name={project.name} />
                            <span className="cs-card-brand-name">
                              {project.brandName || project.name}
                            </span>
                          </div>
                          {project.category && (
                            <span className="cs-card-category-badge">
                              {project.category}
                            </span>
                          )}
                        </div>

                        {/* Project Title */}
                        <h3 className="cs-card-title">{project.name}</h3>

                        {/* Project Description */}
                        <p className="cs-card-desc">{project.description}</p>

                        {/* "Read More →" / Case Study Link */}
                        <div className="cs-card-link-row">
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cs-card-readmore"
                            >
                              <span>Read More</span>
                              <span className="cs-readmore-circle">
                                <ArrowUpRight size={14} strokeWidth={2.5} />
                              </span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="cs-card-readmore"
                              onClick={openInquiry}
                            >
                              <span>Read More</span>
                              <span className="cs-readmore-circle">
                                <ArrowRight size={14} strokeWidth={2.5} />
                              </span>
                            </button>
                          )}
                        </div>

                        {/* Performance Metrics Row */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="cs-card-metrics">
                            {project.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="cs-metric-item">
                                <div className="cs-metric-value">{m.value}</div>
                                <div className="cs-metric-label">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Next Navigation Arrow */}
              <button
                type="button"
                className={`cs-nav-arrow cs-arrow-next${
                  activeIndex === totalProjects - 1 ? ' is-disabled' : ''
                }`}
                onClick={handleNext}
                disabled={activeIndex === totalProjects - 1}
                aria-label="Next project"
              >
                <ChevronRight size={20} strokeWidth={2.4} />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div
              className="case-studies-pagination"
              role="tablist"
              aria-label="Case study indicators"
            >
              {PROJECTS.map((project, idx) => (
                <button
                  key={project.name}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to ${project.name}`}
                  className={`cs-page-dot${idx === activeIndex ? ' is-active' : ''}`}
                  onClick={() => scrollToIndex(idx)}
                />
              ))}
            </div>

            {/* Explore All Case Studies CTA */}
            <div className="case-studies-cta-wrap">
              <button
                type="button"
                className="cs-explore-btn"
                onClick={openInquiry}
                aria-label="Explore all Case Studies"
              >
                <span>Explore all Case Studies</span>
                <ArrowRight size={15} strokeWidth={2.4} className="cs-explore-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
