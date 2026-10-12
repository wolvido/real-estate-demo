export const company = {
  name: 'Company / Real Estate',
  photo: '/assets/c1-team.jpg',
  region: 'Davao & Mindanao',
  coverage: ['Davao City', 'Island Garden City of Samal', 'Panabo', 'Tagum', 'Digos'],
  introduction: 'Homes, spaces, and property guidance in Davao and across Mindanao. Tell us what you need, and explore your next step with our team.',
  approach: 'Our team helps you explain your property needs and compare realistic local options across Davao and Mindanao without pressure. We take the time to answer your questions and guide you comfortably at your own pace.',
  services: [
    { number: '01', label: 'Advisory', title: 'Buying guidance', summary: 'Discuss your needs, compare properties, and arrange a viewing.', detail: 'Explore houses, condos, and land for sale in Davao and across Mindanao. Compare prices, locations, and listing facts, then ask our team about the details that matter to you.', action: 'Browse properties for sale', href: '/?offering=sale#properties' },
    { number: '02', label: 'Leasing', title: 'Rental assistance', summary: 'Explore homes and spaces that fit your budget and move-in plans.', detail: 'Find a rental that fits your budget, location, and move-in plans. Review monthly prices and space requirements, then speak with our team about availability and terms.', action: 'Browse rental properties', href: '/?offering=rent#properties' },
    { number: '03', label: 'Owners', title: 'For property owners', summary: 'Ask our team about listing your property and the next steps.', detail: 'Planning to sell or rent out a property? Tell us about its location, type, and your timeline. Our team can discuss the information needed and possible next steps.', action: 'Ask about listing your property', href: '/contact?topic=List+my+property' },
  ],
  steps: [
    { title: 'Tell us about your plans', text: 'Share your preferred location, budget, timeline, and must-haves.' },
    { title: 'Explore suitable options', text: 'Compare property details and ask what needs to be confirmed.' },
    { title: 'Arrange a conversation', text: 'Discuss a property or request a viewing with our team.' },
    { title: 'Plan your next step', text: 'Review the information and decide how you would like to proceed.' },
  ],
};

export const samplePhotos = [
  { src: '/assets/c1-house.jpg', label: 'Sample garden home' },
  { src: '/assets/c1-condo.jpg', label: 'Sample condo interior' },
  { src: '/assets/c1-bungalow.jpg', label: 'Sample bungalow' },
];

export function propertyPhotos(property: { image: string; photos?: string[] }) {
  return property.photos?.length ? property.photos : [property.image, ...samplePhotos.map((photo) => photo.src).filter((src) => src !== property.image)];
}
