import { NextRequest, NextResponse } from 'next/server';
import { validateUploadedFile, extractRepresentativeFrames } from '@/lib/providers/media/processor';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const purpose = (formData.get('purpose') as string) || 'vehicle_id';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validation = validateUploadedFile({
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Save record to DB
    const extractedFrames = validation.fileType === 'video'
      ? JSON.stringify(extractRepresentativeFrames(file.name))
      : null;

    const media = await prisma.mediaUpload.create({
      data: {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileUrl: `/uploads/${Date.now()}_${file.name}`,
        purpose,
        extractedFrames,
      },
    });

    return NextResponse.json({
      success: true,
      mediaId: media.id,
      fileName: file.name,
      fileType: validation.fileType,
      extractedFrames: extractedFrames ? JSON.parse(extractedFrames) : null,
      message: `${validation.fileType.toUpperCase()} uploaded and validated successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload processing failed' }, { status: 500 });
  }
}
