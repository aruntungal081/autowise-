import { NextRequest, NextResponse } from 'next/server';
import { getPriceComparisonsForPart } from '@/lib/providers/prices/priceComparison';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const partNumber = searchParams.get('partNumber') || searchParams.get('partId') || '';
    const vehicleId = searchParams.get('vehicleId') || undefined;
    const sortBy = (searchParams.get('sortBy') as any) || 'lowest_cost';
    const condition = (searchParams.get('condition') as any) || 'all';
    const retailer = searchParams.get('retailer') || undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

    if (!partNumber) {
      return NextResponse.json({ error: 'Part number or ID is required.' }, { status: 400 });
    }

    const result = await getPriceComparisonsForPart(partNumber, vehicleId, {
      sortBy,
      condition,
      retailer,
      maxPrice,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Price comparison error:', error);
    return NextResponse.json({ error: error.message || 'Price comparison failed' }, { status: 500 });
  }
}
