import type { Property, PropertyFilters } from '../../data/types';

export const emptyFilters: PropertyFilters = { offering: 'all', location: '', type: 'all', minPrice: null, maxPrice: null, includePriceOnRequest: true };

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  const location = filters.location.trim().toLocaleLowerCase();
  return properties.filter((property) => {
    if (property.publication !== 'published') return false;
    if (filters.offering !== 'all' && property.offering !== filters.offering) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (location && !property.location.toLocaleLowerCase().includes(location)) return false;
    if (property.price === null) return filters.includePriceOnRequest;
    if (filters.minPrice !== null && property.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && property.price >= filters.maxPrice) return false;
    return true;
  });
}

export function formatPrice(property: Property): string {
  if (property.price === null) return 'Price on request';
  const price = new Intl.NumberFormat('en-PH', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price);
  return property.offering === 'rent' ? `${price} / month` : price;
}

export function sortProperties(properties: Property[], mode: 'featured' | 'low' | 'high'): Property[] {
  return [...properties].sort((a, b) => {
    if (mode === 'featured') return Number(b.featured) - Number(a.featured);
    if (a.offering !== b.offering) return a.offering === 'sale' ? -1 : 1;
    if (a.price === null) return b.price === null ? 0 : 1;
    if (b.price === null) return -1;
    return mode === 'low' ? a.price - b.price : b.price - a.price;
  });
}
