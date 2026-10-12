import { useEffect, useState } from 'react';
import type { PropertyFilters } from '../../data/types';
import { emptyFilters } from './filterProperties';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextInput } from '../../components/ui/Field';
import styles from './PropertySearch.module.css';

export function PropertySearch({ initialFilters, locations, onSearch, onReset }: { initialFilters: PropertyFilters; locations: string[]; onSearch: (filters: PropertyFilters) => void; onReset: () => void }) {
  const [filters, setFilters] = useState(initialFilters);
  const [budget, setBudget] = useState('all');
  useEffect(() => { setFilters(initialFilters); setBudget('all'); }, [initialFilters.offering, initialFilters.location]);
  function reset() { setFilters({ ...emptyFilters }); setBudget('all'); onReset(); }
  function changeBudget(value: string) {
    setBudget(value);
    const bounds: Record<string, [PropertyFilters['offering'], number | null, number | null]> = { all: [filters.offering, null, null], 'rent-low': ['rent', null, 20001], 'rent-mid': ['rent', 20000, 50001], 'sale-low': ['sale', null, 3000001], 'sale-mid': ['sale', 3000000, 6000001], 'sale-high': ['sale', 6000001, null] };
    const [offering, minPrice, maxPrice] = bounds[value]; setFilters({ ...filters, offering, minPrice, maxPrice });
  }
  return <form className={styles.search} onSubmit={(event) => { event.preventDefault(); onSearch(filters); }}>
    <div className={styles.top}><div className={styles.intent}><span>Looking to</span><div role="group" aria-label="Sale or rental">{(['all','sale','rent'] as const).map((offering) => <button key={offering} type="button" aria-pressed={filters.offering === offering} onClick={() => { setFilters({ ...filters, offering, minPrice: null, maxPrice: null }); setBudget('all'); }}>{offering === 'sale' ? 'Buy' : offering === 'rent' ? 'Rent' : 'All'}</button>)}</div></div><button type="button" className="text-link" onClick={reset}>Reset search</button></div>
    <div className={styles.fields}>
      <Field id="search-location" label="Location"><TextInput id="search-location" type="search" list="property-locations" placeholder="Davao, Samal, Panabo…" value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} /><datalist id="property-locations">{[...new Set(locations)].map((location) => <option key={location} value={location} />)}</datalist></Field>
      <Field id="search-type" label="Property type"><Select id="search-type" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value as PropertyFilters['type'] })}><option value="all">All property types</option><option value="house">House & lot</option><option value="apartment">Condo & apartment</option><option value="land">Land</option><option value="commercial">Commercial</option></Select></Field>
      <Field id="search-price" label="Budget"><Select id="search-price" value={budget} onChange={(event) => changeBudget(event.target.value)}><option value="all">Any price</option><option value="rent-low">Up to ₱20,000 / month</option><option value="rent-mid">₱20,000–₱50,000 / month</option><option value="sale-low">Up to ₱3 million</option><option value="sale-mid">₱3–₱6 million</option><option value="sale-high">Over ₱6 million</option></Select></Field>
      <Button type="submit">Find properties →</Button>
    </div>
    <div className={styles.foot}><label><input type="checkbox" checked={filters.includePriceOnRequest} onChange={(event) => setFilters({ ...filters, includePriceOnRequest: event.target.checked })} /> Include price on request</label><span>Prices in PHP · Rental prices per month</span></div>
  </form>;
}
