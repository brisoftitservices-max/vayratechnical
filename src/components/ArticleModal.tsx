import React from 'react';
import { X, Calendar, Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BlogPost, Language } from '../types';
import { translations } from '../data/translations';

interface ArticleModalProps {
  post: BlogPost | null;
  language: Language;
  onClose: () => void;
  onConsultAboutTopic: (topicTitle: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  post,
  language,
  onClose,
  onConsultAboutTopic,
}) => {
  if (!post) return null;
  const t = translations[language];

  const title = language === 'en' ? post.titleEn : post.titleAr;
  const category = language === 'en' ? post.categoryEn : post.categoryAr;
  const readTime = language === 'en' ? post.readTimeEn : post.readTimeAr;
  const author = language === 'en' ? post.authorEn : post.authorAr;
  const content = language === 'en' ? post.contentEn : post.contentAr;
  const takeaways = language === 'en' ? post.keyTakeawaysEn : post.keyTakeawaysAr;

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
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quiet Metadata Header */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
          <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 leading-snug">
          {title}
        </h2>

        {/* Author Line */}
        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <User className="w-4 h-4 text-amber-500" />
          <span>{author}</span>
        </div>

        {/* Article Body */}
        <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
          {content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="p-5 bg-amber-500/10 dark:bg-amber-400/10 rounded-lg border border-amber-500/20 mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.blog.keyTakeaways}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {takeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {t.blog.closeArticle}
          </button>
          <button
            onClick={() => {
              onClose();
              onConsultAboutTopic(post.titleEn);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
          >
            <span>{language === 'en' ? 'Discuss With an Engineer' : 'استشر مهندساً حول هذا الموضوع'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
