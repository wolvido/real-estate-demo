import { useState, type ReactNode } from 'react';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import styles from './PublicLayout.module.css';

const navigation = [{ label: 'Home', href: '#home' }, { label: 'Properties', href: '#properties' }, { label: 'About us', href: '#about' }, { label: 'Services', href: '#services' }, { label: 'Contact', href: '#contact' }];

export function Brand() { return <span className={styles.brand}>Company <span className={styles.brandTag}>/ Real Estate</span></span>; }

export function PublicLayout({ children, onInquiry, onReset, onPrivacy }: { children: ReactNode; onInquiry: () => void; onReset: () => void; onPrivacy: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <div className={`page-container ${styles.headerInner}`}>
        <a href="#home" aria-label="Company Real Estate home"><Brand /></a>
        <span className={styles.sample}>Sample content</span>
        <button className={styles.menuToggle} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
        <nav id="public-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`} aria-label="Main navigation">
          {navigation.map((link) => <a key={link.label} className={link.label === 'Home' ? styles.current : undefined} href={link.href} aria-current={link.label === 'Home' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <Button className={styles.headerAction} onClick={() => { setMenuOpen(false); onInquiry(); }}>Ask our team <Icon name="arrow" size={15} /></Button>
        </nav>
      </div>
    </header>
    {children}
    <footer className={styles.footer}>
      <div className="page-container">
        <div className={styles.footerTop}>
          <div><a href="#home"><Brand /></a><p>Find homes and spaces in Davao and across Mindanao.</p></div>
          <nav aria-label="Footer navigation">{navigation.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}<button type="button" onClick={onPrivacy}>Privacy information</button></nav>
        </div>
        <div className={styles.footerBottom}><span>Sample property directory · For demonstration purposes</span><span className={styles.footerTools}><span>Visitors browse without an account</span><button type="button" onClick={onReset}><Icon name="reset" size={13} /> Reset demo</button></span></div>
      </div>
    </footer>
  </>;
}
