import { prisma } from '../../db';

export interface PartSearchResult {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  description: string | null;
  oemNumber: string | null;
  oemBrand: string | null;
  imageUrl: string | null;
  compatibilities: Array<{
    vehicleMake: string;
    vehicleModel: string;
    variant: string | null;
    confidence: number;
    evidenceSource: string;
    notes: string | null;
  }>;
  priceSummary?: {
    lowestPrice: number;
    highestPrice: number;
    retailersCount: number;
    currency: string;
  };
}

export async function searchPartsCatalog(query: string, vehicleId?: string): Promise<PartSearchResult[]> {
  const cleanQuery = query.trim().toLowerCase();

  const parts = await prisma.sparePart.findMany({
    where: {
      OR: [
        { partNumber: { contains: cleanQuery } },
        { name: { contains: cleanQuery } },
        { category: { contains: cleanQuery } },
        { oemNumber: { contains: cleanQuery } },
        { description: { contains: cleanQuery } },
      ],
    },
    include: {
      compatibilities: {
        include: { vehicle: true },
      },
      retailerListings: true,
    },
  });

  return parts.map((p) => {
    const prices = p.retailerListings.map((l) => l.totalCost);
    const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const highestPrice = prices.length > 0 ? Math.max(...prices) : 0;

    return {
      id: p.id,
      partNumber: p.partNumber,
      name: p.name,
      category: p.category,
      description: p.description,
      oemNumber: p.oemNumber,
      oemBrand: p.oemBrand,
      imageUrl: p.imageUrl,
      compatibilities: p.compatibilities.map((c) => ({
        vehicleMake: c.vehicle.make,
        vehicleModel: c.vehicle.model,
        variant: c.vehicle.variant,
        confidence: c.confidence,
        evidenceSource: c.evidenceSource,
        notes: c.notes,
      })),
      priceSummary: {
        lowestPrice,
        highestPrice,
        retailersCount: p.retailerListings.length,
        currency: 'INR',
      },
    };
  });
}

// Strict Compatibility Validation Rule:
// "Never label a part as compatible based only on visual similarity. Require suitable catalog data, matching part numbers, or other reliable evidence."
export async function verifyPartCompatibility(partId: string, vehicleId: string) {
  const record = await prisma.partCompatibility.findUnique({
    where: {
      partId_vehicleId: {
        partId,
        vehicleId,
      },
    },
    include: {
      part: true,
      vehicle: true,
    },
  });

  if (record) {
    return {
      isCompatible: true,
      confidence: record.confidence,
      evidenceSource: record.evidenceSource,
      notes: record.notes,
      warning: null,
    };
  }

  return {
    isCompatible: false,
    confidence: 0.0,
    evidenceSource: 'Catalog Check',
    notes: 'No verified OEM cross-reference or fitment record found for this vehicle model.',
    warning: 'Compatibility unverified. Do not purchase or install based on appearance alone without matching part numbers.',
  };
}
