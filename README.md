# Post-Quantum Studio

Post-Quantum Studio is a reference studio for exploring post-quantum migration workflows, threat models, and crypto-agile application design using a demo-safe architecture.

> **Demo-safe by design:** this repository is an educational and integration-planning studio. It does **not** currently ship production-grade ML-KEM, ML-DSA, or SLH-DSA implementations. All cryptographic functionality is intentionally isolated behind provider abstractions so vetted implementations can be integrated later without rewriting the UI.

## What is included

- Next.js app shell with TypeScript and Tailwind CSS
- Demo `KemProvider` interface for post-quantum workflow prototyping
- Browser-friendly crypto utility layer
- Vitest unit tests
- GitHub Actions CI
- Dockerfile for containerized builds
- Security and contribution docs

## Roadmap

1. Add SBOM generation and dependency scanning.
2. Add a vetted ML-KEM provider behind `KemProvider`.
3. Add benchmark views for encapsulation/decapsulation latency.
4. Add hybrid TLS and key-establishment examples.
5. Add migration-readiness assessment flows.

## Release milestones

- `v0.1 demo studio` — reference UI, demo-safe provider, tests, CI, Docker, core docs
- `v0.2 provider abstraction hardening` — SBOM, dependency scanning, stronger provider contracts, security documentation
- `v0.3 vetted-provider integration` — vetted provider integration behind `KemProvider`, benchmark harness, migration guidance
