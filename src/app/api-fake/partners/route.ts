import { NextResponse } from 'next/server';
import { partnerData } from '@/db/partnerData';

export async function GET() {
  try {
    return NextResponse.json(partnerData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partners', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
