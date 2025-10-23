import { products } from '@/db/products';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch featured products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
