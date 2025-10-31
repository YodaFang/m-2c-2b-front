import { galleryDataOne } from '@/db/galleryData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(galleryDataOne);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
