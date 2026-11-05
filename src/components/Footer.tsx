import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { VayraLogo } from './VayraLogo';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-neutral-800">
          
          {/* Brand & Legal Entity Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <VayraLogo size={40} className="bg-white/5 p-0.5 rounded-full shrink-0" />
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {t.brandName}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono block">
                  {t.brandSuffix}
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pt-1">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{t.footer.compliance}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-amber-400 transition-colors">
                  {t.nav.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.servicesLinks}
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>HVAC & Air Conditioning</li>
              <li>MEP Engineering Contracting</li>
              <li>General Technical Civil Works</li>
              <li>Electrical & Low Voltage</li>
              <li>Plumbing & Water Systems</li>
              <li>24/7 Annual Maintenance (AMC)</li>
            </ul>
          </div>

          {/* Office Contact Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300">
                  Al Maha Tower, Abu Dhabi, United Arab Emirates
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="tel:+971506398552"
                  className="font-mono text-amber-400 hover:underline"
                >
                  +971 50 639 8552
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="mailto:info@vayratechnical.com"
                  className="hover:text-white transition-colors"
                >
                  info@vayratechnical.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {t.brandName} {t.brandSuffix}. {t.footer.rights}
          </div>
          <div>
            {t.footer.legal}
          </div>
        </div>
      </div>
    </footer>
  );
};
