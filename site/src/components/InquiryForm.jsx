import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { useInquiry } from '../context/Inquiry';
import { COMPANY } from '../data/site';

const PROJECT_TYPES = [
  'Website / E-commerce',
  'Web Application',
  'Mobile App',
  'Business Automation',
  'AI Solution',
  'SEO & Growth',
  'Support / Maintenance',
  'Something else',
];

const BUDGETS = [
  'Under ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹7,00,000',
  '₹7,00,000+',
  'Not sure yet',
];

const EMPTY = {
  name: '', company: '', email: '', phone: '',
  projectType: '', budget: '', details: '',
};

export default function InquiryForm() {
  const { open, closeInquiry } = useInquiry();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email looks incomplete';
    if (form.phone && !/^[\d\s+()-]{7,}$/.test(form.phone)) e.phone = 'That phone number looks incomplete';
    if (!form.projectType) e.projectType = 'Choose a project type';
    if (!form.details.trim()) e.details = 'Tell us a little about the project';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setState('sending');

    /* ------------------------------------------------------------------
       FRONTEND-READY SUBMIT.
       No backend is configured, so the user gets a success state.
       To wire this up later, replace the block below with a fetch() to
       your endpoint / form service:

         await fetch('/api/inquiry', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(form),
         });
    ------------------------------------------------------------------ */
    await new Promise((r) => setTimeout(r, 850));
    setState('done');
  }

  function reset() {
    setForm(EMPTY);
    setErrors({});
    setState('idle');
    closeInquiry();
  }

  const field = (k) => `inq-field${errors[k] ? ' has-error' : ''}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="inq-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && reset()}
          role="dialog"
          aria-modal="true"
          aria-label="Project inquiry"
        >
          <motion.div
            className="inq"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="inq-close" onClick={reset} aria-label="Close">
              <X size={19} strokeWidth={2.3} />
            </button>

            {state === 'done' ? (
              <div className="inq-done">
                <span className="inq-tick"><Check size={30} strokeWidth={3} /></span>
                <h3>Thanks — we've got it.</h3>
                <p>
                  Your inquiry has been captured. We typically respond within 24 hours.
                  You can also reach us directly at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
                </p>
                <button className="btn btn-dark" onClick={reset}>Close</button>
              </div>
            ) : (
              <>
                <div className="inq-head">
                  <span className="eyebrow"><span className="dot" />Project Inquiry</span>
                  <h3>Tell us about your project</h3>
                  <p>Share a few details and we'll come back to you within 24 hours.</p>
                </div>

                <form className="inq-form" onSubmit={submit} noValidate>
                  <div className="inq-row">
                    <label className={field('name')}>
                      <span>Name <b>*</b></span>
                      <input value={form.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
                      {errors.name && <em>{errors.name}</em>}
                    </label>
                    <label className={field('company')}>
                      <span>Company</span>
                      <input value={form.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
                    </label>
                  </div>

                  <div className="inq-row">
                    <label className={field('email')}>
                      <span>Email <b>*</b></span>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" />
                      {errors.email && <em>{errors.email}</em>}
                    </label>
                    <label className={field('phone')}>
                      <span>Phone</span>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" autoComplete="tel" />
                      {errors.phone && <em>{errors.phone}</em>}
                    </label>
                  </div>

                  <div className="inq-row">
                    <label className={field('projectType')}>
                      <span>Project Type <b>*</b></span>
                      <select value={form.projectType} onChange={set('projectType')}>
                        <option value="">Select a type</option>
                        {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      {errors.projectType && <em>{errors.projectType}</em>}
                    </label>
                    <label className={field('budget')}>
                      <span>Estimated Budget</span>
                      <select value={form.budget} onChange={set('budget')}>
                        <option value="">Select a range</option>
                        {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className={field('details')}>
                    <span>Project Details <b>*</b></span>
                    <textarea
                      rows={4}
                      value={form.details}
                      onChange={set('details')}
                      placeholder="What are you trying to build, improve or automate?"
                    />
                    {errors.details && <em>{errors.details}</em>}
                  </label>

                  <button className="btn btn-lime inq-submit" type="submit" disabled={state === 'sending'}>
                    {state === 'sending' ? (
                      <>Sending<span className="ico spin"><Loader2 size={17} strokeWidth={2.6} /></span></>
                    ) : (
                      <>Submit Inquiry<span className="ico"><ArrowUpRight size={17} strokeWidth={2.6} /></span></>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
