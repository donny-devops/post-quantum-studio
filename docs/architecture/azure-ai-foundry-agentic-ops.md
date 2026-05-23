# Azure AI Foundry Agentic Ops Architecture

## Executive intent

Post-Quantum Studio uses Azure AI Foundry as the enterprise AI control plane for agent lifecycle management, evaluation, secure tool access, governance, and operational telemetry.

The studio is designed around a hard separation between:

- **Planning UI:** user-facing readiness dashboard and migration cockpit.
- **Agent runtime:** supervised agent workflows for inventory enrichment, risk scoring, policy review, and migration planning.
- **Tool plane:** MCP servers, cloud APIs, repository scanners, package scanners, and QDK simulation jobs.
- **Governance plane:** policy-as-code, RBAC, evaluation gates, audit trails, and human approvals.

## Foundry lanes

| Lane | Responsibility | Guardrail |
|---|---|---|
| Model catalog | Approved model deployment and version selection | Use approved deployment names only |
| Agent service | Agent orchestration, tool routing, state, and evals | Human approval required for write tools |
| AI gateway | Centralized routing, throttling, telemetry, and policy | No direct model calls from app code |
| Evaluations | Prompt, safety, grounding, and regression checks | PR blocks on failed eval baselines |
| Observability | Traces, token usage, latency, tool calls, failure modes | Correlate agent run IDs with GitHub run IDs |
| Networking | Private endpoints and controlled egress | Deny-by-default outbound policy |

## Agent portfolio

| Agent | Purpose | Tools | Default mode |
|---|---|---|---|
| Crypto Inventory Agent | Extract and normalize cryptographic assets from repos, SBOMs, cert stores, and docs | GitHub, SBOM, certificate scanner, MCP filesystem | Read-only |
| PQC Risk Agent | Score quantum risk and recommend migration wave placement | Risk model, policy engine, asset database | Read-only |
| Migration Planner Agent | Draft migration plans, tickets, and control mappings | GitHub issues, Linear/Jira, docs | Approval required |
| Secure Infra Agent | Review IaC, cloud posture, secrets, and dependency exposure | OPA, IaC scanner, secret scanner, cloud inventory | Read-only by default |
| QDK Research Agent | Run Q# / QDK simulations and summarize resource implications | QDK runner, Azure Quantum workspace adapter | Sandboxed |

## A2A and MCP communication model

- Agents communicate through typed task envelopes, not free-form privileged prompts.
- MCP servers expose narrow tools with explicit scopes.
- A2A messages carry correlation IDs, requesting principal, task purpose, expiration, and allowed actions.
- Write-capable tools require policy checks plus human approval.
- Agent outputs are treated as recommendations unless promoted by an explicit workflow state change.

## Minimum production controls

1. Managed identity for Azure-hosted components.
2. Key Vault for secrets and connection strings.
3. Private endpoints for Foundry, storage, database, and monitoring sinks where supported.
4. Central policy evaluation before tool invocation.
5. Signed SBOM generation for release artifacts.
6. Audit retention for agent prompts, tool calls, model versions, and approval decisions.
7. Model/version pinning for reproducible evaluation.
8. Separate dev/test/prod Foundry projects.

## Non-negotiables

- No cloud secret in repository variables, source files, notebooks, screenshots, or workflow logs.
- No agent gets direct production write access without a bounded approval workflow.
- No unreviewed model upgrade in production.
- No MCP server without auth, rate limits, structured logs, and an explicit tool allowlist.
