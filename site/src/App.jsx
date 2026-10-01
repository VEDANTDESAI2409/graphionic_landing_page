import { InquiryProvider } from './context/Inquiry';
import SmoothScroll from './context/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Experience from './components/Experience';
import EngagementModels from './components/EngagementModels';
import Projects from './components/Projects';
import WhyGraphionic from './components/WhyGraphionic';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import InquiryForm from './components/InquiryForm';
import WhatsAppFab from './components/WhatsAppFab';
import NotFound from './components/NotFound';

const isHomePath =
  typeof window === 'undefined' ||
  window.location.pathname === '/' ||
  window.location.pathname === '';

export default function App() {
  if (!isHomePath) {
    return (
      <InquiryProvider>
        <div className="page">
          <NotFound />
          <WhatsAppFab />
        </div>
      </InquiryProvider>
    );
  }

  return (
    <InquiryProvider>
      <SmoothScroll>
        <div className="page">
          <Navbar />
          <main>
            {/* 1 */} <Hero />
            {/* 2 */} <About />
            {/* 3 */} <Stats />
            {/* 4 */} <Experience />
            {/* 5 */} <EngagementModels />
            {/* 6 */} <Projects />
            {/* 8 */} <WhyGraphionic />
            {/* 9 */} <Reviews />
            {/* 10 */} <Faq />
            {/* 11 */} <FinalCta />
          </main>
          {/* 13 */}
          <Footer />
          {/* 12 — modal, mounted last */}
          <InquiryForm />
          {/* 14 — always-on WhatsApp CTA */}
          <WhatsAppFab />
        </div>
      </SmoothScroll>
    </InquiryProvider>
  );
}
