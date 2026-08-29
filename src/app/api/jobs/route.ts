import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllJobsAdmin, createJob } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const jobs = getAllJobsAdmin();
  return NextResponse.json({ success: true, jobs }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-key');
    const serverKey = (process.env.ADMIN_SECRET_KEY || 'admin123').trim();

    if (!authHeader || authHeader.trim() !== serverKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.title || !body.company || !body.applyUrl) {
      return NextResponse.json(
        { success: false, message: 'Title, Company, and Apply URL are required fields' },
        { status: 400 }
      );
    }

    const created = createJob({
      title: body.title,
      slug: body.slug,
      company: body.company,
      companyLogo: body.companyLogo || '',
      companyWebsite: body.companyWebsite || '',
      roleCategory: body.roleCategory || 'Software Development',
      jobType: body.jobType || 'Full Time',
      location: body.location || 'Bangalore / Remote',
      experience: body.experience || 'Freshers (0-1 yrs)',
      batches: body.batches && body.batches.length > 0 ? body.batches : ['2025 Batch', '2026 Batch', 'Freshers'],
      qualifications: body.qualifications || ['BE / B.Tech', 'BCA / MCA', 'Any Graduate'],
      salary: body.salary || 'Best in Industry',
      applyUrl: body.applyUrl,
      deadline: body.deadline || 'Hiring Urgently',
      isFeatured: Boolean(body.isFeatured),
      isUrgent: Boolean(body.isUrgent),
      overview: body.overview || `${body.company} is hiring for ${body.title}. Read full details and apply online.`,
      descriptionHtml: body.descriptionHtml || `<p>${body.company} has announced new off-campus recruitment opportunities for freshers and experienced candidates.</p>`,
      tags: body.tags || [body.company, 'Freshers', 'Off Campus'],
      status: body.status || 'active',
    });

    // Invalidate caches across the site
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      revalidatePath('/jobs', 'page');
      revalidatePath(`/job/${created.slug}`, 'page');
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, job: created }, { status: 201 });
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
