export const serviceItems = [
  { key: "b2b_websites", href: "/services/b2b-websites" },
  { key: "business_automation", href: "/services/business-automation" },
  { key: "ai_assistants", href: "/services/ai-assistants" },
  { key: "web_apps", href: "/services/web-apps" },
] as const;

export type ServiceKey = (typeof serviceItems)[number]["key"];

export const serviceDetailConfig = {
  b2b_websites: {
    href: "/services/b2b-websites",
    benefits: ["positioning", "conversion", "seo", "handoff"],
    packages: [
      { key: "website", recommended: true },
      { key: "website_automation", recommended: false },
      { key: "growth", recommended: false },
    ],
  },
  business_automation: {
    href: "/services/business-automation",
    benefits: ["lead_handling", "crm", "documents", "dashboards"],
    packages: [
      { key: "audit", recommended: false },
      { key: "lead_automation", recommended: true },
      { key: "operations", recommended: false },
    ],
  },
  ai_assistants: {
    href: "/services/ai-assistants",
    benefits: ["knowledge", "qualification", "handoff", "analytics"],
    packages: [
      { key: "assistant", recommended: false },
      { key: "ai_automation", recommended: true },
      { key: "scale", recommended: false },
    ],
  },
  web_apps: {
    href: "/services/web-apps",
    benefits: ["portal", "workflow", "integrations", "roles"],
    packages: [
      { key: "prototype", recommended: false },
      { key: "portal", recommended: true },
      { key: "platform", recommended: false },
    ],
  },
} as const;
