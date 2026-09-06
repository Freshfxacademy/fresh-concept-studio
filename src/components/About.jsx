import React from 'react';
import founderPhoto from '../assets/founder.jpg';

const TOOLS = [
  'Premiere Pro',
  'DaVinci Resolve',
  'After Effects',
  'Blender',
  'Cinema 4D',
  'Photoshop',
  'Illustrator',
];

const STATS = [
  { value: '5+ Years', label: 'Timeline Experience' },
  { value: '150+', label: 'Delivered Masters' },
  { value: '< 48 Hours', label: 'First Assembly Turnaround' },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 max-w-[1120px] mx-auto border-t border-line"
    >
      {/* Section Title */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink">
          About & Studio Craft
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Founder Portrait (Authentic Photo, 4:5 ratio) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-line bg-bg-alt shadow-card-subtle p-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100">
              <img
                src={founderPhoto}
                alt="Odu Emmanuel Peter — Founder & Video Editor"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-ink">Odu Emmanuel Peter</span>
              <span className="text-ink-soft">Fresh Concept Studio</span>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4 text-base sm:text-lg text-ink font-body leading-relaxed">
            <p>
              I am a video editor and motion storyteller based in Lagos, working with directors, creators, and brands globally.
            </p>
            <p>
              My work spans from high-tension narrative thrillers and pacing-critical multi-cam podcasts to 3D kinetic animation and high-conversion commercial advertisements.
            </p>
            <p>
              Through Fresh Concept Studio, I manage the full post-production pipeline: rhythm-first rough assemblies, precise dialogue editing, color grading in DaVinci Resolve, and broadcast-compliant master exports.
            </p>
          </div>

          {/* Tool Badges */}
          <div className="mt-8 pt-6 border-t border-line">
            <p className="text-xs font-mono text-ink-soft font-semibold uppercase tracking-wider mb-3">
              Tools & Software
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg bg-bg-alt border border-line text-xs font-mono font-medium text-ink hover:border-ink/30 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Stat Numbers */}
          <div className="mt-8 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-bg-alt border border-line">
                <p className="text-2xl sm:text-3xl font-display font-bold text-ink">
                  {stat.value}
                </p>
                <p className="text-xs text-ink-soft font-body mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
