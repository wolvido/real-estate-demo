import { useState } from 'react';
import { PublicLayout } from '../app/PublicLayout';
import { useDemo } from '../app/DemoProvider';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Icon } from '../components/ui/Icon';
import { sampleProperties } from '../data/fixtures/properties';
import type { Property, PropertyFilters } from '../data/types';
import { emptyFilters, filterProperties, formatPrice } from '../features/properties/filterProperties';
import { PropertySummary } from '../features/properties/PropertySummary';
import { PropertySearch } from '../features/properties/PropertySearch';
import { PropertyFacts } from '../features/properties/PropertyFacts';
import { InquiryForm } from '../features/inquiries/InquiryForm';
import styles from './HomePage.module.css';

type Overlay = { kind: 'property'; property: Property } | { kind: 'inquiry'; property: Property | null } | { kind: 'privacy' } | { kind: 'reset' } | null;

export function HomePage() {
  const [filters, setFilters] = useState<PropertyFilters | null>(null);
  const [searchKey, setSearchKey] = useState(0);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [resetNotice, setResetNotice] = useState(false);
  const { resetDemo } = useDemo();
  const properties = filters ? filterProperties(sampleProperties, filters) : sampleProperties.filter((property) => property.featured && property.publication === 'published');
  const hero = sampleProperties[2];
  function search(next: PropertyFilters) { setFilters(next); }
  function allProperties() { setFilters(emptyFilters); setSearchKey((value) => value + 1); document.getElementById('properties')?.scrollIntoView({ block: 'start' }); }
  function closeOverlay() { setOverlay(null); }

  return <PublicLayout onInquiry={() => setOverlay({ kind: 'inquiry', property: null })} onReset={() => setOverlay({ kind: 'reset' })} onPrivacy={() => setOverlay({ kind: 'privacy' })}>
    <main className={`page-container ${styles.main}`} id="main">
      <section id="home" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={`eyebrow ${styles.heroEyebrow}`}><span /> Open Property Directory</p>
          <h1>Find a place that <span>fits your life.</span></h1>
          <p className={styles.heroIntro}>Find properties for sale or rent, and contact our team for help with your search. Straightforward specifications and direct assistance without hidden gates.</p>
          <p className={styles.heroNote}><Icon name="check" size={19} /> Sample listings updated for open inquiry · Clear specs and direct contact</p>
        </div>
        <button type="button" className={styles.heroPhoto} aria-label="View featured property: Pavilion in Pines" onClick={() => setOverlay({ kind: 'property', property: hero })}>
          <img src={hero.image} alt="Contemporary Pavilion in Pines residence surrounded by trees" width="640" height="400" fetchPriority="high" />
          <span className={styles.featuredLabel}>Featured Residence</span>
          <span className={styles.photoCaption}><strong>Pavilion in Pines</strong><span>Sample location · Price on request</span></span>
        </button>
      </section>
      <PropertySearch key={searchKey} initialFilters={filters ?? undefined} resultCount={properties.length} searching={filters !== null} onSearch={search} onReset={() => setFilters(null)} />
      <section className={styles.listings} id="properties" aria-labelledby="properties-heading">
        <div className={styles.sectionHeading}><div><p className="eyebrow">Sample listings</p><h2 id="properties-heading">{filters ? 'Find your next property' : 'Explore open properties'}</h2></div><button type="button" className="text-link" onClick={allProperties}>View all properties <Icon name="arrow" size={15} /></button></div>
        {properties.length > 0 ? <div className={styles.propertyGrid}>{properties.map((property) => <PropertySummary key={property.id} property={property} onView={(value) => setOverlay({ kind: 'property', property: value })} onInquiry={(value) => setOverlay({ kind: 'inquiry', property: value })} />)}</div> : <div className={styles.empty}><Icon name="search" size={28} /><h3>No properties match this search</h3><p>Try a broader location, another property type, or a different price range.</p><Button variant="secondary" onClick={() => { setFilters(null); setSearchKey((value) => value + 1); }}>Clear filters</Button></div>}
      </section>
      <section className={styles.about} id="about">
        <div><p className="eyebrow">About the service</p><h2>Direct property guidance without friction</h2><div className={styles.aboutLinks}><a href="#about-copy" className="text-link">Learn about us <Icon name="arrow" size={15} /></a><span>·</span><a href="#services" className="text-link">Our services <Icon name="arrow" size={15} /></a></div></div>
        <div id="about-copy"><p className={styles.aboutCopy}>We provide open access to architectural residences, detached houses, and urban flats. Visitors can review sample specifications, check availability status, and contact our team directly for clear answers without registration barriers or automated follow-up pressure.</p>
          <div className={styles.steps} id="services"><div><p className="eyebrow">Step 01</p><h3>Browse specifications</h3><p>Filter by intent, property category, or sample location to identify properties matching your requirements.</p></div><div><p className="eyebrow">Step 02</p><h3>Review open details</h3><p>Examine floor area, room configurations, architecture notes, and current availability status.</p></div><div><p className="eyebrow">Step 03</p><h3>Direct inquiry</h3><p>Try the inquiry form with sample information. Demo messages stay on this device.</p></div></div>
        </div>
      </section>
      <section className={styles.assistance} id="contact"><div className={styles.assistanceCopy}><span className={styles.supportIcon}><Icon name="support" size={22} /></span><div><h2>Questions about these sample properties or seeking guidance?</h2><p>Tell us what you are looking for. Our team can help you with your search.</p></div></div><Button size="small" onClick={() => setOverlay({ kind: 'inquiry', property: null })}>Ask our team <Icon name="arrow" size={15} /></Button></section>
      {resetNotice && <p className={styles.resetNotice} role="status">Demo reset. Locally saved inquiries have been cleared.</p>}
    </main>
    <Dialog open={overlay?.kind === 'property'} onClose={closeOverlay} title={overlay?.kind === 'property' ? overlay.property.title : 'Property preview'}>
      {overlay?.kind === 'property' && <div className={styles.propertyPreview}><img src={overlay.property.image} alt={overlay.property.title} width="640" height="400" /><p className="eyebrow">{overlay.property.category} · {overlay.property.offering === 'sale' ? 'For sale' : 'For rent'}</p><div className={styles.previewPrice}><strong>{formatPrice(overlay.property)}</strong><span>Sample location · {overlay.property.location}</span></div><PropertyFacts property={overlay.property} /><p>{overlay.property.description}</p><Button onClick={() => setOverlay({ kind: 'inquiry', property: overlay.property })}><Icon name="mail" /> Ask about this property</Button></div>}
    </Dialog>
    <Dialog open={overlay?.kind === 'inquiry'} onClose={closeOverlay} title={overlay?.kind === 'inquiry' && overlay.property ? 'Ask about this property' : 'Ask our team'}>
      {overlay?.kind === 'inquiry' && <InquiryForm key={overlay.property?.id ?? 'general'} property={overlay.property} onDone={closeOverlay} />}
    </Dialog>
    <Dialog open={overlay?.kind === 'privacy'} onClose={closeOverlay} title="About this client demo"><div className={styles.info}><p>These listings and company details are sample content. This demonstration does not send inquiries to the company.</p><p>Demonstration inquiries are remembered in this browser when browser storage is available. They are not shared between devices. Use sample contact details, and choose Reset demo to clear this demo's saved inquiries.</p><p>The static hosting provider receives ordinary website requests. A production privacy notice will be prepared for the working service and its actual providers.</p></div></Dialog>
    <Dialog open={overlay?.kind === 'reset'} onClose={closeOverlay} title="Reset the demo?"><div className={styles.info}><p>This clears inquiries saved by this demo in the current browser and restores the featured property previews.</p><div className={styles.resetActions}><Button variant="secondary" onClick={closeOverlay}>Cancel</Button><Button onClick={() => { resetDemo(); setFilters(null); setSearchKey((value) => value + 1); setResetNotice(true); closeOverlay(); }}>Reset demo</Button></div></div></Dialog>
  </PublicLayout>;
}
