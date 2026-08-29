import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const serverKey = process.env.ADMIN_SECRET_KEY || 'admin123';

    if (pin && pin === serverKey) {
      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json({ success: false, message: 'Invalid Admin Secret Key / PIN' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
  }
}
