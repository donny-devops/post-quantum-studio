# Gists Operations Guide

## Position

Gists are useful for public runbooks, reproducible snippets, lightweight incident templates, and external collaboration notes. They are not a control plane and they are not a secret store.

## Approved gist use cases

- public demo commands
- sanitized troubleshooting snippets
- conference or workshop handouts
- reproducible minimal examples
- non-sensitive runbook excerpts

## Prohibited gist content

- secrets, tokens, keys, certs, private endpoints, tenant-specific topology, customer data, vulnerability details before disclosure, exploit chains, or incident evidence

## Review checklist

Before publishing a gist:

1. Run a secret scan.
2. Remove tenant, subscription, resource group, and environment identifiers unless intentionally public.
3. Replace real domains, emails, IPs, and IDs with neutral examples.
4. Link back to the canonical repository documentation.
5. Add a date and owner so stale snippets can be retired.

## Template

```markdown
# Title

Owner: @donny-devops
Last reviewed: YYYY-MM-DD
Source repo: post-quantum-studio

## Purpose

## Commands

## Expected output

## Safety notes
```
