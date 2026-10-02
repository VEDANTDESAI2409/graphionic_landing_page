import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  Check,
  Loader2,
  User,
  Building2,
  Mail,
  Phone,
  Layers,
  IndianRupee,
  FileText,
  ShieldCheck,
  Users,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { useInquiry } from '../context/Inquiry';
import { COMPANY } from '../data/site';

const PROJECT_TYPES = [
  'Web Development',
  'Web Application',
  'Mobile App',
  'E-commerce',
  'UI/UX Design',
  'Automation',
  'AI / ML',
  'Custom Software',
  'Other',
];

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹5,00,000',
  '₹5,00,000+',
  'Not sure yet',
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Quick Response',
    desc: "We'll get back within 24 hours.",
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    desc: 'Tailored recommendations for your project.',
  },
  {
    icon: Zap,
    title: 'No Obligation',
    desc: 'Just a friendly discussion.',
  },
];

const EMPTY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  details: '',
};

/* Reusing centralized WhatsApp number from site.js COMPANY.phone (6351903380 -> 916351903380) */
const WA_NUMBER = `91${COMPANY.phone.replace(/\D/g, '')}`;
const DIRECT_WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Graphionic! 👋 I'd like to discuss a project — web / app / AI automation."
)}`;

function formatWhatsAppMessage({ name, company, email, phone, projectType, budget, details }) {
  const lines = [
    'NEW PROJECT INQUIRY',
    '',
    `Name: ${name.trim()}`,
    `Company: ${company.trim() || 'N/A'}`,
    `Email: ${email.trim()}`,
    `Phone: ${phone.trim() || 'N/A'}`,
    '',
    `Project Type: ${projectType}`,
    `Estimated Budget: ${budget || 'Not specified'}`,
    '',
    'Project Details:',
    details.trim(),
    '',
    '---',
    'Submitted from Graphionic Infotech Website',
  ];
  return lines.join('\n');
}

/* 3D Decorative Technology Graphic (Blue isometric glass cards + </> badge + glowing lime orb) */
function TechIllustration() {
  return (
    <div className="inq-deco" aria-hidden="true">
      <svg viewBox="0 0 280 130" fill="none" className="inq-deco-svg">
        <defs>
          <linearGradient id="inqCardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#007AFF" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="inqCardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="inqOrbGrad" x1="30%" y1="20%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#E4FF54" />
            <stop offset="60%" stopColor="#B4F200" />
            <stop offset="100%" stopColor="#76BE00" />
          </linearGradient>
          <filter id="inqGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="inqSoftShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0052B4" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Ambient back glows */}
        <circle cx="80" cy="95" r="45" fill="#60A5FA" fillOpacity="0.22" filter="url(#inqGlow)" />
        <circle cx="215" cy="65" r="28" fill="#D4FF00" fillOpacity="0.2" filter="url(#inqGlow)" />

        {/* Back slanted translucent card */}
        <rect
          x="32"
          y="32"
          width="125"
          height="80"
          rx="14"
          transform="rotate(-10 32 32) skewX(-5)"
          fill="url(#inqCardGrad1)"
          stroke="#93C5FD"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Mid-layer accent card */}
        <rect
          x="78"
          y="40"
          width="105"
          height="70"
          rx="14"
          transform="rotate(6 78 40) skewX(4)"
          fill="#3B82F6"
          fillOpacity="0.18"
          stroke="#60A5FA"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Front frosted code card */}
        <g filter="url(#inqSoftShadow)">
          <rect
            x="48"
            y="42"
            width="96"
            height="64"
            rx="14"
            fill="url(#inqCardGrad2)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Subtle code lines */}
          <rect x="60" y="52" width="22" height="3.5" rx="1.75" fill="#93C5FD" fillOpacity="0.7" />
          <rect x="60" y="59" width="38" height="3" rx="1.5" fill="#BFDBFE" fillOpacity="0.5" />
          {/* Main </> symbol */}
          <path
            d="M78 78 L71 84 L78 90"
            stroke="#007AFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M90 74 L85 94"
            stroke="#007AFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M97 78 L104 84 L97 90"
            stroke="#007AFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Glowing Lime Sphere */}
        <g filter="url(#inqSoftShadow)">
          <circle cx="215" cy="65" r="17" fill="url(#inqOrbGrad)" />
          <ellipse cx="209" cy="59" rx="5.5" ry="3.5" fill="#FFFFFF" fillOpacity="0.7" transform="rotate(-25 209 59)" />
        </g>
      </svg>
    </div>
  );
}

export default function InquiryForm() {
  const { open, initialType, closeInquiry } = useInquiry();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done
  const [preparedUrl, setPreparedUrl] = useState('');

  const firstInputRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Sync initial project type if passed from an external CTA
  const [lastOpen, setLastOpen] = useState(false);
  if (open && !lastOpen) {
    setLastOpen(true);
    if (initialType) {
      const match = PROJECT_TYPES.find((t) => t.toLowerCase() === initialType.toLowerCase());
      if (match && form.projectType !== match) {
        setForm((f) => ({ ...f, projectType: match }));
      }
    }
  } else if (!open && lastOpen) {
    setLastOpen(false);
  }

  // Focus management: focus first field on open, restore previous focus on close
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      const timer = setTimeout(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    }
  }, [open]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) {
      e.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Invalid email address';
    }
    if (form.phone && !/^[\d\s+()-]{7,}$/.test(form.phone.trim())) {
      e.phone = 'Invalid phone number';
    }
    if (!form.projectType) e.projectType = 'Please select a project type';
    if (!form.details.trim()) e.details = 'Please describe your project';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev) {
    ev.preventDefault();
    if (!validate()) {
      // Focus first errored field
      const firstKey = ['name', 'email', 'phone', 'projectType', 'details'].find(
        (k) => !form[k]?.trim?.() || errors[k]
      );
      if (firstKey) {
        const el = document.getElementById(`inq-${firstKey}`);
        if (el) el.focus();
      }
      return;
    }

    setState('sending');

    const text = formatWhatsAppMessage(form);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setPreparedUrl(waUrl);

    // Brief smooth loading transition for realistic feedback
    await new Promise((r) => setTimeout(r, 480));

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // If popup blocked, preparedUrl can be clicked manually in success screen
    }

    setState('done');
  }

  function reset() {
    setForm(EMPTY);
    setErrors({});
    setState('idle');
    setPreparedUrl('');
    closeInquiry();
  }

  function restart() {
    setForm(EMPTY);
    setErrors({});
    setState('idle');
    setPreparedUrl('');
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="inq-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onMouseDown={(e) => e.target === e.currentTarget && reset()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inq-modal-title"
        >
          <motion.div
            className="inq"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="inq-close"
              onClick={reset}
              aria-label="Close project inquiry dialog"
            >
              <X size={18} strokeWidth={2.4} />
            </button>

            {/* LEFT COLUMN — Brand & Trust */}
            <div className="inq-left">
              <div className="inq-left-top">
                {/* Brand Logo */}
                <div className="inq-brand">
                  <span className="brand-mark inq-brand-mark">
                    <svg viewBox="0 0 96 108" fill="none" aria-hidden="true">
                      <path
                        d="M48 3 L91 27.5 V80.5 L48 105 L5 80.5 V27.5 Z"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M70 40.5 A26 26 0 1 0 74 55.5 H48"
                        stroke="currentColor"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <div className="inq-brand-text">
                    <span className="inq-brand-top">GRAPHIONIC</span>
                    <span className="inq-brand-bottom">INFOTECH</span>
                  </div>
                </div>

                <div className="inq-accent-bar" aria-hidden="true" />

                <h2 className="inq-left-title">
                  Let's Build
                  <br />
                  Something
                  <br />
                  Great <span className="txt-blue">Together</span>
                  <span className="txt-lime">.</span>
                </h2>

                <p className="inq-left-desc">
                  Share a few details about your project and our team will get back to you within 24 hours.
                </p>

                {/* 3 Compact Trust Points */}
                <div className="inq-trust-list">
                  {TRUST_POINTS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="inq-trust-card">
                        <div className="inq-trust-icon">
                          <Icon size={16} strokeWidth={2.3} />
                        </div>
                        <div className="inq-trust-meta">
                          <strong className="inq-trust-title">{item.title}</strong>
                          <span className="inq-trust-desc">{item.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Tech Illustration */}
              <TechIllustration />
            </div>

            {/* RIGHT COLUMN — Form or Success State */}
            <div className="inq-right">
              {state === 'done' ? (
                <div className="inq-success-wrap">
                  <div className="inq-success-badge">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h3 className="inq-success-title">Your project inquiry is ready.</h3>
                  <p className="inq-success-desc">
                    WhatsApp has been opened with your project details. Send the message to complete your inquiry.
                  </p>

                  <div className="inq-success-card">
                    <div>
                      <strong>Name:</strong> {form.name}
                    </div>
                    <div>
                      <strong>Project:</strong> {form.projectType}
                    </div>
                    {form.budget && (
                      <div>
                        <strong>Budget:</strong> {form.budget}
                      </div>
                    )}
                    <div>
                      <strong>Destination:</strong> Graphionic Studio ({WA_NUMBER})
                    </div>
                  </div>

                  <div className="inq-success-actions">
                    <button type="button" className="btn-done" onClick={reset}>
                      Done
                    </button>
                    {preparedUrl && (
                      <a
                        href={preparedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-reopen"
                      >
                        Open WhatsApp <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  <button type="button" className="inq-another-btn" onClick={restart}>
                    Start another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="inq-head">
                    <div className="inq-eyebrow">
                      <span className="inq-dot" aria-hidden="true" />
                      <span>PROJECT INQUIRY</span>
                    </div>
                    <h3 id="inq-modal-title" className="inq-title">
                      Tell us about your <span className="txt-blue">project</span>
                      <span className="txt-lime">.</span>
                    </h3>
                    <p className="inq-subtitle">
                      Share a few details and we'll come back to you within 24 hours.
                    </p>
                  </div>

                  <form className="inq-form" onSubmit={submit} noValidate>
                    {/* ROW 1: Name & Company */}
                    <div className="inq-row">
                      <div className={`inq-field${errors.name ? ' has-error' : ''}`}>
                        <div className="inq-field-header">
                          <label htmlFor="inq-name" className="inq-label">
                            Name <span className="inq-req">*</span>
                          </label>
                          {errors.name && (
                            <span id="inq-name-err" className="inq-err-msg">
                              {errors.name}
                            </span>
                          )}
                        </div>
                        <div className="inq-input-wrap">
                          <User className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <input
                            ref={firstInputRef}
                            id="inq-name"
                            className="inq-input"
                            value={form.name}
                            onChange={set('name')}
                            placeholder="Your full name"
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'inq-name-err' : undefined}
                          />
                        </div>
                      </div>

                      <div className="inq-field">
                        <div className="inq-field-header">
                          <label htmlFor="inq-company" className="inq-label">
                            Company
                          </label>
                        </div>
                        <div className="inq-input-wrap">
                          <Building2 className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <input
                            id="inq-company"
                            className="inq-input"
                            value={form.company}
                            onChange={set('company')}
                            placeholder="Company name"
                            autoComplete="organization"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ROW 2: Email & Phone */}
                    <div className="inq-row">
                      <div className={`inq-field${errors.email ? ' has-error' : ''}`}>
                        <div className="inq-field-header">
                          <label htmlFor="inq-email" className="inq-label">
                            Email <span className="inq-req">*</span>
                          </label>
                          {errors.email && (
                            <span id="inq-email-err" className="inq-err-msg">
                              {errors.email}
                            </span>
                          )}
                        </div>
                        <div className="inq-input-wrap">
                          <Mail className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <input
                            id="inq-email"
                            type="email"
                            className="inq-input"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="you@company.com"
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'inq-email-err' : undefined}
                          />
                        </div>
                      </div>

                      <div className={`inq-field${errors.phone ? ' has-error' : ''}`}>
                        <div className="inq-field-header">
                          <label htmlFor="inq-phone" className="inq-label">
                            Phone
                          </label>
                          {errors.phone && (
                            <span id="inq-phone-err" className="inq-err-msg">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                        <div className="inq-input-wrap">
                          <Phone className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <input
                            id="inq-phone"
                            type="tel"
                            className="inq-input"
                            value={form.phone}
                            onChange={set('phone')}
                            placeholder="+91 00000 00000"
                            autoComplete="tel"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'inq-phone-err' : undefined}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ROW 3: Project Type & Estimated Budget */}
                    <div className="inq-row">
                      <div className={`inq-field${errors.projectType ? ' has-error' : ''}`}>
                        <div className="inq-field-header">
                          <label htmlFor="inq-project-type" className="inq-label">
                            Project Type <span className="inq-req">*</span>
                          </label>
                          {errors.projectType && (
                            <span id="inq-type-err" className="inq-err-msg">
                              {errors.projectType}
                            </span>
                          )}
                        </div>
                        <div className="inq-input-wrap">
                          <Layers className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <select
                            id="inq-project-type"
                            className="inq-select"
                            value={form.projectType}
                            onChange={set('projectType')}
                            aria-required="true"
                            aria-invalid={!!errors.projectType}
                            aria-describedby={errors.projectType ? 'inq-type-err' : undefined}
                          >
                            <option value="">Select a type</option>
                            {PROJECT_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="inq-field">
                        <div className="inq-field-header">
                          <label htmlFor="inq-budget" className="inq-label">
                            Estimated Budget
                          </label>
                        </div>
                        <div className="inq-input-wrap">
                          <IndianRupee className="inq-input-icon" size={15} strokeWidth={2.2} />
                          <select
                            id="inq-budget"
                            className="inq-select"
                            value={form.budget}
                            onChange={set('budget')}
                          >
                            <option value="">Select a range</option>
                            {BUDGETS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* ROW 4: Project Details */}
                    <div className={`inq-field${errors.details ? ' has-error' : ''}`}>
                      <div className="inq-field-header">
                        <label htmlFor="inq-details" className="inq-label">
                          Project Details <span className="inq-req">*</span>
                        </label>
                        {errors.details && (
                          <span id="inq-details-err" className="inq-err-msg">
                            {errors.details}
                          </span>
                        )}
                      </div>
                      <div className="inq-input-wrap inq-textarea-wrap">
                        <FileText className="inq-input-icon" size={15} strokeWidth={2.2} />
                        <textarea
                          id="inq-details"
                          className="inq-textarea"
                          rows={2}
                          value={form.details}
                          onChange={set('details')}
                          placeholder="What are you trying to build, improve or automate?"
                          aria-required="true"
                          aria-invalid={!!errors.details}
                          aria-describedby={errors.details ? 'inq-details-err' : undefined}
                        />
                      </div>
                    </div>

                    {/* ROW 5: Submit CTA Button */}
                    <button
                      type="submit"
                      className="inq-submit-btn"
                      disabled={state === 'sending'}
                    >
                      {state === 'sending' ? (
                        <>
                          <span>Preparing WhatsApp Inquiry</span>
                          <Loader2 className="inq-spin" size={16} strokeWidth={2.6} />
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <ArrowRight className="inq-btn-arrow" size={16} strokeWidth={2.6} />
                        </>
                      )}
                    </button>

                    {/* Trust Footnote & Direct WhatsApp Chat */}
                    <div className="inq-footer-meta">
                      <div className="inq-foot-note">
                        <ShieldCheck size={14} strokeWidth={2.4} />
                        <span>We'll get back to you within 24 hours.</span>
                      </div>
                      <div className="inq-wa-fallback">
                        <a
                          href={DIRECT_WA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inq-wa-fallback-link"
                        >
                          Prefer WhatsApp? Chat with us directly →
                        </a>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
