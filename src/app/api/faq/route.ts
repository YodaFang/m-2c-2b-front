import { NextResponse } from 'next/server';
import { faqData } from '@/db/faqData';

export async function GET() {
  try {
    return NextResponse.json(faqData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FAQ', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
