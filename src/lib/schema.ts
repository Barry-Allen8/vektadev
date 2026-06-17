const BASE_URL = "https://vektadev.com";

type ServiceSchemaInput = {
  locale: string;
  name: string;
  description: string;
  path: string;
};

type PortfolioItemSchemaInput = {
  locale: string;
  name: string;
  description: string;
  image: string;
  url: string;
};

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VektaDev",
    url: BASE_URL,
    logo: `${BASE_URL}/icon`,
    sameAs: [
      "https://www.linkedin.com/company/vektadev",
      "https://github.com/vektadev",
      "https://www.instagram.com/vektadev",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "vektadev@gmail.com",
      telephone: "+48-537-890-776",
      availableLanguage: ["en", "pl"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Michała Kajki 10-12",
      addressLocality: "Olsztyn",
      postalCode: "10-547",
      addressCountry: "PL",
    },
  };
}

export function getServiceSchema({ locale, name, description, path }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "VektaDev",
      url: BASE_URL,
    },
    areaServed: "EU",
    url: `${BASE_URL}/${locale}${path}`,
  };
}

export function getPortfolioCaseSchema(items: PortfolioItemSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        image: item.image,
        url: item.url,
        inLanguage: item.locale,
      },
    })),
  };
}
