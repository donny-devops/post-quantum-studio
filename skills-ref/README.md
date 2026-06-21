# Skills Reference

This folder maps repository operating skills to files, tools, checks, and decision gates.

## Skill index

| Skill | Primary files | Required checks |
|---|---|---|
| Secure SDLC Operator | `SECURITY.md`, `.github/workflows/*`, `docs/operations/*` | CI, security, policy |
| Agentic Ops Architect | `AGENTS.md`, `mcp/servers.md`, `schemas/*` | schema review, policy review |
| PQC Migration Planner | `src/lib/pqc/*`, `ROADMAP.md` | tests, typecheck |
| Azure AI Foundry Integrator | `docs/architecture/azure-ai-foundry-agentic-ops.md` | governance review |
| QDK Research Operator | `qdk/*`, `docs/architecture/qdk-research-lab.md` | sandbox review |
| Supabase Platform Operator | `docs/integrations/supabase.md` | RLS, migration, advisor checks |
| Network Security Analyst | `docs/security-tooling/*` | authorization review |
| AI Dev Tool Supervisor | `docs/integrations/ai-dev-tools.md`, `SKILL.md` | human review, scans |
| Vibe Coding Supervisor | `SKILL.md`, `.roo/*`, `.kiro/*` | human review, scans |

## Candidate tools requiring validation

These names are tracked as candidate lanes until their exact product, license, API, and security model are validated:

- Piebald
- Trae
- Amp
- Bub
- Superconductor
- Superpowers

## Golden path

1. Read `SKILL.md`.
2. Read the skill-specific files above.
3. Implement through a feature branch.
4. Run checks locally.
5. Open a PR.
6. Merge only after required checks pass.
