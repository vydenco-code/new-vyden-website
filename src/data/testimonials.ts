// ⚠️ PLACEHOLDER QUOTES — replace with real client words before launch.
// Ask each client: "In one or two lines, what changed after working with us?"
// Keep the metric chip only when the number is real and approved by the client.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  metric: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Vyden took our Instagram from an afterthought to our best salesperson. Footfall on weekends has visibly changed.',
    name: 'Client Name',
    role: 'Owner, Café Brand',
    metric: '150K+ organic reach',
  },
  {
    quote: 'One team for our branding, our ads and our billing software. Nothing falls between chairs anymore.',
    name: 'Client Name',
    role: 'Director, Retail Chain',
    metric: '3 services, 1 team',
  },
  {
    quote: 'They think like owners, not vendors. Every report ties back to revenue, and every call ends with a next step.',
    name: 'Client Name',
    role: 'Founder, D2C Startup',
    metric: '24–48 hr response',
  },
];
