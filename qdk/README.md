# QDK Workspace

This folder contains sandboxed Q# experiments for quantum concepts, resource-estimation planning, and PQC migration education.

## Requirements

- Microsoft Quantum Development Kit
- Q# support in VS Code or compatible CLI tooling
- Local simulator for default execution
- Azure Quantum workspace only when explicitly approved

## Guardrails

- No credentials in this folder.
- No production workloads in QDK experiments.
- No cloud quantum execution without a reviewed issue, budget owner, and approval.
- Experiment manifests must be deterministic and reviewable.

## Experiments

- `src/QuantumRandomness.qs` — minimal randomness demo.
- `src/EntanglementDemo.qs` — Bell-state style entanglement demonstration.
- `experiments/pqc-threat-model.json` — agent-readable research manifest.
