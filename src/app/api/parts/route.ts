import { NextRequest, NextResponse } from 'next/server';
import { searchPartsCatalog, verifyPartCompatibility } from '@/lib/providers/parts/partsCatalog';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const vehicleId = searchParams.get('vehicleId') || undefined;
    const partId = searchParams.get('partId') || undefined;

    if (partId && vehicleId) {
      const compatibility = await verifyPartCompatibility(partId, vehicleId);
      return NextResponse.json({ success: true, compatibility });
    }

    const parts = await searchPartsCatalog(query, vehicleId);
    return NextResponse.json({ success: true, parts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to search parts' }, { status: 500 });
  }
}
