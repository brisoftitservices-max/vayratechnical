import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { BlogPost, Language } from '../types';
import { blogData } from '../data/blogData';
import { translations } from '../data/translations';
import { ArticleModal } from './ArticleModal';

interface BlogSectionProps {
  language: Language;
  onConsultAboutTopic: (topicTitle: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  language,
  onConsultAboutTopic,
}) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const t = translations[language];

  return (
    <section id="insights" className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{t.blog.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t.blog.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal">
            {t.blog.subheading}
          </p>
        </div>

        {/* Blog Posts 2-column or 3-column asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogData.map((post) => {
            const title = language === 'en' ? post.titleEn : post.titleAr;
            const category = language === 'en' ? post.categoryEn : post.categoryAr;
            const summary = language === 'en' ? post.summaryEn : post.summaryAr;
            const readTime = language === 'en' ? post.readTimeEn : post.readTimeAr;

            return (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer flex flex-col justify-between p-6 sm:p-7 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/80 dark:hover:border-amber-500/80 transition-all duration-200 hover:shadow-md"
              >
                <div>
                  {/* Clean Unboxed Metadata with Typographic Separator (Rule 1.A Compliant) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal line-clamp-3 mb-6">
                    {summary}
                  </p>
                </div>

                {/* Read Button */}
                <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  <span>{t.blog.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Reader Modal */}
      <ArticleModal
        post={activePost}
        language={language}
        onClose={() => setActivePost(null)}
        onConsultAboutTopic={(topicTitle) => {
          setActivePost(null);
          onConsultAboutTopic(topicTitle);
        }}
      />
    </section>
  );
};
