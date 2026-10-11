import { describe, expect, it } from 'vitest';
import { sampleProperties } from '../../data/fixtures/properties';
import { emptyFilters, filterProperties, formatPrice } from './filterProperties';

describe('property search', () => {
  it('combines location, intent, category, and price', () => {
    const matches = filterProperties(sampleProperties, { ...emptyFilters, offering: 'sale', location: '  TORIL  ', type: 'house', minPrice: 5000000, maxPrice: 10000000, includePriceOnRequest: false });
    expect(matches.map((property) => property.id)).toEqual(['DEMO-004']);
  });
  it('includes price-on-request records only when requested', () => {
    const fixtures = [sampleProperties[0], sampleProperties[1], sampleProperties[2]];
    expect(filterProperties(fixtures, { ...emptyFilters, includePriceOnRequest: false })).toEqual([sampleProperties[1]]);
    expect(filterProperties(fixtures, { ...emptyFilters, maxPrice: 1 })).toEqual([sampleProperties[0], sampleProperties[2]]);
  });
  it('never exposes draft or archived listings', () => {
    expect(filterProperties([{ ...sampleProperties[0], publication: 'draft' }, { ...sampleProperties[1], publication: 'archived' }], emptyFilters)).toEqual([]);
  });
  it('assigns a boundary price to one range', () => {
    const property = { ...sampleProperties[0], price: 5000000 };
    expect(filterProperties([property], { ...emptyFilters, maxPrice: 5000000 })).toHaveLength(0);
    expect(filterProperties([property], { ...emptyFilters, minPrice: 5000000, maxPrice: 10000000 })).toHaveLength(1);
  });
  it('finds a Davao condo in the monthly rental range', () => {
    expect(filterProperties(sampleProperties, { ...emptyFilters, location: 'Davao City', offering: 'rent', type: 'apartment', minPrice: 15000, maxPrice: 35000, includePriceOnRequest: false }).map((property) => property.id)).toEqual(['DEMO-002']);
  });
  it('formats Philippine peso sale and monthly rental prices', () => {
    expect(formatPrice(sampleProperties[3])).toBe('₱6,500,000');
    expect(formatPrice(sampleProperties[1])).toBe('₱28,000 / month');
    expect(formatPrice(sampleProperties[0])).toBe('Price on request');
  });
});
