import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Inquiry, InquiryInput, Property } from '../data/types';
import { inquiryStorageKey, propertyStorageKey, readInquiries, readProperties, writeInquiries, writeProperties } from '../data/demoStore';
import { sampleProperties } from '../data/fixtures/properties';
import { sampleInquiries } from '../data/fixtures/inquiries';
import { upsertProperty } from '../data/propertyOperations';

interface DemoContextValue {
  properties: Property[]; inquiries: Inquiry[]; storageNotice: string; adminEntered: boolean;
  enterAdmin: () => void; leaveAdmin: () => void;
  saveProperty: (property: Property) => void;
  saveInquiry: (input: InquiryInput, propertyId: string | null, topic?: string) => { remembered: boolean };
  updateInquiry: (inquiry: Inquiry) => void; resetDemo: () => void;
}
const DemoContext = createContext<DemoContextValue | null>(null);
const entryKey = 'real-estate-demo:admin-entry';
function initialState() {
  try {
    const properties = readProperties(window.localStorage); const inquiries = readInquiries(window.localStorage);
    return { properties: properties.properties ?? sampleProperties,
      inquiries: window.localStorage.getItem(inquiryStorageKey) === null ? sampleInquiries : inquiries.inquiries,
      notice: properties.available && inquiries.available ? '' : 'Saved demo data could not be read. The demo remains usable for this visit.' };
  } catch { return { properties: sampleProperties, inquiries: sampleInquiries, notice: 'Browser storage is unavailable. Changes last for this visit.' }; }
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(initialState);
  const [properties, setProperties] = useState<Property[]>(initial.properties);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initial.inquiries);
  const [storageNotice, setStorageNotice] = useState(initial.notice);
  const [adminEntered, setAdminEntered] = useState(() => { try { return window.sessionStorage.getItem(entryKey) === 'entered'; } catch { return false; } });
  function persist(nextProperties: Property[] | null, nextInquiries: Inquiry[] | null): boolean {
    try {
      const saved = (nextProperties === null || writeProperties(window.localStorage, nextProperties)) && (nextInquiries === null || writeInquiries(window.localStorage, nextInquiries));
      if (!saved) setStorageNotice('Changes are available for this visit. Browser storage is unavailable; reloading may reset them.');
      return saved;
    } catch { setStorageNotice('Changes are available for this visit. Browser storage is unavailable; reloading may reset them.'); return false; }
  }
  function saveProperty(property: Property) {
    const next = upsertProperty(properties, { ...property, updatedAt: new Date().toISOString() });
    setProperties(next); persist(next, null);
  }
  function saveInquiry(input: InquiryInput, propertyId: string | null, topic?: string) {
    const next: Inquiry[] = [{ ...input, name: input.name.trim(), email: input.email.trim(), phone: input.phone.trim(), message: input.message.trim(), id: 'INQ-' + crypto.randomUUID(), propertyId, topic, createdAt: new Date().toISOString(), status: 'new', notification: 'not-sent' }, ...inquiries];
    setInquiries(next); return { remembered: persist(null, next) };
  }
  function updateInquiry(inquiry: Inquiry) { const next = inquiries.map((record) => record.id === inquiry.id ? inquiry : record); setInquiries(next); persist(null, next); }
  function resetDemo() {
    setProperties(sampleProperties); setInquiries(sampleInquiries); setStorageNotice('');
    try { window.localStorage.removeItem(inquiryStorageKey); window.localStorage.removeItem(propertyStorageKey); } catch { setStorageNotice('Demo reset for this visit. Saved browser data could not be cleared.'); }
  }
  function enterAdmin() { setAdminEntered(true); try { window.sessionStorage.setItem(entryKey, 'entered'); } catch { /* Entry remains available for this visit. */ } }
  function leaveAdmin() { setAdminEntered(false); try { window.sessionStorage.removeItem(entryKey); } catch { /* No real account is involved. */ } }
  return <DemoContext.Provider value={{ properties, inquiries, storageNotice, adminEntered, enterAdmin, leaveAdmin, saveProperty, saveInquiry, updateInquiry, resetDemo }}>{children}</DemoContext.Provider>;
}
export function useDemo() { const context = useContext(DemoContext); if (!context) throw new Error('useDemo must be used within DemoProvider.'); return context; }
