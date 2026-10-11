import type { Property } from '../../data/types';
import { Icon } from '../../components/ui/Icon';
import styles from './PropertySummary.module.css';

export function PropertyFacts({ property }: { property: Property }) {
  return <div className={styles.facts}>
    {property.beds !== null && <span><Icon name="bed" size={16} /> {property.beds === 0 ? 'Studio' : `${property.beds} Beds`}</span>}
    {property.baths !== null && <span><Icon name="bath" size={16} /> {property.baths} Baths</span>}
    <span><Icon name="area" size={16} /> {property.area.toLocaleString('en-PH')} {property.areaUnit} {property.areaKind === 'lot' ? 'lot' : 'floor'}</span>
  </div>;
}
