import React from 'react';

export const CATEGORIES = [
  { id: 'all', label: 'All', color: '#0D0D10' },
  { id: 'podcast', label: 'Podcast', color: '#2E6F6E' },
  { id: 'action-thriller', label: 'Action Thriller', color: '#8A1E1E' },
  { id: '3d-animation', label: '3D Animation', color: '#5B4B9E' },
  { id: 'short-film', label: 'Short Films', color: '#B4791F' },
  { id: 'advertisement', label: 'Advertisement', color: '#1F5FA8' },
  { id: 'illustration', label: 'Illustration', color: '#C23B7B' },
  { id: 'web-development', label: 'Web Development', color: '#2B8A3E' },
];

export default function CategoryFilter({ activeCategory, onSelectCategory, counts }) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-2 overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 flex items-center gap-2 border select-none cursor-pointer ${
              isActive
                ? 'bg-ink text-white border-ink shadow-sm'
                : 'bg-white text-ink-soft border-line hover:border-ink/30 hover:text-ink'
            }`}
          >
            {cat.id !== 'all' && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
            )}
            <span className="font-display font-medium">{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                isActive ? 'bg-zinc-800 text-white' : 'bg-bg-alt text-ink-soft'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
