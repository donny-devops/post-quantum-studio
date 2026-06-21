# Security Policy

## Scope

This repository is a **demo-safe reference studio** for exploring post-quantum cryptography workflows. It does **not** implement production-grade ML-KEM, ML-DSA, or SLH-DSA primitives. The crypto abstraction layer is intentionally isolated so a vetted provider can replace the demo provider without rewriting the UI.

Despite its demo-safe posture, the project is security-adjacent and we take coordinated disclosure seriously.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| main    | Yes       |
| < 0.1.0 | No        |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report vulnerabilities privately via GitHub's built-in private vulnerability reporting:

1. Go to the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Fill in the details and submit.

Alternatively, you may email the maintainer directly. Include:

- A clear description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- Any suggested mitigations

We will acknowledge receipt within **72 hours** and aim to provide a remediation timeline within **7 days**.

## Disclosure Policy

- We follow a **coordinated disclosure** model.
- Please allow us reasonable time to investigate and remediate before public disclosure.
- We will credit reporters in the release notes unless anonymity is requested.

## Out of Scope

- Vulnerabilities in demo/simulation crypto stubs that have no production impact
- Issues in third-party dependencies already tracked by Dependabot
- UI cosmetic issues

## Security Roadmap

Upcoming security improvements tracked against the release roadmap:

- **v0.2.0** — SBOM generation, dependency scanning, stronger provider contracts, and security disclosure/process documentation
- **v0.3.0** — Vetted provider integration behind `KemProvider`, benchmark harness, and migration-readiness guidance
