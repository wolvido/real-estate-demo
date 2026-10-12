import { Link, useLocation, useNavigate } from 'react-router';
import { Brand } from '../app/PublicLayout';
import { useDemo } from '../app/DemoProvider';
import { Button } from '../components/ui/Button';
import styles from './AdminPages.module.css';
export function AdminEntryPage() {
  const { enterAdmin } = useDemo(); const navigate = useNavigate(); const location = useLocation();
  const next = typeof location.state?.next === 'string' && location.state.next.startsWith('/admin/') ? location.state.next : '/admin/properties';
  return <div className={styles.entry}><header><Link to="/#home"><Brand /></Link><Link className="text-link" to="/#home">← Back to website</Link></header><main id="main" className={styles.entryMain}><section><p className="eyebrow">Internal portal · Client demo</p><h1>Administrator demo</h1><p>Explore listing management and website inquiries as a single administrator.</p><div className="notice">This demo has no real sign-in. Use sample information; changes stay in this browser.</div><Button onClick={() => { enterAdmin(); navigate(next, { replace: true }); }}>Enter admin demo →</Button><p className="muted">No email address or password is needed.</p></section><aside><Brand /><h2>Website management</h2><p>Manage listings, photos, publication, and inquiries.</p><ul><li>Add and edit fictional properties</li><li>Preview published and draft listings</li><li>Review inquiries saved on this device</li></ul><span className="status">M1 Soft Blue · One administrator</span></aside></main></div>;
}
