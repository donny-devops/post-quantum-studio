# Solution Architecture

## Overview

Post-Quantum Studio is a secure, agentic operations platform for post-quantum cryptography migration readiness. It combines a planning dashboard, policy-as-code, Azure AI Foundry governed agents, MCP tool contracts, A2A task routing, and a sandboxed QDK research lane.

## Logical architecture

```text
User / Maintainer
  |
  v
Next.js Studio UI
  |
  +-- PQC Domain Model and Risk Engine
  |
  +-- Agent Task Broker
        |
        +-- Azure AI Foundry Agent Runtime
        |     +-- model catalog
        |     +-- evaluations
        |     +-- observability
        |     +-- AI gateway controls
        |
        +-- MCP Tool Plane
        |     +-- GitHub MCP tools
        |     +-- SBOM scanner
        |     +-- secret scanner
        |     +-- policy engine
        |     +-- QDK runner
        |
        +-- Governance Plane
              +-- OPA policies
              +-- approvals
              +-- audit logs
              +-- evidence packs
```

## Runtime boundaries

| Boundary | Contents | Trust level | Required control |
|---|---|---|---|
| Browser UI | dashboard, reports, workflows | user-controlled | no secrets, no privileged direct calls |
| App backend | API routes, orchestration, persistence | trusted service | auth, rate limits, structured logs |
| Foundry runtime | models, agents, tool orchestration | semi-trusted automation | evals, tool allowlists, approval gates |
| MCP servers | external tool adapters | privileged boundary | auth, scopes, audit, deny-by-default |
| QDK sandbox | Q# experiments and manifests | research only | no production data, approval for cloud runs |
| CI/CD | tests, scans, policy checks | release gate | branch protection, required checks |

## Core modules

| Module | Responsibility |
|---|---|
| `src/lib/pqc` | crypto asset model, risk scoring, migration wave planning |
| `src/lib/crypto` | KEM provider interface and demo provider abstraction |
| `docs/architecture` | Foundry, QDK, solution, and control-plane documentation |
| `docs/operations` | secrets, hooks, gists, debug, and runbook documentation |
| `.github/workflows` | CI, security scanning, policy validation |
| `policy/opa` | governance rules for agent and cloud actions |
| `agents/` | agent contracts, task envelopes, and operating rules |
| `mcp/` | MCP server manifest and tool-scope documentation |
| `qdk/` | sandboxed quantum research workspace |

## Data classification

| Class | Examples | Storage policy |
|---|---|---|
| Public | docs, sample data, demo code | repository permitted |
| Internal | architecture notes, non-sensitive runbooks | repository permitted if sanitized |
| Confidential | real asset inventories, vendor readiness, internal topology | external secured store only |
| Secret | tokens, keys, credentials, private certs | Key Vault or GitHub environment secrets only |

## Deployment posture

1. Static UI and app services deploy through approved CI/CD.
2. Azure AI Foundry configuration is environment-specific.
3. Azure Quantum execution is disabled by default and approval-gated.
4. Agent write actions require policy pass plus human approval.
5. Release artifacts include SBOM and scan evidence.

## Failure mode design

The system fails closed when:

- a policy check cannot run;
- an approval token is missing;
- an MCP tool scope is unknown;
- a model deployment is not approved;
- a secret scan fails;
- cloud cost or target environment cannot be verified.
