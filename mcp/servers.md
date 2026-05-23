# MCP Server Contracts

## Purpose

MCP servers expose controlled tools to agents. Every server must be scoped, authenticated, observable, rate-limited, and deny-by-default.

## Server inventory

| Server | Purpose | Default scope | Write access |
|---|---|---|---|
| `github-repo` | repository metadata, files, PRs, issues, workflow status | read | approval-gated |
| `sbom-scanner` | dependency and component inventory | read | no |
| `secret-scanner` | secret detection over workspace artifacts | read | no |
| `policy-engine` | OPA and governance decisions | read | no |
| `azure-ai-foundry` | model, agent, eval, and trace metadata | read | approval-gated |
| `qdk-runner` | local QDK experiment execution | sandbox | cloud approval required |

## Tool contract fields

Each tool must declare:

- tool name
- owner
- input schema
- output schema
- required scopes
- data classification
- side effects
- approval requirement
- rate limits
- audit event name
- timeout
- retry policy

## Example manifest

```json
{
  "server": "policy-engine",
  "owner": "security-engineering",
  "tools": [
    {
      "name": "evaluate_agent_task",
      "inputSchema": "schemas/agent-task-envelope.schema.json",
      "outputSchema": "schemas/policy-decision.schema.json",
      "requiredScopes": ["policy:read"],
      "dataClassification": "internal",
      "sideEffects": false,
      "approvalRequired": false,
      "timeoutSeconds": 10
    }
  ]
}
```

## Security requirements

1. Authenticate every server call.
2. Authorize every tool invocation.
3. Log request metadata without secrets.
4. Validate input and output schemas.
5. Reject tool calls with unknown scopes.
6. Reject write actions without approval context.
7. Redact sensitive values before returning tool output to agents.
8. Pin server versions in production.
