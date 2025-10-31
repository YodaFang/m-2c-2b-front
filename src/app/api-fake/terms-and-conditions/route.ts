import { NextResponse } from 'next/server';
import { termsAndConditionsData } from '@/db/termsAndConditionsData';

export async function GET() {
  try {
    return NextResponse.json(termsAndConditionsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch terms and conditions', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
