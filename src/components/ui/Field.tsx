import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import styles from './Field.module.css';

export function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return <div className={styles.field}><label htmlFor={id} className={styles.label}>{label}</label>{children}{hint && <p id={`${id}-hint`} className={styles.hint}>{hint}</p>}{error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}</div>;
}

export function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={`${styles.control} ${className}`} {...props} />; }
export function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) { return <select className={`${styles.control} ${className}`} {...props} />; }
export function TextArea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={`${styles.control} ${styles.textarea} ${className}`} {...props} />; }
