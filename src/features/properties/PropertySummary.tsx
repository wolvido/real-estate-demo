import type { Property } from '../../data/types';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { PropertyFacts } from './PropertyFacts';
import { formatPrice } from './filterProperties';
import styles from './PropertySummary.module.css';

export function PropertySummary({ property, onView, onInquiry }: { property: Property; onView: (property: Property) => void; onInquiry: (property: Property) => void }) {
  return <article className={styles.property} aria-label={property.title}>
    <div>
      <button type="button" className={styles.photo} aria-label={`View ${property.title}`} onClick={() => onView(property)}>
        <img src={property.image} alt={`Illustrative photo for ${property.title}`} loading="lazy" width="640" height="400" />
        <span className={`${styles.offer} ${property.offering === 'rent' ? styles.rent : ''}`}>{property.offering === 'sale' ? 'For Sale' : 'For Rent'}</span>
        <span className={styles.availability}>{property.availability === 'available' ? 'Available for viewing' : property.availability}</span>
        <span className={styles.imageNote}>Illustrative photo</span>
      </button>
      <div className={styles.heading}>
        <div className={styles.titleBlock}><p className={`${styles.category} ${property.offering === 'rent' ? styles.rentCategory : ''}`}>{property.category}</p><h3><button type="button" onClick={() => onView(property)}>{property.title}</button></h3><p className={styles.location}><Icon name="pin" size={15} /><span>{property.location}</span></p></div>
        <div className={styles.price}><span>Price</span><strong>{formatPrice(property)}</strong>{property.price !== null && <small>Sample price · PHP</small>}</div>
      </div>
      <PropertyFacts property={property} />
    </div>
    <div className={styles.actions}><button type="button" className="text-link" onClick={() => onView(property)}>View property <Icon name="arrow" size={16} /></button><Button variant="secondary" size="small" onClick={() => onInquiry(property)}><Icon name="mail" size={15} /> Ask about this property</Button></div>
  </article>;
}
