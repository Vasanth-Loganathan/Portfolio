import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const RESUME_FILENAME = 'Vasanth_Loganathan_Resume.pdf';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        // "attachment" forces a Save-As download with the exact filename below
        'Content-Disposition': `attachment; filename="${RESUME_FILENAME}"`,
        'Content-Length': String(fileBuffer.byteLength),
      },
    });
  } catch {
    return new NextResponse('Resume not found. Add resume.pdf to /public/', {
      status: 404,
    });
  }
}
