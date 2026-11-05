import { useState, useEffect } from 'react';
import { Language, Theme } from './types';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { EstimatorCalculator } from './components/EstimatorCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  // Prefilled RFQ states
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledProperty, setPrefilledProperty] = useState<string>('');
  const [prefilledEstimate, setPrefilledEstimate] = useState<string>('');

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('vayra_theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Update HTML dir and lang on language toggle
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('vayra_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    scrollToContact();
  };

  const handleApplyEstimateToQuote = (data: {
    propertyType: string;
    serviceCategory: string;
    area: number;
    estimatedCost: string;
  }) => {
    setPrefilledProperty(data.propertyType);
    setPrefilledEstimate(data.estimatedCost);
    setPrefilledService(data.serviceCategory);
    scrollToContact();
  };

  const handleConsultAboutTopic = (topicTitle: string) => {
    setPrefilledService(`Consultation on: ${topicTitle}`);
    scrollToContact();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* 3-Zone Top Navigation */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        onRequestQuoteClick={scrollToContact}
      />

      {/* 24/7 Breakdown & Callout Banner */}
      <EmergencyBanner language={language} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          language={language}
          onRequestQuote={scrollToContact}
          onExploreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Company Profile & Abu Dhabi Heritage */}
        <AboutSection language={language} />

        {/* Core Services Bento Showcase */}
        <ServicesSection
          language={language}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Completed Projects Gallery */}
        <ProjectsGallery language={language} />

        {/* Interactive Cost Estimator */}
        <EstimatorCalculator
          language={language}
          onApplyEstimateToQuote={handleApplyEstimateToQuote}
        />

        {/* Client Endorsements & UAE Trust Badges */}
        <TestimonialsSection language={language} />

        {/* Industry Knowledge & UAE Insights */}
        <BlogSection
          language={language}
          onConsultAboutTopic={handleConsultAboutTopic}
        />

        {/* Lead Capture RFQ & Head Office Contacts */}
        <ContactSection
          language={language}
          prefilledService={prefilledService}
          prefilledProperty={prefilledProperty}
          prefilledEstimate={prefilledEstimate}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions
        language={language}
        onRequestQuote={scrollToContact}
      />
    </div>
  );
}
