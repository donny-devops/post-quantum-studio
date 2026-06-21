# Secrets Operations Guide

## Principle

Secrets belong in managed secret stores and short-lived identity flows, not in source code, logs, screenshots, notebooks, generated docs, or issue comments.

## Required GitHub environments

| Environment | Purpose | Required approvals |
|---|---|---|
| `dev` | non-production validation | optional |
| `staging` | integration validation | one maintainer |
| `production` | release and deployment | two maintainers |
| `azure-quantum` | cost-bearing quantum jobs | budget owner plus maintainer |

## Required repository secrets

Prefer OpenID Connect federation over static client secrets. Only create static secrets when federation is not possible.

| Secret | Scope | Notes |
|---|---|---|
| `AZURE_CLIENT_ID` | environment | workload identity client id |
| `AZURE_TENANT_ID` | environment | Microsoft Entra tenant id |
| `AZURE_SUBSCRIPTION_ID` | environment | target subscription id |
| `AZURE_AI_FOUNDRY_PROJECT_ENDPOINT` | environment variable | non-secret endpoint can be a variable |
| `AZURE_AI_FOUNDRY_PROJECT_NAME` | environment variable | non-secret project name |
| `AZURE_QUANTUM_WORKSPACE` | protected environment variable | non-secret workspace name |
| `AZURE_QUANTUM_RESOURCE_GROUP` | protected environment variable | non-secret resource group |

## Secret rotation

- Rotate static credentials every 90 days or after any personnel, vendor, or incident trigger.
- Rotate immediately after a failed secret scan that identifies a committed secret.
- Prefer managed identity, federated identity credentials, and Key Vault references.

## Logging rules

- Never print tokens, connection strings, private keys, certificates, or full auth headers.
- Redact cloud resource IDs when they expose sensitive tenancy topology.
- Store only correlation IDs and run IDs in durable logs.

## Incident response

1. Revoke the exposed secret.
2. Rotate dependent credentials.
3. Invalidate sessions and refresh tokens where applicable.
4. Open a security issue with impact, blast radius, owner, and closure criteria.
5. Add regression coverage to secret scanning or policy rules.
