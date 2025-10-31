import { NextResponse } from 'next/server';
import { adsData } from '@/db/adsData';

export async function GET() {
  try {
    return NextResponse.json(adsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ads', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
