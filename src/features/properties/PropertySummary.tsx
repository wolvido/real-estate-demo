import { Link } from 'react-router';
import type { Property } from '../../data/types';
import { PropertyFacts } from './PropertyFacts';
import { formatPrice } from './filterProperties';
import styles from './PropertySummary.module.css';
export function PropertySummary({ property }: { property: Property }) {
  return <article className={styles.property} aria-label={property.title}>
    <Link to={'/properties/' + property.slug} className={styles.photo} aria-label={'View ' + property.title}><img src={property.image} alt={property.title + ' — illustrative photo'} loading="lazy" width="640" height="400" /></Link>
    <p className={styles.location}>{property.offering === 'sale' ? 'For sale' : 'For rent'} · {property.location}{property.availability !== 'available' && ' · ' + property.availability}</p>
    <h3><Link to={'/properties/' + property.slug}>{property.title}</Link></h3><p className={styles.price}>{formatPrice(property)}</p><p className={styles.description}>{property.description}</p><PropertyFacts property={property} />
    <Link to={'/properties/' + property.slug} className="text-link">View property →</Link>
  </article>;
}
