import { useState } from 'react';
import type { PropertyFilters, PropertyType } from '../../data/types';
import { emptyFilters } from './filterProperties';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextInput } from '../../components/ui/Field';
import { Icon, type IconName } from '../../components/ui/Icon';
import styles from './PropertySearch.module.css';

const categories: { type: PropertyType; label: string; icon: IconName }[] = [{ type: 'house', label: 'Houses', icon: 'house' }, { type: 'apartment', label: 'Apartments', icon: 'apartment' }, { type: 'land', label: 'Land', icon: 'land' }, { type: 'commercial', label: 'Commercial', icon: 'store' }];

export function PropertySearch({ initialFilters, resultCount, searching, onSearch, onReset }: { initialFilters?: PropertyFilters; resultCount: number; searching: boolean; onSearch: (filters: PropertyFilters) => void; onReset: () => void }) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters ?? { ...emptyFilters, offering: 'sale' });
  const [priceRange, setPriceRange] = useState('any');

  function reset() { setFilters({ ...emptyFilters, offering: 'sale' }); setPriceRange('any'); onReset(); }
  function range(value: string) {
    setPriceRange(value);
    const lower = filters.offering === 'rent' ? 2000 : 1500000;
    const upper = filters.offering === 'rent' ? 5000 : 3000000;
    const [minPrice, maxPrice] = value === 'under' ? [null, lower] : value === 'middle' ? [lower, upper] : value === 'over' ? [upper, null] : [null, null];
    setFilters({ ...filters, minPrice, maxPrice });
  }

  return <section className={styles.search} aria-label="Find a property">
    <form onSubmit={(event) => { event.preventDefault(); onSearch(filters); }}>
      <div className={styles.searchHeading}><p><strong>Property search</strong><span> · Filter by location, intent, and type</span></p><button type="button" className="text-link" onClick={reset}>Reset filters</button></div>
      <div className={styles.fields}>
        <div><span className={styles.label} id="intent-label">Intent</span><div className={styles.intent} role="group" aria-labelledby="intent-label">{(['sale', 'rent', 'all'] as const).map((offering) => <button key={offering} type="button" aria-pressed={filters.offering === offering} onClick={() => { setFilters({ ...filters, offering, minPrice: null, maxPrice: null }); setPriceRange('any'); }}>{offering === 'sale' ? 'Buy' : offering === 'rent' ? 'Rent' : 'Any'}</button>)}</div></div>
        <Field id="search-location" label="Location"><div className={styles.location}><TextInput id="search-location" placeholder="City, district, or neighborhood" value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} /><Icon name="search" size={18} /></div></Field>
        <Field id="search-type" label="Property type"><Select id="search-type" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value as PropertyFilters['type'] })}><option value="all">All property types</option>{categories.map((category) => <option key={category.type} value={category.type}>{category.label}</option>)}</Select></Field>
        <Field id="search-price" label="Price range"><Select id="search-price" value={priceRange} disabled={filters.offering === 'all'} onChange={(event) => range(event.target.value)}><option value="any">{filters.offering === 'all' ? 'Choose Buy or Rent' : 'Any price'}</option><option value="under">{filters.offering === 'rent' ? 'Under $2,000 / month' : 'Under $1,500,000'}</option><option value="middle">{filters.offering === 'rent' ? '$2,000 – $5,000 / month' : '$1,500,000 – $3,000,000'}</option><option value="over">{filters.offering === 'rent' ? '$5,000+ / month' : '$3,000,000+'}</option></Select></Field>
        <Button type="submit" className={styles.submit}>Search properties <Icon name="arrow" size={18} /></Button>
      </div>
      <div className={styles.searchFoot}><label><input type="checkbox" checked={filters.includePriceOnRequest} onChange={(event) => setFilters({ ...filters, includePriceOnRequest: event.target.checked })} /> Include price on request properties</label><span role="status">{searching ? `${resultCount} matching sample ${resultCount === 1 ? 'property' : 'properties'}` : 'Showing 3 sample previews'}</span></div>
    </form>
    <div className={styles.quickBrowse}><span>Quick browse:</span>{categories.map((category) => <button type="button" key={category.type} aria-pressed={filters.type === category.type} onClick={() => { const next = { ...emptyFilters, type: category.type }; setFilters(next); setPriceRange('any'); onSearch(next); }}><Icon name={category.icon} size={16} /> {category.label}</button>)}</div>
  </section>;
}
