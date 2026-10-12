import { Navigate, Route, Routes } from 'react-router';
import { PublicLayout } from './PublicLayout';
import { HomePage } from '../pages/HomePage';
import { PropertyDetailsPage } from '../pages/PropertyDetailsPage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AdminLayout } from './AdminLayout';
import { AdminEntryPage } from '../pages/AdminEntryPage';
import { AdminPropertiesPage } from '../pages/AdminPropertiesPage';
import { PropertyEditorPage } from '../pages/PropertyEditorPage';
import { AdminInquiriesPage } from '../pages/AdminInquiriesPage';
export function AppRoutes() {
  return <Routes><Route element={<PublicLayout />}><Route index element={<HomePage />} /><Route path="properties" element={<Navigate to="/#properties" replace />} /><Route path="properties/:slug" element={<PropertyDetailsPage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="contact" element={<ContactPage />} /><Route path="privacy" element={<PrivacyPage />} /><Route path="*" element={<NotFoundPage />} /></Route><Route path="admin" element={<AdminEntryPage />} /><Route path="admin" element={<AdminLayout />}><Route path="properties" element={<AdminPropertiesPage />} /><Route path="properties/new" element={<PropertyEditorPage />} /><Route path="properties/:id/edit" element={<PropertyEditorPage />} /><Route path="inquiries" element={<AdminInquiriesPage />} /></Route></Routes>;
}
