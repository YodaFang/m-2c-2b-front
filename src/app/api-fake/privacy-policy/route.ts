import { NextResponse } from 'next/server';
import { privacyPolicyData } from '@/db/privacyPolicyData';

export async function GET() {
  try {
    return NextResponse.json(privacyPolicyData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch privacy policy', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
