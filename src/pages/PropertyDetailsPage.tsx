import { Link, useParams } from 'react-router';
import { useDemo } from '../app/DemoProvider';
import { PhotoGallery } from '../features/properties/PhotoGallery';
import { PropertyFacts } from '../features/properties/PropertyFacts';
import { PropertySummary } from '../features/properties/PropertySummary';
import { InquiryForm } from '../features/inquiries/InquiryForm';
import { formatPrice } from '../features/properties/filterProperties';
import { LinkButton } from '../components/ui/LinkButton';
import { NotFoundPage } from './NotFoundPage';
import styles from './PropertyDetailsPage.module.css';

export function PropertyDetailsPage() {
  const { slug } = useParams(); const { properties, adminEntered } = useDemo();
  const property = properties.find((record) => record.slug === slug);
  if (!property || property.publication !== 'published' && !adminEntered) return <NotFoundPage />;
  const related = properties.filter((record) => record.publication === 'published' && record.id !== property.id).slice(0,2);
  return <main id="main" className={'page-container ' + styles.main}>
    {property.publication !== 'published' && <div className="notice">Administrator demo preview · This {property.publication} record is hidden from public browsing. <Link className="text-link" to={'/admin/properties/' + property.id + '/edit'}>Return to editor →</Link></div>}
    <div className={styles.breadcrumb}><p><Link to="/#home">Home</Link> / <Link to="/#properties">Properties</Link> / {property.title} · {property.id}</p><Link className="text-link" to="/#properties">← Back to properties</Link></div>
    <section className={styles.heading}><div><div className={styles.labels}><span className="status">{property.offering === 'sale' ? 'For sale' : 'For rent'}</span><span className="status status-muted">{property.availability === 'available' ? 'Available for viewing' : property.availability}</span><span>{property.category}</span></div><h1>{property.title}</h1><p>{property.location} · Public reference ID: {property.id}</p></div><div className={styles.headingPrice}><small>Asking price</small><strong>{formatPrice(property)}</strong><a className="text-link" href="#inquiry">Ask about price and viewing →</a></div><LinkButton to={'/properties/' + property.slug + '#inquiry'}>Ask about this property</LinkButton></section>
    <PhotoGallery key={property.id} property={property} />
    <section className={styles.overview}><div><p className="eyebrow">Specifications & overview</p><h2>A closer look at this {property.type === 'land' ? 'lot' : property.type === 'commercial' ? 'space' : 'home'}</h2><PropertyFacts property={property} /><p className={styles.description}>{property.description}</p>{property.addressPublic && property.exactAddress && <p className={styles.description}>Address: {property.exactAddress}</p>}{property.features?.length ? <><h3>Key features & specifications</h3><ul className={styles.features}>{property.features.map((feature,index) => <li key={index}>✓ {feature}</li>)}</ul></> : null}</div><aside className={styles.inquirySummary}><p className="eyebrow">Property inquiry</p><h3>Speak with our team</h3><dl><div><dt>Property</dt><dd>{property.title}</dd></div><div><dt>Location</dt><dd>{property.location}</dd></div><div><dt>Reference</dt><dd>{property.id}</dd></div><div><dt>Pricing</dt><dd>{formatPrice(property)}</dd></div><div><dt>Viewing status</dt><dd>{property.availability}</dd></div></dl><LinkButton to={'/properties/' + property.slug + '#inquiry'}>Scroll to inquiry form ↓</LinkButton><p>No account or registration required.</p></aside></section>
    <section id="inquiry" className={styles.inquiry}><p className="eyebrow">Let’s arrange your next step</p><h2>Ask about {property.title}</h2><InquiryForm key={property.id} property={property} onDone={() => document.getElementById('main')?.scrollIntoView()} /></section>
    <section className={styles.related}><div><div><p className="eyebrow">More places to consider</p><h2>Explore more homes and spaces in the region</h2></div><Link className="text-link" to="/#properties">All properties →</Link></div><div className={styles.relatedGrid}>{related.map((record) => <PropertySummary key={record.id} property={record} />)}</div></section>
  </main>;
}
