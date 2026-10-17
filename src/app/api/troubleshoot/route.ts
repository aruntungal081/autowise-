import { NextRequest, NextResponse } from 'next/server';
import { runAIDiagnostics } from '@/lib/providers/ai/client';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vehicleProfile, symptoms, onsetConditions, warningLights, obdCodes, recentRepairs, vehicleId } = body;

    if (!symptoms || symptoms.trim().length === 0) {
      return NextResponse.json({ error: 'Symptoms description is required.' }, { status: 400 });
    }

    const user = await getCurrentUser();

    // Run AI diagnostic reasoning engine with safety classifications
    const diagnostic = await runAIDiagnostics({
      vehicleProfile,
      symptoms,
      onsetConditions,
      warningLights,
      obdCodes,
      recentRepairs,
    });

    // Create diagnostic session in DB
    const session = await prisma.diagnosticSession.create({
      data: {
        vehicleInfo: vehicleProfile || 'Unspecified Vehicle',
        symptoms,
        onsetConditions: onsetConditions || null,
        warningLights: warningLights || null,
        obdCodes: obdCodes || null,
      },
    });

    // Save Diagnostic Report
    const report = await prisma.diagnosticReport.create({
      data: {
        userId: user?.id || null,
        vehicleId: vehicleId || null,
        sessionId: session.id,
        summary: diagnostic.summary,
        safetyLevel: diagnostic.safetyLevel,
        safetyWarning: diagnostic.safetyWarning,
        mostLikelyCauses: JSON.stringify(diagnostic.mostLikelyCauses),
        alternativeCauses: JSON.stringify(diagnostic.alternativeCauses),
        preliminaryChecks: JSON.stringify(diagnostic.preliminaryChecks),
        recommendedTests: JSON.stringify(diagnostic.recommendedTests),
        requiredTools: JSON.stringify(diagnostic.requiredTools),
        repairDifficulty: diagnostic.repairDifficulty,
        costEstimateMin: diagnostic.costEstimateMin,
        costEstimateMax: diagnostic.costEstimateMax,
        currency: diagnostic.currency,
        mechanicRecommended: diagnostic.mechanicRecommended,
        recommendedParts: JSON.stringify(diagnostic.recommendedParts),
        referenceLinks: JSON.stringify(diagnostic.referenceLinks),
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.id,
      diagnostic,
    });
  } catch (error: any) {
    console.error('Troubleshoot API error:', error);
    return NextResponse.json({ error: error.message || 'Troubleshooting failed' }, { status: 500 });
  }
}
