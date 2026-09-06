import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  // One-time title sequence entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const titleSequenceVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 max-w-[1120px] mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start"
      >
        {/* Top Studio Indicator */}
        <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-ink-soft tracking-wider font-semibold uppercase">
            Fresh Concept Studio
          </span>
          <span className="text-line">•</span>
          <span className="font-mono text-xs text-ink-soft">
            Lagos & Remote Global
          </span>
        </motion.div>

        {/* Title Sequence Entrance: Big Name & Role */}
        <motion.div variants={titleSequenceVariants} className="mb-6 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-ink leading-[1.05]">
            ODU EMMANUEL <span className="text-accent">PETER</span>
          </h1>
          <p className="mt-3 text-xl sm:text-2xl lg:text-3xl font-display font-medium text-ink-soft">
            Video Editor & Motion Storyteller
          </p>
        </motion.div>

        {/* One-Line Pitch */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-ink font-normal leading-relaxed max-w-3xl mb-10 font-body"
        >
          I cut podcasts, thrillers, animation and ads that hold attention.
        </motion.p>

        {/* 2 Signature CTA Buttons with 3D Shutter Click Press */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
          <Button
            href="#work"
            variant="primary"
            size="lg"
            icon={Play}
            iconPosition="right"
          >
            See my work
          </Button>

          <Button
            href="#contact"
            variant="outline"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Get in touch
          </Button>
        </motion.div>

        {/* Technical Specs Ribbon */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-line w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono"
        >
          <div>
            <p className="text-ink-soft text-[11px] mb-0.5 font-medium">NLE Workflow</p>
            <p className="text-ink font-semibold">Premiere & DaVinci Resolve</p>
          </div>
          <div>
            <p className="text-ink-soft text-[11px] mb-0.5 font-medium">Visual Range</p>
            <p className="text-ink font-semibold">5 Disciplines & VFX</p>
          </div>
          <div>
            <p className="text-ink-soft text-[11px] mb-0.5 font-medium">Turnaround</p>
            <p className="text-ink font-semibold">Fast 48-Hour Assembly</p>
          </div>
          <div>
            <p className="text-ink-soft text-[11px] mb-0.5 font-medium">Availability</p>
            <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Open for Bookings
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
