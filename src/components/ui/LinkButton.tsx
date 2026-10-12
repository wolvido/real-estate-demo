import { Link, type LinkProps } from 'react-router';
import styles from './Button.module.css';
export function LinkButton({ variant = 'primary', className = '', ...props }: LinkProps & { variant?: 'primary' | 'secondary' | 'text' }) { return <Link className={`${styles.button} ${styles[variant]} ${className}`} {...props} />; }
