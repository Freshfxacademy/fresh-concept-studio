import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, ArrowUpRight } from 'lucide-react';
import Button from './Button';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'freshconceptstudio@gmail.com';
  const whatsappUrl = 'https://wa.me/2349065514169';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SOCIALS = [
    { name: 'X (Twitter)', url: 'https://x.com/SOLDIERSFROMTH' },
    { name: 'Instagram', url: 'https://www.instagram.com/SOLDIERSFROMTH1' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@soldiersfromth' },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 md:px-12 lg:pl-28 lg:pr-12 max-w-[1120px] mx-auto border-t border-line"
    >
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink">
          Let's Build Your Next Cut
        </h2>
        <p className="mt-2 text-ink-soft text-base sm:text-lg font-body max-w-2xl">
          Whether you need an entire season of multi-cam podcast edits, a high-octane narrative trailer, or 3D kinetic visuals, get in touch directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* WhatsApp Fast Channel */}
        <div className="p-8 rounded-2xl bg-bg-alt border border-line flex flex-col justify-between shadow-card-subtle">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-ink mb-2">
              WhatsApp Direct Chat
            </h3>
            <p className="text-sm text-ink-soft font-body leading-relaxed mb-6">
              Fastest response for project scope discussions, rate cards, and timeline scheduling.
            </p>
          </div>

          <div>
            <Button
              href={whatsappUrl}
              target="_blank"
              variant="primary"
              size="lg"
              className="w-full bg-[#128C7E] hover:bg-[#075E54] border-[#128C7E]"
              icon={ArrowUpRight}
            >
              Chat on WhatsApp (+234 906 551 4169)
            </Button>
          </div>
        </div>

        {/* Studio Email Channel */}
        <div className="p-8 rounded-2xl bg-bg-alt border border-line flex flex-col justify-between shadow-card-subtle">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent-soft text-accent border border-accent/20 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-ink mb-2">
              Studio Email
            </h3>
            <p className="text-sm text-ink-soft font-body leading-relaxed mb-4">
              Send raw footage links, creative briefs, scripts, or collaboration inquiries.
            </p>
            <p className="font-mono text-sm text-ink font-semibold select-all mb-6">
              {email}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href={`mailto:${email}`}
              variant="primary"
              size="md"
              className="flex-1"
              icon={Mail}
              iconPosition="left"
            >
              Send Email
            </Button>
            <Button
              onClick={handleCopyEmail}
              variant="outline"
              size="md"
              icon={copied ? Check : Copy}
              iconPosition="left"
            >
              {copied ? 'Copied' : 'Copy Email'}
            </Button>
          </div>
        </div>
      </div>

      {/* Social Row */}
      <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-ink-soft uppercase tracking-wider font-semibold">
          Follow Fresh Concept Studio
        </p>

        <div className="flex items-center gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-display font-medium text-ink hover:text-accent transition-colors flex items-center gap-1 group"
            >
              <span>{social.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-soft group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
