# Profiling and Debugging Tooling Governance

## Scope

This lane covers Chrome DevTools, Magic Trace, codegraph tooling, runtime profilers, browser debugging, and performance investigation workflows.

## Chrome DevTools lane

Chrome DevTools is approved for local debugging, performance profiling, accessibility checks, Lighthouse-style audits, network inspection, and rendering analysis.

Required controls:

- Do not capture secrets, session cookies, bearer tokens, private URLs, or customer data in screenshots, HAR files, traces, or recordings.
- Redact network captures before sharing.
- Treat exported performance profiles as internal artifacts.
- Do not publish traces from production systems without security review.
- Prefer synthetic or sanitized datasets when debugging.

## Magic Trace lane

Magic Trace is a high-resolution process tracing/profiling tool. The upstream project describes it as collecting and displaying traces of what a process is doing, using Intel Processor Trace to capture recent control flow and render interactive timelines. Upstream documentation notes common constraints including Linux-only execution and Intel Skylake-or-later support.

Use cases:

- explain latency spikes
- inspect call paths before crashes
- debug native/runtime hot paths
- compare actual execution against expected architecture
- support codegraph-informed performance triage

Required controls:

- Use only on systems you own or are authorized to profile.
- Do not profile workloads containing secrets or customer data unless approved and redaction is planned.
- Store traces as internal artifacts.
- Delete temporary traces after triage.
- Never attach profilers to production services without incident commander or service-owner approval.
- Record kernel, CPU, runtime, binary version, and trace timestamp in the debug notes.

## Codegraph lane

Codegraph tooling is approved for dependency topology, ownership maps, call graph analysis, blast-radius estimation, security-sensitive flow review, and refactor planning.

Required outputs for architecture-impacting changes:

- affected modules
- dependency graph
- risky call paths
- owners
- tests impacted
- rollback notes

## Debugging decision tree

1. Reproduce locally.
2. Use logs and metrics first.
3. Use browser/runtime profiler for local behavior.
4. Use codegraph for dependency and call-path impact.
5. Use Magic Trace or low-level profilers only when normal telemetry cannot explain the issue.
6. Escalate to production profiling only with explicit approval.

## Non-negotiables

- No secret-bearing traces in pull requests, issues, gists, presentations, or model prompts.
- No unauthorized profiling of third-party systems.
- No profiler output used as a substitute for tests.
- No performance tooling with broad host access without owner approval.
