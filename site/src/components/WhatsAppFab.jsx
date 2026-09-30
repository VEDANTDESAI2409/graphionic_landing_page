import { COMPANY } from '../data/site';

/* Floating WhatsApp CTA — appears over every section.
   Links straight into a pre-filled chat with the studio. */

const WA_NUMBER = `91${COMPANY.phone.replace(/\D/g, '')}`;
const WA_TEXT = encodeURIComponent(
  "Hi Graphionic! 👋 I'd like to discuss a project — web / app / AI automation."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export default function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Graphionic on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.63-.92-2.23-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.23 5.12 4.53.72.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88Zm8.42-18.3A11.8 11.8 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41Z" />
      </svg>
    </a>
  );
}
