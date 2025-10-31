import { NextResponse } from 'next/server';
import { categoriesOneData } from '@/db/categoriesData';

export async function GET() {
  try {
    return NextResponse.json(categoriesOneData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
