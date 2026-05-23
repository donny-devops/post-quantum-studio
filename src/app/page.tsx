import { ShieldCheck, TriangleAlert, Waves } from 'lucide-react';

import { sampleAssets } from '@/lib/pqc/sample-data';
import { assessQuantumRisk, planMigrationWaves } from '@/lib/pqc/risk';

const assessments = sampleAssets.map(assessQuantumRisk);
const waves = planMigrationWaves(sampleAssets);

export default function HomePage() {
  const criticalCount = assessments.filter((item) => item.band === 'critical').length;
  const highCount = assessments.filter((item) => item.band === 'high').length;

  return (
    <main className="min-h-screen bg-quantum-ink p-8 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-3xl border border-cyan-400/20 bg-quantum-panel p-8 shadow-glow">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
                <Waves size={14} />
                Post-Quantum Readiness
              </p>
              <h1 className="text-5xl font-black tracking-tight">Post-Quantum Studio</h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-300">
                Inventory classical cryptography exposure, prioritize migration waves, and stop pretending a spreadsheet is a crypto strategy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-red-500/20 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-red-300">
                  <TriangleAlert size={18} /> Critical
                </div>
                <div className="mt-2 text-4xl font-bold">{criticalCount}</div>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <ShieldCheck size={18} /> High
                </div>
                <div className="mt-2 text-4xl font-bold">{highCount}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl border border-white/10 bg-quantum-panel p-6">
            <h2 className="text-2xl font-bold">Asset Risk Register</h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Asset</th>
                    <th className="px-4 py-3">Algorithm</th>
                    <th className="px-4 py-3">Exposure</th>
                    <th className="px-4 py-3">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleAssets.map((asset) => {
                    const assessment = assessments.find((item) => item.assetId === asset.id)!;

                    return (
                      <tr key={asset.id} className="border-t border-white/5">
                        <td className="px-4 py-4">
                          <div className="font-semibold">{asset.name}</div>
                          <div className="text-xs text-slate-400">{asset.owner}</div>
                        </td>
                        <td className="px-4 py-4 uppercase">{asset.algorithm}</td>
                        <td className="px-4 py-4">{asset.exposure}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                              {assessment.band}
                            </span>
                            <span>{assessment.score}/100</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-quantum-panel p-6">
            <h2 className="text-2xl font-bold">Migration Waves</h2>

            <div className="mt-5 space-y-4">
              {waves.map((wave) => (
                <div key={wave.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="font-semibold text-cyan-200">{wave.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{wave.objective}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {wave.assetIds.length} scoped assets
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
