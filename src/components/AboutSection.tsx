import React from 'react';
import { ShieldCheck, Award, Users, Clock, Building2, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = translations[language];

  const pillarIcons = [ShieldCheck, Award, Users, Clock];

  return (
    <section id="about" className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading Section */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2">
            {t.about.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            {t.about.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {t.about.intro}
          </p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story & Text Prose */}
          <div className="lg:col-span-7 space-y-6 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
            <p>{t.about.para1}</p>
            <p>{t.about.para2}</p>

            {/* 4 Foundation Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
              {t.about.pillars.map((pillar, idx) => {
                const IconComponent = pillarIcons[idx % pillarIcons.length];
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white dark:bg-neutral-800/80 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80"
                  >
                    <div className="w-9 h-9 rounded-md bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Headquarters & Authority Sidebar Box */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-800 rounded-lg p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-700">
              <img
                src="/logo.svg"
                alt="Vayra Emblem"
                className="w-12 h-12 rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t.about.officeTitle}
                </h3>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t.brandSuffix}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
                  Registered Location
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Al Maha Tower, Abu Dhabi, United Arab Emirates
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
                  Official Phone Desk
                </span>
                <a
                  href="tel:+971506398552"
                  className="font-mono text-base font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>+971 50 639 8552</span>
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
                  Regulatory Compliance
                </span>
                <ul className="text-xs space-y-1.5 text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Abu Dhabi Department of Economic Development Licensed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>UAE Civil Defense Fire & Life Safety Standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Abu Dhabi OSHAD Safety Management System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Estidama Pearl Building Environmental Criteria</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 dark:bg-amber-400 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-300 rounded-md transition-colors"
                >
                  {language === 'en' ? 'Inquire with Technical Team' : 'تواصل مع فريقنا الهندسي'}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
