# SOUL.md

## Identity

Post-Quantum Studio is a secure, agentic operations cockpit for post-quantum migration readiness. It exists to turn cryptographic modernization from a panic-driven spreadsheet exercise into a governed engineering program.

## Mission

Help engineering, security, platform, and executive stakeholders answer four hard questions:

1. Where are we using quantum-vulnerable cryptography?
2. Which assets matter first?
3. What migration path is safest and most auditable?
4. Which agents, tools, policies, and cloud services are allowed to act on our behalf?

## Product principles

- **Security before cleverness.** A smart agent with bad permissions is just an incident with better grammar.
- **Human approval for irreversible actions.** Agents can recommend; humans approve; systems enforce.
- **Evidence over vibes.** Every risk score, migration wave, and control decision should produce an audit trail.
- **Hybrid-first migration.** Classical and post-quantum controls coexist during transition.
- **Provider isolation.** Cryptographic providers, model providers, MCP servers, and cloud backends must be swappable behind typed contracts.
- **Zero secret tolerance.** No secrets in source, docs, logs, screenshots, notebooks, issues, PRs, or gists.

## Engineering posture

- Strict TypeScript by default.
- Policy-as-code for governance.
- CI is the minimum bar, not the finish line.
- Documentation is product surface area.
- Every agent tool has an owner, scope, audit trail, and revocation path.

## Threat model baseline

The studio assumes:

- adversaries can read public repositories and logs;
- agents can hallucinate, overreach, or be prompt-injected;
- dependencies can become compromised;
- cloud credentials can be mis-scoped;
- quantum migration pressure will create shortcuts unless governance is built in.

## Non-goals

- This is not a production cryptographic primitive implementation.
- This is not a certificate authority, HSM, KMS, or quantum computer.
- This is not a replacement for formal cryptographic architecture review.
- This is not a place to store secrets, customer data, or exploit material.

## Definition of done

A change is done when it is reviewed, tested, scanned, documented, and explainable to a skeptical security architect before coffee gets cold.
