import React, { useState } from 'react';
import { Play, ExternalLink, Film, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from './CategoryFilter';

export default function PortfolioCard({ item, onOpenModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const categoryMeta = CATEGORIES.find((c) => c.id === item.category) || {
    label: item.category,
    color: '#E6401C',
  };

  const isVideo = item.mediaType === 'video';
  const hasValidYoutube =
    isVideo &&
    item.youtubeId &&
    item.youtubeId !== 'REPLACE_WITH_YOUTUBE_ID';

  const youtubeThumb = hasValidYoutube
    ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
    : null;

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (onOpenModal) {
      onOpenModal(item);
    } else if (isVideo && hasValidYoutube) {
      setIsPlayingInline(true);
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (onOpenModal) {
      onOpenModal(item);
    } else {
      setIsPlayingInline(true);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-xl bg-white border border-line hover:border-ink/40 overflow-hidden transition-all duration-200 flex flex-col shadow-card-subtle hover:shadow-card-hover cursor-pointer select-none"
      style={{ borderLeft: `3.5px solid ${categoryMeta.color}` }}
    >
      {/* Media Area (16:9 aspect ratio) */}
      <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
        {isVideo ? (
          isPlayingInline && hasValidYoutube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full relative flex items-center justify-center">
              {youtubeThumb && !thumbError ? (
                <img
                  src={youtubeThumb}
                  alt={item.title}
                  onError={() => setThumbError(true)}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
                  <Film className="w-8 h-8 text-zinc-600 mb-2 group-hover:text-accent transition-colors" />
                  <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    {item.client}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 mt-1">
                    Click to load master cut
                  </span>
                </div>
              )}

              {/* Play Button Overlay (Click-to-play) */}
              <div
                onClick={handlePlayClick}
                className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-md transform group-hover:scale-110 active:scale-95 transition-all duration-150 border border-white/20">
                  <Play className="w-4 h-4 ml-0.5 fill-white" />
                </div>
              </div>

              {/* Category Track Tag */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-ink/85 backdrop-blur-xs text-white font-mono text-[10px] flex items-center gap-1.5 border border-white/10 pointer-events-none">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: categoryMeta.color }}
                />
                <span>{categoryMeta.label}</span>
              </div>

              {/* Year Stamp */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-ink/85 text-white font-mono text-[10px] border border-white/10 pointer-events-none">
                {item.year}
              </div>
            </div>
          )
        ) : (
          /* Media Card (Static Image for Illustration & Web Development) */
          <div className="w-full h-full relative">
            {item.imageSrc ? (
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="w-8 h-8 text-zinc-600 mb-2" />
                <span className="font-mono text-xs text-zinc-400 font-bold">
                  {item.client}
                </span>
              </div>
            )}

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
              <span className="px-3 py-1.5 bg-ink text-white font-mono text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{item.externalUrl ? 'Visit Link' : 'View Piece'}</span>
              </span>
            </div>

            {/* Category Tag */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-ink/85 backdrop-blur-xs text-white font-mono text-[10px] flex items-center gap-1.5 border border-white/10 pointer-events-none">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: categoryMeta.color }}
              />
              <span>{categoryMeta.label}</span>
            </div>

            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-ink/85 text-white font-mono text-[10px] border border-white/10 pointer-events-none">
              {item.year}
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs text-ink-soft uppercase font-semibold tracking-tight truncate max-w-[70%]">
              {item.client}
            </span>
            <span
              className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${categoryMeta.color}15`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.label}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-display font-bold text-ink leading-snug group-hover:text-accent transition-colors line-clamp-1">
            {item.title}
          </h3>

          {item.tagline && (
            <p className="mt-1 text-xs text-ink-soft line-clamp-2 leading-relaxed font-body">
              {item.tagline}
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-2.5 border-t border-line flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tools &&
              item.tools.slice(0, 2).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-bg-alt text-ink font-mono text-[10px] rounded border border-line"
                >
                  {t}
                </span>
              ))}
            {item.tools && item.tools.length > 2 && (
              <span className="px-1 py-0.5 text-ink-soft font-mono text-[10px]">
                +{item.tools.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-accent group-hover:underline">
            {isVideo ? (
              <span>Watch Cut →</span>
            ) : item.externalUrl ? (
              <span className="flex items-center gap-1">
                Link <ExternalLink className="w-3 h-3" />
              </span>
            ) : (
              <span>View Piece →</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
