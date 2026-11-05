import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Sparkles, FileText } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { EstimateSummaryModal } from './EstimateSummaryModal';

interface EstimatorCalculatorProps {
  language: Language;
  onApplyEstimateToQuote: (data: {
    propertyType: string;
    serviceCategory: string;
    area: number;
    estimatedCost: string;
  }) => void;
}

export const EstimatorCalculator: React.FC<EstimatorCalculatorProps> = ({
  language,
  onApplyEstimateToQuote,
}) => {
  const [propertyType, setPropertyType] = useState<'commercial' | 'villa' | 'apartment' | 'industrial'>('villa');
  const [serviceType, setServiceType] = useState<'hvac_full' | 'mep_full' | 'amc' | 'refurbish'>('hvac_full');
  const [area, setArea] = useState<number>(3500);
  const [urgency, setUrgency] = useState<'standard' | 'urgent' | 'emergency'>('standard');
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const t = translations[language];

  // Realistic UAE contracting unit rates in AED per sq ft
  const baseRatePerSqFt: Record<string, Record<string, number>> = {
    hvac_full: {
      commercial: 38,
      villa: 45,
      apartment: 32,
      industrial: 28,
    },
    mep_full: {
      commercial: 65,
      villa: 78,
      apartment: 55,
      industrial: 48,
    },
    amc: {
      commercial: 4.5,
      villa: 6.0,
      apartment: 3.5,
      industrial: 3.0,
    },
    refurbish: {
      commercial: 55,
      villa: 68,
      apartment: 45,
      industrial: 40,
    },
  };

  const urgencyMultiplier = {
    standard: 1.0,
    urgent: 1.15,
    emergency: 1.3,
  };

  const unitRate = (baseRatePerSqFt[serviceType]?.[propertyType] || 40) * urgencyMultiplier[urgency];
  const calculatedEstimate = Math.round(area * unitRate);
  const minEstimate = Math.round(calculatedEstimate * 0.9);
  const maxEstimate = Math.round(calculatedEstimate * 1.15);

  const getTurnaroundDays = () => {
    if (serviceType === 'amc') return language === 'en' ? 'Annual Contract (Quarterly visits)' : 'عقد سنوي (زيارات ربع سنوية)';
    if (urgency === 'emergency') return language === 'en' ? 'Within 24 Hours dispatch' : 'تدخل فوري خلال 24 ساعة';
    if (area < 2500) return language === 'en' ? '10 - 18 Working Days' : '10 - 18 يوم عمل';
    if (area < 8000) return language === 'en' ? '20 - 35 Working Days' : '20 - 35 يوم عمل';
    return language === 'en' ? '45 - 60 Working Days' : '45 - 60 يوم عمل';
  };

  const formattedMin = minEstimate.toLocaleString('en-US');
  const formattedMax = maxEstimate.toLocaleString('en-US');

  const handleTransfer = () => {
    const propertyLabels = t.calculator.propertyTypes;
    const serviceLabels = t.calculator.serviceTypes;
    onApplyEstimateToQuote({
      propertyType: propertyLabels[propertyType],
      serviceCategory: serviceLabels[serviceType],
      area,
      estimatedCost: `${formattedMin} - ${formattedMax} AED`,
    });
  };

  return (
    <section id="estimator" className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>{t.calculator.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t.calculator.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal">
            {t.calculator.subheading}
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-900 p-6 sm:p-8 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-6">
            
            {/* Property Type Radio Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
                1. {t.calculator.propertyType}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(['villa', 'commercial', 'apartment', 'industrial'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`flex items-center justify-between p-3 text-xs font-medium rounded-md border text-start transition-all ${
                      propertyType === type
                        ? 'bg-white dark:bg-neutral-800 border-amber-500 text-neutral-950 dark:text-white shadow-sm ring-1 ring-amber-500'
                        : 'bg-white/60 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <span>{t.calculator.propertyTypes[type]}</span>
                    {propertyType === type && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
                2. {t.calculator.serviceType}
              </label>
              <div className="space-y-2">
                {(['hvac_full', 'mep_full', 'amc', 'refurbish'] as const).map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => setServiceType(svc)}
                    className={`w-full flex items-center justify-between p-3 text-xs font-medium rounded-md border text-start transition-all ${
                      serviceType === svc
                        ? 'bg-white dark:bg-neutral-800 border-amber-500 text-neutral-950 dark:text-white shadow-sm ring-1 ring-amber-500'
                        : 'bg-white/60 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <span>{t.calculator.serviceTypes[svc]}</span>
                    {serviceType === svc && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Area Slider & Quick Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  3. {t.calculator.areaLabel}
                </label>
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                  {area.toLocaleString()} sq. ft.
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="250"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>500 sq. ft.</span>
                <span>12,500 sq. ft.</span>
                <span>25,000+ sq. ft.</span>
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2.5">
                4. {t.calculator.urgencyLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['standard', 'urgent', 'emergency'] as const).map((urg) => (
                  <button
                    key={urg}
                    type="button"
                    onClick={() => setUrgency(urg)}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                      urgency === urg
                        ? 'bg-neutral-900 text-white dark:bg-amber-400 dark:text-neutral-950 border-transparent font-semibold shadow-sm'
                        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {t.calculator.urgencyOptions[urg]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Display Card */}
          <div className="lg:col-span-5 bg-neutral-950 text-white p-6 sm:p-8 rounded-lg border border-neutral-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 end-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32 text-amber-400" />
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                  {t.calculator.calcSummaryTitle}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {t.calculator.propertyTypes[propertyType]}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {t.calculator.serviceTypes[serviceType]}
                </p>
              </div>

              {/* Price Range Output */}
              <div className="p-5 bg-neutral-900/90 rounded-lg border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">
                  {t.calculator.estimatedRange}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tracking-tight tabular-nums">
                  {formattedMin} – {formattedMax} <span className="text-xs font-normal text-white">AED</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  ≈ {Math.round(unitRate)} AED / sq. ft. {serviceType === 'amc' ? '(annualized)' : '(turnkey MEP rate)'}
                </div>
              </div>

              {/* Turnaround Estimate */}
              <div className="border-t border-neutral-800 pt-4">
                <span className="text-xs text-neutral-400 block mb-1">
                  {t.calculator.estimatedTime}
                </span>
                <div className="text-sm font-semibold text-neutral-200">
                  {getTurnaroundDays()}
                </div>
              </div>

              {/* Technical Disclaimer Note */}
              <p className="text-[11px] text-neutral-400 leading-relaxed italic">
                {t.calculator.estimateNote}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleTransfer}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <span>{t.calculator.sendToQuoteBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowSummaryModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'en'
                      ? 'Generate Printable Quotation Summary (PDF)'
                      : 'توليد ملخص عرض السعر للطباعة (PDF)'}
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Printable Estimate Summary Modal */}
      <EstimateSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        language={language}
        propertyType={t.calculator.propertyTypes[propertyType]}
        serviceType={t.calculator.serviceTypes[serviceType]}
        area={area}
        estimatedMin={formattedMin}
        estimatedMax={formattedMax}
        unitRate={unitRate}
        turnaround={getTurnaroundDays()}
        onProceedToQuote={handleTransfer}
      />
    </section>
  );
};
