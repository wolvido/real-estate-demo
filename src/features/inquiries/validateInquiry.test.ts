import { describe, expect, it } from 'vitest';
import { validateInquiry } from './validateInquiry';

const input = { name: 'Sample visitor', email: '', phone: '', message: 'Please arrange a viewing.' };
describe('inquiry contact requirements', () => {
  it('accepts a phone number without email', () => { expect(validateInquiry({ ...input, phone: '555-0100' })).toEqual({}); });
  it('accepts email without a phone number', () => { expect(validateInquiry({ ...input, email: 'visitor@example.com' })).toEqual({}); });
  it('requires name, contact, and a nonblank message', () => { expect(Object.keys(validateInquiry({ name: ' ', email: '', phone: '', message: ' ' })).sort()).toEqual(['email', 'message', 'name']); });
  it('rejects an invalid supplied email even when phone is present', () => { expect(validateInquiry({ ...input, email: 'invalid', phone: '555-0100' })).toHaveProperty('email'); });
});
