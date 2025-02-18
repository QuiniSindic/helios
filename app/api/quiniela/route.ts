import { getQuinielaData } from '@/services/quiniela.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const quinielaData = await getQuinielaData();

    if (Array.isArray(quinielaData) && quinielaData.length === 0) {
      return NextResponse.json({ quinielaData: [] }, { status: 200 });
    }

    return NextResponse.json({ quinielaData }, { status: 200 });
  } catch (error) {
    console.log('error =>', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
