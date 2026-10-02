import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Target,
  Users,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  BarChart3,
  Calendar,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  Zap,
  Wrench,
  Activity,
  Layers,
} from 'lucide-react';
import { ENGAGEMENT_MODELS } from '../data/site';
import { useInquiry } from '../context/Inquiry';
import useIsMobile from '../hooks/useIsMobile';
import { gsap, isReducedMotion } from '../utils/gsapConfig';

const ICONS = {
  target: Target,
  users: Users,
  clock: Clock,
};

/* Visual Graphic for Card 01: Fixed-Scope Project */
function FixedScopeVisual({ isActive }) {
  return (
    <div className={`eng-visual eng-visual-scope${isActive ? ' is-visible' : ''}`} aria-hidden="true">
      <div className="eng-glow eng-glow-blue" />

      {/* Main glass milestone card */}
      <div className="eng-glass-card eng-scope-main">
        <div className="eng-glass-header">
          <span className="eng-glass-dot" />
          <span className="eng-glass-title">Roadmap &amp; Milestones</span>
          <span className="eng-glass-chip">100% On-Time</span>
        </div>

        <div className="eng-scope-timeline">
          <div className="eng-scope-step is-complete">
            <span className="eng-step-bullet"><Check size={11} strokeWidth={3} /></span>
            <div className="eng-step-body">
              <div className="eng-step-meta">
                <strong>Phase 1: Architecture</strong>
                <span className="eng-step-status">Approved</span>
              </div>
              <div className="eng-progress-bar"><div className="eng-bar-fill" style={{ width: '100%' }} /></div>
            </div>
          </div>

          <div className="eng-scope-step is-active">
            <span className="eng-step-bullet"><Activity size={11} strokeWidth={3} /></span>
            <div className="eng-step-body">
              <div className="eng-step-meta">
                <strong>Phase 2: Sprint Build</strong>
                <span className="eng-step-status active-pulse">85% Complete</span>
              </div>
              <div className="eng-progress-bar"><div className="eng-bar-fill is-progress" style={{ width: '85%' }} /></div>
            </div>
          </div>

          <div className="eng-scope-step">
            <span className="eng-step-bullet"><Layers size={11} strokeWidth={2.5} /></span>
            <div className="eng-step-body">
              <div className="eng-step-meta">
                <strong>Phase 3: QA &amp; Launch</strong>
                <span className="eng-step-status muted">Scheduled</span>
              </div>
              <div className="eng-progress-bar"><div className="eng-bar-fill" style={{ width: '0%' }} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating glass badges */}
      <div className="eng-badge-float eng-badge-top-right">
        <Sparkles size={13} className="eng-badge-icon" />
        <span>Guaranteed Scope</span>
      </div>

      <div className="eng-badge-float eng-badge-bot-left">
        <FileCheck2 size={13} className="eng-badge-icon" />
        <span>Fixed Quote</span>
      </div>
    </div>
  );
}

/* Visual Graphic for Card 02: Dedicated Team (Reference match) */
function DedicatedTeamVisual({ isActive }) {
  return (
    <div className={`eng-visual eng-visual-team${isActive ? ' is-visible' : ''}`} aria-hidden="true">
      <div className="eng-glow eng-glow-cyan" />

      {/* Background angled frosted glass panel */}
      <div className="eng-glass-card eng-team-back">
        <div className="eng-back-line" style={{ width: '68%' }} />
        <div className="eng-back-line" style={{ width: '85%' }} />
        <div className="eng-back-line" style={{ width: '42%' }} />
      </div>

      {/* Main prominent glowing glass panel with Users icon */}
      <div className="eng-glass-card eng-team-main">
        <div className="eng-avatar-cluster">
          <span className="eng-avatar-lead">
            <Users size={28} strokeWidth={2.2} />
          </span>
        </div>
      </div>

      {/* Floating badge 1: Scalable Team */}
      <div className="eng-badge-float eng-badge-scale">
        <BarChart3 size={14} className="eng-badge-icon" />
        <span>Scalable Team</span>
      </div>

      {/* Floating badge 2: Regular Sprints */}
      <div className="eng-badge-float eng-badge-sprint">
        <Calendar size={13} className="eng-badge-icon" />
        <span>Regular Sprints</span>
      </div>

      {/* Floating badge 3: Full Transparency */}
      <div className="eng-badge-float eng-badge-transparency">
        <ShieldCheck size={14} className="eng-badge-icon" />
        <span>Full Transparency</span>
      </div>
    </div>
  );
}

/* Visual Graphic for Card 03: Hourly / Support */
function SupportVisual({ isActive }) {
  return (
    <div className={`eng-visual eng-visual-support${isActive ? ' is-visible' : ''}`} aria-hidden="true">
      <div className="eng-glow eng-glow-teal" />

      {/* Main glass terminal / diagnostic monitor */}
      <div className="eng-glass-card eng-support-main">
        <div className="eng-terminal-bar">
          <div className="eng-terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="eng-terminal-title">system-health.status</span>
        </div>

        <div className="eng-terminal-logs">
          <div className="eng-log-line ok">
            <span className="eng-log-prefix">&#10003;</span>
            <span className="eng-log-text">SLA Response: &lt;1 hour</span>
          </div>
          <div className="eng-log-line ok">
            <span className="eng-log-prefix">&#10003;</span>
            <span className="eng-log-text">Uptime Telemetry: 99.9%</span>
          </div>
          <div className="eng-log-line info">
            <span className="eng-log-prefix">&gt;</span>
            <span className="eng-log-text">Audit Logs: Real-time sync</span>
          </div>
        </div>
      </div>

      {/* Floating glass badges */}
      <div className="eng-badge-float eng-badge-sla">
        <Zap size={14} className="eng-badge-icon" />
        <span>Priority SLA</span>
      </div>

      <div className="eng-badge-float eng-badge-tools">
        <Wrench size={14} className="eng-badge-icon" />
        <span>Zero Lock-in</span>
      </div>
    </div>
  );
}

export default function EngagementModels() {
  const [activeIndex, setActiveIndex] = useState(1); // Default: Dedicated Team (index 1)
  const [mobileStep, setMobileStep] = useState(0);
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const mobileStageRef = useRef(null);
  const { openInquiry } = useInquiry();

  useEffect(() => {
    if (!isMobile) return;
    const track = mobileTrackRef.current;
    const stage = mobileStageRef.current;
    if (!track || !stage) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const card0 = track.querySelector('.eng-mobile-card-stacked--0');
      const card1 = track.querySelector('.eng-mobile-card-stacked--1');
      const card2 = track.querySelector('.eng-mobile-card-stacked--2');

      if (!card0 || !card1 || !card2) return;

      if (reduced) {
        gsap.set([card0, card1, card2], { y: 0, scale: 1, opacity: 1 });
        return;
      }

      // Initial positions: Card 0 active foreground, Card 1 & 2 layered below/behind
      gsap.set(card0, { y: 0, scale: 1, opacity: 1, zIndex: 10 });
      gsap.set(card1, { y: '95%', scale: 0.94, opacity: 0, zIndex: 20 });
      gsap.set(card2, { y: '100%', scale: 0.90, opacity: 0, zIndex: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          pin: stage,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pinSpacing: false,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.40) {
              setMobileStep(0);
            } else if (p < 0.78) {
              setMobileStep(1);
            } else {
              setMobileStep(2);
            }
          },
        },
      });

      // Scroll Phase 1: Dedicated Team (Card 1) comes from behind/below into the foreground
      tl.to(card1, { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 0.1)
        .to(card0, { scale: 0.94, y: -14, opacity: 0.6, duration: 1, ease: 'power2.out' }, 0.1);

      // Scroll Phase 2: Hourly / Support (Card 2) comes forward in the same way
      tl.to(card2, { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 1.3)
        .to(card1, { scale: 0.94, y: -14, opacity: 0.6, duration: 1, ease: 'power2.out' }, 1.3)
        .to(card0, { scale: 0.88, y: -26, opacity: 0.3, duration: 1, ease: 'power2.out' }, 1.3);

      // Buffer at the end before releasing pin into next section
      tl.to({}, { duration: 0.5 });
    }, mobileTrackRef);

    return () => ctx.revert();
  }, [isMobile]);

  const totalCards = ENGAGEMENT_MODELS.length;

  const nudge = useCallback(
    (dir) => {
      setActiveIndex((curr) => (curr + dir + totalCards) % totalCards);
    },
    [totalCards]
  );

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge(-1);
    }
  };

  const handleCtaClick = (e, modelTitle) => {
    e.stopPropagation();
    openInquiry(modelTitle);
  };

  return (
    <section
      className={`engage-section ${isMobile ? 'engage-mobile-pinned-track' : 'shell'}`}
      id="engagement"
      ref={isMobile ? mobileTrackRef : containerRef}
    >
      {/* Decorative ambient background accents */}
      <div className="engage-ambient-bg" aria-hidden="true">
        <div className="engage-ambient-grid left" />
        <div className="engage-ambient-grid right" />
        <div className="engage-ambient-orb" />
      </div>

      {isMobile ? (
        <div className="engage-mobile-sticky-stage" ref={mobileStageRef}>
          <div className="shell">
            {/* Section Header */}
            <div className="sec-head engage-head">
              <span className="pill engage-eyebrow">
                <span className="pdot" />
                WAYS TO WORK TOGETHER
              </span>
              <h2>
                Choose Your <span className="b">Engagement Model</span>
                <span className="acc">.</span>
              </h2>
              <p>Transparent scoping, a quote within 24 hours, and zero lock-in surprises.</p>
            </div>

            {/* Mobile Step Indicator */}
            <div className="engage-mobile-step-pills" aria-label={`Step ${mobileStep + 1} of 3: ${ENGAGEMENT_MODELS[mobileStep].title}`}>
              {ENGAGEMENT_MODELS.map((m, idx) => (
                <div
                  key={m.title}
                  className={`eng-step-pill${idx === mobileStep ? ' is-active' : ''}`}
                >
                  <span className="eng-step-dot" />
                  <span className="eng-step-label">{m.title}</span>
                </div>
              ))}
            </div>

            {/* Pinned Card Stack Area */}
            <div className="engage-mobile-stack-stage">
              {ENGAGEMENT_MODELS.map((m, i) => {
                const Ico = ICONS[m.icon] || Target;
                const isPopular = i === 1;

                return (
                  <div
                    key={m.title}
                    className={`eng-mobile-card-stacked eng-mobile-card-stacked--${i} ${isPopular ? 'is-popular' : ''}`}
                  >
                    <div className="eng-mobile-card-header">
                      <div className="eng-mobile-card-icon-wrap">
                        <span className="eng-card-ico" aria-hidden="true">
                          <Ico size={22} strokeWidth={2.2} />
                        </span>
                        <h3 className="eng-card-title">{m.title}</h3>
                      </div>
                      {isPopular && (
                        <span className="eng-card-badge is-visible">
                          MOST POPULAR
                        </span>
                      )}
                    </div>

                    <p className="eng-card-desc">{m.desc}</p>

                    <ul className="eng-card-points">
                      {m.points.map((pt) => (
                        <li key={pt}>
                          <span className="eng-check-icon">
                            <Check size={14} strokeWidth={2.8} />
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="eng-card-footer">
                      <span className="eng-card-best">BEST FOR: {m.best}</span>

                      <button
                        type="button"
                        className={`eng-cta-btn ${isPopular ? 'btn-active-lime' : 'btn-inactive-blue'}`}
                        onClick={(e) => handleCtaClick(e, m.title)}
                        aria-label={`Get a quote for ${m.title}`}
                      >
                        <span>Get a quote</span>
                        <ArrowRight size={15} strokeWidth={2.4} className="eng-btn-arrow" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Section Header */}
          <div className="sec-head engage-head">
            <span className="pill engage-eyebrow">
              <span className="pdot" />
              WAYS TO WORK TOGETHER
            </span>
            <h2>
              Choose Your <span className="b">Engagement Model</span>
              <span className="acc">.</span>
            </h2>
            <p>Transparent scoping, a quote within 24 hours, and zero lock-in surprises.</p>
          </div>

          {/* Interactive Expandable Cards Row for Desktop */}
          <div className="engage-carousel-wrapper">
        {/* Left Arrow Button */}
        <button
          type="button"
          className="engage-arrow-btn prev"
          onClick={() => nudge(-1)}
          aria-label="Previous engagement model"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        {/* 3 Horizontal Expandable Cards */}
        <div
          className="engage-cards-row"
          role="tablist"
          aria-label="Engagement models selection"
        >
          {ENGAGEMENT_MODELS.map((m, i) => {
            const Ico = ICONS[m.icon] || Target;
            const isActive = activeIndex === i;
            const isFocalBadge = i === 1; // Dedicated Team is "MOST POPULAR"

            return (
              <div
                key={m.title}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-label={`${m.title} engagement model${isActive ? ' (currently active)' : ''}`}
                className={`eng-model-card${isActive ? ' is-active' : ' is-inactive'}`}
                onMouseEnter={() => !isMobile && setActiveIndex(i)}
                onClick={() => handleCardClick(i)}
                onKeyDown={(e) => handleCardKeyDown(e, i)}
              >
                <div className="eng-card-inner">
                  {/* Left Column: Core Card Content */}
                  <div className="eng-card-content">
                    <div className="eng-card-topbar">
                      <span className="eng-card-ico" aria-hidden="true">
                        <Ico size={22} strokeWidth={2.2} />
                      </span>
                      {isFocalBadge && (
                        <span
                          className={`eng-card-badge${isActive ? ' is-visible' : ''}`}
                          aria-hidden={!isActive}
                        >
                          MOST POPULAR
                        </span>
                      )}
                    </div>

                    <h3 className="eng-card-title">{m.title}</h3>
                    <p className="eng-card-desc">{m.desc}</p>

                    <ul className="eng-card-points">
                      {m.points.map((pt) => (
                        <li key={pt}>
                          <span className="eng-check-icon">
                            <Check size={14} strokeWidth={2.8} />
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="eng-card-footer">
                      <span className="eng-card-best">BEST FOR: {m.best}</span>

                      <button
                        type="button"
                        className={`eng-cta-btn ${isActive ? 'btn-active-lime' : 'btn-inactive-blue'}`}
                        onClick={(e) => handleCtaClick(e, m.title)}
                        aria-label={`Get a quote for ${m.title}`}
                      >
                        <span>Get a quote</span>
                        <ArrowRight size={15} strokeWidth={2.4} className="eng-btn-arrow" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Graphic (Kept mounted to eliminate reflow and visual rebuilding) */}
                  <div
                    className={`eng-card-visual-slot${isActive ? ' is-active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    {i === 0 && <FixedScopeVisual isActive={isActive} />}
                    {i === 1 && <DedicatedTeamVisual isActive={isActive} />}
                    {i === 2 && <SupportVisual isActive={isActive} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="engage-arrow-btn next"
          onClick={() => nudge(1)}
          aria-label="Next engagement model"
        >
          <ChevronRight size={20} strokeWidth={2.4} />
        </button>
      </div>

        {/* Pagination Indicators / Step Dots */}
        <div className="engage-pagination-dots" role="tablist" aria-label="Engagement step indicators">
          {ENGAGEMENT_MODELS.map((m, idx) => (
            <button
              key={m.title}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Select ${m.title} model`}
              className={`engage-dot${activeIndex === idx ? ' is-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
        </>
      )}
    </section>
  );
}
