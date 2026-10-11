import { useEffect, useRef, useId, type ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Dialog.module.css';

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return <dialog ref={ref} className={styles.dialog} aria-labelledby={titleId} onClose={() => { if (open) onClose(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    <header className={styles.header}><h2 id={titleId}>{title}</h2><button type="button" className={styles.close} aria-label="Close dialog" onClick={onClose}><Icon name="close" size={22} /></button></header>
    <div className={styles.content}>{children}</div>
  </dialog>;
}
