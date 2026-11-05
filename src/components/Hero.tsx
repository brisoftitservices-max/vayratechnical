import React from 'react';
import { ArrowRight, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  language: Language;
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onRequestQuote, onExploreServices }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Photography with High Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_hvac_mep_1793794632219.jpg"
          alt="Commercial rooftop HVAC chillers and MEP plant overlooking Abu Dhabi"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        />
        {/* Measured Scrim for Legibility & WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Quiet Clean Unboxed Location Kicker with Official Logo (Anti-Pill compliant) */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-amber-400 mb-4 tracking-wide">
            <img
              src="/logo.svg"
              alt="Vayra Logo"
              className="w-7 h-7 rounded-full bg-white/10 p-0.5 shrink-0"
            />
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>{t.hero.locationBadge}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="text-neutral-300">{t.brandSuffix}</span>
          </div>

          {/* Sized clamp(2.25rem, 4vw, 3.75rem) with text-wrap: balance */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 [text-wrap:balance]">
            {t.hero.heading}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 mb-8 leading-relaxed max-w-2xl font-normal">
            {t.hero.subheading}
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 whitespace-nowrap"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={onExploreServices}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-md transition-colors whitespace-nowrap"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Immediate Contact Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-neutral-400">{t.hero.callUsPrompt}</span>
            <a
              href="tel:+971506398552"
              className="font-bold text-white hover:text-amber-400 transition-colors underline decoration-amber-500/50 underline-offset-4"
            >
              +971 50 639 8552
            </a>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Al Maha Tower, Abu Dhabi</span>
          </div>
        </div>
      </div>

      {/* Full-width 4-KPI Row placed below the Hero split */}
      <div className="relative z-10 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="border-s border-neutral-800 ps-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                {t.hero.statProjectsVal}
              </div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.hero.statProjects}
              </div>
            </div>

            <div className="border-s border-neutral-800 ps-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {t.hero.statResponseVal}
              </div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.hero.statResponse}
              </div>
            </div>

            <div className="border-s border-neutral-800 ps-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {t.hero.statSatisfactionVal}
              </div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.hero.statSatisfaction}
              </div>
            </div>

            <div className="border-s border-neutral-800 ps-4">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.hero.statSafetyVal}</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.hero.statSafety}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
