# Feature Flag Driven Development: Seamlessly Integrate Feature Flags Into Your SDLC

A presentation for **KubeCon + CloudNativeCon North America 2025** demonstrating how to treat feature flags as first-class citizens in your development workflow using OpenFeature CLI and GitOps practices.

## Speakers

- **Michael Beemer** - Dynatrace
- **Kris Coleman** - TestifySec

## Overview

Feature flags are powerful tools for progressive delivery, but managing them introduces serious coordination challenges at scale. The string literal is the heart of the problem—no type safety, no validation, just hope. Developers face constant context switching, manual coordination, and runtime errors from typos and undefined flags.

This presentation explores:
- **The Problem**: How manual flag management disrupts developer flow and introduces runtime risk
- **The Solution**: Declarative flag manifests as single source of truth
- **The Workflow**: Define flags → Generate type-safe code → Validate in CI → Sync to providers → Promote safely
- **Real-World Impact**: Corewell Health's experience with SSG and feature flags
- **Before & After**: How FFDD eliminates context switches and catches errors at compile time

## Key Takeaways

- Feature flags should be **declarative infrastructure**, not UI configuration
- **Type-safe code generation** eliminates entire classes of bugs (typos, undefined flags, type mismatches)
- **CI validation** automates flag verification that previously required manual coordination
- **GitOps workflows** enable safe, auditable flag promotion across environments
- The OpenFeature CLI integrates flag management directly into your existing SDLC

## Tech Stack

- **Framework**: [Slidev](https://sli.dev/) (Vue 3-based presentation framework)
- **Styling**: UnoCSS with custom purple gradient theme aligned with OpenFeature branding
- **Components**: Custom Vue components for interactive workflow visualizations and video demos
- **Icons**: Carbon icons and Remix icons
- **Addons**: slidev-addon-fancy-arrow, slidev-addon-qrcode

## Development

To run the presentation locally:

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Visit http://localhost:3030
```

### Build for Production

```bash
bun run build
```

### Export to PDF

```bash
bun run export
```

## Project Structure

- **`slides.md`** - Main presentation content
- **`components/`** - Custom Vue components for interactive elements
- **`public/`** - Static assets (speaker photos, demo videos, logos, SVGs)
- **`NARRATIVE.md`** - Detailed presentation flow, timing, and speaker notes
- **`ABSTRACT.md`** - Conference submission abstract
- **`uno.config.ts`** - UnoCSS theme configuration with purple color palette

## Contributing

This presentation is built with [Slidev](https://sli.dev/). To make changes:

1. Edit `slides.md` for content
2. Modify components in `components/` for interactive elements
3. Update styles in `style.css` or `uno.config.ts`
4. Preview changes with `bun run dev`
