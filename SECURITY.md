Security Policy
Supported Versions
The following versions of post-quantum-studio are currently receiving security updates:

Version	Supported
main	✅ Active support
Older branches	❌ Not supported
Reporting a Vulnerability
⚠️ Do NOT open a public GitHub issue for security vulnerabilities.

If you discover a security vulnerability in this project, please report it responsibly using one of the following methods:

Option 1 — GitHub Private Security Advisory (Preferred)
Use GitHub's built-in private disclosure feature:

Navigate to the Security tab of this repository

Click "Report a vulnerability"

Fill in the advisory form with as much detail as possible

Option 2 — Direct Contact
If GitHub's advisory system is unavailable, email the maintainer directly. Include [SECURITY] post-quantum-studio in the subject line.

What to Include in Your Report
To help triage and resolve the issue quickly, please provide:

Description — A clear summary of the vulnerability

Affected component — Which file, module, or algorithm is affected (e.g., KEM implementation, key serialization)

Steps to reproduce — Minimal proof-of-concept or reproduction steps

Impact assessment — What an attacker could achieve by exploiting this

Suggested fix (optional) — If you have a recommended remediation

Response Timeline
Stage	Target Timeframe
Initial acknowledgment	Within 48 hours
Severity assessment	Within 5 business days
Patch / mitigation	Within 14–30 days (severity-dependent)
Public disclosure	After patch is released and verified
Scope
This project implements and demonstrates post-quantum cryptographic (PQC) primitives and tooling, including algorithms being standardized by NIST (e.g., ML-KEM / Kyber, ML-DSA / Dilithium, SLH-DSA / SPHINCS+). Security issues of particular concern include:

Cryptographic implementation flaws — Side-channel vulnerabilities, incorrect parameter handling, or deviations from the NIST PQC specifications

Key material exposure — Improper storage, logging, or transmission of private keys or seeds

Dependency vulnerabilities — Critical CVEs in npm packages (e.g., next, react, cryptographic libraries)

Supply chain risks — Compromised or malicious dependencies

Cross-site scripting (XSS) / injection — In the Next.js UI layer

Insecure defaults — Weak algorithm parameters or unsafe fallback configurations

Out of Scope
Vulnerabilities in underlying OS or browser that are not exploitable via this application

Theoretical weaknesses in standardized algorithms themselves (report those to NIST)

Issues already publicly known and tracked in open CVE databases

Security Best Practices for Contributors
When contributing to this project, please follow these guidelines:

Never commit secrets — API keys, private keys, or seed material must never be committed. Use .env files (gitignored) or secrets managers.

Pin dependencies — Use exact versions in package.json and review package-lock.json diffs carefully.

Use constant-time comparisons — When implementing or extending cryptographic operations, avoid timing side channels.

Validate inputs — All user-supplied data entering cryptographic routines must be validated and sanitized.

Audit new crypto code — Any new cryptographic implementation should include a reference to the specification it implements.

Dependency Scanning
This repository uses automated tooling to detect vulnerable dependencies:

Dependabot — Monitors npm dependencies for known CVEs

CodeQL — Static analysis for JavaScript/TypeScript security patterns

Trivy — Container and filesystem vulnerability scanning (if Docker is added)

If you identify a dependency issue not caught by these tools, please report it per the process above.

Acknowledgments
Responsible disclosure is deeply appreciated. Reporters of valid, previously unknown vulnerabilities will be credited in the release notes (unless anonymity is requested).

References
NIST Post-Quantum Cryptography Standardization

NIST FIPS 203 (ML-KEM)

NIST FIPS 204 (ML-DSA)

NIST FIPS 205 (SLH-DSA)

GitHub Private Security Advisories
