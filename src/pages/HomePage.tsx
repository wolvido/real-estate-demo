import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useDemo } from '../app/DemoProvider';
import { company } from '../data/fixtures/company';
import { PropertySummary } from '../features/properties/PropertySummary';
import { PropertySearch } from '../features/properties/PropertySearch';
import { emptyFilters, filterProperties, sortProperties } from '../features/properties/filterProperties';
import { LoadMoreProperties } from '../features/properties/LoadMoreProperties';
import { LinkButton } from '../components/ui/LinkButton';
import { Icon } from '../components/ui/Icon';
import type { PropertyFilters } from '../data/types';
import styles from './HomePage.module.css';

export function HomePage() {
  const { properties } = useDemo();
  const [params] = useSearchParams();
  const offering = params.get('offering');
  const initial = { ...emptyFilters, offering: offering === 'sale' || offering === 'rent' ? offering : 'all' } as PropertyFilters;
  const [filters, setFilters] = useState<PropertyFilters>(initial);
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchReset, setSearchReset] = useState(0);
  useEffect(() => { setFilters({ ...emptyFilters, offering: offering === 'sale' || offering === 'rent' ? offering : 'all' }); setVisibleCount(6); setSearchReset(0); }, [offering]);
  const matches = sortProperties(filterProperties(properties, filters), sort);
  const visible = matches.slice(0, visibleCount);
  const loadMore = useCallback(() => setVisibleCount((count) => Math.min(count + 6, matches.length)), [matches.length]);
  function search(next: PropertyFilters) { setFilters(next); setVisibleCount(6); }
  return <main id="main">
    <section className={'page-container ' + styles.hero} id="home">
      <div><p className={styles.heroEyebrow}>Real estate in Davao & Mindanao</p><h1>Your next move, with a <span>local team.</span></h1><p className={styles.heroIntro}>{company.introduction}</p>
        <div className={styles.heroActions}><LinkButton to="/#properties">Browse properties</LinkButton><LinkButton to="/contact" variant="secondary">Talk to our team</LinkButton></div>
        <div className={styles.trust}><span><Icon name="check" size={15} /> Consultation before listings</span><span><Icon name="check" size={15} /> Clear neighborhood perspective</span></div>
      </div>
      <figure className={styles.heroPhoto}><img src={company.photo} alt="Illustrative Filipino real estate team talking with clients on a home patio" width="800" height="560" fetchPriority="high" /><figcaption><strong>Advisory in practice:</strong><span>Casual, in-depth walkthrough discussions at client pace</span></figcaption></figure>
    </section>
    <section className={'page-container ' + styles.approach}>
      <div className={styles.approachCopy}><div><p className="eyebrow">About our approach</p><h2>A local conversation. A clearer next step.</h2></div><div><p>{company.approach}</p><Link className="text-link" to="/about">About our company and service values →</Link></div></div>
      <div className={styles.coverage}><strong>Active regional coverage:</strong><span>{company.coverage.join(' · ')}</span><small>Davao Region & neighboring areas</small></div>
    </section>
    <section className={'page-container ' + styles.listings} id="properties">
      <div className={styles.sectionHeading}><div><p className="eyebrow">Your search starts here</p><h2>Find a place that fits your plans.</h2><p>Homes, rentals, land, and business spaces in Davao and across Mindanao.</p></div><Link className="text-link" to="/contact">Need a hand? Talk to us →</Link></div>
      <PropertySearch key={(offering ?? 'all') + searchReset} initialFilters={searchReset ? { ...emptyFilters } : initial} locations={properties.map((property) => property.location)} onSearch={search} onReset={() => search({ ...emptyFilters })} />
      <div className={styles.resultsBar}><p role="status" aria-live="polite">{matches.length ? 'Showing ' + visible.length + ' of ' + matches.length + ' sample properties' : 'No matching properties'}</p><label>Sort by <select value={sort} onChange={(event) => { setSort(event.target.value as typeof sort); setVisibleCount(6); }}><option value="featured">Featured first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
      {filters.offering === 'all' && sort !== 'featured' && <p className={styles.priceNote}>Sale prices and monthly rental prices are sorted separately.</p>}
      {visible.length ? <div id="property-results" className={styles.propertyGrid}>{visible.map((property) => <PropertySummary key={property.id} property={property} />)}</div> : <div id="property-results" className={styles.empty}><h3>No properties match this search.</h3><p>Try a broader location or budget, or let our team help.</p><button type="button" className="text-link" onClick={() => { search({ ...emptyFilters }); setSearchReset((value) => value + 1); }}>Clear filters →</button></div>}
      <LoadMoreProperties shown={visible.length} total={matches.length} onLoadMore={loadMore} />
      <div className={styles.resultsFoot}><span>Illustrative photos · Fictional listings for this demo</span></div>
    </section>
    <section className={'page-container ' + styles.services}><p className="eyebrow">How we assist</p><h2>How we can help</h2><p className={styles.serviceIntro}>Straightforward support for homebuyers, tenants, and property owners across Southern Mindanao.</p><div className={styles.serviceGrid}>{company.services.map((service) => <Link key={service.number} to={service.href}><p className="eyebrow">{service.number} / {service.label}</p><h3>{service.title}</h3><p>{service.summary}</p></Link>)}</div></section>
    <section className={'page-container ' + styles.contact}><div><p className="eyebrow">Direct contact</p><h2>Let’s talk about your next move.</h2><p>Have questions about specific locations in Davao City, Samal, or neighboring provinces? We respond with candid local guidance and sensible next steps.</p><div className={styles.contactFacts}><div><strong>Primary service desk</strong><span>Davao City & Mindanao service region</span></div><div><strong>Direct consultation</strong><span>In-person meetings or a conversation online</span></div></div></div><div className={styles.contactActions}><LinkButton to="/contact">Talk to our team</LinkButton><Link to="/contact" className="text-link">Send an inquiry →</Link></div></section>
  </main>;
}
