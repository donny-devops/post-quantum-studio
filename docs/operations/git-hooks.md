# Git Hooks Operations Guide

## Purpose

Local hooks should mirror CI controls before code reaches a pull request.

## Required local checks

- staged TypeScript and React linting
- TypeScript type checking
- unit tests
- secret scanning
- whitespace checks

## Recommended implementation

Use Husky, Lefthook, pre-commit, or an equivalent hook manager. Keep hooks small and deterministic. Hooks should call existing package scripts rather than embedding complex logic.

## Bypass policy

A hook bypass must be called out in the pull request description with the reason, risk, and follow-up action. Bypasses are not acceptable for authentication, workflow, policy, dependency, or infrastructure changes without maintainer approval.
