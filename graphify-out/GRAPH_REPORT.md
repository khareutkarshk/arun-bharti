# Graph Report - .  (2026-10-25)

## Corpus Check
- Corpus is ~4,864 words - fits in a single context window. You may not need a graph.

## Summary
- 114 nodes · 125 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Page Components & Motion
- Dev Tooling Deps
- TS Compiler Options
- Project Concept & Stack
- Runtime Dependencies
- Package Scripts
- TS Include Paths
- Root Layout & Fonts
- ESLint Config
- Next Config
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `arunbharti.in Landing Page Demo` - 11 edges
3. `scripts` - 5 edges
4. `include` - 5 edges
5. `Site()` - 4 edges
6. `useMotion()` - 4 edges
7. `Lang` - 4 edges
8. `lib` - 4 edges
9. `Copy` - 3 edges
10. `Bilingual English/Hindi Content` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Site()` --calls--> `useMotion()`  [EXTRACTED]
  src/components/Site.tsx → src/components/useMotion.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Landing Page Frontend Tech Stack** — readme_nextjs_15, readme_tailwind_4, readme_gsap_scrolltrigger, readme_lenis, readme_anek_fonts [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "Page Components & Motion"
Cohesion: 0.16
Nodes (13): Circuit(), DISTRICT, pos, MAIL(), Site(), count(), useMotion(), cities (+5 more)

### Community 1 - "Dev Tooling Deps"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, tailwindcss (+11 more)

### Community 2 - "TS Compiler Options"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Project Concept & Stack"
Cohesion: 0.20
Nodes (12): assets/credits.json (photo credits), Anek Latin / Anek Devanagari Fonts, Arun Bharti (MP Jamui, Chief Whip LJP(RV)), arunbharti.in Landing Page Demo, Bilingual English/Hindi Content, GSAP ScrollTrigger, Lenis Smooth Scroll, Next.js 15 (+4 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): gsap, lenis, next, dependencies, gsap, lenis, next, react (+3 more)

### Community 5 - "Package Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 6 - "TS Include Paths"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 7 - "Root Layout & Fonts"
Cohesion: 0.33
Nodes (4): deva, latin, metadata, viewport

### Community 8 - "ESLint Config"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **61 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `nextConfig` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Tooling Deps` to `Package Scripts`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TS Compiler Options` to `TS Include Paths`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Tooling Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TS Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._