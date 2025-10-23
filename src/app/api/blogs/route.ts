import { blogData } from '@/db/blogData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(blogData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
