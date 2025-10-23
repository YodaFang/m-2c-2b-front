import { testimonialData } from '@/db/testimonialsData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(testimonialData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
