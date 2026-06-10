---
name: code-review
description: Perform code reviews (CR) for changed files in the current repository. Use when the user asks to review code, review changes, perform a code review, or mentions CR / code review.
---

# Code Review

Perform code reviews for changed files in the current repository.

## Workflow

### Step 1: Identify Changes

Determine the scope of the code review:

- Check the current working directory and project structure
- Identify which files need review:
  - If the user specifies specific files, review those
  - If the user mentions a PR or branch, check the diff
  - If unspecified, check git status / diff for recently changed files
  - Search the codebase for recent changes if needed

### Step 2: Review Focus Areas

For each file, systematically review:

- **Correctness**: Does the code work as intended? Any logic errors or edge cases missed?
- **Type safety**: Proper TypeScript types, avoid `any`, no unsafe assertions?
- **Code style**: Follows project conventions (see `AGENTS.md` / `CLAUDE.md`)?
- **Consistency**: Naming, imports, structure consistent with rest of codebase?
- **Performance**: Any obvious performance concerns or unnecessary complexity?
- **Security**: No hardcoded secrets, no unsafe patterns?
- **Maintainability**: Clear, readable, properly commented where needed?

### Step 3: Check Project-Specific Rules

Reference the project's AGENTS.md / CLAUDE.md for:

- Code style requirements
- TypeScript conventions
- Lint / build / dev commands
- Directory structure conventions

### Step 4: Present Results

Summarize the review findings with:

- **File-by-file** observations with specific line references
- **Issues** categorized: 🔴 Critical / 🟡 Major / 🟢 Minor / 💡 Suggestion
- **Actionable recommendations** for each issue
- **Positive highlights** for good patterns or improvements

Format findings clearly using markdown with code references.

### Step 5: Optional — Apply Fixes

If the user requests fixes or you determine changes are necessary:

- Create a todo list for the planned fixes
- Apply fixes incrementally, keeping each change focused
- Run project validation commands after changes:
  - `pnpm lint`
  - `pnpm build`
  - `pnpm dev` (when relevant)

## Review Principles

- Be constructive and specific — avoid vague feedback
- Cite file paths and line numbers when referencing issues
- Prioritize: correctness > safety > maintainability > style
- Follow the project's existing patterns over personal preferences
- Do not modify test files to make tests pass (see Bug Fixing strategy in AGENTS.md)
