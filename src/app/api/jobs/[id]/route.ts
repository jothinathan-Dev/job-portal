import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateJob, deleteJob } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('x-admin-key');
    const serverKey = process.env.ADMIN_SECRET_KEY || 'admin123';

    if (authHeader !== serverKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updated = updateJob(params.id, body);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      revalidatePath('/jobs', 'page');
      revalidatePath(`/job/${updated.slug}`, 'page');
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error('Job update error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('x-admin-key');
    const serverKey = process.env.ADMIN_SECRET_KEY || 'admin123';

    if (authHeader !== serverKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const deleted = deleteJob(params.id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Job not found or already deleted' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      revalidatePath('/jobs', 'page');
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Job deletion error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
