import { Button } from './Button';
export function Pagination({ page, count, pageSize, onPage }: { page: number; count: number; pageSize: number; onPage: (page: number) => void }) {
  const total = Math.max(1, Math.ceil(count / pageSize));
  return <nav className="pagination" aria-label="Results pages"><Button variant="secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>← Previous</Button><span aria-live="polite">{page} of {total}</span><Button variant="secondary" disabled={page >= total} onClick={() => onPage(page + 1)}>Next →</Button></nav>;
}
