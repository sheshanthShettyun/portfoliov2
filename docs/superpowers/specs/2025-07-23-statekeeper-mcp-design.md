# Statekeeper MCP Server — Design Spec

**Date:** 2025-07-23
**Status:** Approved

## Overview

Statekeeper is a local MCP server that tracks project state as a sequence of git stashes. It provides numbered revert (`revert 3` = go back 3 steps), a golden "native" baseline, named tags, diff preview, patch export, screenshot capture, and audit logging.

## Architecture

- **Runtime:** Node.js, stdio transport, `@modelcontextprotocol/sdk`
- **Persistence:** Git stash stack (no commits, no pushes)
- **Config:** Registered in opencode.json as a `type: "local"` MCP server

```json
"mcp": {
  "statekeeper": {
    "type": "local",
    "command": ["node", "/path/to/server/index.mjs"],
    "enabled": true
  }
}
```

## State Model

```
tag: "native" → stash-ref-n
tag: "before-refactor" → stash-ref-m
     │
     ├── step-1 (stash@{0}) ← most recent
     ├── step-2 (stash@{1})
     ├── step-3 (stash@{2})
     ├── ...
     └── step-N (oldest)
```

- Each `save_state` does `git stash push` and assigns an incrementing counter
- `save_native` / `tag_state` store a git ref (`refs/statekeeper/<name>`) pointing to a stash hash
- Steps and tags are independent sequences — tagging does not consume step slots

## Tools (12 total)

### State Capture
| Tool | Input | Behavior |
|---|---|---|
| `save_state` | `description?: string` | `git stash push -m "step-N: <desc>"` — increments counter |
| `save_native` | none | Stashes current WIP if dirty, writes `refs/statekeeper/native` |
| `tag_state` | `name: string` | Stores named checkpoint via `refs/statekeeper/<name>` |

### Revert
| Tool | Input | Behavior |
|---|---|---|
| `revert_step` | `steps: number` | Pops `steps` stashes reverse-order; errors if fewer exist |
| `revert_native` | none | Checks out the native tag ref directly |
| `revert_tag` | `name: string` | Checks out the named tag ref |

### Inspection
| Tool | Input | Behavior |
|---|---|---|
| `list_states` | none | Returns `{ native, steps[], tags[], currentIndex }` |
| `get_status` | none | Dirty files, step count, whether native exists |
| `diff_state` | `from?: string, to?: string` | `git diff` between two states (IDs/tags/native/HEAD) |
| `history_log` | none | Timeline of all saves/reverts with timestamps |

### Maintenance
| Tool | Input | Behavior |
|---|---|---|
| `reset_states` | `keepNative?: boolean` | Clears all steps; optionally preserves native tag |

### Export & Capture
| Tool | Input | Behavior |
|---|---|---|
| `export_state` | `id?: string` | Writes a `.patch` file for a specific state to `screenshots/` |
| `save_screenshot` | `url?, fullPage?, viewport?` | Puppeteer screenshot, saves to `screenshots/` |

## Edge Cases

- **Dirty working tree on revert:** Auto-stashes current state first as safety, then reverts
- **No native set:** `revert_native` returns error; instructs user to run `save_native` first
- **More steps than exist:** Returns error with actual count available
- **Stash conflict:** Server stops and reports conflict — no partial revert
- **No git repo:** First tool call checks for `.git`; returns clear error if missing
- **Empty repo / no commits:** Stash requires at least one commit; server detects and returns actionable error
- **Stash stack full:** Git stash has no hard limit but the server warns if > 100 steps

## File Layout

```
src/
├── index.ts              # Entry: creates server, registers tools
├── server.ts             # McpServer setup, transports
├── git.ts                # All git operations (stash, refs, diff, log)
├── screenshot.ts          # Puppeteer screenshot logic
└── state.ts              # State tracking: counter, metadata, history log
```

## Dependencies

- `@modelcontextprotocol/sdk` — MCP protocol
- `puppeteer` — Screenshots (headless Chrome)
- `zod` — Tool input validation (optional, can use raw JSON parse)

## Acceptance Criteria

1. Server starts and registers all 12 tools without errors
2. `save_state` → `save_state` → `revert_step 1` reverts exactly one change
3. `revert_step 3` reverts three sequential changes; error if only 2 exist
4. `save_native` → multiple edits → `revert_native` restores native state
5. `tag_state "foo"` → `revert_tag "foo"` restores that checkpoint
6. `diff_state` shows correct diff for any pair of states
7. `save_screenshot` produces a valid PNG at the specified viewport
8. `export_state` produces a valid `.patch` that `git apply` can restore
9. `reset_states` clears steps; `reset_states keepNative=true` preserves native
10. `history_log` shows all actions in correct chronological order with timestamps
