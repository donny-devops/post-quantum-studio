# Quantum Development Kit Research Lab

## Purpose

The QDK lane gives Post-Quantum Studio a controlled research surface for quantum algorithm education, resource-estimation experiments, and PQC migration storytelling.

It is not intended to break real cryptography. It is intended to help teams reason about quantum threat models and explain why migration planning cannot wait for a future panic budget.

## Scope

- Q# samples for quantum concepts relevant to cryptographic threat modeling.
- Local simulator-first experiments.
- Optional Azure Quantum integration through approved credentials and managed identity.
- Resource-estimation notes for executive and architecture audiences.
- Agent-readable experiment manifests for repeatable runs.

## Repository layout

```text
qdk/
  README.md
  qsharp.json
  src/
    EntanglementDemo.qs
    QuantumRandomness.qs
  experiments/
    pqc-threat-model.json
```

## Operating model

1. Keep QDK experiments sandboxed from production application code.
2. Treat all cloud execution as cost-bearing and approval-gated.
3. Commit experiment manifests; never commit cloud credentials or generated secrets.
4. Require a human-reviewed issue or PR before adding external quantum targets.
5. Capture run metadata: QDK version, simulator/backend, parameters, cost center, run ID, and author.

## Azure Quantum integration posture

- Use Azure CLI or federated workload identity from CI.
- Store workspace identifiers as non-secret configuration.
- Store credentials only in cloud identity providers or GitHub environment secrets.
- Route long-running jobs through an approval-protected environment.
- Export artifacts as immutable build outputs.

## Agent handoff contract

The QDK Research Agent can request an experiment by producing a JSON task envelope:

```json
{
  "taskType": "qdk.experiment.request",
  "experimentId": "pqc-threat-model-v1",
  "requestedBy": "agent:qdk-research",
  "approvalRequired": true,
  "parameters": {
    "simulator": "local",
    "shots": 100
  }
}
```

Any cloud-backed task must be rejected unless the policy engine confirms an approval context.
