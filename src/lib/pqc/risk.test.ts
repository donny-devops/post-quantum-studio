import { describe, expect, it } from 'vitest';

import type { CryptoAsset } from './model';
import { assessQuantumRisk, planMigrationWaves } from './risk';

const baseAsset: CryptoAsset = {
  id: 'asset-test',
  name: 'Test Asset',
  owner: 'Security Engineering',
  environment: 'production',
  algorithm: 'rsa',
  keySize: 3072,
  protocol: 'tls',
  dataShelfLifeYears: 10,
  exposure: 'public-internet',
  rotationDays: 730,
  vendorReady: false,
  compensatingControls: []
};

describe('assessQuantumRisk', () => {
  it('classifies exposed long-lived classical crypto as critical', () => {
    const result = assessQuantumRisk(baseAsset);

    expect(result.band).toBe('critical');
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.drivers).toContain('classical public-key algorithm');
  });

  it('reduces risk when compensating controls are present', () => {
    const result = assessQuantumRisk({
      ...baseAsset,
      compensatingControls: ['HSM-backed keys', 'automated rotation']
    });

    expect(result.score).toBeLessThan(100);
  });
});

describe('planMigrationWaves', () => {
  it('places high-risk assets into critical exposure wave', () => {
    const waves = planMigrationWaves([baseAsset]);
    const criticalWave = waves.find((wave) => wave.name.includes('Wave 1'));

    expect(criticalWave?.assetIds).toContain(baseAsset.id);
  });
});
