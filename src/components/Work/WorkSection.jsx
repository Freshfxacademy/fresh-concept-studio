import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ExternalLink, Film } from 'lucide-react';
import { usePortfolioItems } from '../../hooks/usePortfolioItems';
import CategoryFilter, { CATEGORIES } from './CategoryFilter';
import PortfolioCard from './PortfolioCard';
import Button from '../Button';

export default function WorkSection() {
  const { items } = usePortfolioItems();
  const [activeCategory, setActiveCategory] = useState('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Dynamic counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: items.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = items.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, [items]);

  // Filtered and sorted items (featured first in "All", then recent year)
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'all' || item.category === activeCategory;
        const matchesFeatured = !featuredOnly || item.featured;
        return matchesCategory && matchesFeatured;
      })
      .sort((a, b) => {
        if (activeCategory === 'all') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return (b.year || 2026) - (a.year || 2026);
      });
  }, [items, activeCategory, featuredOnly]);

  return (
    <section
      id="work"
      className="py-20 px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 max-w-[1120px] mx-auto border-t border-line"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-line pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink">
            Selected Work
          </h2>
          <p className="mt-1 text-sm text-ink-soft font-body">
            Five video tracks, kinetic 3D motion, and visual designs.
          </p>
        </div>

        {/* Featured Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
              featuredOnly
                ? 'bg-accent text-white border-accent shadow-sm'
                : 'bg-white text-ink-soft border-line hover:border-ink hover:text-ink'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Only</span>
          </button>
        </div>
      </div>

      {/* Category Track Filter Bar */}
      <div className="mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Works Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <PortfolioCard
                  item={item}
                  onOpenModal={(selected) => setActiveModalItem(selected)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-16 text-center border border-dashed border-line rounded-xl bg-bg-alt font-mono">
          <Film className="w-8 h-8 text-ink-soft mx-auto mb-2" />
          <p className="font-display font-bold text-ink text-sm">
            NO PIECES FOUND FOR THIS TRACK
          </p>
          <p className="text-xs text-ink-soft mt-1">
            Pending master exports will be cataloged upon render completion.
          </p>
        </div>
      )}

      {/* Detail Theater Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden border border-line shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-3.5 bg-ink text-white flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-bold uppercase text-accent">
                    {activeModalItem.category}
                  </span>
                  <span className="text-zinc-400">
                    • Client: {activeModalItem.client}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player / Media Container */}
              <div className="aspect-video w-full bg-black overflow-hidden relative">
                {activeModalItem.mediaType === 'video' ? (
                  activeModalItem.youtubeId &&
                  activeModalItem.youtubeId !== 'REPLACE_WITH_YOUTUBE_ID' ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeModalItem.youtubeId}?autoplay=1&rel=0`}
                      title={activeModalItem.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-white font-mono">
                      <Film className="w-12 h-12 text-accent mb-3" />
                      <h4 className="text-lg font-display font-bold">
                        {activeModalItem.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 max-w-md">
                        Master video slot. Connects to client YouTube master feeds.
                      </p>
                    </div>
                  )
                ) : (
                  <img
                    src={activeModalItem.imageSrc}
                    alt={activeModalItem.title}
                    className="w-full h-full object-contain bg-zinc-950"
                  />
                )}
              </div>

              {/* Metadata Body */}
              <div className="p-6 sm:p-8 overflow-y-auto bg-white flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink">
                        {activeModalItem.title}
                      </h3>
                      <p className="font-mono text-xs text-ink-soft mt-1">
                        Client:{' '}
                        <span className="text-ink font-semibold">
                          {activeModalItem.client}
                        </span>{' '}
                        • Year: {activeModalItem.year} • Master Deliverable
                      </p>
                    </div>

                    {activeModalItem.externalUrl && (
                      <Button
                        href={activeModalItem.externalUrl}
                        target="_blank"
                        variant="primary"
                        size="sm"
                        icon={ExternalLink}
                      >
                        Launch Project
                      </Button>
                    )}
                  </div>

                  {activeModalItem.tagline && (
                    <p className="mt-3 text-sm sm:text-base font-body text-ink-soft border-l-2 border-accent pl-3 italic">
                      "{activeModalItem.tagline}"
                    </p>
                  )}

                  <div className="mt-5 pt-3 border-t border-line flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-ink-soft">Tools:</span>
                    {activeModalItem.tools?.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-bg-alt text-ink font-mono text-xs rounded border border-line"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-mono text-xs text-ink-soft">
                    Need a similar cut with Fresh Concept Studio?
                  </span>
                  <Button
                    href="#contact"
                    onClick={() => setActiveModalItem(null)}
                    variant="outline"
                    size="sm"
                  >
                    Inquire Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
