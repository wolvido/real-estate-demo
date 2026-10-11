export type Offering = 'sale' | 'rent';
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type Publication = 'draft' | 'published' | 'archived';

export interface Property {
  id: string;
  title: string;
  slug: string;
  offering: Offering;
  type: PropertyType;
  category: string;
  location: string;
  price: number | null;
  currency: 'USD';
  beds: number | null;
  baths: number | null;
  area: number;
  areaUnit: 'sq ft';
  image: string;
  description: string;
  publication: Publication;
  availability: 'available' | 'sold' | 'rented';
  featured: boolean;
  updatedAt: string;
}

export interface PropertyFilters {
  offering: Offering | 'all';
  location: string;
  type: PropertyType | 'all';
  minPrice: number | null;
  maxPrice: number | null;
  includePriceOnRequest: boolean;
}

export interface InquiryInput { name: string; email: string; phone: string; message: string; }
export interface Inquiry extends InquiryInput {
  id: string;
  propertyId: string | null;
  createdAt: string;
  status: 'new' | 'handled';
}
