---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Feature Flag Driven Development
exportFilename: KubeCon NA 2025 - Feature Flag Driven Development
lineNumbers: false
drawings:
  persist: false
fonts:
  sans: 'Inter'
  serif: 'Architects Daughter'
  mono: 'Fira Code'
mdc: true
preload: false
routerMode: hash
info: |
  ## Feature Flag Driven Development: Seamlessly Integrate Feature Flags Into Your SDLC
  KubeCon + CloudNativeCon 2025

  Learn how to treat feature flags as first-class citizens in your development workflow using the OpenFeature CLI and GitOps practices.
---

<div translate-x--14>
  <h1>
    Feature Flag Driven Development
  </h1>
  <p class="text-2xl opacity-80 mt-4">Seamlessly Integrate Feature Flags Into Your SDLC</p>

  <p class="mt-8">Michael Beemer, Dynatrace<br>Kris Coleman, TestifySec</p>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/kccnc-na-2025-white.svg" h-20 translate-y-4>
  </div>
</div>

<!--
Welcome everyone to our talk on Feature Flag Driven Development
-->

---
layout: intro
class: px-25
---

<div flex items-center justify-center gap-40>
  <div
    v-click="1" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
    max-w-100
  >
    <img src="/mike.png" w-50 h-50 rounded-full object-cover mb-5 alt="Michael Beemer">
    <span font-semibold text-3xl text-center>Michael Beemer</span>
    <div items-center mt-3 text-center>
      <div>
        <span class="opacity-70 text-lg">Senior Product Manager</span>
      </div>
      <div>
        <span class="opacity-70 text-lg">@ Dynatrace</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>beeme1mr</span>
      </div>
    </div>
  </div>
  <div
    v-click="2" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
    max-w-100
  >
    <img src="/kris.png" w-50 h-50 rounded-full object-cover mb-5 alt="Kris Coleman">
    <span font-semibold text-3xl text-center>Kris Coleman</span>
    <div items-center mt-3 text-center>
      <div>
        <span class="opacity-70 text-lg">Director of Platform Engineering</span>
      </div>
      <div>
        <span class="opacity-70 text-lg">@ TestifySec</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>kriscoleman</span>
      </div>
    </div>
  </div>
</div>

<!--
Quick personal introductions - both deeply involved in OpenFeature community and solving real-world feature flag challenges
-->

---
layout: default
class: px-12 py-8
---

# Feature Flags - Powerful but Challenging

<div class="grid grid-cols-2 gap-8 mt-8">

<div v-click="1">

## The Power 💪

<div class="text-sm space-y-2 mt-4">

- 🎚️ **Toggle Control**: Turn features on/off without deploying code
- 🚀 **Progressive Rollouts**: Gradual releases and canary deployments
- 📊 **A/B Testing**: Experiments and variant testing
- 🔐 **Access Control**: Permissions and targeting rules

</div>
</div>

<div v-click="2">

## ...But They Come With Challenges ⚠️

<div class="text-sm space-y-3 mt-4 opacity-80">

- How do you manage them at scale?
- How do you keep them in sync across environments?
- How do you ensure type safety in your code?
- How do you integrate them into your SDLC?

</div>

<div v-click="3" class="mt-6">

```typescript {all|3|all}
const client = OpenFeature.getClient();
const showNewCheckout = client.getBooleanValue(
  'new-checkout-flow',  // ← How do you ensure this exists?
  false
);
```

</div>
</div>

</div>

<!--
Feature flags are incredibly powerful for progressive delivery, but at scale they introduce coordination challenges. Let's look at what this actually looks like for a developer.
-->

---
layout: default
class: px-12 py-8
---

# The Developer Journey

<div class="text-lg space-y-3 mt-6">

<div v-click="1">🎫 Get a ticket assigned: 'Add feature flag for new checkout flow'</div>

<div v-click="2">🖥️ Open your flag management tool <span class="text-red-400">(context switch #1)</span></div>

<div v-click="3">➕ Create the flag: `new-checkout-flow`</div>

<div v-click="4">💻 Switch back to your IDE <span class="text-red-400">(context switch #2)</span></div>

<div v-click="5">⌨️ Type the flag key into your code... wait, was it `new_checkout_flow` or `new-checkout-flow`?</div>

<div v-click="6">📝 Open a PR for team review</div>

<div v-click="7">👀 Reviewer asks: 'Does this flag exist in our management tool?'</div>

<div v-click="8">🔍 You switch back to the management tool to verify <span class="text-red-400">(context switch #3)</span></div>

</div>

<!-- [Placeholder: Animated workflow showing developer bouncing between tools] -->

<!--
This is the reality—multiple context switches, manual verification, and plenty of room for human error. Each step introduces friction and potential mistakes.
-->

---
layout: default
class: px-12 py-8
---

# The Hidden Problems

<div class="grid grid-cols-3 gap-6 mt-8">

<div v-click="1" class="space-y-3">

### Developer Flow Disruption 🔄

<div class="text-sm opacity-80">

- Constant context switching between tools
- Breaking focus to verify flag existence
- Slows down development velocity

</div>
</div>

<div v-click="2" class="space-y-3">

### Type Safety Issues ⚠️

<div class="text-sm opacity-80">

- Copy-paste introduces typos
- Flag types can mismatch
- No compile-time validation—bugs found at runtime

</div>
</div>

<div v-click="3" class="space-y-3">

### Review Blindness 👀

<div class="text-sm opacity-80">

- Reviewers can't verify flags exist without opening another tool
- No way to validate flag configuration
- Can't catch drift between environments in PR review

</div>
</div>

</div>

<!--
These aren't edge cases—this happens multiple times per day in active development teams
-->

---
layout: default
class: px-12 py-8
---

# The Problem Compounds at Scale

<div v-click="1" class="mt-6">

**At one of the largest health systems in the US, daily releases with feature flags boosted velocity but exposed these risks at scale:**

</div>

<div class="space-y-3 mt-6 text-lg">

<div v-click="2">🔀 **Flag drift** between environments (dev has flags that prod doesn't know about)</div>

<div v-click="3">📊 **Inconsistent definitions** (same flag key, different types/variants across environments)</div>

<div v-click="4">🐛 **Runtime bugs** from typos and undefined flags</div>

<div v-click="5">👥 **Manual coordination** required across teams for every flag change</div>

<div v-click="6">⏰ **Hours wasted** tracking down issues caused by simple flag mismatches</div>

</div>

<!-- [Placeholder: Diagram showing multiple environments with misaligned flag configurations] -->

<!--
When you're doing daily releases, these problems multiply exponentially—flag hygiene becomes critical for reliability
-->

---
layout: center
class: text-center
---

# What If Flags Were Declarative?

<div v-click class="mt-8 text-xl opacity-80">

In the Kubernetes world, you declare your desired state in manifests.

**What if feature flags worked the same way?**

</div>

<!-- [Placeholder: Side-by-side comparison of Kubernetes deployment YAML and feature flag manifest YAML] -->

<!--
KubeCon audience knows declarative config well—this should feel familiar and powerful
-->

---
layout: two-cols
class: px-8 py-8
---

# Introducing the Flag Manifest

<div class="text-base opacity-80 mt-4 mb-6">

A flag manifest is the single source of truth for your flag definitions—flag keys, types, variants, descriptions, and metadata. It lives in your repository, alongside your code.

</div>

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

::right::

<div class="pl-8 space-y-4 mt-20">

<div v-click="1" class="flex items-start gap-3">
<div class="text-2xl">✅</div>
<div>
<div class="font-semibold">Type safety</div>
<div class="text-sm opacity-80">boolean, string, number, object</div>
</div>
</div>

<div v-click="2" class="flex items-start gap-3">
<div class="text-2xl">✅</div>
<div>
<div class="font-semibold">Variant definitions</div>
<div class="text-sm opacity-80">Define allowed values</div>
</div>
</div>

<div v-click="3" class="flex items-start gap-3">
<div class="text-2xl">✅</div>
<div>
<div class="font-semibold">Default values</div>
<div class="text-sm opacity-80">Safe fallbacks</div>
</div>
</div>

<div v-click="4" class="flex items-start gap-3">
<div class="text-2xl">✅</div>
<div>
<div class="font-semibold">Human-readable descriptions</div>
<div class="text-sm opacity-80">Self-documenting</div>
</div>
</div>

</div>

<!--
Like a Kubernetes manifest, this is version-controlled, reviewable, and can be validated. No more hunting through UIs—everything is in Git.
-->

---
layout: default
class: px-12 py-8
---

# Feature Flag Driven Development (FFDD)

<div class="text-lg opacity-80 mb-8">

FFDD treats feature flags as first-class citizens in your SDLC by:

</div>

<div class="space-y-4 text-base">

<div v-click="1" class="flex items-start gap-4">
<div class="text-2xl font-bold text-purple-500">1</div>
<div class="pt-1">Defining flags declaratively in version control</div>
</div>

<div v-click="2" class="flex items-start gap-4">
<div class="text-2xl font-bold text-purple-500">2</div>
<div class="pt-1">Generating type-safe code from the manifest</div>
</div>

<div v-click="3" class="flex items-start gap-4">
<div class="text-2xl font-bold text-purple-500">3</div>
<div class="pt-1">Validating flag configuration in CI</div>
</div>

<div v-click="4" class="flex items-start gap-4">
<div class="text-2xl font-bold text-purple-500">4</div>
<div class="pt-1">Syncing flags to management systems via GitOps</div>
</div>

<div v-click="5" class="flex items-start gap-4">
<div class="text-2xl font-bold text-purple-500">5</div>
<div class="pt-1">Promoting flags safely across environments</div>
</div>

</div>

<!-- [Placeholder: Workflow diagram showing the FFDD pipeline] -->

<!--
This is the core thesis—flags shouldn't be an afterthought, they should be integrated into your workflow
-->

---
layout: center
class: text-center
---

# Built on OpenFeature

<div class="mt-8">

<!-- [Placeholder: OpenFeature logo with CNCF branding, CLI tool icon] -->

<div v-click class="text-xl opacity-80 mt-8">

FFDD is powered by <span text-purple-500>**OpenFeature**</span>, the CNCF standard for feature flagging,

and the <span text-purple-500>**OpenFeature CLI**</span>.

</div>

</div>

<div v-click mt-8>
<div bg="blue-900/30" border="2 solid blue-800" rounded-lg px-5 py-3>
  <div flex items-center gap-2>
    <div i-carbon:idea text-blue-300 text-xl />
    <span>Standards-based approach means vendor neutrality and interoperability</span>
  </div>
</div>
</div>

<!--
Standards-based approach means vendor neutrality and interoperability
-->

---
layout: section
---

# The FFDD Workflow

## Part 1: Define and Generate

---
layout: default
class: px-12 py-8
---

# Step 1 - Define Your Flags

<div class="text-lg opacity-80 mt-6 mb-8">

Start by defining your flags in a manifest file, checked into version control alongside your code.

</div>

<!-- [Placeholder: VS Code screenshot showing a flag manifest file in a repository] -->

<div v-click class="mt-8 text-center text-base opacity-70">

No more UI clicking—flags are code, living next to your application

</div>

<!--
No more UI clicking—flags are code, living next to your application
-->

---
layout: default
class: px-12 py-8
---

# Step 2 - Generate Type-Safe Code

<div class="text-lg opacity-80 mt-6 mb-8">

The OpenFeature CLI reads your manifest and generates type-safe flag accessor code for your language.

</div>

```bash
openfeature generate --language typescript
```

<!-- [Placeholder: Terminal output showing code generation] -->

<div v-click class="mt-8 text-center text-base opacity-70">

No more typos, no more undefined flags—your IDE autocompletes flag keys

</div>

<!--
No more typos, no more undefined flags—your IDE autocompletes flag keys
-->

---
layout: center
class: text-center
---

# Pre-recorded Demo - Define & Generate

<!-- [Placeholder: Screen recording (~90 seconds) showing:
1. Get ticket assigned ✅
2. Add flag to flags.yaml in your repo (no context switch!)
3. Run openfeature generate --language typescript
4. Show generated code with type-safe flag accessors
5. Write code using autocomplete for flag keys
6. Compile—errors if flag doesn't exist in manifest
7. Compare side-by-side: string literals vs. generated constants
8. Show IntelliSense/autocomplete discovering available flags
9. Demonstrate rename refactoring working across the codebase] -->

<!--
The developer never left their IDE. No context switching, no typos possible, no manual verification needed. The compiler is now your safety net.
-->

---
layout: default
class: px-12 py-8
---

# Type Safety and Developer Experience

<div class="grid grid-cols-2 gap-8 mt-12">

<div>

## Before

```typescript
// String literals - prone to typos
const enableNewCheckoutFlow = client.getBooleanValue(
  'new-checkout-flow',
  false
);
```

<div class="text-sm opacity-70 mt-4">

❌ No autocomplete

❌ Typos only caught at runtime

❌ No refactoring support

</div>

</div>

<div>

## After

```typescript
// Type-safe accessors
const enableNewCheckoutFlow = client.newCheckoutFlow();
```

<div class="text-sm opacity-70 mt-4">

✅ IDE autocomplete

✅ Compile-time errors

✅ Safe refactoring

</div>

</div>

</div>

<!--
This fundamentally changes how developers interact with flags
-->

---
layout: section
---

# The FFDD Workflow

## Part 2: Validate and Sync

---
layout: default
class: px-12 py-8
---

# Step 3 - Validate in CI

<div class="text-lg opacity-80 mt-6 mb-8">

In your CI pipeline, validate that your flag manifest is correctly formatted and consistent with your codebase.

</div>

```yaml
# .github/workflows/validate-flags.yml
- name: Validate Flag Manifest
  run: openfeature validate
```

<!-- [Placeholder: GitHub Actions workflow showing validation step] -->

<div v-click class="mt-8 text-center text-base opacity-70">

Catch configuration errors before they reach production

</div>

<!--
Catch configuration errors before they reach production
-->

---
layout: default
class: px-10 py-8
---

# What Gets Validated?

<div class="text-base opacity-80 mb-6">

CI automatically validates your flag manifest and catches problems before merge:

</div>

<div class="grid grid-cols-2 gap-6 text-sm">

<div v-click="1">
<div bg="green-900/30" border="2 solid green-800" rounded-lg px-4 py-3>
  <div flex items-center gap-2 mb-2>
    <div i-carbon:checkmark text-green-300 text-xl />
    <span font-semibold>Schema Validation</span>
  </div>
  <ul class="space-y-1 text-xs opacity-90">
    <li>• Proper YAML/JSON structure</li>
    <li>• Required fields present</li>
    <li>• Valid type declarations</li>
  </ul>
</div>
</div>

<div v-click="2">
<div bg="green-900/30" border="2 solid green-800" rounded-lg px-4 py-3>
  <div flex items-center gap-2 mb-2>
    <div i-carbon:checkmark text-green-300 text-xl />
    <span font-semibold>Type Safety</span>
  </div>
  <ul class="space-y-1 text-xs opacity-90">
    <li>• Variant values match declared type</li>
    <li>• Default variant exists in variants list</li>
    <li>• No type mismatches between environments</li>
  </ul>
</div>
</div>

<div v-click="3">
<div bg="green-900/30" border="2 solid green-800" rounded-lg px-4 py-3>
  <div flex items-center gap-2 mb-2>
    <div i-carbon:checkmark text-green-300 text-xl />
    <span font-semibold>Code Consistency</span>
  </div>
  <ul class="space-y-1 text-xs opacity-90">
    <li>• All flags in code exist in manifest</li>
    <li>• All flags in manifest are used</li>
    <li>• Flag types in code match manifest</li>
  </ul>
</div>
</div>

<div v-click="4">
<div bg="green-900/30" border="2 solid green-800" rounded-lg px-4 py-3>
  <div flex items-center gap-2 mb-2>
    <div i-carbon:checkmark text-green-300 text-xl />
    <span font-semibold>Environment Drift Detection</span>
  </div>
  <ul class="space-y-1 text-xs opacity-90">
    <li>• Compare dev vs. staging vs. prod</li>
    <li>• Flag missing in target environment? CI fails</li>
    <li>• Flag definition mismatch? CI fails</li>
  </ul>
</div>
</div>

</div>

<!-- [Placeholder: GitHub Actions workflow output showing validation results] -->

<!--
Remember the PR review problem from earlier? Now the CI bot is your reviewer—it validates everything automatically. Reviewers can focus on logic, not flag existence.
-->

---
layout: default
class: px-10 py-8
---

# Step 4 - Sync to Flag Management System

<div class="text-base opacity-80 mb-6">

Once validated, sync your manifest to your feature flag management provider to ensure flags exist and match expected types.

</div>

<div class="grid grid-cols-2 gap-8 text-sm">

<div>

### What Gets Synced

<div v-click="1" class="space-y-2 mt-3">

- Flag keys and types
- Default values
- Descriptions and metadata

</div>

</div>

<div>

### What Stays in the Provider

<div v-click="2" class="space-y-2 mt-3">

- Targeting rules and user segmentation
- Rollout percentages and schedules
- A/B test configurations
- Runtime flag state (on/off toggles)

</div>

</div>

</div>

<div v-click="3" mt-8>
<div bg="blue-900/30" border="2 solid blue-800" rounded-lg px-5 py-4>
  <div flex items-center gap-2 mb-3>
    <div i-carbon:idea text-blue-300 text-xl />
    <span font-semibold>The Relationship:</span>
  </div>
  <ul class="space-y-2 text-sm opacity-90">
    <li><strong>Manifest</strong> = Desired state & code expectations</li>
    <li><strong>Provider</strong> = Source of truth for runtime configuration</li>
    <li>Sync ensures they're aligned</li>
  </ul>
</div>
</div>

<!-- [Placeholder: Diagram showing Git → CI → Flag Management System flow] -->

<!--
This is a key distinction - the manifest declares what flags your code expects and their types. But the provider remains the source of truth for targeting rules and runtime state. Think of it like Kubernetes: your manifest declares desired state, but the cluster is the source of truth for actual runtime status.
-->

---
layout: center
class: text-center
---

# Pre-recorded Demo - Validate & Sync

<!-- [Placeholder: Screen recording (~90 seconds) showing:
1. GitHub Actions workflow running validation
2. Introduce a deliberate error (mismatched type)
3. Show CI failure with clear error message
4. Fix the error
5. Show CI pass
6. Show flags syncing to a flag management UI] -->

<!--
Emphasize the safety net—errors are caught before production
-->

---
layout: section
---

# The FFDD Workflow

## Part 3: Promote Across Environments

---
layout: default
class: px-10 py-8
---

# Step 5 - Environment-Specific Configuration

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

### What the Manifest Provides

<div v-click="1" class="space-y-2 mt-3">

- Flag keys, types, and descriptions (same across all environments)
- Default values (baseline configuration)
- Code expectations (what your application needs)

</div>

</div>

<div>

### What the Provider Manages Per Environment

<div v-click="2" class="space-y-2 mt-3">

- **Dev**: Flags enabled for all developers
- **Staging**: Targeting specific test users
- **Prod**: Gradual rollout (5% → 25% → 100%)

</div>

</div>

</div>

<div class="grid grid-cols-2 gap-6 mt-8">

<div v-click="3">

```yaml
# Manifest (same everywhere)
premium-checkout:
  type: boolean
  defaultValue: false
```

</div>

<div v-click="4" class="text-sm space-y-2">

**Provider Configuration:**

- Dev: 100% enabled
- Staging: 50% rollout to beta testers
- Prod: 5% rollout, ramping up based on metrics

</div>

</div>

<!-- [Placeholder: Diagram showing single manifest feeding into three environments] -->

<!--
The manifest is consistent across environments - it declares what flags exist and their structure. But the provider handles the operational differences: dev might have everything enabled, staging has targeted testing, and prod has careful gradual rollouts.
-->

---
layout: default
class: px-10 py-8
---

# Safe Rollouts with Provider Control

<div class="grid grid-cols-2 gap-8 text-sm">

<div>

### Progressive Rollouts

<div v-click="1" class="space-y-2 mt-3">

- Start at 1% in production
- Monitor metrics (error rates, latency, conversions)
- Gradually increase based on confidence
- Instant rollback if issues detected

</div>

### Environment Isolation

<div v-click="2" class="space-y-2 mt-3">

- **Dev**: Test freely without affecting users
- **Staging**: Validate with realistic data
- **Prod**: Careful, monitored rollouts

</div>

</div>

<div>

### Benefits

<div v-click="3" class="space-y-3 mt-3">

- ✅ Same code deployed everywhere (no environment-specific flag keys)
- ✅ Provider handles targeting, rollouts, and toggling
- ✅ Manifest ensures flags exist and match expected types
- ✅ No code changes needed to adjust rollout percentages

</div>

</div>

</div>

<!-- [Placeholder: Three-tier diagram showing dev (100%), staging (targeted), prod (progressive timeline)] -->

<!--
This is the power of separating concerns. Your manifest ensures type safety and prevents drift. Your provider gives you operational flexibility to roll out features safely, all without touching code.
-->

---
layout: center
class: text-center
---

# Pre-recorded Demo - Promote

<!-- [Placeholder: Screen recording (~60 seconds) showing:
1. Show a flag manifest in a dev branch
2. Create a PR to promote to production branch
3. Show CI validating the production manifest
4. Merge PR
5. Show flags updating in production flag management system] -->

<!--
This is GitOps in action—the familiar workflow applied to feature flags
-->

---
layout: section
---

# Benefits and Real-World Impact

---
layout: default
class: px-8 py-8
---

# Before FFDD vs. After FFDD

<div class="text-base opacity-80 mb-4">

Let's revisit that developer workflow from the beginning:

</div>

<div class="text-xs">

| Step            | Before FFDD                                                          | After FFDD                         |
| --------------- | -------------------------------------------------------------------- | ---------------------------------- |
| **Get ticket**  | Same                                                                 | Same                               |
| **Create flag** | Open flag UI <span class="text-red-400">(context switch)</span>      | `openfeature manifest add` in IDE  |
| **Add to code** | Type flag key manually <span class="text-red-400">(typo risk)</span> | `openfeature generate` → type-safe |
| **Open PR**     | Same                                                                 | Same                               |
| **Code review** | Reviewer manually checks flag UI                                     | CI validates automatically         |
| **Merge**       | Hope flag exists in prod 🤞                                           | CI checks prod environment         |
| **Deploy**      | Runtime errors if flag missing                                       | Compile-time errors caught early   |

</div>

<div v-click class="mt-8 grid grid-cols-2 gap-6 text-sm">

<div border="2 solid red-800/50" rounded-lg>
  <div bg="red-800/30" px-4 py-2 flex items-center gap-2>
    <div i-carbon:warning text-red-300 />
    <span font-bold>Developer Impact - Before</span>
  </div>
  <div px-4 py-3>
    <ul class="space-y-2">
      <li>⏱️ Context switches: <strong>3+</strong></li>
      <li>🐛 Typo risk: <strong class="text-red-400">High</strong></li>
      <li>👀 Manual verification: <strong>Required</strong></li>
      <li>🚀 Time to add flag: <strong>~10 minutes</strong></li>
    </ul>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg>
  <div bg="green-800/30" px-4 py-2 flex items-center gap-2>
    <div i-carbon:checkmark text-green-300 />
    <span font-bold>Developer Impact - After</span>
  </div>
  <div px-4 py-3>
    <ul class="space-y-2">
      <li>⏱️ Context switches: <strong class="text-green-400">0</strong></li>
      <li>🐛 Typo risk: <strong class="text-green-400">Zero</strong> (compile-time safety)</li>
      <li>👀 Manual verification: <strong class="text-green-400">Automated</strong></li>
      <li>🚀 Time to add flag: <strong class="text-green-400">~2 minutes</strong></li>
    </ul>
  </div>
</div>

</div>

<!--
This isn't just about eliminating errors—it's about keeping developers in flow state.
-->

---
layout: default
class: px-12 py-10
---

# Key Takeaways

<div class="grid grid-cols-2 gap-8 mt-12">

<div v-click="1" class="flex items-start gap-4">
<div i-carbon:cloud-monitoring text-4xl text-purple-400 />
<div>
<div class="font-semibold text-lg mb-2">Treat flags as declarative infrastructure</div>
<div class="text-sm opacity-80">Not UI configuration</div>
</div>
</div>

<div v-click="2" class="flex items-start gap-4">
<div i-carbon:flow text-4xl text-purple-400 />
<div>
<div class="font-semibold text-lg mb-2">Integrate into your SDLC</div>
<div class="text-sm opacity-80">Workflows you already use</div>
</div>
</div>

<div v-click="3" class="flex items-start gap-4">
<div i-carbon:checkmark-outline text-4xl text-green-400 />
<div>
<div class="font-semibold text-lg mb-2">Use type-safe code generation</div>
<div class="text-sm opacity-80">Eliminate entire classes of bugs</div>
</div>
</div>

<div v-click="4" class="flex items-start gap-4">
<div i-carbon:rocket text-4xl text-blue-400 />
<div>
<div class="font-semibold text-lg mb-2">Leverage GitOps</div>
<div class="text-sm opacity-80">Safe, auditable flag promotion</div>
</div>
</div>

</div>

<!--
FFDD isn't a new tool—it's a new way of thinking about flags in your workflow
-->

---
layout: section
---

# Call to Action

---
layout: default
class: px-10 py-8
---

# Try FFDD Today

<div class="grid grid-cols-2 gap-8">

<div>

### Installation Options

```bash
# via curl (recommended)
curl -fsSL https://openfeature.dev/scripts/install_cli.sh | sh

# via Docker
docker run -it -v $(pwd):/local -w /local \
  ghcr.io/open-feature/cli:latest

# via Go
go install github.com/open-feature/cli/cmd/openfeature@latest
```

</div>

<div>

### Quick Start

<div class="space-y-3 mt-4">

<div v-click="1">1. Initialize: `openfeature init`</div>

<div v-click="2">2. Generate code: `openfeature generate [language]`</div>

<div v-click="3">3. Integrate into your CI pipeline</div>

</div>

### Resources

<div class="space-y-2 mt-6 text-sm">

<div v-click="4" flex items-center gap-2>
  <div i-carbon:document text-purple-400 />
  <span>Docs: https://github.com/open-feature/cli</span>
</div>

<div v-click="5" flex items-center gap-2>
  <div i-carbon:chat text-blue-400 />
  <span>Slack: #openfeature-cli on CNCF Slack</span>
</div>

<div v-click="6" flex items-center gap-2>
  <div i-carbon:code text-green-400 />
  <span>Examples: github.com/open-feature/cli/tree/main/sample</span>
</div>

</div>

</div>

</div>

<!-- [Placeholder: QR codes for documentation and Slack] -->

<!--
Multiple installation options for different workflows. The curl method gets you started in seconds. Docker is great for CI/CD pipelines.
-->

---
layout: center
class: text-center px-20
---

# Join the Movement

<div v-click="1" class="text-2xl font-semibold my-8">

"Feature flags enable continuous delivery.

<span text-purple-500>Feature Flag Driven Development</span> ensures they do so **safely**, **reliably**, and at **scale**."

</div>

<div v-click="2" class="text-xl mb-8">

**Let's make flags first-class citizens in the SDLC.**

</div>

<div class="grid grid-cols-2 gap-8 text-left text-sm mt-12">

<div>

### Get Involved:

<div v-click="3" class="space-y-2 mt-3">

<div flex items-center gap-2>
  <div i-carbon:star text-yellow-400 />
  <span>Star the repo: github.com/open-feature/cli</span>
</div>
<div flex items-center gap-2>
  <div i-carbon:chat text-blue-400 />
  <span>Join CNCF Slack: #openfeature and #openfeature-cli</span>
</div>
<div flex items-center gap-2>
  <div i-carbon:video text-purple-400 />
  <span>Attend community calls: openfeature.dev/community</span>
</div>
<div flex items-center gap-2>
  <div i-carbon:debug text-red-400 />
  <span>Report issues or request features</span>
</div>
<div flex items-center gap-2>
  <div i-carbon:collaborate text-green-400 />
  <span>Share your FFDD experiences and patterns</span>
</div>
<div flex items-center gap-2>
  <div i-carbon:edit text-purple-400 />
  <span>Contribute to the OpenFeature CNCF project</span>
</div>

</div>

</div>

<div>

### Connect with the speakers

<div v-click="4" class="space-y-3 mt-3">

<div>**Michael Beemer**: @beeme1mr (GitHub)</div>

<div>**Kris Coleman**: @kriscoleman (GitHub)</div>

</div>

<!-- [Placeholder: QR codes for GitHub, Slack, and community page] -->

</div>

</div>

<!--
This is more than a tool—it's a community-driven approach to solving a universal problem. We'd love to hear your feedback and learn from your experiences. OpenFeature is a CNCF project, and we're building the future of feature flagging together.
-->
