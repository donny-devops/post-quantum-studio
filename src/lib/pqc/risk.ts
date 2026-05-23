import type { CryptoAsset, MigrationWave, RiskAssessment, RiskBand } from './model';

const classicalAlgorithms = new Set(['rsa', 'ecc']);

function bandForScore(score: number): RiskBand {
  if (score >= 85) return 'critical';
  if (score >= 65) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

export function assessQuantumRisk(asset: CryptoAsset): RiskAssessment {
  const drivers: string[] = [];
  let score = 0;

  if (classicalAlgorithms.has(asset.algorithm)) {
    score += 30;
    drivers.push('classical public-key algorithm');
  }

  if (asset.dataShelfLifeYears >= 10) {
    score += 25;
    drivers.push('long-lived confidentiality requirement');
  } else if (asset.dataShelfLifeYears >= 5) {
    score += 15;
    drivers.push('medium-term confidentiality requirement');
  }

  if (asset.exposure === 'public-internet') {
    score += 20;
    drivers.push('public internet exposure');
  } else if (asset.exposure === 'partner') {
    score += 12;
    drivers.push('partner-facing exposure');
  }

  if (asset.rotationDays > 365) {
    score += 15;
    drivers.push('slow key or certificate rotation');
  }

  if (!asset.vendorReady) {
    score += 10;
    drivers.push('vendor readiness gap');
  }

  if (asset.compensatingControls.length >= 2) {
    score -= 10;
    drivers.push('compensating controls present');
  }

  const normalizedScore = Math.max(0, Math.min(100, score));
  const band = bandForScore(normalizedScore);

  return {
    assetId: asset.id,
    score: normalizedScore,
    band,
    drivers,
    recommendedAction:
      band === 'critical'
        ? 'Prioritize for hybrid/PQC pilot immediately and assign an accountable migration owner.'
        : band === 'high'
          ? 'Place into the next migration wave and validate protocol/library support.'
          : band === 'medium'
            ? 'Track vendor readiness and reduce rotation intervals.'
            : 'Monitor during normal cryptographic lifecycle management.'
  };
}

export function planMigrationWaves(assets: CryptoAsset[]): MigrationWave[] {
  const assessments = new Map(assets.map((asset) => [asset.id, assessQuantumRisk(asset)]));

  const byBand = (bands: RiskBand[]) =>
    assets.filter((asset) => bands.includes(assessments.get(asset.id)?.band ?? 'low')).map((asset) => asset.id);

  return [
    {
      name: 'Wave 0 — Control Plane',
      objective: 'Lock down inventory, ownership, test harnesses, and rollback lanes.',
      assetIds: assets.filter((asset) => ['kms', 'code-signing'].includes(asset.protocol)).map((asset) => asset.id),
      exitCriteria: ['asset owner assigned', 'rotation workflow documented', 'fallback procedure tested']
    },
    {
      name: 'Wave 1 — Critical Exposure',
      objective: 'Pilot hybrid or PQC-ready paths for the highest-risk externally exposed assets.',
      assetIds: byBand(['critical', 'high']),
      exitCriteria: ['hybrid design approved', 'latency budget measured', 'vendor support verified']
    },
    {
      name: 'Wave 2 — Platform Scale-Out',
      objective: 'Expand migration patterns across shared services and internal platforms.',
      assetIds: byBand(['medium']),
      exitCriteria: ['runbooks published', 'CI policy checks enabled', 'observability dashboards updated']
    }
  ];
}
