import React from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Wind, Cpu, Briefcase, Zap, Droplet } from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { translations } from '../data/translations';

interface ServiceModalProps {
  service: ServiceItem | null;
  language: Language;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  language,
  onClose,
  onRequestQuote,
}) => {
  if (!service) return null;
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

  const IconComp = getIcon(service.iconName);

  const title = language === 'en' ? service.titleEn : service.titleAr;
  const fullDesc = language === 'en' ? service.fullDescEn : service.fullDescAr;
  const scope = language === 'en' ? service.scopeEn : service.scopeAr;
  const specs = language === 'en' ? service.keySpecsEn : service.keySpecsAr;
  const clients = language === 'en' ? service.typicalClientsEn : service.typicalClientsAr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pe-10">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              {service.category.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          <p>{fullDesc}</p>
        </div>

        {/* Scope of Work */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
            {t.services.scopeHeader}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {scope.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/60 p-2.5 rounded-md border border-neutral-100 dark:border-neutral-800"
              >
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Highlights / Specs */}
        <div className="mb-6 p-4 bg-amber-500/5 dark:bg-amber-400/5 rounded-lg border border-amber-500/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            {t.services.specsHeader}
          </h4>
          <ul className="text-xs sm:text-sm space-y-1.5 text-neutral-700 dark:text-neutral-300">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Sectors */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-8">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.services.clientsHeader}: </span>
          <span>{clients}</span>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {t.services.closeModal}
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.titleEn);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
          >
            <span>{t.services.quoteForThis}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
