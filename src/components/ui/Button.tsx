import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export function Button({ variant = 'primary', size = 'normal', className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'text'; size?: 'normal' | 'small' }) {
  return <button type={type} className={`${styles.button} ${styles[variant]} ${size === 'small' ? styles.small : ''} ${className}`} {...props} />;
}
