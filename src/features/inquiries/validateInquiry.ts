import type { InquiryInput } from '../../data/types';

export function validateInquiry(input: InquiryInput): Partial<Record<keyof InquiryInput, string>> {
  const errors: Partial<Record<keyof InquiryInput, string>> = {};
  if (!input.name.trim()) errors.name = 'Please enter a name.';
  if (!input.email.trim() && !input.phone.trim()) errors.email = 'Please enter an email address or phone number.';
  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!input.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}
