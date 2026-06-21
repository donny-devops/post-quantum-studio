# Security Policy

## Supported scope

This repository currently supports the active `main` branch and reviewed release tags.

## Reporting a vulnerability

Open a private security advisory in GitHub if available. If that is not available, contact the maintainer directly and avoid posting exploit details in public issues, pull requests, gists, discussions, or logs.

Include:

- affected file, workflow, agent, model, MCP server, or package
- reproduction steps
- expected impact
- suggested severity
- whether secrets, credentials, customer data, or cloud resources are involved

## Security expectations

- No secrets in source control.
- No production credentials in local configuration files.
- No unreviewed workflow permission escalation.
- No agent write tools without approval gates.
- No Azure Quantum or Azure AI Foundry cloud execution without approved identity and cost controls.
- No dependency or license exceptions without documented owner approval.

## Required checks

Pull requests touching code, workflows, policies, agents, MCP contracts, infrastructure, dependencies, or security docs must pass:

- lint
- typecheck
- tests
- build
- dependency audit
- SBOM generation
- license check
- secret scanning
- CodeQL
- OpenSSF Scorecard
- OPA policy checks

## Secret handling

If a secret is committed:

1. Revoke it immediately.
2. Rotate affected credentials.
3. Review logs and dependent systems.
4. Open a security issue or advisory.
5. Add a regression rule or detection pattern.
6. Treat the Git history as contaminated until the blast radius is understood.

## Agentic AI safety

AI agents are treated as semi-trusted automation. They may assist, analyze, propose, and draft, but privileged actions require policy enforcement and human approval.

Agents must fail closed when:

- tool scope is unclear
- output provenance is weak
- prompt injection is detected or suspected
- approval context is missing
- cost impact is unknown
- secrets or sensitive identifiers are present

## Cryptography disclaimer

The included KEM provider and QDK examples are educational and architectural scaffolding. They are not production cryptography. Production PQC work must use vetted implementations, approved libraries, formal review, and platform-specific security controls.
