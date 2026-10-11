import { useState } from 'react';
import type { InquiryInput, Property } from '../../data/types';
import { useDemo } from '../../app/DemoProvider';
import { Button } from '../../components/ui/Button';
import { Field, TextArea, TextInput } from '../../components/ui/Field';
import { Icon } from '../../components/ui/Icon';
import { validateInquiry } from './validateInquiry';
import styles from './InquiryForm.module.css';

export function InquiryForm({ property, onDone }: { property: Property | null; onDone: () => void }) {
  const [input, setInput] = useState<InquiryInput>({ name: '', email: '', phone: '', message: property ? `I'd like to know more about ${property.title}.` : '' });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryInput, string>>>({});
  const [saved, setSaved] = useState<{ remembered: boolean } | null>(null);
  const { saveInquiry } = useDemo();
  if (saved) return <div className={styles.success} role="status"><Icon name="check" size={32} /><h3>Demo inquiry added</h3><p>{saved.remembered ? 'Saved on this device.' : 'Saved for this visit; it will reset when the page reloads.'} No message was sent.</p><p>Thank you for trying the inquiry flow.</p><Button onClick={onDone}>Back to browsing <Icon name="arrow" size={17} /></Button></div>;
  function change(key: keyof InquiryInput, value: string) { setInput({ ...input, [key]: value }); if (errors[key]) setErrors({ ...errors, [key]: undefined }); }
  return <form className={styles.form} noValidate onSubmit={(event) => {
    event.preventDefault();
    const nextErrors = validateInquiry(input);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSaved(saveInquiry(input, property?.id ?? null));
  }}>
    <p className={styles.intro}>{property ? <><strong>{property.title}</strong><br />Property reference: {property.id}</> : 'Tell us what you are looking for or ask a question.'}</p>
    <p className={styles.demoNote}>Client demo · Use sample contact details. Your message stays in this browser.</p>
    <Field id="inquiry-name" label="Name" error={errors.name}><TextInput id="inquiry-name" autoComplete="off" value={input.name} onChange={(event) => change('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'inquiry-name-error' : undefined} /></Field>
    <div className={styles.contactFields}>
      <Field id="inquiry-email" label="Email" error={errors.email}><TextInput id="inquiry-email" type="email" autoComplete="off" placeholder="sample@example.com" value={input.email} onChange={(event) => change('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'inquiry-email-error' : 'inquiry-contact-hint'} /></Field>
      <Field id="inquiry-phone" label="Phone (optional)"><TextInput id="inquiry-phone" type="tel" autoComplete="off" value={input.phone} onChange={(event) => change('phone', event.target.value)} aria-describedby="inquiry-contact-hint" /></Field>
    </div>
    <p className={styles.hint} id="inquiry-contact-hint">Include at least one contact method: email or phone.</p>
    <Field id="inquiry-message" label="Message" error={errors.message}><TextArea id="inquiry-message" rows={4} value={input.message} onChange={(event) => change('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'inquiry-message-error' : undefined} /></Field>
    <div className={styles.actions}><Button type="submit">Submit demo inquiry <Icon name="arrow" size={17} /></Button><span>No email will be sent.</span></div>
  </form>;
}
