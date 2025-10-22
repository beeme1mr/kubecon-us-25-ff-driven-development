# Narrative and Flow

## Overview

- **Total Duration**: 25 minutes
- **Speakers**: 2 co-presenters
- **Format**: Mix of slides and pre-recorded demo videos
- **Target Audience**: Software engineers (primary), DevOps/SRE teams (secondary), application owners (tertiary)

---

## 1. Title and Introduction (3 minutes, 5 slides)

### Slide 1: Title Slide

- **Title**: "Feature Flag Driven Development"
- **Subtitle**: Seamlessly Integrate Feature Flags Into Your SDLC
- **Tags**: KubeCon + CloudNativeCon NA 2025, 25 minutes, 2 speakers
- **Visual**: OpenFeature logo with FFDD workflow icons (flag → code → CI → deploy), KubeCon logo
- **Speaker Notes**: Welcome everyone to our talk on Feature Flag Driven Development

### Slide 2: Speaker Introductions

- **Visual**: Split screen with animated entrance of both speakers
  
  **Left Side - Michael Beemer:**
  - Photo
  - Senior Product Manager @ Dynatrace
  - GitHub: @beeme1mr
  - Focus: OpenFeature, feature flag standards
  
  **Right Side - Kris Coleman:**
  - Photo  
  - Director of Platform Engineering @ TestifySec
  - GitHub: @kriscoleman
  - Focus: Feature flagging, dev tooling

- **Animation**: Speakers appear with v-click animations (staggered entrance)
- **Speaker Notes**: Quick personal introductions - both deeply involved in OpenFeature community and solving real-world feature flag challenges

### Slide 3: Feature Flags - Powerful but Challenging

- **Text**: "Feature flags enable safe software delivery..."
  
  **The Power** 💪
  - 🎚️ **Toggle Control**: Turn features on/off without deploying code
  - 🚀 **Progressive Rollouts**: Gradual releases and canary deployments
  - 📊 **A/B Testing**: Experiments and variant testing
  - 🔐 **Access Control**: Permissions and targeting rules
  
  **...But They Come With Challenges** ⚠️
  - How do you manage them at scale?
  - How do you keep them in sync across environments?
  - How do you ensure type safety in your code?
  - How do you integrate them into your SDLC?

- **Code Example** (shown with v-click):
  ```typescript
  const client = OpenFeature.getClient();
  const showNewCheckout = client.getBooleanValue(
    'new-checkout-flow',  // ← How do you ensure this exists?
    false
  );
  ```

- **Visual**: Two-column layout - left shows the benefits with icons, right shows the challenges as questions
- **Speaker Notes**: Feature flags are incredibly powerful for progressive delivery, but at scale they introduce coordination challenges. Let's look at what this actually looks like for a developer.

### Slide 4: Cold Open Story - The Developer Journey

- **Text**: "Here's a typical Tuesday for a developer:
  1. 🎫 Get a ticket assigned: 'Add feature flag for new checkout flow'
  2. 🖥️ Open your flag management tool (context switch #1)
  3. ➕ Create the flag: `new-checkout-flow`
  4. 💻 Switch back to your IDE (context switch #2)
  5. ⌨️ Type the flag key into your code... wait, was it `new_checkout_flow` or `new-checkout-flow`?
  6. 📝 Open a PR for team review
  7. 👀 Reviewer asks: 'Does this flag exist in our management tool?'
  8. 🔍 You switch back to the management tool to verify (context switch #3)"
- **Visual**: Animated workflow showing developer bouncing between tools (ticket tracker → flag UI → IDE → GitHub → flag UI again)
- **Speaker Notes**: This is the reality—multiple context switches, manual verification, and plenty of room for human error. Each step introduces friction and potential mistakes.

### Slide 5: The Hidden Problems

- **Text**: "This workflow creates three major problems:"
  1. **Developer Flow Disruption** 🔄
     - Constant context switching between tools
     - Breaking focus to verify flag existence
     - Slows down development velocity
  
  2. **Type Safety Issues** ⚠️
     - Copy-paste introduces typos (`new-checkout-flow` vs `new_checkout_flow`)
     - Flag types can mismatch (created as string, used as boolean)
     - No compile-time validation—bugs found at runtime
  
  3. **Review Blindness** 👀
     - Reviewers can't verify flags exist without opening another tool
     - No way to validate flag configuration matches code expectations
     - Can't catch drift between environments in PR review

- **Visual**: Three-panel illustration showing each problem with icons
- **Speaker Notes**: These aren't edge cases—this happens multiple times per day in active development teams

### Slide 6: The Problem Compounds at Scale

- **Text**: "At one of the largest health systems in the US, daily releases with feature flags boosted velocity but exposed these risks at scale:"
  - 🔀 **Flag drift** between environments (dev has flags that prod doesn't know about)
  - 📊 **Inconsistent definitions** (same flag key, different types/variants across environments)
  - 🐛 **Runtime bugs** from typos and undefined flags
  - 👥 **Manual coordination** required across teams for every flag change
  - ⏰ **Hours wasted** tracking down issues caused by simple flag mismatches
- **Visual**: Diagram showing multiple environments (dev, staging, prod) with misaligned flag configurations, with error indicators
- **Speaker Notes**: When you're doing daily releases, these problems multiply exponentially—flag hygiene becomes critical for reliability

---

## 2. Introducing FFDD and Declarative Flag Manifests (4 minutes, 4 slides)

### Slide 7: What If Flags Were Declarative?

- **Text**: "In the Kubernetes world, you declare your desired state in manifests. What if feature flags worked the same way?"
- **Visual**: Side-by-side comparison—Kubernetes deployment YAML and feature flag manifest YAML
- **Speaker Notes**: KubeCon audience knows declarative config well—this should feel familiar and powerful

### Slide 8: Introducing the Flag Manifest

- **Text**: "A flag manifest is the single source of truth for your flag definitions—flag keys, types, variants, descriptions, and metadata. It lives in your repository, alongside your code."
- **Code Example**:

  ```yaml
  # flags.yaml - checked into version control
  flags:
    new-checkout-flow:
      type: boolean
      description: "Enable new checkout experience"
      defaultValue: false

    payment-provider:
      type: string
      description: "Which payment provider to use"
      defaultValue: stripe
  ```

- **Visual**: Annotated YAML with callouts explaining:
  - Type safety (boolean, string, number, object)
  - Variant definitions
  - Default values
  - Human-readable descriptions
- **Speaker Notes**: Like a Kubernetes manifest, this is version-controlled, reviewable, and can be validated. No more hunting through UIs—everything is in Git.

### Slide 9: Feature Flag Driven Development (FFDD)

- **Text**: "FFDD treats feature flags as first-class citizens in your SDLC by:"
  1. Defining flags declaratively in version control
  2. Generating type-safe code from the manifest
  3. Validating flag configuration in CI
  4. Syncing flags to management systems via GitOps
  5. Promoting flags safely across environments
- **Visual**: Workflow diagram showing the FFDD pipeline
- **Speaker Notes**: This is the core thesis—flags shouldn't be an afterthought, they should be integrated into your workflow

### Slide 10: Built on OpenFeature

- **Text**: "FFDD is powered by OpenFeature, the CNCF standard for feature flagging, and the OpenFeature CLI."
- **Visual**: OpenFeature logo with CNCF branding, CLI tool icon
- **Speaker Notes**: Standards-based approach means vendor neutrality and interoperability

---

## 3. The FFDD Workflow - Part 1: Define and Generate (5 minutes, 4 slides + demo video)

### Slide 11: Step 1 - Define Your Flags

- **Text**: "Start by defining your flags in a manifest file, checked into version control alongside your code."
- **Visual**: VS Code screenshot showing a flag manifest file in a repository
- **Speaker Notes**: No more UI clicking—flags are code, living next to your application

### Slide 12: Step 2 - Generate Type-Safe Code

- **Text**: "The OpenFeature CLI reads your manifest and generates type-safe flag accessor code for your language."
- **Visual**: Command line showing `openfeature generate` command
- **Speaker Notes**: No more typos, no more undefined flags—your IDE autocompletes flag keys

### Slide 13: Pre-recorded Demo - Define & Generate

- **Content**:
  - Show the developer workflow from Slide 2, but with FFDD:
    1. Get ticket assigned ✅
    2. Add flag to `flags.yaml` in your repo (no context switch!)
    3. Run `openfeature generate --language typescript`
    4. Show generated code with type-safe flag accessors
    5. Write code using autocomplete for flag keys
    6. Compile—errors if flag doesn't exist in manifest
  - Compare side-by-side: string literals vs. generated constants
  - Show IntelliSense/autocomplete discovering available flags
  - Demonstrate rename refactoring working across the codebase
- **Duration**: ~90 seconds
- **Visual**: Screen recording with split-screen comparison
- **Speaker Notes**: The developer never left their IDE. No context switching, no typos possible, no manual verification needed. The compiler is now your safety net.

### Slide 14: Benefits - Type Safety and Developer Experience

- **Text**:
  - ✅ No typos—flag keys are constants, not strings
  - ✅ No undefined flags—compile-time errors if flag doesn't exist
  - ✅ IDE autocomplete—discoverability of available flags
  - ✅ Refactoring support—rename flags safely across codebase
- **Visual**: Before/after code comparison (string literals vs. type-safe accessors)
- **Speaker Notes**: This fundamentally changes how developers interact with flags

---

## 4. The FFDD Workflow - Part 2: Validate and Sync (5 minutes, 4 slides + demo video)

### Slide 15: Step 3 - Validate in CI

- **Text**: "In your CI pipeline, validate that your flag manifest is correctly formatted and consistent with your codebase."
- **Visual**: GitHub Actions workflow YAML snippet showing validation step
- **Speaker Notes**: Catch configuration errors before they reach production

### Slide 16: What Gets Validated?

- **Text**: "CI automatically validates your flag manifest and catches problems before merge:"
  
  **Schema Validation** ✅
  - Proper YAML/JSON structure
  - Required fields present
  - Valid type declarations
  
  **Type Safety** ✅
  - Variant values match declared type
  - Default variant exists in variants list
  - No type mismatches between environments
  
  **Code Consistency** ✅
  - All flags in code exist in manifest
  - All flags in manifest are used (or explicitly marked unused)
  - Flag types in code match manifest declarations
  
  **Environment Drift Detection** ✅
  - Compare dev vs. staging vs. prod manifests
  - Flag missing in target environment? CI fails
  - Flag definition mismatch? CI fails

- **Visual**: GitHub Actions workflow output showing successful validation with green checkmarks, and a failed validation with specific error messages
- **Speaker Notes**: Remember the PR review problem from Slide 5? Now the CI bot is your reviewer—it validates everything automatically. Reviewers can focus on logic, not flag existence.

### Slide 17: Step 4 - Sync to Flag Management System

- **Text**: "Once validated, sync your manifest to your feature flag management provider to ensure flags exist and match expected types."
  
  **What Gets Synced:**
  - Flag keys and types (boolean, string, number, object)
  - Default values
  - Descriptions and metadata
  
  **What Stays in the Provider:**
  - Targeting rules and user segmentation
  - Rollout percentages and schedules
  - A/B test configurations
  - Runtime flag state (on/off toggles)
  
  **The Relationship:**
  - **Manifest** = Desired state & code expectations
  - **Provider** = Source of truth for runtime configuration
  - Sync ensures they're aligned

- **Visual**: Diagram showing Git → CI → Flag Management System flow, with two-way arrows indicating the manifest defines structure while provider controls runtime behavior
- **Speaker Notes**: This is a key distinction - the manifest declares what flags your code expects and their types, ensuring the provider has those flags configured. But the provider remains the source of truth for targeting rules, rollout percentages, and runtime state. Think of it like Kubernetes: your manifest declares desired state, but the cluster is the source of truth for actual runtime status.

### Slide 18: Pre-recorded Demo - Validate & Sync

- **Content**:
  - Show GitHub Actions workflow running validation
  - Introduce a deliberate error (mismatched type) and show CI failure
  - Fix the error, show CI pass
  - Show flags syncing to a flag management UI
- **Duration**: ~90 seconds
- **Visual**: Screen recording with narration
- **Speaker Notes**: Emphasize the safety net—errors are caught before production

---

## 5. The FFDD Workflow - Part 3: Promote Across Environments (4 minutes, 3 slides + demo video)

### Slide 19: Step 5 - Environment-Specific Configuration

- **Text**: "The manifest defines the base flag structure. The provider manages environment-specific behavior."
  
  **What the Manifest Provides:**
  - Flag keys, types, and descriptions (same across all environments)
  - Default values (baseline configuration)
  - Code expectations (what your application needs)
  
  **What the Provider Manages Per Environment:**
  - Dev: Flags enabled for all developers
  - Staging: Targeting specific test users
  - Prod: Gradual rollout (5% → 25% → 100%)
  
  **Example:**
  ```yaml
  # Manifest (same everywhere)
  premium-checkout:
    type: boolean
    defaultValue: false
  ```
  
  **Provider Configuration:**
  - Dev: 100% enabled
  - Staging: 50% rollout to beta testers
  - Prod: 5% rollout, ramping up based on metrics

- **Visual**: Diagram showing single manifest feeding into three environments (dev, staging, prod), with provider UI showing different rollout configurations for each
- **Speaker Notes**: The manifest is consistent across environments - it declares what flags exist and their structure. But the provider handles the operational differences: dev might have everything enabled, staging has targeted testing, and prod has careful gradual rollouts. This separation keeps your code simple while giving operators full control.

### Slide 20: Safe Rollouts with Provider Control

- **Text**: "Your flag provider gives you full control over environment-specific behavior:"
  
  **Progressive Rollouts:**
  - Start at 1% in production
  - Monitor metrics (error rates, latency, conversions)
  - Gradually increase based on confidence
  - Instant rollback if issues detected
  
  **Environment Isolation:**
  - Dev: Test freely without affecting users
  - Staging: Validate with realistic data
  - Prod: Careful, monitored rollouts
  
  **Benefits:**
  - ✅ Same code deployed everywhere (no environment-specific flag keys)
  - ✅ Provider handles targeting, rollouts, and toggling
  - ✅ Manifest ensures flags exist and match expected types
  - ✅ No code changes needed to adjust rollout percentages

- **Visual**: Three-tier diagram showing dev (100% enabled), staging (targeted users), prod (progressive rollout timeline: 1% → 10% → 50% → 100%)
- **Speaker Notes**: This is the power of separating concerns. Your manifest ensures type safety and prevents drift in flag definitions. Your provider gives you the operational flexibility to roll out features safely, target specific users, and respond quickly to issues - all without touching code or redeploying.

### Slide 21: Pre-recorded Demo - Promote

- **Content**:
  - Show a flag manifest in a dev branch
  - Create a PR to promote to production branch
  - Show CI validating the production manifest
  - Merge PR and show flags updating in production flag management system
- **Duration**: ~60 seconds
- **Visual**: Screen recording with narration
- **Speaker Notes**: This is GitOps in action—the familiar workflow applied to feature flags

---

## 6. Benefits and Real-World Impact (2 minutes, 2 slides)

### Slide 22: Before FFDD vs. After FFDD

- **Text**: "Let's revisit that developer workflow from the beginning:"

  | Step            | Before FFDD                        | After FFDD                         |
  | --------------- | ---------------------------------- | ---------------------------------- |
  | **Get ticket**  | Same                               | Same                               |
  | **Create flag** | Open flag UI (context switch)      | `openfeature manifest add` in IDE  |
  | **Add to code** | Type flag key manually (typo risk) | `openfeature generate` → type-safe |
  | **Open PR**     | Same                               | Same                               |
  | **Code review** | Reviewer manually checks flag UI   | CI validates automatically         |
  | **Merge**       | Hope flag exists in prod 🤞         | CI checks prod environment         |
  | **Deploy**      | Runtime errors if flag missing     | Compile-time errors caught early   |

  **Developer Impact:**
  - ⏱️ Context switches: **3+** → **0**
  - 🐛 Typo risk: **High** → **Zero** (compile-time safety)
  - 👀 Manual verification: **Required** → **Automated**
  - 🚀 Time to add flag: **~10 minutes** → **~2 minutes**

- **Visual**: Side-by-side workflow diagram with time savings highlighted
- **Speaker Notes**: This isn't just about eliminating errors—it's about keeping developers in flow state. Notice the "Create flag" step now explicitly shows the CLI command.

### Slide 23: Key Takeaways

- **Text**:
  1. Treat flags as declarative infrastructure, not UI configuration
  2. Integrate flag management into your existing SDLC workflows
  3. Use type-safe code generation to eliminate entire classes of bugs
  4. Leverage GitOps for safe, auditable flag promotion
- **Visual**: Four-quadrant visual with icons for each takeaway
- **Speaker Notes**: FFDD isn't a new tool—it's a new way of thinking about flags in your workflow

---

## 7. Call to Action and Closing (2 minutes, 2 slides)

### Slide 24: Try FFDD Today

- **Text**: "Get started with the OpenFeature CLI in seconds:"
  
  **Installation Options:**
  
  ```bash
  # via curl (recommended)
  curl -fsSL https://openfeature.dev/scripts/install_cli.sh | sh
  
  # via Docker
  docker run -it -v $(pwd):/local -w /local ghcr.io/open-feature/cli:latest
  
  # via Go
  go install github.com/open-feature/cli/cmd/openfeature@latest
  ```
  
  **Quick Start:**
  1. Initialize: `openfeature init`
  2. Generate code: `openfeature generate [language]`
  3. Integrate into your CI pipeline
  
  **Resources:**
  - 📖 Docs: https://github.com/open-feature/cli
  - 💬 Slack: #openfeature-cli on CNCF Slack
  - 🎯 Examples: github.com/open-feature/cli/tree/main/sample

- **Visual**: Terminal showing installation command and quick start steps, with QR codes for documentation and Slack
- **Speaker Notes**: Multiple installation options for different workflows. The curl method gets you started in seconds. Docker is great for CI/CD pipelines.

### Slide 25: Join the Movement

- **Text**: 
  
  **The Vision:**
  
  "Feature flags enable continuous delivery. Feature Flag Driven Development ensures they do so **safely**, **reliably**, and at **scale**."
  
  **Let's make flags first-class citizens in the SDLC.**
  
  ---
  
  **Get Involved:**
  - 🌟 Star the repo: github.com/open-feature/cli
  - 💬 Join CNCF Slack: #openfeature and #openfeature-cli
  - 🎤 Attend community calls: openfeature.dev/community
  - 🐛 Report issues or request features
  - 🤝 Share your FFDD experiences and patterns
  - 📝 Contribute to the OpenFeature CNCF project
  
  **Connect with the speakers:**
  - Michael Beemer: @beeme1mr (GitHub)
  - Kris Coleman: @kriscoleman (GitHub)

- **Visual**: Split screen - left side shows inspiring visual of smooth deployment pipeline with flags integrated, right side shows community resources with QR codes for GitHub, Slack, and community page
- **Speaker Notes**: This is more than a tool—it's a community-driven approach to solving a universal problem. We'd love to hear your feedback and learn from your experiences. OpenFeature is a CNCF project, and we're building the future of feature flagging together.
