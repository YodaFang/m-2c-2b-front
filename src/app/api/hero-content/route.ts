import { NextResponse } from 'next/server';
import { heroData } from '@/db/heroData';

export async function GET() {
  try {
    return NextResponse.json(heroData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hero content', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
