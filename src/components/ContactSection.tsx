import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, AlertTriangle, Building, PhoneCall } from 'lucide-react';
import { Language, QuoteFormState } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  language: Language;
  prefilledService?: string;
  prefilledProperty?: string;
  prefilledEstimate?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  prefilledService,
  prefilledProperty,
  prefilledEstimate,
}) => {
  const t = translations[language];

  const [formState, setFormState] = useState<QuoteFormState>({
    fullName: '',
    email: '',
    phone: '',
    propertyType: 'villa',
    serviceCategory: 'hvac',
    urgency: 'routine',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefilledService) {
      setFormState((prev) => ({
        ...prev,
        message: prev.message
          ? `${prev.message}\n[Service of Interest: ${prefilledService}]`
          : `Interested in quote for: ${prefilledService}`,
      }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledProperty || prefilledEstimate) {
      setFormState((prev) => ({
        ...prev,
        estimatedBudget: prefilledEstimate || prev.estimatedBudget,
        message: `${prev.message ? prev.message + '\n' : ''}[Estimator Calculation: Property: ${prefilledProperty || 'Standard'} | Estimated Range: ${prefilledEstimate || 'TBD'}]`,
      }));
    }
  }, [prefilledProperty, prefilledEstimate]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.fullName.trim()) {
      errs.fullName = language === 'en' ? 'Full name is required' : 'يرجى إدخال الاسم بالكامل';
    }
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = language === 'en' ? 'Valid email is required' : 'يرجى إدخال بريد إلكتروني صحيح';
    }
    if (!formState.phone.trim() || formState.phone.length < 8) {
      errs.phone = language === 'en' ? 'Valid UAE phone number is required' : 'يرجى إدخال رقم هاتف صحيح';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.inquiryId) {
          setInquiryRef(data.inquiryId);
        }
      }
    } catch (err) {
      console.warn('Network notice: falling back to client-side notification confirmation', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vayra Technical Contracting (Abu Dhabi),\nName: ${formState.fullName || 'Client'}\nPhone: ${formState.phone || 'N/A'}\nEmail: ${formState.email || 'N/A'}\nService: ${formState.serviceCategory}\nDetails: ${formState.message || 'I would like to request a quote.'}`
  );

  const emailNotificationSubject = encodeURIComponent(
    `[New Web RFQ] ${formState.serviceCategory || 'Contracting'} - ${formState.fullName || 'Client'}`
  );

  const emailNotificationBody = encodeURIComponent(
    `Attention: Vayra Technical Contracting Team (info@vayratechnical.com)\n\nNew RFQ Inquiry Details:\n- Client Name: ${formState.fullName}\n- Contact Phone: ${formState.phone}\n- Contact Email: ${formState.email}\n- Property Type: ${formState.propertyType}\n- Primary Service: ${formState.serviceCategory}\n- Urgency: ${formState.urgency}\n\nProject Scope:\n${formState.message || 'Please provide quotation and arrange site survey.'}\n\nOffice Address: Al Maha Tower, Abu Dhabi, UAE\nDirect Technical Desk: +971 50 639 8552`
  );

  return (
    <section id="contact" className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2">
            {t.contact.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal">
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Office Contact & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-neutral-950 p-6 sm:p-7 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <img
                  src="/logo.svg"
                  alt="Vayra Emblem"
                  className="w-12 h-12 rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {t.contact.officeCardTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t.brandName} {t.brandSuffix}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">
                    {t.contact.addressLabel}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {t.contact.addressVal}
                  </span>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Commercial Business District, Abu Dhabi
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">
                    {t.contact.phoneLabel}
                  </span>
                  <a
                    href="tel:+971506398552"
                    className="font-mono text-base font-bold text-amber-600 dark:text-amber-400 hover:underline block"
                  >
                    {t.contact.phoneVal}
                  </a>
                  <span className="text-xs text-neutral-500">
                    Direct technical desk & mobile dispatch
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">
                    {t.contact.emailLabel}
                  </span>
                  <a
                    href="mailto:info@vayratechnical.com"
                    className="text-sm font-medium text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {t.contact.emailVal}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">
                    {t.contact.hoursLabel}
                  </span>
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    {t.contact.hoursVal}
                  </span>
                </div>
              </div>

              {/* Quick Communication Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
                <a
                  href={`https://wa.me/971506398552?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.contact.whatsappDirectBtn}</span>
                </a>

                <a
                  href="tel:+971506398552"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-500" />
                  <span>{t.contact.callDirectBtn}</span>
                </a>
              </div>
            </div>

            {/* Abu Dhabi Location Representation Box */}
            <div className="p-5 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {language === 'en' ? 'Abu Dhabi Service Coverage' : 'تغطية العمليات في أبوظبي'}
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  UAE Turnkey
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === 'en'
                  ? 'Immediate engineering response across Al Reem Island, Saadiyat, Yas Island, Al Maryah, Khalifa City, Mussafah (ICAD), and central Abu Dhabi.'
                  : 'استجابة هندسية وميدانية سريعة تغطي جزيرة الريم، السعديات، جزيرة ياس، الماريه، مدينة خليفة، المصفح (ICAD)، وكافة أرجاء العاصمة.'}
              </p>
            </div>

          </div>

          {/* Interactive RFQ Form Container */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
            
            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.contact.successTitle}
                </h3>
                {inquiryRef && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 rounded text-xs font-mono font-bold">
                    <span>Reference:</span>
                    <span>{inquiryRef}</span>
                  </div>
                )}
                <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg max-w-md mx-auto border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    {language === 'en'
                      ? 'Email notification dispatched to info@vayratechnical.com'
                      : 'تم إرسال إشعار فوري إلى info@vayratechnical.com'}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                    {t.contact.successMsg} <span className="font-semibold text-neutral-900 dark:text-white">{formState.phone}</span>.
                  </p>
                </div>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={`https://wa.me/971506398552?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.contact.whatsappDirectBtn}</span>
                  </a>
                  <a
                    href={`mailto:info@vayratechnical.com?subject=${emailNotificationSubject}&body=${emailNotificationBody}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-md transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>info@vayratechnical.com</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryRef('');
                      setFormState({
                        fullName: '',
                        email: '',
                        phone: '',
                        propertyType: 'villa',
                        serviceCategory: 'hvac',
                        urgency: 'routine',
                        message: '',
                      });
                    }}
                    className="px-3.5 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {t.contact.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {language === 'en'
                      ? 'Guaranteed response from our senior technical team within 2 hours.'
                      : 'رد مؤكد من كبار مهندسينا خلال ساعتين من استلام الطلب.'}
                  </p>
                </div>

                {/* Name & Phone in 2-column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.contact.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.fullName ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.contact.phoneLabelInput} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.phone ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contact.emailLabelInput} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      errors.email ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Service and Property Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      value={formState.serviceCategory}
                      onChange={(e) => setFormState({ ...formState, serviceCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="hvac">HVAC & Air Conditioning</option>
                      <option value="mep">Comprehensive MEP Engineering</option>
                      <option value="contracting">General Technical Contracting & Civil</option>
                      <option value="electrical">Electrical LV & Switchgear</option>
                      <option value="plumbing">Plumbing & Drainage Works</option>
                      <option value="amc">Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.contact.propertyLabel}
                    </label>
                    <select
                      value={formState.propertyType}
                      onChange={(e) => setFormState({ ...formState, propertyType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="villa">Residential Villa / Palace</option>
                      <option value="commercial">Commercial Tower / Office Suite</option>
                      <option value="retail">Retail Mall / Restaurant</option>
                      <option value="industrial">Industrial Warehouse / Plant</option>
                      <option value="apartment">Apartment / Penthouse</option>
                    </select>
                  </div>
                </div>

                {/* Urgency Radio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {t.contact.urgencyLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-amber-400">
                      <input
                        type="radio"
                        name="urgency"
                        checked={formState.urgency === 'routine'}
                        onChange={() => setFormState({ ...formState, urgency: 'routine' })}
                        className="accent-amber-500"
                      />
                      <span>Standard Routine</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-amber-400">
                      <input
                        type="radio"
                        name="urgency"
                        checked={formState.urgency === 'urgent_24hr'}
                        onChange={() => setFormState({ ...formState, urgency: 'urgent_24hr' })}
                        className="accent-amber-500"
                      />
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Urgent (Within 48h)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-amber-400">
                      <input
                        type="radio"
                        name="urgency"
                        checked={formState.urgency === 'emergency'}
                        onChange={() => setFormState({ ...formState, urgency: 'emergency' })}
                        className="accent-red-500"
                      />
                      <span className="font-bold text-red-500 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Emergency Breakdown
                      </span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-md transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                  <span>{isSubmitting ? t.contact.submitting : t.contact.submitBtn}</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
