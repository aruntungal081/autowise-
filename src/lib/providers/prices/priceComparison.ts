import { prisma } from '../../db';

export interface ComparisonListing {
  id: string;
  retailerName: string;
  retailerUrl: string;
  productTitle: string;
  price: number;
  shippingCost: number;
  totalCost: number;
  currency: string;
  condition: string; // 'genuine' | 'aftermarket' | 'refurbished' | 'used'
  inStock: boolean;
  deliveryEstimate: string | null;
  warrantyMonths: number | null;
  sellerName: string | null;
  sellerRating: number | null;
  lastChecked: Date;
  sourceAttribution: string;
  isVerifiedCompatible: boolean;
  compatibilityEvidence?: string;
}

export interface ComparisonFilter {
  sortBy?: 'lowest_cost' | 'best_compatibility' | 'seller_rating' | 'delivery_speed';
  condition?: 'all' | 'genuine' | 'aftermarket';
  retailer?: string;
  maxPrice?: number;
}

export async function getPriceComparisonsForPart(
  partNumberOrId: string,
  vehicleId?: string,
  filter?: ComparisonFilter
): Promise<{
  part: any;
  listings: ComparisonListing[];
  unavailableSources: Array<{ name: string; reason: string; directSearchUrl: string }>;
}> {
  // Find part in database
  const part = await prisma.sparePart.findFirst({
    where: {
      OR: [
        { id: partNumberOrId },
        { partNumber: partNumberOrId },
      ],
    },
    include: {
      retailerListings: true,
      compatibilities: {
        include: { vehicle: true },
      },
    },
  });

  if (!part) {
    return {
      part: null,
      listings: [],
      unavailableSources: [
        {
          name: 'Boodmo India',
          reason: 'No local catalog entry. You can search directly on Boodmo:',
          directSearchUrl: `https://boodmo.com/search/${encodeURIComponent(partNumberOrId)}/`,
        },
        {
          name: 'Amazon India',
          reason: 'Direct product search available:',
          directSearchUrl: `https://www.amazon.in/s?k=${encodeURIComponent(partNumberOrId)}&i=automotive`,
        },
      ],
    };
  }

  // Check if compatible with specific vehicle
  let isVehicleCompatible = true;
  let compEvidence = 'Direct verified part listing';

  if (vehicleId) {
    const comp = part.compatibilities.find((c) => c.vehicleId === vehicleId);
    if (!comp) {
      isVehicleCompatible = false;
      compEvidence = 'Warning: Vehicle fitment unverified in catalog';
    } else {
      compEvidence = comp.evidenceSource;
    }
  }

  // Map listings
  let listings: ComparisonListing[] = part.retailerListings.map((l) => ({
    id: l.id,
    retailerName: l.retailerName,
    retailerUrl: l.retailerUrl,
    productTitle: l.productTitle,
    price: l.price,
    shippingCost: l.shippingCost,
    totalCost: l.totalCost,
    currency: l.currency,
    condition: l.condition,
    inStock: l.inStock,
    deliveryEstimate: l.deliveryEstimate,
    warrantyMonths: l.warrantyMonths,
    sellerName: l.sellerName,
    sellerRating: l.sellerRating,
    lastChecked: l.lastChecked,
    sourceAttribution: l.sourceAttribution,
    isVerifiedCompatible: isVehicleCompatible,
    compatibilityEvidence: compEvidence,
  }));

  // Apply filters
  if (filter?.condition && filter.condition !== 'all') {
    listings = listings.filter((l) => l.condition === filter.condition);
  }

  if (filter?.retailer && filter.retailer !== 'all') {
    listings = listings.filter((l) => l.retailerName.toLowerCase().includes(filter.retailer!.toLowerCase()));
  }

  if (filter?.maxPrice) {
    listings = listings.filter((l) => l.totalCost <= filter.maxPrice!);
  }

  // Sorting
  const sortBy = filter?.sortBy || 'lowest_cost';
  listings.sort((a, b) => {
    if (sortBy === 'lowest_cost') {
      return a.totalCost - b.totalCost;
    }
    if (sortBy === 'seller_rating') {
      return (b.sellerRating || 0) - (a.sellerRating || 0);
    }
    if (sortBy === 'best_compatibility') {
      return (b.isVerifiedCompatible ? 1 : 0) - (a.isVerifiedCompatible ? 1 : 0);
    }
    return 0;
  });

  // Check for external unavailable sources
  const unavailableSources = [];
  if (!process.env.EBAY_CLIENT_ID) {
    unavailableSources.push({
      name: 'eBay Browse Live API',
      reason: 'Requires EBAY_CLIENT_ID and EBAY_CLIENT_SECRET credentials in .env',
      directSearchUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(part.partNumber)}`,
    });
  }
  if (!process.env.AMAZON_PAAPI_ACCESS_KEY) {
    unavailableSources.push({
      name: 'Amazon PA-API v5 Direct Feed',
      reason: 'Live PA-API credentials not configured; showing verified Amazon merchant records or direct search:',
      directSearchUrl: `https://www.amazon.in/s?k=${encodeURIComponent(part.partNumber)}&i=automotive`,
    });
  }

  return {
    part,
    listings,
    unavailableSources,
  };
}
