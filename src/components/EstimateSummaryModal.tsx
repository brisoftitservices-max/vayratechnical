import React from 'react';
import { X, Printer, MessageCircle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Language } from '../types';

interface EstimateSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  propertyType: string;
  serviceType: string;
  area: number;
  estimatedMin: string;
  estimatedMax: string;
  unitRate: number;
  turnaround: string;
  onProceedToQuote: () => void;
}

export const EstimateSummaryModal: React.FC<EstimateSummaryModalProps> = ({
  isOpen,
  onClose,
  language,
  propertyType,
  serviceType,
  area,
  estimatedMin,
  estimatedMax,
  unitRate,
  turnaround,
  onProceedToQuote,
}) => {
  if (!isOpen) return null;

  const quoteRef = `VTC-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Vayra Technical Contracting,\nI generated Estimate #${quoteRef}:\nProperty: ${propertyType}\nService: ${serviceType}\nArea: ${area.toLocaleString()} sq.ft.\nEstimate: ${estimatedMin} - ${estimatedMax} AED.\nOffice: Al Maha Tower, Abu Dhabi.\nPlease arrange a technical site inspection.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl p-6 sm:p-8 print:border-none print:shadow-none print:max-w-none print:w-full print:p-8 print:text-black"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="print:hidden absolute top-5 end-5 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Formal Corporate Header */}
        <div className="flex items-start justify-between pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Vayra Logo"
              className="w-12 h-12 rounded-full p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shrink-0"
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white print:text-black">
                {language === 'en' ? 'Vayra Technical Contracting' : 'فايرا للمقاولات الفنية'}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {language === 'en' ? 'L.L.C - S.P.C. · Abu Dhabi, UAE' : 'ذ.م.م - ش.ش.و · أبوظبي، الإمارات'}
              </p>
              <p className="text-[11px] text-neutral-400">
                Al Maha Tower, Abu Dhabi · Tel: +971 50 639 8552
              </p>
            </div>
          </div>

          <div className="text-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              {language === 'en' ? 'Estimate Ref' : 'الرقم المرجعي'}
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 print:text-black block">
              {quoteRef}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono block mt-0.5">
              {dateStr}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            {language === 'en' ? 'Preliminary Engineering Quotation Summary' : 'ملخص التقدير الفني الأولي للمشروع'}
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white print:text-black">
            {propertyType}
          </h3>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 mb-6 print:bg-neutral-100">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
              {language === 'en' ? 'Service Scope' : 'نطاق الخدمة'}
            </span>
            <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 print:text-black">
              {serviceType}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
              {language === 'en' ? 'Floor Area' : 'المساحة الإجمالية'}
            </span>
            <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 print:text-black">
              {area.toLocaleString()} sq. ft.
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
              {language === 'en' ? 'Benchmark Unit Rate' : 'معدل التكلفة للمتر / القدم'}
            </span>
            <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200 print:text-black">
              ≈ {Math.round(unitRate)} AED / sq. ft.
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
              {language === 'en' ? 'Estimated Turnaround' : 'المدة الزمنية المقدرة'}
            </span>
            <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 print:text-black">
              {turnaround}
            </span>
          </div>
        </div>

        {/* Cost Range Banner */}
        <div className="p-5 bg-neutral-950 text-white rounded-lg border border-neutral-800 mb-6 print:bg-white print:text-black print:border-black">
          <span className="text-xs text-neutral-400 block mb-1">
            {language === 'en' ? 'Indicative Budget Range' : 'النطاق المالي التقديري الإجمالي'}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums print:text-black">
            {estimatedMin} – {estimatedMax} <span className="text-sm font-normal text-neutral-300 print:text-black">AED</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            {language === 'en'
              ? '*All estimates include preliminary engineering coordination and authority compliance.'
              : '*يشمل التقدير التنسيق الهندسي ومطابقة متطلبات الدفاع المدني والجهات المختصة.'}
          </p>
        </div>

        {/* Authority Alignment Stamp */}
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 dark:bg-amber-400/10 rounded border border-amber-500/20 text-xs text-neutral-700 dark:text-neutral-300 mb-6">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            {language === 'en'
              ? 'Conforms to Abu Dhabi Municipality, UAE Civil Defense, OSHAD & Estidama guidelines.'
              : 'مطابق لاشتراطات بلدية أبوظبي، الدفاع المدني الإماراتي، نظام OSHAD، وبرنامج استدامة.'}
          </span>
        </div>

        {/* Action Controls (Hidden on Print) */}
        <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'en' ? 'Print / Save PDF' : 'طباعة / حفظ بصيغة PDF'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/971506398552?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onProceedToQuote();
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap"
            >
              <span>{language === 'en' ? 'Submit RFQ' : 'إرسال للمعاينة'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
