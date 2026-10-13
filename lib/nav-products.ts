export interface NavProduct {
  id: string;
  name: string;
  description: string;
  tagline?: string;
  slug: string;
  emoji?: string;
  url?: string;
  status?: string;
}

// Products shown in the header dropdown. Empty hides the dropdown.
const NAV_PRODUCTS: NavProduct[] = [];

export function getNavProducts(): NavProduct[] {
  return NAV_PRODUCTS;
}
