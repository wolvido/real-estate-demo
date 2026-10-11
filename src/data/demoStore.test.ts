import { describe, expect, it } from 'vitest';
import { readInquiries, writeInquiries } from './demoStore';

describe('browser storage fallback', () => {
  it('starts with no inquiries when storage is empty', () => { expect(readInquiries({ getItem: () => null })).toEqual({ inquiries: [], available: true }); });
  it('recovers safely from damaged or unexpected saved data', () => {
    for (const value of ['{broken', '{"name":"visitor"}', '[{"id":"missing-fields"}]']) expect(readInquiries({ getItem: () => value })).toEqual({ inquiries: [], available: false });
  });
  it('reports blocked reads and failed saves', () => {
    expect(readInquiries({ getItem: () => { throw new Error('blocked'); } }).available).toBe(false);
    expect(writeInquiries({ setItem: () => { throw new Error('quota'); } }, [])).toBe(false);
  });
});
