import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];
const goHome = () => { window.location.href = '/'; };

/* Branded 404 for unknown routes (SPA catches all paths). */
export default function NotFound() {
  return (
    <main className="nf404">
      <motion.div
        className="nf404-card"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease }}
      >
        <span className="pill"><span className="pdot" />404 — Page not found</span>
        <h1>This page took a wrong turn<span className="acc">.</span></h1>
        <p>
          The link is broken or the page was moved. Let's get you back to
          ideas, impact and working software.
        </p>
        <div className="nf404-actions">
          <button className="btn btn-lime" onClick={goHome}>
            <span className="ico"><ArrowLeft size={16} strokeWidth={2.4} /></span>
            Back to Home
          </button>
          <button className="btn btn-dark" onClick={() => { window.location.href = '/#services'; }}>
            Explore Services
            <span className="ico"><Compass size={16} strokeWidth={2.2} /></span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
