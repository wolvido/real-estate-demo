import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { propertyPhotos } from '../../data/fixtures/company';
import type { Property } from '../../data/types';
import styles from '../../pages/PropertyDetailsPage.module.css';
export function PhotoGallery({ property }: { property: Property }) {
  const photos = propertyPhotos(property);
  const [selected, setSelected] = useState(0);
  const index = Math.min(selected, photos.length - 1);
  function move(direction: number) { setSelected((index + direction + photos.length) % photos.length); }
  return <section className={styles.gallery} aria-label="Illustrative property gallery"><div className={styles.galleryImage}><img src={photos[index]} alt={property.title + ' — illustrative photo ' + (index + 1)} width="1280" height="550" /><span className={styles.photoNote}>Illustrative property photos · Fictional demo listing</span><div className={styles.galleryControls}><Button variant="secondary" aria-label="Previous photo" onClick={() => move(-1)}>←</Button><span aria-live="polite">{index + 1} / {photos.length}</span><Button variant="secondary" aria-label="Next photo" onClick={() => move(1)}>→</Button></div></div><div className={styles.thumbnails}>{photos.map((photo,index) => <button type="button" key={photo + index} aria-label={'Show photo ' + (index + 1)} aria-pressed={index === selected} onClick={() => setSelected(index)}><img src={photo} alt="" width="320" height="180" /></button>)}</div></section>;
}
