export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  iconName: string;
  category: 'mep' | 'hvac' | 'contracting' | 'maintenance';
  scopeEn: string[];
  scopeAr: string[];
  keySpecsEn: string[];
  keySpecsAr: string[];
  typicalClientsEn: string;
  typicalClientsAr: string;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  clientEn: string;
  clientAr: string;
  locationEn: string;
  locationAr: string;
  category: 'hvac' | 'mep' | 'commercial' | 'residential' | 'industrial';
  imageUrl: string;
  metricsEn: string;
  metricsAr: string;
  descriptionEn: string;
  descriptionAr: string;
  scopeListEn: string[];
  scopeListAr: string[];
  completionYear: string;
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  categoryEn: string;
  categoryAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
  authorEn: string;
  authorAr: string;
  summaryEn: string;
  summaryAr: string;
  contentEn: string[];
  contentAr: string[];
  keyTakeawaysEn: string[];
  keyTakeawaysAr: string[];
}

export interface Testimonial {
  id: string;
  quoteEn: string;
  quoteAr: string;
  authorEn: string;
  authorAr: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  projectTypeEn: string;
  projectTypeAr: string;
  rating: number;
}

export interface QuoteFormState {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  serviceCategory: string;
  urgency: 'routine' | 'urgent_24hr' | 'emergency';
  message: string;
  estimatedBudget?: string;
}
