import React, { useState } from 'react';
import { ArrowRight, Wind, Cpu, Briefcase, Zap, Droplet, ShieldCheck } from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { servicesData } from '../data/servicesData';
import { translations } from '../data/translations';
import { ServiceModal } from './ServiceModal';

interface ServicesSectionProps {
  language: Language;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectServiceForQuote,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const t = translations[language];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Wind': return Wind;
      case 'Cpu': return Cpu;
      case 'Briefcase': return Briefcase;
      case 'Zap': return Zap;
      case 'Droplet': return Droplet;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2">
            {t.services.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal">
            {t.services.subheading}
          </p>
        </div>

        {/* Bento / Asymmetric Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const IconComp = getIcon(service.iconName);
            const title = language === 'en' ? service.titleEn : service.titleAr;
            const shortDesc = language === 'en' ? service.shortDescEn : service.shortDescAr;
            const scopePreview = language === 'en' ? service.scopeEn.slice(0, 3) : service.scopeAr.slice(0, 3);
            const indexStr = `0${index + 1}.`;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/60 dark:hover:border-amber-500/50 transition-all duration-200 hover:shadow-md"
              >
                <div>
                  {/* Natural Editorial Numbering & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">
                      {indexStr}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5 font-normal">
                    {shortDesc}
                  </p>

                  {/* Clean unboxed bullet previews */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-neutral-200/80 dark:border-neutral-800">
                    {scopePreview.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-800 mt-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t.services.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForQuote(service.titleEn)}
                    className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {language === 'en' ? 'Get Quote' : 'طلب تسعير'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Turnkey Assurance Strip */}
        <div className="mt-12 p-6 rounded-lg bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              {language === 'en'
                ? 'Need customized technical contracting or combined MEP + Civil package?'
                : 'هل تحتاج إلى حزمة مقاولات فنية مخصصة تشمل الكهروميكانيك والأعمال المدنية معاً؟'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              {language === 'en'
                ? 'Our licensed senior estimating engineers provide complimentary site surveys in Abu Dhabi.'
                : 'يقدم كبار مهندسي التقدير لدينا معاينات فنية ميدانية مجانية في كافة مناطق أبوظبي.'}
            </p>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'en' ? 'Book Site Survey' : 'طلب معاينة ميدانية'}
          </a>
        </div>
      </div>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        language={language}
        onClose={() => setSelectedService(null)}
        onRequestQuote={(serviceTitle) => {
          setSelectedService(null);
          onSelectServiceForQuote(serviceTitle);
        }}
      />
    </section>
  );
};
