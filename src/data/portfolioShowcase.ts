export type PortfolioShowcaseItem = {
  id: string;
  key:
    | "electronics_shop"
    | "restaurant_bot"
    | "corporate_website"
    | "ai_assistant"
    | "fitness_app"
    | "education_platform";
  slug: string;
  image: string;
  category: "E-commerce" | "Chatbot" | "Website" | "AI Solution" | "Web App";
  categoryKey: "ecommerce" | "chatbot" | "website" | "ai_solution" | "web_app";
  technologies: string[];
  year: number;
  liveUrl: string;
  videoUrl?: string;
};

const unsplashImage = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&crop=entropy&q=70&w=1200&h=900&fm=webp`;

export const portfolioShowcase: PortfolioShowcaseItem[] = [
  {
    id: "1",
    key: "electronics_shop",
    slug: "biuro-rachunkowe-ksiegowa",
    image: "https://biuro-rachunkowe-ksiegowa.vercel.app/logo.png",
    category: "Website",
    categoryKey: "website",
    technologies: ["React", "Vite", "Framer Motion", "SEO"],
    year: 2024,
    liveUrl: "https://biuro-rachunkowe-ksiegowa.vercel.app/",
  },
  {
    id: "2",
    key: "restaurant_bot",
    slug: "restaurant-bot-demo",
    image: unsplashImage("photo-1577563908411-5077b6dc7624"),
    category: "Chatbot",
    categoryKey: "chatbot",
    technologies: ["Python", "Telegram API", "ChatGPT", "PostgreSQL"],
    year: 2024,
    liveUrl: "https://github.com/python-telegram-bot/python-telegram-bot",
    videoUrl: "https://www.youtube.com/results?search_query=telegram+chatbot+demo",
  },
  {
    id: "3",
    key: "corporate_website",
    slug: "corporate-website-demo",
    image: unsplashImage("photo-1460925895917-afdab827c52f"),
    category: "Website",
    categoryKey: "website",
    technologies: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel"],
    year: 2024,
    liveUrl: "https://github.com/vercel/next.js/tree/canary/examples/cms-sanity",
  },
  {
    id: "4",
    key: "ai_assistant",
    slug: "ai-assistant-demo",
    image: unsplashImage("photo-1677442136019-21780ecad995"),
    category: "AI Solution",
    categoryKey: "ai_solution",
    technologies: ["ChatGPT API", "Node.js", "React", "MongoDB"],
    year: 2024,
    liveUrl: "https://github.com/openai/openai-assistants-quickstart",
  },
  {
    id: "5",
    key: "fitness_app",
    slug: "fitness-app-demo",
    image: unsplashImage("photo-1526506118085-60ce8714f8c5"),
    category: "Web App",
    categoryKey: "web_app",
    technologies: ["React Native", "Firebase", "Node.js", "Express"],
    year: 2024,
    liveUrl: "https://github.com/expo/examples/tree/master/with-firebase",
  },
  {
    id: "6",
    key: "education_platform",
    slug: "education-platform-demo",
    image: unsplashImage("photo-1501504905252-473c47e087f8"),
    category: "Website",
    categoryKey: "website",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
    year: 2024,
    liveUrl: "https://github.com/vercel/next.js/tree/canary/examples/with-prisma",
  },
];
