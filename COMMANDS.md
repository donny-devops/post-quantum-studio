# COMMANDS.md — Slash Commands & Authorization

> Operator reference for the `commands` block in `openclaw.json`.
> Manual cheat sheet — **not** an auto-injected bootstrap file.

## File format note

The config lives at `~/.openclaw/openclaw.json` and is parsed as **JSON5**:
unquoted keys, trailing commas, and `// comments` are allowed despite the
`.json` extension. Some docs and posts call it `openclaw.json5`; the file on
disk is still `.json`. Don't rename it.

> ⚠️ **Schema is strict.** Unknown keys cause the Gateway to refuse to start.
> Always back up before editing manually:
> ```bash
> cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak
> openclaw doctor --fix    # validate + auto-repair
> ```
> Or use `openclaw config get/set/unset` to avoid hand-editing entirely.

## The `commands` block

```jsonc
{
  commands: {
    // Native slash command registration on platforms that support it.
    // "auto" = on for Discord/Telegram, off for Slack until you add slash
    // commands manually. Set `false` to clear previously registered commands
    // on Discord/Telegram at startup. Per-channel overrides live under
    // channels.<provider>.commands.native.
    native: "auto",                       // "auto" | true | false

    // Same idea, but for skill commands. Slack requires creating a slash
    // command per skill, so it stays off there in auto mode.
    nativeSkills: "auto",                 // "auto" | true | false

    // Parse `/...` text commands in chat. Default true. Even when this is
    // false, text commands still work on platforms without native command
    // support (WhatsApp, Signal, iMessage, Google Chat).
    text: true,

    // Run host shell commands via `! <cmd>` or `/bash <cmd>`.
    // OFF by default — flipping this on requires `tools.elevated` allowlists
    // to actually function. See "Bash & elevated" below for the full chain.
    bash: false,

    // How long bash waits before backgrounding a command. 0 = immediate.
    bashForegroundMs: 2000,

    // Each of these enables a dedicated management command. All OFF by
    // default — they read/write config, MCP, plugins, and runtime overrides.
    config: false,    // /config (reads/writes openclaw.json)
    mcp: false,       // /mcp (reads/writes mcp.servers)
    plugins: false,   // /plugins (discovery + enable/disable)
    debug: false,     // /debug (runtime-only overrides)

    // /restart command. Default false per OpenClaw docs.
    // Flip to true if you want operators to restart from chat.
    restart: false,

    // Owner-only authorization for a select set of high-trust commands.
    // Independent of the general allowlist below.
    ownerAllowFrom: ["discord:123456789012345678"],

    // Controls how owner IDs are rendered inside the system prompt.
    // "raw" prints the literal ID; "hash" obscures with the secret below.
    ownerDisplay: "raw",                  // "raw" | "hash"
    ownerDisplaySecret: "${OWNER_ID_HASH_SECRET}",

    // Per-provider allowlist for command authorization.
    // When set, this is the ONLY authorization source — channel allowlists
    // and `useAccessGroups` are ignored. Use "*" for the global default;
    // provider-specific keys override it.
    allowFrom: {
      "*": ["user1"],
      discord: ["user:123"],
    },

    // When `allowFrom` is NOT set, this gates commands behind your standard
    // channel allowlists and access groups. Default true.
    useAccessGroups: true,
  },
}
```

## Authorization decision tree

```
Did sender pass the gate?
│
├── Is `commands.allowFrom` set?
│   ├── YES → use allowFrom only. Channel allowlists & useAccessGroups are
│   │        ignored. Provider-specific entries override `"*"`.
│   └── NO  → fall through to channel allowlists +
│              `commands.useAccessGroups` (default true).
│
└── Is the command owner-only (e.g. /mcp, /plugins writes, /send)?
    └── Caller must ALSO be in `commands.ownerAllowFrom`.
```

Unauthorized senders see commands silently treated as plain text — no error
message in chat, no obvious failure mode. If a teammate says "your slash
commands aren't working," check authorization first.

## Bash & elevated

`commands.bash: true` alone is **not enough**. To actually execute host
commands, you also need `tools.elevated` allowlists configured. The full chain:

1. `commands.bash: true` — enables the `! <cmd>` / `/bash <cmd>` directive.
2. `tools.elevated` allowlist — defines which binaries the agent can run.
3. `/elevated on` (or `full`) at runtime — enables exec approval flow (or
   skips it entirely with `full`).
4. Per-command approval in chat (unless `/elevated full`) — agent asks
   before each new binary, you respond with `/approve <id> allow-once|allow-always|deny`.

Recommended pattern for a personal trusted setup:

```jsonc
{
  commands: { bash: true, bashForegroundMs: 2000 },
  tools: {
    elevated: {
      allow: ["git", "gh", "docker", "kubectl", "npm", "node", "python", "py", "trivy"],
      deny: ["rm", "sudo", "chmod", "chown", "shutdown", "reboot", "format", "diskpart"],
    },
  },
}
```

> 🔒 Never enable `commands.bash` on a host that's exposed to untrusted users
> or prompt-injection-risky channels. A single malicious link parsed as text
> can become an exec call. If you must, run OpenClaw in a Docker sandbox
> (`sandbox.mode: "non-main"`) so blast radius is contained.

## What commands actually exist

Commands come from four sources:

| Source              | Examples                                            |
| ------------------- | --------------------------------------------------- |
| **Core registry**   | `/help`, `/status`, `/whoami`, `/new`, `/reset`     |
| **Generated dock**  | `/think`, `/model`, `/verbose`, `/elevated`, `/exec`|
| **Plugin commands** | Whatever your enabled plugins register              |
| **Skill commands**  | `/skill <name>`, plus per-skill native commands     |

What shows up in chat depends on:

1. Your `commands.*` flags (this file).
2. Which plugins are active (`openclaw plugins list`).
3. Per-channel overrides under `channels.<provider>.commands.*`.
4. Whether the platform supports native commands at all.

Run `/commands` in any session to see the live list for that channel.

## Inline shortcuts

For allowlisted senders, a handful of commands work even when **embedded** in
a normal message — they're stripped before the model sees the text, then the
remainder flows through normally:

- `/help`
- `/commands`
- `/status`
- `/whoami` (alias `/id`)

Example: `hey /status` triggers a status reply, then `hey` continues to the
model. Unauthorized senders get the entire token treated as plain text.

## Common operator commands

Daily-use commands you'll actually reach for:

| Command                     | Use                                                   |
| --------------------------- | ----------------------------------------------------- |
| `/status`                   | Window fullness, model, mode, provider quota          |
| `/context list \| detail`   | Inspect injected files, tool schemas, skills          |
| `/usage tokens`             | Toggle per-message token footer                       |
| `/compact`                  | Summarize older history to free space                 |
| `/new` / `/reset [model]`   | Start a fresh session (memory persists)               |
| `/model <name>`             | Switch model mid-session                              |
| `/think <off..xhigh>`       | Adjust reasoning depth                                |
| `/elevated on \| off \| ask \| full` | Exec approval policy                          |
| `/approve <id> allow-once \| allow-always \| deny` | Resolve exec approval prompt |
| `/btw <question>`           | Ephemeral side-question, doesn't pollute session ctx  |
| `/subagents list \| kill \| spawn` | Inspect/control sub-agent runs                 |
| `/kill <id\|#\|all>`        | Hard-abort sub-agents (no confirmation)               |
| `/skill <name> [input]`     | Run a skill by name                                   |
| `/queue <mode>`             | Configure message queueing/debouncing                 |

## Troubleshooting

| Symptom                              | Likely cause                                     |
| ------------------------------------ | ------------------------------------------------ |
| `/...` shows up as plain text        | Sender not in allowlist OR `commands.text: false`|
| Native slash menu missing            | `commands.native: false` or platform not supported (Slack needs manual setup) |
| `/bash` says "not enabled"           | `commands.bash` is `false`, OR `tools.elevated` not configured |
| `/config` / `/mcp` / `/plugins` 404  | Those flags default to `false`; flip to `true`   |
| Gateway won't start after edit       | Unknown key in JSON5 — run `openclaw doctor --fix`|
| Some commands work, others don't     | Per-channel override under `channels.<provider>.commands.*` |
| Owner-only commands rejected         | Caller missing from `ownerAllowFrom`             |

## Reference

- Slash commands docs — https://github.com/openclaw/openclaw/blob/main/docs/tools/slash-commands.md
- Configuration reference — https://docs.openclaw.ai/gateway/configuration-reference
- `openclaw config get commands` — see your live values
- `openclaw doctor` — validate + auto-repair config
