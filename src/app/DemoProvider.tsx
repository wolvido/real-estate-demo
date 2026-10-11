import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Inquiry, InquiryInput } from '../data/types';
import { inquiryStorageKey, readInquiries, writeInquiries } from '../data/demoStore';

interface DemoContextValue {
  inquiries: Inquiry[];
  saveInquiry: (input: InquiryInput, propertyId: string | null) => { remembered: boolean };
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

function initialInquiries(): Inquiry[] {
  try { return readInquiries(window.localStorage).inquiries; } catch { return []; }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  function saveInquiry(input: InquiryInput, propertyId: string | null) {
    const next = [...inquiries, { ...input, name: input.name.trim(), email: input.email.trim(), phone: input.phone.trim(), message: input.message.trim(), id: crypto.randomUUID(), propertyId, createdAt: new Date().toISOString(), status: 'new' as const }];
    setInquiries(next);
    let remembered = false;
    try { remembered = writeInquiries(window.localStorage, next); } catch { /* The inquiry remains in memory for this visit. */ }
    return { remembered };
  }

  function resetDemo() {
    setInquiries([]);
    try { window.localStorage.removeItem(inquiryStorageKey); } catch { /* Memory has still been reset. */ }
  }

  return <DemoContext.Provider value={{ inquiries, saveInquiry, resetDemo }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider.');
  return context;
}
