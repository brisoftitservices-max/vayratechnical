import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { testimonialsData } from '../data/testimonialsData';
import { translations } from '../data/translations';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section id="testimonials" className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2">
            {t.testimonials.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t.testimonials.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal">
            {t.testimonials.subheading}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((item) => {
            const quote = language === 'en' ? item.quoteEn : item.quoteAr;
            const author = language === 'en' ? item.authorEn : item.authorAr;
            const role = language === 'en' ? item.roleEn : item.roleAr;
            const company = language === 'en' ? item.companyEn : item.companyAr;
            const projectType = language === 'en' ? item.projectTypeEn : item.projectTypeAr;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div>
                  {/* Top Bar with Stars & Verified Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.testimonials.verifiedClient}</span>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-amber-500/20 mb-2" />
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                      "{quote}"
                    </p>
                  </div>
                </div>

                {/* Author Credentials & Project Type */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="font-bold text-sm text-neutral-900 dark:text-white">
                    {author}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {role} · {company}
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                    {projectType}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Badges Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-4">
            {language === 'en'
              ? 'Executing Projects in Strict Alignment With UAE Authorities'
              : 'تنفيذ المشاريع وفق اشتراطات الهيئات والجهات المعنية في دولة الإمارات'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-neutral-600 dark:text-neutral-400">
            <span>Abu Dhabi Municipality (ADM)</span>
            <span aria-hidden="true">·</span>
            <span>UAE Civil Defense</span>
            <span aria-hidden="true">·</span>
            <span>Abu Dhabi Distribution Co. (ADDC)</span>
            <span aria-hidden="true">·</span>
            <span>OSHAD Safety Management</span>
            <span aria-hidden="true">·</span>
            <span>Estidama Pearl Standards</span>
          </div>
        </div>

      </div>
    </section>
  );
};
