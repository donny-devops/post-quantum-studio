---
name: add-architecture-document
description: Workflow command scaffold for add-architecture-document in post-quantum-studio.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-architecture-document

Use this workflow when working on **add-architecture-document** in `post-quantum-studio`.

## Goal

Adds a new architecture documentation file to the project.

## Common Files

- `docs/architecture/*.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new markdown file in docs/architecture/
- Describe the architecture or system in the file
- Commit the new file with a descriptive message

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.