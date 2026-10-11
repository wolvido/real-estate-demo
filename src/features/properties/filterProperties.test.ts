import { describe, expect, it } from 'vitest';
import { sampleProperties } from '../../data/fixtures/properties';
import { emptyFilters, filterProperties } from './filterProperties';

describe('property search', () => {
  it('combines location, intent, category, and price', () => {
    const matches = filterProperties(sampleProperties, { ...emptyFilters, offering: 'sale', location: '  north PARK  ', type: 'house', minPrice: 1500000, maxPrice: 3000000, includePriceOnRequest: false });
    expect(matches.map((property) => property.id)).toEqual(['DEMO-004']);
  });
  it('includes price-on-request records only when requested', () => {
    expect(filterProperties(sampleProperties, { ...emptyFilters, includePriceOnRequest: false })).toHaveLength(3);
    expect(filterProperties(sampleProperties, { ...emptyFilters, maxPrice: 1 })).toHaveLength(3);
  });
  it('never exposes draft or archived listings', () => {
    expect(filterProperties([{ ...sampleProperties[0], publication: 'draft' }, { ...sampleProperties[1], publication: 'archived' }], emptyFilters)).toEqual([]);
  });
  it('assigns a boundary price to one range', () => {
    const property = { ...sampleProperties[0], price: 1500000 };
    expect(filterProperties([property], { ...emptyFilters, maxPrice: 1500000 })).toHaveLength(0);
    expect(filterProperties([property], { ...emptyFilters, minPrice: 1500000, maxPrice: 3000000 })).toHaveLength(1);
  });
});
