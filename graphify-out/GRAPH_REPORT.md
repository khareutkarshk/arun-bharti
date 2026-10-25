# Graph Report - web  (2026-10-25)

## Corpus Check
- 16 files · ~5,797 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 105 nodes · 109 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef284890`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Site.tsx
- devDependencies
- compilerOptions
- CLAUDE.md
- dependencies
- package.json
- include
- layout.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- README.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 5 edges
3. `include` - 5 edges
4. `Site()` - 4 edges
5. `useMotion()` - 4 edges
6. `Lang` - 4 edges
7. `lib` - 4 edges
8. `Copy` - 3 edges
9. `gsap` - 2 edges
10. `lenis` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Site()` --calls--> `useMotion()`  [EXTRACTED]
  src/components/Site.tsx → src/components/useMotion.ts

## Import Cycles
- None detected.

## Communities (12 total, 4 thin omitted)

### Community 0 - "Site.tsx"
Cohesion: 0.17
Nodes (12): Circuit(), DISTRICT, pos, MAIL(), Site(), count(), useMotion(), cities (+4 more)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, tailwindcss (+11 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "dependencies"
Cohesion: 0.18
Nodes (11): gsap, lenis, next, dependencies, gsap, lenis, next, react (+3 more)

### Community 5 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 6 - "include"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 7 - "layout.tsx"
Cohesion: 0.33
Nodes (4): deva, latin, metadata, viewport

### Community 8 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **60 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `nextConfig` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._