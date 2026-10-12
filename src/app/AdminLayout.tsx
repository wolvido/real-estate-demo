import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router';
import { Brand } from './PublicLayout';
import { useDemo } from './DemoProvider';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { ResetDemo } from '../components/ui/ResetDemo';
import styles from './AdminLayout.module.css';
export function AdminLayout() {
  const { adminEntered, leaveAdmin, properties, inquiries, storageNotice } = useDemo(); const location = useLocation();
  if (!adminEntered) return <Navigate to="/admin" replace state={{ next: location.pathname }} />;
  return <div className={styles.shell}><a href="#main" className="text-link sr-only">Skip to workspace</a><header className={styles.header}><Link to="/#home"><Brand /></Link><span>Administrator area</span><span className="status status-muted">Client demo</span><div><Link to="/#home" className="text-link">View website ↗</Link><strong>Sample administrator<small>Full demo access</small></strong><Button variant="text" onClick={leaveAdmin}>Exit demo</Button></div></header><div className={styles.body}><aside className={styles.sidebar}><p className="eyebrow">Management</p><nav aria-label="Admin navigation"><NavLink to="/admin/properties" className={({ isActive }) => isActive ? styles.active : ''}><Icon name="house" /> Properties <span>{properties.length}</span></NavLink><NavLink to="/admin/inquiries" className={({ isActive }) => isActive ? styles.active : ''}><Icon name="mail" /> Inquiries <span>{inquiries.filter((inquiry) => inquiry.status === 'new').length}</span></NavLink></nav><div><p>M1 Soft Blue</p><p>One administrator · Changes stay on this device</p><ResetDemo /></div></aside><div className={styles.workspace}>{storageNotice && <p className="storage-notice" role="status">{storageNotice}</p>}<Outlet /></div></div><footer className={styles.footer}><span>Company / Real Estate · Listing and inquiry management</span><span>Client demo · No real accounts or email delivery</span></footer></div>;
}
