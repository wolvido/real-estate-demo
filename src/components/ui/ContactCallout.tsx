import { Icon } from './Icon';
import { LinkButton } from './LinkButton';
export function ContactCallout() { return <div className="contact-callout"><div><Icon name="support" size={28} /><div><h3>Let’s talk about your next move.</h3><p>Tell us what you are looking for. Our team can help you with your search.</p></div></div><LinkButton to="/contact">Ask our team →</LinkButton></div>; }
