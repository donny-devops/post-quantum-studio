# Post-Quantum Studio

A compact Next.js lab for exploring post-quantum cryptography workflows, threat models, and migration readiness.

> **Security posture:** this repo currently ships a demo-safe architecture and test harness. It does **not** implement production-grade ML-KEM, ML-DSA, or SLH-DSA primitives yet. The crypto abstraction is intentionally isolated so a vetted provider can replace the demo provider without rewriting the UI.

## What is included

- Next.js app shell with TypeScript and Tailwind CSS
- Demo KEM provider interface for post-quantum workflow prototyping
- Browser-friendly crypto utility layer
- Vitest unit tests
- GitHub Actions CI
- Dockerfile for containerized builds
- Security and contribution docs

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project structure

```text
src/
  app/                  Next.js app router pages
  components/           Reusable UI components
  lib/crypto/           Crypto provider abstraction and demo provider
  lib/pqc/              PQC domain model and readiness utilities
  test/                 Test setup
```

## Roadmap

1. Add a vetted ML-KEM provider behind `KemProvider`.
2. Add migration-readiness assessment flows.
3. Add SBOM generation and dependency scanning.
4. Add benchmark views for encapsulation/decapsulation latency.
5. Add hybrid TLS and key-establishment examples.

## License

MIT
