export interface ServicePricing {
  label: string;
  price: string;
  detail?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  badge?: string;
  shortDescription: string;
  description: string;
  benefits?: string[];
  icon: string; // Lucide icon name or indicator
  customIconUrl?: string; // External or custom image icon URL
  pricing?: ServicePricing[];
  category: 'yoga' | 'terapias' | 'oraculo';
  highlight?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  rating: number;
  text: string;
  timeAgo?: string;
  avatarLetter?: string;
  badge?: string;
}

export interface GroupClassInfo {
  title: string;
  partner: string;
  location: string;
  address: string;
  description: string;
  schedules: {
    day: string;
    time: string;
    focus: string;
  }[];
  ctaText: string;
}

