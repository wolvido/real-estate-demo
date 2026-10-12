import type { Inquiry, Property } from './types';

export const inquiryStorageKey = 'real-estate-demo:inquiries:v1';
export const propertyStorageKey = 'real-estate-demo:properties:v1';

function isInquiry(value: unknown): value is Inquiry {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return ['id', 'name', 'email', 'phone', 'message', 'createdAt'].every((key) => typeof record[key] === 'string') && (record.propertyId === null || typeof record.propertyId === 'string') && ['new', 'handled'].includes(String(record.status))
    && ['note', 'topic'].every((key) => record[key] === undefined || typeof record[key] === 'string')
    && (record.notification === undefined || ['not-sent', 'simulated-failed', 'simulated-sent'].includes(String(record.notification)));
}

export function readInquiries(storage: Pick<Storage, 'getItem'>): { inquiries: Inquiry[]; available: boolean } {
  try {
    const raw = storage.getItem(inquiryStorageKey);
    if (!raw) return { inquiries: [], available: true };
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isInquiry)) return { inquiries: [], available: false };
    return { inquiries: parsed, available: true };
  } catch { return { inquiries: [], available: false }; }
}

export function writeInquiries(storage: Pick<Storage, 'setItem'>, inquiries: Inquiry[]): boolean {
  try { storage.setItem(inquiryStorageKey, JSON.stringify(inquiries)); return true; } catch { return false; }
}

function isProperty(value: unknown): value is Property {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return ['id', 'title', 'slug', 'location', 'category', 'image', 'description', 'updatedAt'].every((key) => typeof p[key] === 'string')
    && ['sale', 'rent'].includes(String(p.offering)) && ['house', 'apartment', 'land', 'commercial'].includes(String(p.type))
    && ['draft', 'published', 'unpublished', 'archived'].includes(String(p.publication)) && ['available', 'sold', 'rented', 'unavailable'].includes(String(p.availability))
    && p.currency === 'PHP' && p.areaUnit === 'm²' && ['floor', 'lot'].includes(String(p.areaKind))
    && typeof p.area === 'number' && Number.isFinite(p.area) && p.area > 0 && typeof p.featured === 'boolean'
    && (p.price === null || typeof p.price === 'number' && Number.isFinite(p.price) && p.price >= 0)
    && ['beds', 'baths'].every((key) => p[key] === null || typeof p[key] === 'number' && Number.isInteger(p[key]) && Number(p[key]) >= 0)
    && (p.photos === undefined || Array.isArray(p.photos) && p.photos.length > 0 && p.photos.every((photo) => typeof photo === 'string'))
    && ['privateNotes', 'exactAddress'].every((key) => p[key] === undefined || typeof p[key] === 'string')
    && (p.features === undefined || Array.isArray(p.features) && p.features.every((feature) => typeof feature === 'string'))
    && (p.addressPublic === undefined || typeof p.addressPublic === 'boolean');
}
export function readProperties(storage: Pick<Storage, 'getItem'>): { properties: Property[] | null; available: boolean } {
  try {
    const raw = storage.getItem(propertyStorageKey);
    if (!raw) return { properties: null, available: true };
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isProperty)) return { properties: null, available: false };
    if (new Set(parsed.map((p) => p.id)).size !== parsed.length || new Set(parsed.map((p) => p.slug)).size !== parsed.length) return { properties: null, available: false };
    return { properties: parsed, available: true };
  } catch { return { properties: null, available: false }; }
}
export function writeProperties(storage: Pick<Storage, 'setItem'>, properties: Property[]): boolean {
  try { storage.setItem(propertyStorageKey, JSON.stringify(properties)); return true; } catch { return false; }
}
