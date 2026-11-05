import React from 'react';
import { PhoneCall, MessageCircle, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EmergencyBannerProps {
  language: Language;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="bg-neutral-900 text-white border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-start">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </span>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-amber-400">{t.emergencyBanner.title} </span>
              <span className="text-neutral-300 hidden sm:inline">{t.emergencyBanner.desc}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+971506398552"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.emergencyBanner.callBtn}</span>
            </a>
            <a
              href="https://wa.me/971506398552?text=Hello%20Vayra%20Technical%20Contracting,%20I%20have%20an%20urgent%20HVAC/MEP%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900/60 rounded-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.emergencyBanner.whatsappBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
