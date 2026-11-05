import React, { useState } from 'react';
import { MapPin, Calendar, CheckCircle, X, ExternalLink } from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { projectsData } from '../data/projectsData';
import { translations } from '../data/translations';

interface ProjectsGalleryProps {
  language: Language;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const t = translations[language];

  const categories = [
    { key: 'all', label: t.projects.all },
    { key: 'hvac', label: t.projects.hvac },
    { key: 'mep', label: t.projects.mep },
    { key: 'commercial', label: t.projects.commercial },
    { key: 'residential', label: t.projects.residential },
    { key: 'industrial', label: t.projects.industrial },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-2">
              {t.projects.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {t.projects.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal">
              {t.projects.subheading}
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented Button Group - Rule 1.A Compliant) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-neutral-800 rounded-lg overflow-x-auto max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.key
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => {
            const title = language === 'en' ? project.titleEn : project.titleAr;
            const location = language === 'en' ? project.locationEn : project.locationAr;
            const metrics = language === 'en' ? project.metricsEn : project.metricsAr;
            const description = language === 'en' ? project.descriptionEn : project.descriptionAr;

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between bg-white dark:bg-neutral-950 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/80 dark:hover:border-amber-500/80 transition-all duration-200 hover:shadow-lg"
              >
                <div>
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={project.imageUrl}
                      alt={title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Graceful styled SVG fallback if image path ever fails
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-800', 'text-neutral-400');
                          parent.innerHTML = `<span class="text-xs font-mono p-4 text-center">${title}</span>`;
                        }
                      }}
                    />
                    {/* Completion Year Overlay Badge */}
                    <div className="absolute top-3 end-3 px-2 py-1 text-[11px] font-mono font-bold text-white bg-neutral-950/75 backdrop-blur-sm rounded">
                      {project.completionYear}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Quiet Unboxed Metadata with Typographic Separators */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate max-w-[150px]">{location}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {title}
                    </h3>

                    {/* Brief Excerpt */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {description}
                    </p>

                    {/* Quantitative Rigor Proof Metric */}
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-100 dark:border-neutral-800 text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500 font-medium block text-[10px] uppercase tracking-wider mb-0.5">
                        {t.projects.metrics}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {metrics}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                  >
                    <span>{t.projects.viewCaseStudy}</span>
                    <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 end-5 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden mb-6 bg-neutral-800">
              <img
                src={activeModalProject.imageUrl}
                alt={language === 'en' ? activeModalProject.titleEn : activeModalProject.titleAr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {language === 'en' ? activeModalProject.locationEn : activeModalProject.locationAr}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeModalProject.completionYear}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase">
                  {activeModalProject.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                {language === 'en' ? activeModalProject.titleEn : activeModalProject.titleAr}
              </h3>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
              {language === 'en' ? activeModalProject.descriptionEn : activeModalProject.descriptionAr}
            </p>

            {/* Scope Delivered */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
                {t.projects.scope}
              </h4>
              <div className="space-y-2">
                {(language === 'en' ? activeModalProject.scopeListEn : activeModalProject.scopeListAr).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Banner */}
            <div className="p-4 bg-amber-500/10 dark:bg-amber-400/10 rounded border border-amber-500/20 text-xs sm:text-sm mb-6">
              <span className="font-bold text-amber-700 dark:text-amber-400">{t.projects.metrics}: </span>
              <span className="text-neutral-800 dark:text-neutral-200">
                {language === 'en' ? activeModalProject.metricsEn : activeModalProject.metricsAr}
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
              >
                {language === 'en' ? 'Close Window' : 'إغلاق النافذة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
