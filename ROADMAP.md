# Roadmap

## North Star

Post-Quantum Studio becomes a secure, agentic operations cockpit for post-quantum migration planning, crypto inventory, Azure AI Foundry governed agents, QDK research workflows, and enterprise-grade secure delivery.

## Phase 0 — Repository Foundation

Status: in progress

- Next.js application scaffold
- TypeScript strict mode
- PQC asset model and risk scoring engine
- Sample crypto asset inventory
- CI workflow for lint, typecheck, test, build, audit, SBOM, and license checks
- Dedicated security workflow for secret scanning, CodeQL, and OpenSSF Scorecard
- Policy workflow for OPA/Conftest checks
- PR template, CODEOWNERS, Dependabot, and operating docs

## Phase 1 — Secure SDLC Control Plane

- Branch protection with required checks
- Required signed commits or verified authorship policy
- Release workflow with immutable artifacts
- SBOM publishing and attestation
- License approval workflow
- Vulnerability triage SLA matrix
- Security issue templates
- Environment protection rules for staging, production, and Azure Quantum

## Phase 2 — Azure AI Foundry Agentic Ops

- Agent registry and lifecycle docs
- Azure AI Foundry project wiring through managed identity
- Evaluation baselines for agent outputs
- AI gateway routing and observability model
- Prompt/version governance
- Tool invocation approval gates
- Agent run correlation with GitHub Actions and issue IDs

## Phase 3 — MCP and A2A Platform

- MCP server contracts for crypto inventory, SBOM, GitHub, QDK, and policy tools
- A2A task envelope schema
- Tool allowlist and deny-by-default authorization
- Agent-to-agent audit logs
- Human approval workflow for write-capable tools
- Replay-safe idempotency keys for task execution

## Phase 4 — QDK Research Lab

- QDK sample workspace
- Local simulator experiment manifests
- Azure Quantum environment approval model
- Quantum threat-model narratives for executives and engineers
- Resource-estimation runbooks
- Research artifact publishing workflow

## Phase 5 — Production-Grade PQC Readiness Platform

- Real asset ingestion connectors
- Certificate and TLS scanner integrations
- SBOM crypto usage detection
- Vendor readiness tracking
- Migration wave planning UI
- Executive reporting exports
- Evidence pack generation for audit and compliance

## Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-23 | Use Azure AI Foundry as AI governance control plane | Centralizes agents, model governance, evaluations, tool access, and observability |
| 2026-05-23 | Use QDK as sandboxed research lane | Keeps quantum simulation isolated from production application code |
| 2026-05-23 | Use policy-as-code and scan-first CI | Makes security controls executable rather than ceremonial |
