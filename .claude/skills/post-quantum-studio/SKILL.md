```markdown
# post-quantum-studio Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill guide documents the core development patterns, coding conventions, and common workflows for the `post-quantum-studio` repository. The project is built with TypeScript using the Next.js framework, and emphasizes clear documentation, modular architecture, and automation via GitHub Actions. This guide is intended to help contributors quickly understand and follow the established practices in this codebase.

## Coding Conventions

### File Naming

- Use **camelCase** for file names.
  - Example: `userProfile.tsx`, `apiHandler.ts`

### Import Style

- Mixed import styles are used, depending on context.
  - **Named imports** for multiple exports:
    ```typescript
    import { getUser, updateUser } from './userService';
    ```
  - **Default imports** for single exports:
    ```typescript
    import apiHandler from './apiHandler';
    ```

### Export Style

- **Default exports** are preferred.
  - Example:
    ```typescript
    // userProfile.tsx
    const UserProfile = () => { /* ... */ };
    export default UserProfile;
    ```

### Commit Messages

- Commit messages are freeform, often with a short descriptive prefix.
- Average commit message length: ~27 characters.
- Example:  
  ```
  add user authentication flow
  fix typo in dashboard
  ```

## Workflows

### Add Architecture Document
**Trigger:** When someone wants to document a new architecture or system design.  
**Command:** `/add-architecture-doc`

1. Create a new markdown file in `docs/architecture/`.
2. Describe the architecture or system in the file.
3. Commit the new file with a descriptive message.

**Example:**
```bash
touch docs/architecture/new-system.md
# Edit and describe the architecture
git add docs/architecture/new-system.md
git commit -m "add architecture doc for new-system"
git push
```

---

### Add Operations Guide
**Trigger:** When someone wants to document an operational process or guide.  
**Command:** `/add-operations-guide`

1. Create a new markdown file in `docs/operations/`.
2. Write the operational guide in the file.
3. Commit the new file with a descriptive message.

**Example:**
```bash
touch docs/operations/deployment-guide.md
# Write the guide
git add docs/operations/deployment-guide.md
git commit -m "add deployment operations guide"
git push
```

---

### Add GitHub Workflow
**Trigger:** When someone wants to automate a new process in GitHub Actions.  
**Command:** `/add-github-workflow`

1. Create a new YAML file in `.github/workflows/`.
2. Define the workflow steps in the YAML file.
3. Commit the new workflow file.

**Example:**
```bash
touch .github/workflows/lint.yml
# Define workflow steps in lint.yml
git add .github/workflows/lint.yml
git commit -m "add lint workflow"
git push
```

---

### Update Skill Guide
**Trigger:** When someone wants to add or update project skills or development lanes.  
**Command:** `/update-skill-guide`

1. Edit `SKILL.md` to add or update skills/lanes.
2. Commit the changes with a descriptive message.

**Example:**
```bash
# Edit SKILL.md
git add SKILL.md
git commit -m "update SKILL.md with new workflow"
git push
```

## Testing Patterns

- **Test files** follow the `*.test.*` pattern (e.g., `userService.test.ts`).
- **Testing framework** is not explicitly specified; check individual test files for details.
- Place tests alongside the modules they test or in a dedicated test directory.

**Example:**
```typescript
// userService.test.ts
import userService from './userService';

test('should fetch user', () => {
  // test implementation
});
```

## Commands

| Command                  | Purpose                                                    |
|--------------------------|------------------------------------------------------------|
| /add-architecture-doc    | Add a new architecture documentation file                  |
| /add-operations-guide    | Add a new operations guide                                 |
| /add-github-workflow     | Add a new GitHub Actions workflow file                     |
| /update-skill-guide      | Update or extend the SKILL.md file with new skills/lanes   |
```
