import React, { useState } from 'react';
import { Sun, Moon, Globe, Phone, Menu, X } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import { VayraLogo } from './VayraLogo';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  onRequestQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  theme,
  toggleTheme,
  onRequestQuoteClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.calculator, href: '#estimator' },
    { label: t.nav.blog, href: '#insights' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark with official emblem logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
          >
            <VayraLogo size={38} className="group-hover:scale-105 transition-transform" />
            <span>{t.brandName}</span>
          </a>

          {/* Zone 2: 4–6 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + compact utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors whitespace-nowrap shrink-0"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shrink-0"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onRequestQuoteClick}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.requestQuote}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuoteClick();
              }}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              {t.nav.requestQuote}
            </button>
            <a
              href="tel:+971506398552"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.callNow}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
