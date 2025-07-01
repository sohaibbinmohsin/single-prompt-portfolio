export interface Project {
  id: string;
  title: string;
  summary: string;
  role: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  company: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}

export interface PortfolioData {
  // Basic Info
  name: string;
  title: string;
  bio: string;
  location?: string;
  profilePicture?: string;
  
  // Design Preferences
  portfolioType: 'Personal' | 'Freelancer' | 'Startup' | 'Resume' | 'Case Study';
  designStyle: 'Minimal' | 'Dark' | 'Professional' | 'Playful' | 'Surprise';
  themeColors: string[];
  
  // Content
  projects: Project[];
  skills: string[];
  awards?: string[];
  socials: SocialLinks;
  
  // Contact & Additional
  contactMethod: string;
  resume?: string;
  testimonials?: Testimonial[];
}