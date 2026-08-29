export interface Client {
  slug: string;
  logo: string;
  logoUrl: string | null;
  tag: string;
  title: string;
  description: string;
  results: string[];
  draft?: boolean;
}

export const clientsData: Client[] = [
  {
    slug: 'rg-cellulars',
    logo: 'RG Cellulars',
    logoUrl: '/rg logo - Edited.svg',
    tag: 'Multi-Brand Mobile Retail',
    title: 'RG Cellulars',
    description:
      'A multi-brand mobile retail business competing in a high-pressure market where digital presence directly drives in-store sales and footfall.',
    results: [
      'Social Media Growth via Organic Marketing Strategies',
      'Complete Social Media Page Management',
      'Brand Identity Refreshment and Visual Enhancement',
      'Influencer Marketing for Local Reach Expansion',
      'WhatsApp Automation for Lead Handling',
      'Meta Ads for Targeted Sales Growth'
    ]
  },
  {
    slug: 'realme',
    logo: 'realme',
    logoUrl: '/Realme_logo.svg',
    tag: 'Global Smartphone Brand',
    title: 'Realme',
    description:
      'Regional launch campaign for the Realme 16 Pro Series across West Bengal — requiring high-impact awareness and maximum sales velocity at launch.',
    results: [
      'Regional Launch Strategy Execution Across West Bengal',
      'Mega Influencer Marketing Campaign',
      'High-Reach Digital Awareness Campaign',
      'Coordinated Multi-Creator Promotions'
    ]
  },
  {
    slug: 'kolkata-filter-fusion',
    logo: 'KFF',
    logoUrl: '/kff logo.svg',
    tag: 'Café Brand',
    title: 'Kolkata Filter Fusion',
    description:
      'A modern café brand focused on youth appeal and aesthetic dining — with the goal of converting online engagement into real physical footfall.',
    results: [
      'Initial Social Media Boost Strategy',
      'High-Quality Video Content Production',
      '150,000+ Organic Reach Achieved',
      'Direct Increase in Real Café Footfall',
      'Menu Card Design & Promotional Leaflet Design'
    ]
  },
  {
    // DRAFT — drop the client logo into /public/clients/new-client-one/
    // and update logoUrl below, then set draft to false to publish.
    slug: 'new-client-one',
    logo: 'New Client One',
    logoUrl: null,
    tag: 'Industry',
    title: 'New Client One',
    description: 'Add the project description for this client here.',
    results: ['Add delivered work and results here'],
    draft: true
  },
  {
    // DRAFT — drop the client logo into /public/clients/new-client-two/
    // and update logoUrl below, then set draft to false to publish.
    slug: 'new-client-two',
    logo: 'New Client Two',
    logoUrl: null,
    tag: 'Industry',
    title: 'New Client Two',
    description: 'Add the project description for this client here.',
    results: ['Add delivered work and results here'],
    draft: true
  }
];

export function getPublishedClients(): Client[] {
  return clientsData.filter((c) => !c.draft);
}

export function getClientBySlug(slug: string): Client | undefined {
  return clientsData.find((c) => c.slug === slug && !c.draft);
}
