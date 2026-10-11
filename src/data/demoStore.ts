import type { Inquiry } from './types';

export const inquiryStorageKey = 'real-estate-demo:inquiries:v1';

function isInquiry(value: unknown): value is Inquiry {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return ['id', 'name', 'email', 'phone', 'message', 'createdAt'].every((key) => typeof record[key] === 'string') && (record.propertyId === null || typeof record.propertyId === 'string') && ['new', 'handled'].includes(String(record.status));
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
