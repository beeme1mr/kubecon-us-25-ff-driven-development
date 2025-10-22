# Copilot Instructions for KubeCon Feature Flag Driven Development Presentation

## Project Overview
This is a **Slidev-based presentation** for KubeCon + CloudNativeCon 2025 about Feature Flag Driven Development (FFDD), a workflow that embeds flag management into the SDLC. The talk is titled "Feature Flag Driven Development: Seamlessly Integrate Feature Flags Into Your SDLC."

## Architecture & Structure

### Core Framework: Slidev
- **Main presentation file**: `slides.md` (1900+ lines of presentation content)
- **Theme**: Seriph theme with dark color scheme
- **Interactive elements**: Vue components with `<v-clicks>`, `<v-after>`, and progressive reveals
- **Build system**: Uses Vite internally, builds to `dist/` directory

### File Organization Pattern
```
slides.md              # Main presentation content with YAML frontmatter
components/            # Vue components
pages/                 # Additional slide pages (imported-slides.md)  
snippets/              # Code examples referenced in slides (external.ts)
public/                # Static assets (images, logos, recordings)
uno.config.ts          # UnoCSS configuration (atomic CSS framework)
style.css              # Global custom styles
global-bottom.vue      # Global bottom component for all slides
ABSTRACT.md            # Conference talk abstract
NARRATIVE.md           # Detailed presentation flow and timing
STYLES.md              # OpenFeature presentation style guide
LLMS.txt               # AI assistance documentation for Slidev
```

### Development Workflow
- **Start dev server**: `pnpm dev` (opens automatically on localhost:3030)
- **Production build**: `pnpm build` → `dist/` directory
- **Export slides**: `pnpm export` (for PDF/static export)
- **Package manager**: Uses `pnpm` (with `bun.lock` for faster installs)

## Key Patterns & Conventions

### Slide Content Structure
- **YAML frontmatter** defines theme, title, layout configuration, and fonts
- **Progressive disclosure** using `<v-clicks>`, `<v-after>`, and click-controlled animations
- **Visual markup** with `v-mark` for circling, crossing out, and underlining text
- **Image assets** in `public/` directory with descriptive names
- **Code blocks** with syntax highlighting and line highlighting: `{all|3|4-6|all}`
- **Mermaid diagrams** embedded directly in markdown for architecture visualization
- **Speaker notes** in HTML comments for presenter guidance

### Vue Component Usage
- Components in `components/` are auto-imported into slides
- Available components: `<Counter />` for demonstrations, `<Charts />` for data visualization
- Props passed from slide context: `<Counter :count="5" />`
- Global components: `global-bottom.vue` for consistent footer across slides

### Code Snippet Management
- Reusable code examples in `snippets/` directory
- Use `#region snippet` and `#endregion snippet` to mark exportable sections
- Import with: `@@include snippets/external.ts#snippet`

### Presentation Timing & Flow
- **Total duration**: 25 minutes with 2 speakers
- **Detailed timing** documented in `NARRATIVE.md`
- **Speaker notes** in HTML comments: `<!-- Note content -->`

## Technical Context

### Feature Flag Driven Development (FFDD)
The presentation demonstrates FFDD workflow and tooling:
- **OpenFeature CLI** for type-safe code generation and flag definition management
- **CI/CD integration** for flag validation and environment drift detection
- **GitOps-driven promotion** for safe flag rollout across environments
- **Type-safe flag usage** eliminating runtime bugs from undefined or mistyped flags

### Target Audience
- **Software engineers** building applications with feature flags at scale
- **DevOps/SRE teams** managing multi-environment deployments and flag hygiene
- **Application owners** concerned with deployment safety and continuous delivery
- Teams experiencing challenges with flag drift, inconsistent definitions, or manual coordination

## Deployment Configuration

### Multi-Platform Support
- **Netlify**: `netlify.toml` with SPA routing and Node.js 20
- **Vercel**: `vercel.json` with similar SPA configuration
- Both platforms build with `npm run build` and serve from `dist/`

### Content Themes
The presentation follows a narrative arc:
1. Problem identification (flag drift, inconsistent definitions, runtime bugs at scale)
2. Real-world context (daily releases at large health system with flag hygiene challenges)
3. FFDD workflow introduction (treating flags as first-class citizens in SDLC)
4. Demo flow (defining flags → generating type-safe code → CI validation → GitOps promotion)
5. Benefits and adoption (eliminating manual coordination, reducing errors, enabling safe rollouts)

## Development Guidelines

### When Editing Slides
- Maintain YAML frontmatter structure at the top of `slides.md`
- Use semantic slide layouts: `center`, `intro`, `two-cols`, `section`, `default`
- Keep progressive disclosure logical with `v-click` ordering
- Update speaker notes for complex slides
- Follow the **OpenFeature presentation style guide** in `STYLES.md`

### When Adding Components
- Place in `components/` directory for auto-import
- Use Vue 3 Composition API with `<script setup>`
- Follow existing styling patterns with UnoCSS utility classes
- Reference `STYLES.md` for component patterns and examples

### When Styling Content
- **CSS Framework**: Uses UnoCSS (atomic CSS, Tailwind-compatible)
- **Configuration**: Extend `uno.config.ts` for custom utilities and shortcuts
- **Common patterns**: Use `safelist` for presentation-specific utilities
- **Custom shortcuts**: Defined for slide layouts (`slide-content`, `slide-title`)
- **Color system**: Custom gray/purple palettes aligned with OpenFeature branding
- **Style reference**: See `STYLES.md` for comprehensive color palette and typography guidelines

### When Modifying Deployment
- Test locally with `pnpm dev` before deploying
- Ensure both Netlify and Vercel configs stay synchronized
- Verify SPA routing works for direct slide access