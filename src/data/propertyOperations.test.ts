import { describe,expect,it } from 'vitest';
import { sampleProperties } from './fixtures/properties';
import { sampleInquiries } from './fixtures/inquiries';
import { upsertProperty,validateProperty } from './propertyOperations';
import { emptyFilters,filterProperties,sortProperties } from '../features/properties/filterProperties';
import { readProperties,writeProperties,readInquiries,writeInquiries } from './demoStore';
import { toCsv } from './exportCsv';

describe('single administrator listing workflow',() => {
  it('keeps publication independent from availability and updates the public inventory',() => {
    const sold={ ...sampleProperties[0],availability:'sold' as const };
    let records=upsertProperty(sampleProperties,sold);
    expect(filterProperties(records,emptyFilters).find((p) => p.id === sold.id)?.availability).toBe('sold');
    for (const publication of ['draft','unpublished','archived'] as const) {
      records=upsertProperty(records,{ ...sold,publication });
      expect(filterProperties(records,emptyFilters).some((p) => p.id === sold.id)).toBe(false);
    }
    records=upsertProperty(records,{ ...sold,publication:'published' });
    expect(filterProperties(records,emptyFilters).find((p) => p.id === sold.id)?.availability).toBe('sold');
  });
  it('adds a draft and preserves its identity when editing and publishing',() => {
    const added={ ...sampleProperties[0],id:'DEMO-NEW',slug:'new-sample-home',title:'New sample home',publication:'draft' as const };
    const draft=upsertProperty(sampleProperties,added);
    expect(draft).toHaveLength(21);
    expect(filterProperties(draft,emptyFilters)).toHaveLength(20);
    const published=upsertProperty(draft,{ ...added,publication:'published',price:1234567 });
    expect(published).toHaveLength(21);
    expect(filterProperties(published,emptyFilters).find((p) => p.id === added.id)?.price).toBe(1234567);
    expect(sampleProperties).toHaveLength(20);
  });
  it('rejects duplicate page addresses and invalid price/specification values',() => {
    expect(validateProperty({ ...sampleProperties[0],slug:sampleProperties[1].slug },sampleProperties)).toHaveProperty('slug');
    expect(validateProperty({ ...sampleProperties[0],price:NaN,area:0,beds:1.5 },sampleProperties)).toMatchObject({ price:expect.any(String),area:expect.any(String),specifications:expect.any(String) });
    expect(() => upsertProperty(sampleProperties,{ ...sampleProperties[0],location:'' })).toThrow();
  });
  it('sorts sales and monthly rents separately and places price on request last',() => {
    const ordered=sortProperties([sampleProperties[0],sampleProperties[1],sampleProperties[3]],'low');
    expect(ordered.map((p) => p.id)).toEqual(['DEMO-004','DEMO-001','DEMO-002']);
    const featured=sortProperties(sampleProperties,'featured');
    const lastFeatured=featured.map((p) => p.featured).lastIndexOf(true);
    expect(featured.slice(0,lastFeatured+1).every((p) => p.featured)).toBe(true);
  });
});
describe('editable demo persistence',() => {
  it('round-trips edited properties, photo order and saved inquiry status',() => {
    const values=new Map<string,string>(); const storage={ getItem:(key:string) => values.get(key) ?? null,setItem:(key:string,value:string) => { values.set(key,value); } };
    const properties=[{ ...sampleProperties[0],photos:['/assets/c1-condo.jpg','/assets/c1-house.jpg'],image:'/assets/c1-condo.jpg',privateNotes:'Fictional private note' }];
    expect(writeProperties(storage,properties)).toBe(true); expect(readProperties(storage).properties).toEqual(properties);
    const inquiries=[{ ...sampleInquiries[0],status:'handled' as const,note:'Sample follow-up' }];
    expect(writeInquiries(storage,inquiries)).toBe(true); expect(readInquiries(storage).inquiries).toEqual(inquiries);
  });
  it('falls back on damaged, duplicate, or invalid listing records',() => {
    for (const value of ['{broken',JSON.stringify([{ ...sampleProperties[0],area:'bad' }]),JSON.stringify([sampleProperties[0],sampleProperties[0]])]) expect(readProperties({ getItem:() => value })).toEqual({ properties:null,available:false });
    expect(readProperties({ getItem:() => null })).toEqual({ properties:null,available:true });
    expect(writeProperties({ setItem:() => { throw new Error('quota'); } },sampleProperties)).toBe(false);
  });
});
describe('record export',() => {
  it('escapes commas and quotes and neutralizes spreadsheet formula input',() => {
    expect(toCsv([['Name','Message'],['Sample, visitor','He said "hello"'],['=1+1',null]])).toBe('"Name","Message"\r\n"Sample, visitor","He said ""hello"""\r\n"\'=1+1",""');
  });
});
