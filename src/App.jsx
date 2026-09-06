import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrubberRail from './components/ScrubberRail';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WorkSection from './components/Work/WorkSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Button from './components/Button';
import { ArrowUpRight } from 'lucide-react';

function PublicPortfolio() {
  return (
    <div className="relative min-h-screen bg-bg text-ink selection:bg-accent-soft selection:text-accent">
      {/* Timeline Scrubber Navigation Rail */}
      <ScrubberRail />

      {/* Top Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
            <span className="font-display font-bold text-sm sm:text-base text-ink tracking-tight">
              FRESH CONCEPT <span className="text-accent">STUDIO</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-ink-soft">
            <a href="#about" className="hover:text-ink transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-ink transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-ink transition-colors">
              Work
            </a>
            <a href="#contact" className="hover:text-ink transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="https://wa.me/2349065514169"
              target="_blank"
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
            >
              Book Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Portfolio Sections */}
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <WorkSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPortfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
