import { afterEach,describe,expect,it,vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { DemoProvider } from './DemoProvider';
import { propertyStorageKey } from '../data/demoStore';
import { sampleProperties } from '../data/fixtures/properties';

function renderRoute(path:string,admin=false,records=sampleProperties) {
  vi.stubGlobal('window',{ localStorage:{ getItem:(key:string) => key === propertyStorageKey ? JSON.stringify(records) : null },sessionStorage:{ getItem:() => admin ? 'entered' : null } });
  return renderToStaticMarkup(createElement(MemoryRouter,{ initialEntries:[path],children:createElement(DemoProvider,{ children:createElement(AppRoutes) }) }));
}
afterEach(() => vi.unstubAllGlobals());
describe('current design routes and shared records',() => {
  it.each(['/','/properties/matina-garden-home','/about','/services','/contact','/privacy','/admin','/admin/properties','/admin/properties/DEMO-001/edit','/admin/inquiries'])('renders %s without a missing route or runtime error',(path) => {
    const markup=renderRoute(path,true);
    expect(markup).toContain('id="main"'); expect(markup).not.toContain('This page isn’t available.'); expect(markup).not.toContain('No routes matched');
  });
  it('keeps Home and Properties in the same public document with working destination links',() => {
    const markup=renderRoute('/'); expect(markup).toContain('id="home"'); expect(markup).toContain('id="properties"'); expect(markup).toContain('href="/#properties"'); expect(markup).toContain('href="/properties/matina-garden-home"');
  });
  it('starts with six public listings and provides a visible manual loading fallback',() => {
    const markup=renderRoute('/');
    expect(markup.match(/<article\b/g)).toHaveLength(6);
    expect(markup).toContain('Showing 6 of 20 sample properties');
    expect(markup).toContain('Show more properties');
    expect(markup).not.toContain('aria-label="Results pages"');
  });
  it('shows a completion message for a short result set without more-results controls',() => {
    const markup=renderRoute('/',false,sampleProperties.slice(0,2));
    expect(markup.match(/<article\b/g)).toHaveLength(2);
    expect(markup).toContain('You’ve seen all 2 matching properties.');
    expect(markup).not.toContain('Show more properties');
  });
  it('shows saved public edits without exposing notes or an unapproved exact address',() => {
    const property={ ...sampleProperties[0],title:'Updated client demo home',price:7654321,privateNotes:'PRIVATE SAMPLE NOTE',exactAddress:'PRIVATE SAMPLE ADDRESS',addressPublic:false };
    const markup=renderRoute('/properties/'+property.slug,false,[property]);
    expect(markup).toContain('Updated client demo home'); expect(markup).toContain('₱7,654,321'); expect(markup).not.toContain('PRIVATE SAMPLE NOTE'); expect(markup).not.toContain('PRIVATE SAMPLE ADDRESS');
  });
  it('hides a draft from visitors while allowing an explicitly labeled admin preview',() => {
    const property={ ...sampleProperties[0],publication:'draft' as const };
    expect(renderRoute('/properties/'+property.slug,false,[property])).not.toContain('<h1>'+property.title+'</h1>');
    expect(renderRoute('/properties/'+property.slug,true,[property])).toContain('Administrator demo preview');
  });
});
