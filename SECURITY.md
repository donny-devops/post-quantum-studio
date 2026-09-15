# Security Policy

## Overview

**post-quantum-studio** is a reference platform and implementation suite designed around post-quantum cryptographic primitives, including NIST FIPS standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, and FIPS 205 SLH-DSA). 

Because this repository deals directly with foundational cryptography and hybrid key-encapsulation/signature schemes, security is our highest priority. We take all vulnerability reports seriously and adhere strictly to coordinated disclosure practices.

---

## Supported Versions

Only the latest release and the current `main` branch receive active security patches and updates.

| Version / Branch | Supported          | Notes                              |
| ---------------- | ------------------ | ---------------------------------- |
| `main`           | :white_check_mark: | Active development & latest fixes  |
| `>= 1.0.0`       | :white_check_mark: | Current stable release line        |
| `< 1.0.0`        | :x:                | Deprecated / Pre-release versions  |

---

## Cryptographic Notice & Scope

When evaluating potential vulnerabilities, please note:

* **Reference Implementation Notice:** Unless explicitly designated as production-hardened, components in this repository serve as reference architectures, conformance tests, and hybrid cryptographic demonstrators.
* **Side-Channel & Timing Attacks:** While we aim for constant-time operations across secret-dependent routines, purely architectural side-channel attacks or cache-timing vulnerabilities in non-hardened environments should be reported with detailed reproduction steps and specific target CPU/runtime configurations.
* **Standards Conformance:** Discrepancies between algorithm outputs and official NIST Known Answer Tests (KAT) / test vectors are treated as high-priority security defects.

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues, Discussions, or Pull Requests.**

### 1. GitHub Private Vulnerability Reporting (Preferred)
The fastest and most secure method is via GitHub's native advisory system:
1. Navigate to the [Security tab](https://github.com/donny-devops/post-quantum-studio/security) of this repository.
2. Click **Advisories** under "Reporting".
3. Click **Report a vulnerability** to open a private advisory draft.

### 2. Direct Contact
If you cannot use GitHub Security Advisories, contact the project maintainer directly:
* **Contact:** Open a confidential security advisory or reach out via maintainer contact listed on profile.
* **PGP Encryption:** If sending sensitive proof-of-concept material via external channels, ensure files are encrypted using the maintainer's public key.

---

## What to Include in Your Report

To help us triage and resolve the issue quickly, please include:
* **Description:** A clear summary of the vulnerability and potential impact.
* **Affected Component:** Specific algorithms, modules, or API routes affected (e.g., `ML-KEM-768`, key encapsulation, serialization).
* **Proof of Concept (PoC):** Step-by-step instructions, code snippets, or test vectors reproducing the behavior.
* **Environment Details:** OS, Node/runtime version, and any relevant hardware dependencies.
* **Potential Remediation:** Any suggestions or proposed patches, if available.

---

## Response Timeline & SLAs

* **Initial Acknowledgment:** Within **24 to 48 hours** of report receipt.
* **Triage & Validation:** Within **3 to 5 business days**, confirming severity and scope.
* **Remediation & Patching:** High/Critical severity issues will be prioritized for remediation within **14 to 30 days**.
* **Coordinated Disclosure:** We request a standard **90-day coordinated disclosure window** prior to public disclosure, or until a patch and CVE (if applicable) are published.

---

## Safe Harbor

We consider security research conducted under this policy to be authorized. We will not pursue legal action against researchers who:
* Make a good-faith effort to avoid privacy violations, destruction of data, and service disruption.
* Keep vulnerability details confidential until the coordinated disclosure window concludes.
* Act in accordance with applicable laws and avoid accessing user data without authorization.
