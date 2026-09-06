import React from 'react';
import {
  Mic,
  Film,
  Box,
  Clapperboard,
  Megaphone,
  Sparkles,
  Palette,
  Code2,
  ArrowUpRight,
} from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    title: 'Podcast editing & multi-cam cutdowns',
    description:
      'Dynamic multi-angle speaker sync, dialogue de-noising, pacing calibration, and short-form viral vertical clips.',
    deliverable: 'Multi-Cam Sync • Short-Form Cuts',
    trackColor: '#2E6F6E',
    icon: Mic,
  },
  {
    id: '02',
    title: 'Action/thriller narrative editing & color',
    description:
      'Tension-building cut sequences, impact transitions, combat timing, and moody DaVinci color grading.',
    deliverable: 'Narrative Pacing • Color Grading',
    trackColor: '#8A1E1E',
    icon: Film,
  },
  {
    id: '03',
    title: '3D animation & motion design',
    description:
      'Blender and Cinema 4D kinetic typography, product visualization, title sequence animations, and procedural motion.',
    deliverable: 'Cinema 4D • Blender • Motion',
    trackColor: '#5B4B9E',
    icon: Box,
  },
  {
    id: '04',
    title: 'Short film editing',
    description:
      'End-to-end assembly, director cut pacing, sound design integration, Foley, and festival-ready DCI-compliant master exports.',
    deliverable: 'DCI Master • Sound Design',
    trackColor: '#B4791F',
    icon: Clapperboard,
  },
  {
    id: '05',
    title: 'Advertisement & commercial cutting',
    description:
      'High-conversion, punchy broadcast commercial spots crafted for 16:9, 9:16 vertical, and multi-platform ad placements.',
    deliverable: '16:9 & 9:16 • Commercial Ads',
    trackColor: '#1F5FA8',
    icon: Megaphone,
  },
  {
    id: '06',
    title: 'Cinematic AI filmmaking',
    description:
      'Generative video workflows, prompt keyframing, AI-assisted background extensions, and hybrid VFX pipelines.',
    deliverable: 'Generative Video • Hybrid VFX',
    trackColor: '#E6401C',
    icon: Sparkles,
  },
  {
    id: '07',
    title: 'Illustration',
    description:
      'Keyframe mood paintings, character concept art, storyboarding, and digital art assets crafted for cinematic pre-visualization.',
    deliverable: 'Storyboards • Pre-Viz Art',
    trackColor: '#C23B7B',
    icon: Palette,
  },
  {
    id: '08',
    title: 'Web development (frontend)',
    description:
      'Frontend development — I build the interface and experience; for full-stack or backend-heavy builds I collaborate with a backend developer.',
    deliverable: 'React • Tailwind CSS • UI/UX',
    trackColor: '#2B8A3E',
    icon: Code2,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 max-w-[1120px] mx-auto border-t border-line"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-line pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink">
            Services & Offerings
          </h2>
          <p className="mt-1 text-sm text-ink-soft font-body">
            Eight short blocks mapped to actual post-production and creative capabilities.
          </p>
        </div>

        <span className="text-xs font-mono text-ink-soft uppercase tracking-wider font-semibold">
          8 Standard Tracks
        </span>
      </div>

      {/* 4x2 Grid on Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-5 rounded-xl bg-white border border-line hover:border-ink/40 transition-all duration-200 flex flex-col justify-between group shadow-card-subtle hover:shadow-card-hover"
              style={{ borderTop: `3px solid ${service.trackColor}` }}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className="font-mono text-[11px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${service.trackColor}15`,
                      color: service.trackColor,
                    }}
                  >
                    Track {service.id}
                  </span>

                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: `${service.trackColor}15`,
                      color: service.trackColor,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-sm font-display font-bold text-ink leading-snug min-h-[38px] flex items-center group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-ink-soft leading-relaxed font-body">
                  {service.description}
                </p>
              </div>

              <div className="mt-5">
                <div className="pt-3 border-t border-line flex items-center gap-1.5 text-[11px] font-mono text-ink-soft">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: service.trackColor }}
                  />
                  <span className="truncate">{service.deliverable}</span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-mono font-semibold text-ink group-hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
