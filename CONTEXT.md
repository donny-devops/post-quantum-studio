# CONTEXT.md — Inspect & Manage Your Context Window

> Operator reference. Not a bootstrap file — keep this in the workspace as a
> manual cheat sheet. Don't add it to OpenClaw's auto-injection list or it'll
> burn tokens on every turn just to remind you about tokens.

## What "context" actually means

**Context** is everything OpenClaw sends to the model on a single run. It is
bounded by the model's context window (token limit) and is rebuilt every turn.
It is **not** the same as memory:

| Concept     | Where it lives                | Survives across sessions? |
| ----------- | ----------------------------- | ------------------------- |
| **Memory**  | Disk (`MEMORY.md`, daily files, vector store) | Yes — reloaded on demand |
| **Context** | The active model window       | No — rebuilt every turn   |

## The four-component mental model

Every run, OpenClaw assembles context as a stack of four parts:

1. **System Prompt** — rules, workspace location, current time, runtime metadata.
2. **Conversation History** — your messages and the assistant's previous replies.
3. **Tool Data** — JSON schemas for available tools + results of any commands
   the agent has run this session. Schemas are invisible in chat but very real
   in the budget.
4. **Project Context** — specific workspace files OpenClaw injects automatically
   (see next section).

Also counted but easy to forget:

- Compaction summaries and pruning artifacts.
- Provider wrappers and hidden headers (invisible but still billed).

## Workspace file injection

OpenClaw looks for these files in the workspace by default and injects them
under **Project Context** every turn:

| File          | Purpose                                                           |
| ------------- | ----------------------------------------------------------------- |
| `AGENTS.md`   | Operational rules, security policy, routing                       |
| `SOUL.md`     | Persona and tone                                                  |
| `TOOLS.md`    | Environment specifics — paths, endpoints, hosts                  |
| `IDENTITY.md` | Agent identity (name, role) or operator profile                   |
| `USER.md`     | Operator/user context and preferences (alternative to IDENTITY)   |
| `HEARTBEAT.md`| Periodic checklist for heartbeat/cron runs                        |
| `BOOTSTRAP.md`| Startup automation tasks                                          |

If a file is missing, OpenClaw silently skips it. If it's larger than
`agents.defaults.bootstrapMaxChars` (default 20,000), it gets truncated and
you'll see a **TRUNCATED** label in `/context list`.

## The hidden cost of tools

Tools eat context in two separate ways:

1. **Tool list text** in the system prompt — the human-readable "Tooling" section.
2. **Tool schemas (JSON)** — invisible in chat, very visible in your budget.

A single browser or exec tool schema can run 5,000–10,000+ characters.
`/context detail` shows the worst offenders:

```
🧠 Context breakdown (detailed)
...
Top tools (schema size):
  - browser: 9,812 chars (~2,453 tok)
  - exec:    6,240 chars (~1,560 tok)
```

If a tool schema dominates and you don't use it, scope it out per-agent rather
than disabling globally.

## Managing space when the window gets crowded

Three levers, in order of preference:

- **`/compact`** — summarizes older history into a single entry, freeing space
  while keeping the key facts. Use proactively before long sessions go sideways.
- **Automatic pruning** — OpenClaw removes old tool results from the active
  prompt during a run. The full results stay in your permanent transcript, so
  you can scroll back; the model just doesn't re-see them.
- **`/new` or `/reset`** — hard reset. Memory persists; context doesn't. Best
  when the current session is off the rails entirely.

## When sessions feel "off," check context first

Common symptoms that point to context problems, not model problems:

- Agent forgets earlier instructions mid-session → window is near full; older
  turns got compacted or pruned.
- Agent ignores a rule from `AGENTS.md` → that file got truncated (it's larger
  than `bootstrapMaxChars`) or buried by long tool output.
- Agent re-reads the same file every turn → it's not in bootstrap; consider
  promoting it, or accept the on-demand cost.
- Responses get noticeably slower or pricier → tool schemas or skills catalog
  bloat. Run `/context detail` to find the heaviest contributors.

## Quick start — four commands

You can audit a session in under five minutes:

| Command           | What it shows                                                       |
| ----------------- | ------------------------------------------------------------------- |
| `/status`         | How full the window is + current session settings (model, mode).    |
| `/context list`   | Injected files with rough sizes — per file and totals.              |
| `/context detail` | Deep breakdown: per-file, per-tool-schema, per-skill entry sizes.   |
| `/usage tokens`   | Adds a small footer to every reply showing per-message token usage. |

`/context` prefers the latest run-built report when available
(`System prompt (run)`); otherwise it computes an estimate
(`System prompt (estimate)`). Either way it reports sizes and top contributors,
not the full prompt text.

## Status labels in `/context list`

Watch for these in the output:

- **OK** — file injected as-is.
- **MISSING** — file doesn't exist in the workspace. OpenClaw skips it silently;
  not an error unless you expected it there.
- **TRUNCATED** — file is larger than `bootstrapMaxChars`. Split the file or
  raise the limit.
- **`System prompt (estimate)`** (header line) — you're on a backend that
  doesn't support run reports. Sizes are computed on the fly, not captured
  from a real run. Numbers are approximate but still useful.
- **`System prompt (run)`** (header line) — captured from the last embedded
  run. These numbers are accurate.

## Reading `/context detail`

Typical output structure:

```
🧠 Context breakdown
Workspace: <workspaceDir>
Bootstrap max/file: 20,000 chars
Sandbox: mode=non-main sandboxed=false
System prompt (run): 38,412 chars (~9,603 tok)
  Project Context: 23,901 chars (~5,976 tok)
Injected workspace files:
  - AGENTS.md: OK | raw 1,742 chars (~436 tok) | injected 1,742 chars (~436 tok)
  - SOUL.md:   OK | raw 1,575 chars (~394 tok) | injected 1,575 chars (~394 tok)
  ...
Tool schemas (top contributors):
  - <tool_name>: <chars> (~<tok> tok)
  ...
Skills catalog: <chars> (~<tok> tok)
```

What to look for:

- **`raw` vs `injected`** — if `injected < raw` for a file, it's being truncated.
  Either trim the file or raise `agents.defaults.bootstrapMaxChars` (default 20,000).
- **Tool schemas dominating** — large schemas are the silent killer. Disable
  unused tools or scope them per-agent rather than globally.
- **Skills catalog larger than expected** — your skill descriptions are too
  long. The catalog is metadata only; trim each `description` to a trigger line.
- **Project Context > 30K chars** — start trimming bootstrap files. Default
  total cap is 60,000 (`bootstrapTotalMaxChars`); blow past that and lower-priority
  files get dropped.

## Tuning levers (in `openclaw.json`)

```jsonc
agents: {
  defaults: {
    // Per-file truncation. Default 20,000.
    bootstrapMaxChars: 20000,

    // Total cap across all bootstrap files. Default 60,000.
    bootstrapTotalMaxChars: 60000,

    // Skip injecting bootstrap files on continuation turns to save tokens
    // on long sessions. Trade-off: rules from AGENTS.md may drift.
    contextInjection: "always",  // "always" | "continuation-skip" | "never"
  },
},
skills: {
  limits: {
    // Cap on the skills catalog. Lower this if you have many skills and
    // their listing is bloating context.
    maxSkillsPromptChars: 8000,
  },
},
```

## Hygiene habits

- **Audit monthly:** run `/context detail` after a typical session and trim
  anything over ~1,500 chars in a single bootstrap file unless it's earning
  the cost.
- **One concern per file:** mixing concerns (tone in `AGENTS.md`, endpoints in
  `IDENTITY.md`) leads to duplicated instructions and wasted tokens.
- **`MEMORY.md` discipline:** it grows over time. Distill weekly. Old entries
  belong in `memory/*.md` daily files, which are accessed on-demand via
  `memory_search` / `memory_get` and don't count against context unless read.
- **Long tool output is a tax:** `read` of a 10K-line log file lives in context
  for the rest of the session. Pipe through `head`, `grep`, or `wc` first.
- **`/new` and `/reset` are free wins:** start a fresh session when the current
  one is sluggish or off-topic. Memory persists; context doesn't.

## Reference

- Context concept — https://docs.openclaw.ai/concepts/context
- System prompt assembly — https://docs.openclaw.ai/concepts/system-prompt
- Agent workspace — https://docs.openclaw.ai/concepts/agent-workspace
