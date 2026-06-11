---
name: check-deps-sync
description: Check if package.json files are in sync with pnpm-lock.yaml. Use when user wants to verify dependency synchronization, before pushing to CI/CD, or when encountering build failures due to lockfile mismatches.
---

# Check Dependencies Sync

检查 `package.json` 文件与 `pnpm-lock.yaml` 是否同步，防止因忘记更新依赖导致 Vercel 构建失败。

## Workflow

### Step 1: Identify All Package Files

Find all `package.json` files in the workspace:
- Root: `package.json`
- Packages: `packages/*/package.json`

### Step 2: Run Sync Check

Execute the following command to check synchronization:

```bash
pnpm install --frozen-lockfile --dry-run
```

If this fails, it means `pnpm-lock.yaml` is out of sync with `package.json` files.

### Step 3: Alternative Check Method

For a more detailed check, run:

```bash
pnpm ls --depth=0
```

This will list all dependencies and show if there are any issues.

### Step 4: Fix Sync Issues

If sync issues are found:

1. **To update lockfile** (safe - preserves existing versions):
   ```bash
   pnpm install --no-frozen-lockfile
   ```

2. **To clean install** (if issues persist):
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

### Step 5: Verify Fix

After fixing, verify by running:

```bash
pnpm install --frozen-lockfile
```

This should complete without errors.

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `ERR_PNPM_FROZEN_LOCKFILE_WITH_OUTDATED_LOCKFILE` | package.json changed but lockfile not updated | Run `pnpm install` to update lockfile |
| `ERR_PNPM_FROZEN_LOCKFILE_MISSING_DEPENDENCY` | New dependency added without install | Run `pnpm install` |
| Version mismatch | Manual version change in package.json | Run `pnpm install` to sync |

## Best Practices

1. **Before pushing to Vercel/GitHub**: Always run `pnpm install --frozen-lockfile` locally to verify sync
2. **After modifying package.json**: Immediately run `pnpm install` to update lockfile
3. **Commit both files together**: Always commit `package.json` and `pnpm-lock.yaml` in the same commit
4. **Use exact versions**: Prefer exact versions in dependencies for reproducible builds

## Quick Commands

```bash
# Check sync (fails if out of sync)
pnpm install --frozen-lockfile

# Fix sync issues
pnpm install

# Full reset (nuclear option)
rm -rf node_modules pnpm-lock.yaml && pnpm install
```