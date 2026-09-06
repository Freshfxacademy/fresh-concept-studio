import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Intro', tc: '00:00:00' },
  { id: 'about', label: 'About', tc: '00:01:15' },
  { id: 'services', label: 'Services', tc: '00:02:30' },
  { id: 'work', label: 'Works', tc: '00:03:45' },
  { id: 'contact', label: 'Contact', tc: '00:05:00' },
];

export default function ScrubberRail() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-line z-50 lg:hidden">
        <div
          className="h-full bg-accent transition-all duration-75 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Desktop Vertical Scrubber Rail (Timeline Playhead at left: 24px) */}
      <nav
        aria-label="Timeline Navigation"
        className="hidden lg:flex fixed left-6 top-0 bottom-0 w-8 z-40 flex-col items-center justify-center pointer-events-none"
      >
        {/* The Track Line */}
        <div className="relative w-[2px] h-[70vh] bg-line rounded-full flex flex-col justify-between py-2">
          {/* Active fill playhead progress */}
          <div
            className="absolute top-0 left-0 w-full bg-accent rounded-full transition-all duration-75 ease-out"
            style={{ height: `${scrollPercent}%` }}
          />

          {/* Section Marks */}
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                aria-label={`Jump to ${sec.label}`}
                className="group relative -ml-[7px] w-4 h-4 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-accent ring-4 ring-accent-soft'
                      : 'w-2 h-2 bg-line group-hover:bg-ink-soft group-hover:scale-125'
                  }`}
                />

                {/* Section Hover/Active Tooltip */}
                <span
                  className={`absolute left-6 px-2.5 py-1 rounded bg-ink text-white font-mono text-[11px] whitespace-nowrap transition-all duration-150 pointer-events-none shadow-sm ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <span className="font-semibold text-accent mr-1.5">{sec.label}</span>
                  <span className="text-zinc-400 text-[10px]">{sec.tc}</span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
