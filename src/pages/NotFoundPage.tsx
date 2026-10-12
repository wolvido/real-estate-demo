import { LinkButton } from '../components/ui/LinkButton';
export function NotFoundPage() { return <main id="main" className="page-container empty-state"><h1>This page isn’t available.</h1><p>The listing may be unpublished, archived, or no longer available at this address.</p><LinkButton to="/#properties">Browse properties</LinkButton></main>; }
