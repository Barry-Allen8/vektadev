export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  features?: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  client?: string;
  year: number;
  link?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  category: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}

