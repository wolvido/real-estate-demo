import { useCallback, useEffect, useRef, useTransition } from 'react';
import { Button } from '../../components/ui/Button';
import { watchForMore } from './watchForMore';
import styles from '../../pages/HomePage.module.css';

export function LoadMoreProperties({ shown, total, onLoadMore }: { shown: number; total: number; onLoadMore: () => void }) {
  const trigger = useRef<HTMLDivElement>(null);
  const [loading, startTransition] = useTransition();
  const hasMore = shown < total;
  const loadMore = useCallback(() => { startTransition(onLoadMore); }, [onLoadMore]);

  useEffect(() => {
    if (!hasMore || loading || !trigger.current) return;
    return watchForMore(trigger.current, loadMore);
  }, [hasMore, loading, shown, loadMore]);

  if (!total) return null;
  return <div ref={trigger} className={styles.loadMore} aria-busy={loading}>
    <p role="status" aria-live="polite">{loading ? 'Loading more properties…' : hasMore ? 'More properties appear as you scroll.' : 'You’ve seen all ' + total + ' matching properties.'}</p>
    {hasMore && <Button onClick={loadMore} disabled={loading} aria-controls="property-results">{loading ? 'Loading more properties…' : 'Show more properties ↓'}</Button>}
  </div>;
}
