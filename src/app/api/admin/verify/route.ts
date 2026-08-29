import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const serverKey = (process.env.ADMIN_SECRET_KEY || 'admin123').trim();

    if (pin && String(pin).trim() === serverKey) {
      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json({ success: false, message: 'Invalid Admin Secret Key / PIN' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
  }
}
