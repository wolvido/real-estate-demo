import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Icon } from '../components/ui/Icon';
import { LinkButton } from '../components/ui/LinkButton';
import { ResetDemo } from '../components/ui/ResetDemo';
import { useDemo } from './DemoProvider';
import styles from './PublicLayout.module.css';

const navigation = [{ label: 'Home', href: '/#home' }, { label: 'Properties', href: '/#properties' }, { label: 'Services', href: '/services' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }];
export function Brand() { return <span className={styles.brand}>Company <span>/</span> Real Estate</span>; }
export function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState('Home');
  const location = useLocation();
  const { storageNotice } = useDemo();
  useEffect(() => {
    setMenuOpen(false);
    document.title = (location.pathname === '/' ? 'Your next move' : location.pathname.startsWith('/properties/') ? 'Property details' : location.pathname.slice(1).replace(/^./, (letter) => letter.toUpperCase())) + ' — Company / Real Estate';
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.pathname, location.hash]);
  useEffect(() => {
    if (location.pathname !== '/') return;
    function update() {
      const bounds = document.getElementById('properties')?.getBoundingClientRect();
      const threshold = (document.querySelector('header')?.getBoundingClientRect().height ?? 80) + 60;
      setSection(bounds && bounds.top <= threshold && bounds.bottom > threshold ? 'Properties' : 'Home');
    }
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [location.pathname]);
  const current = location.pathname === '/' ? section : location.pathname.startsWith('/properties/') ? 'Properties' : navigation.find((item) => item.href === location.pathname)?.label;
  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}><div className={'page-container ' + styles.headerInner}>
      <Link to="/#home" aria-label="Company Real Estate home"><Brand /></Link><span className={styles.region}>Mindanao</span>
      <button type="button" className={styles.menuToggle} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
      <nav id="public-navigation" className={styles.navigation + (menuOpen ? ' ' + styles.navigationOpen : '')} aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)} className={current === item.label ? styles.current : undefined} aria-current={current === item.label ? location.pathname === '/' ? 'location' : 'page' : undefined}>{item.label}</Link>)}
        <LinkButton to="/contact" onClick={() => setMenuOpen(false)}>Talk to our team</LinkButton>
      </nav>
    </div></header>
    {storageNotice && <p className="storage-notice" role="status">{storageNotice}</p>}
    <Outlet />
    <footer className={styles.footer}><div className="page-container">
      <div className={styles.footerTop}><div><Link to="/#home"><Brand /></Link><span>Mindanao, Philippines</span></div><nav aria-label="Footer navigation">{navigation.map((item) => <Link key={item.label} to={item.href}>{item.label}</Link>)}</nav><p>Service area: Davao City · Samal · Panabo · Tagum · Digos</p></div>
      <div className={styles.footerBottom}><span>Client demo · Sample company and property content</span><div className={styles.footerTools}><Link to="/privacy">Privacy information</Link><Link to="/admin">Admin demo</Link><ResetDemo /></div></div>
    </div></footer>
  </div>;
}
