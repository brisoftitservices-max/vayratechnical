import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { Language } from '../types';

interface FloatingActionsProps {
  language: Language;
  onRequestQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  language,
  onRequestQuote,
}) => {
  return (
    <div className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Action Floating Bubble */}
      <a
        href="https://wa.me/971506398552?text=Hello%20Vayra%20Technical%20Contracting,%20I%20would%20like%20to%20inquire%20about%20your%20MEP/HVAC%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs font-semibold hidden sm:inline">WhatsApp</span>
      </a>

      {/* Direct Call Button Bubble */}
      <a
        href="tel:+971506398552"
        aria-label="Call +971 50 639 8552"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="w-4 h-4" />
        <span className="text-xs font-bold font-mono hidden sm:inline">+971 50 639 8552</span>
      </a>

      {/* Quick Request Quote */}
      <button
        onClick={onRequestQuote}
        aria-label="Request quote"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 text-white border border-neutral-700 shadow-lg transition-transform hover:scale-105"
      >
        <FileText className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold hidden sm:inline">
          {language === 'en' ? 'Quick RFQ' : 'طلب تسعير سريع'}
        </span>
      </button>
    </div>
  );
};
