# Media Ingestion Governance

## Scope

This lane covers `yt-dlp` and similar media metadata, transcript, and public-media ingestion utilities.

## Position

`yt-dlp` may be used only for lawful, authorized, and policy-compliant ingestion workflows such as:

- collecting metadata from approved public sources
- downloading explicitly permitted media for internal analysis
- retrieving transcripts or captions where allowed
- preparing sanitized demo datasets
- debugging media-processing pipelines

It must not be used to bypass access controls, scrape private content, evade platform restrictions, harvest credentials, or ingest copyrighted material without permission.

## Required controls

- Use only approved sources and URLs.
- Do not use personal cookies, browser session exports, private tokens, or credential files.
- Do not ingest private, paywalled, confidential, or access-controlled content without written approval.
- Do not commit downloaded media, captions, cookies, metadata containing private identifiers, or generated artifacts unless explicitly sanitized.
- Store ingestion outputs in approved artifact storage, not the repository.
- Record source URL, license/permission basis, ingestion timestamp, command profile, and retention policy.
- Redact user identifiers and tracking parameters from shared metadata.
- Respect takedown, deletion, and retention requirements.

## Approved command profile

Use a minimal, metadata-first profile by default:

```text
yt-dlp --skip-download --write-info-json --no-write-playlist-metafiles <approved-url>
```

For approved transcript/caption collection:

```text
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs en <approved-url>
```

For approved media capture, document the approval and store outputs outside the repository.

## Prohibited usage

- credential or cookie harvesting
- private playlist ingestion without approval
- DRM or access-control bypass
- bulk scraping outside approved scope
- storing copyrighted media in git
- feeding unreviewed media content into LLM/RAG pipelines
- publishing downloaded content through gists, PRs, issues, or docs

## LLM/RAG ingestion requirements

Before media-derived text enters an LLM or RAG workflow, document:

- source and permission basis
- transcript provenance
- language and translation status
- redaction status
- chunking strategy
- retention policy
- evaluation impact
- hallucination/grounding controls

## CI and repository hygiene

The repository should include configuration, scripts, and documentation only. It should not include media payloads.

Recommended ignore patterns:

```text
*.mp4
*.mkv
*.webm
*.mp3
*.m4a
*.vtt
*.srt
*.info.json
cookies.txt
```

## Non-negotiables

- No credentials or cookies in source control.
- No private or paywalled content without approval.
- No copyrighted-media redistribution.
- No ingestion into AI systems without provenance and data-classification review.
