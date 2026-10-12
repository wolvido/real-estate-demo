import type { Inquiry } from '../types';
export const sampleInquiries: Inquiry[] = [
  { id: 'INQ-DEMO-012', name: 'Sample visitor 1', email: 'sample.visitor1@example.invalid', phone: '', message: 'I would like to arrange a viewing of this property. Please email me with available times.', propertyId: 'DEMO-001', createdAt: '2026-10-11T02:14:00Z', status: 'new', note: '', notification: 'simulated-failed' },
  { id: 'INQ-DEMO-002', name: 'Sample visitor 2', email: 'sample.visitor2@example.invalid', phone: '', message: 'We are looking for a rental in Davao. Could you help us compare options?', propertyId: null, createdAt: '2026-10-10T08:40:00Z', status: 'new', topic: 'Rent property', notification: 'simulated-sent' },
  { id: 'INQ-DEMO-001', name: 'Sample visitor 3', email: 'sample.visitor3@example.invalid', phone: '', message: 'Thank you for the information about the condo.', propertyId: 'DEMO-002', createdAt: '2026-10-09T06:30:00Z', status: 'handled', notification: 'simulated-sent' },
];
