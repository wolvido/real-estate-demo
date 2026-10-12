import type { Property } from './types';
export function slugify(value: string): string { return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
export function validateProperty(property: Property, records: Property[]): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!property.title.trim()) errors.title = 'Enter a property title.';
  if (!property.location.trim()) errors.location = 'Enter the public location.';
  if (!property.description.trim()) errors.description = 'Add a description.';
  if (!property.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(property.slug)) errors.slug = 'Use lowercase letters, numbers, and hyphens.';
  else if (records.some((record) => record.id !== property.id && record.slug === property.slug)) errors.slug = 'Another listing already uses this page address.';
  if (property.price !== null && (!Number.isFinite(property.price) || property.price < 0)) errors.price = 'Enter a valid amount, or choose price on request.';
  if (!Number.isFinite(property.area) || property.area <= 0) errors.area = 'Enter an area greater than zero.';
  if ([property.beds, property.baths].some((value) => value !== null && (!Number.isInteger(value) || value < 0))) errors.specifications = 'Bedrooms and bathrooms must be whole numbers of zero or more.';
  if (!property.image || property.photos?.length === 0) errors.photos = 'Choose at least one sample photo.';
  return errors;
}
export function upsertProperty(records: Property[], property: Property): Property[] {
  if (Object.keys(validateProperty(property, records)).length) throw new Error('Invalid property record.');
  const next = { ...property, title: property.title.trim(), location: property.location.trim(), description: property.description.trim(), features: property.features?.map((feature) => feature.trim()).filter(Boolean) };
  return records.some((record) => record.id === next.id) ? records.map((record) => record.id === next.id ? next : record) : [next, ...records];
}
