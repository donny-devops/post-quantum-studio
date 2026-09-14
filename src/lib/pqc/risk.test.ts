import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { sampleAssets } from './sample-data.ts';
import { assessQuantumRisk, planMigrationWaves } from './risk.ts';

describe('assessQuantumRisk', () => {
  it('scores long-lived public classical assets as high or critical', () => {
    const assessment = assessQuantumRisk(sampleAssets[1]!);
    assert.match(assessment.band, /high|critical/);
    assert.ok(assessment.drivers.length > 0);
    assert.ok(assessment.recommendedAction.length > 10);
  });

  it('keeps hybrid internal assets out of the critical band', () => {
    const assessment = assessQuantumRisk(
      sampleAssets.find((asset) => asset.id === 'asset-mesh')!
    );
    assert.equal(assessment.band, 'low');
  });
});

describe('planMigrationWaves', () => {
  it('places code-signing assets in the control-plane wave', () => {
    const waves = planMigrationWaves(sampleAssets);
    assert.ok(waves[0]?.assetIds.includes('asset-code-signing'));
    assert.ok(waves.length >= 2);
  });
});
