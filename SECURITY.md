# Security Policy

## Supported Versions

Security updates are provided for the actively maintained `main` branch.

| Version | Supported |
| --- | --- |
| `main` | Yes |
| older snapshots | No |

## Reporting a Vulnerability

Do not open public issues for cryptographic or application vulnerabilities.

Report privately through GitHub private vulnerability reporting if enabled, or contact the maintainer directly.

Please include:

- affected provider, route, or workflow
- expected vs. actual security behavior
- logs with secrets removed

## Scope

In scope:

- demo provider accidentally treated as production-grade PQC
- secret or key material committed to the repository
- CI/CD supply-chain issues

Out of scope:

- the documented demo KEM not matching FIPS 203/204/205
- scanner-only findings without a practical exploit path

## Cryptographic posture

This repository currently ships a **demo-safe** KEM provider for workflow prototyping. It is not a production ML-KEM implementation. Do not use it to protect real data.
