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
addons:
  - fancy-arrow
---
<!-- markdownlint-disable -->

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
class: px-10 py-6
---

# Feature Flags are Powerful...

<div v-click="2" class="text-lg opacity-70 mb-6">...but they're not without their challenges</div>

<div class="grid grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">

<div v-click="1">
<div class="card-purple glow-purple-soft px-5 py-4">
  <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">The Power</div>
  <div class="space-y-2">
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:settings-adjust text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Runtime Control</div>
        <div class="text-sm opacity-70">Toggle features without redeploying</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:launch text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Progressive Rollouts</div>
        <div class="text-sm opacity-70">Canary deployments at scale</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:chart-line text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Experimentation</div>
        <div class="text-sm opacity-70">A/B testing & variant analysis</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:user-profile text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Precise Targeting</div>
        <div class="text-sm opacity-70">User segments & permissions</div>
      </div>
    </div>
  </div>
</div>
</div>

<div v-click="3">
<div class="card-purple glow-purple-soft px-5 py-4">
  <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">The Challenges</div>

  <div class="space-y-2">
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:unknown text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Flag Existence</div>
        <div class="text-sm opacity-70">No guarantee flag exists in management tool</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:debug text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Runtime Errors</div>
        <div class="text-sm opacity-70">Typos & undefined flags have unexpected behavior</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:application text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Context Switching</div>
        <div class="text-sm opacity-70">Multiple tools slow development</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div 
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:user-multiple text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Manual Coordination</div>
        <div class="text-sm opacity-70">Teams blocked waiting for flag setup</div>
      </div>
    </div>
  </div>
</div>
</div>

</div>

<!--
Feature flags are incredibly powerful for progressive delivery, but at scale they introduce serious coordination challenges. The string literal is the heart of the problem—no type safety, no validation, just hope. Let's look at what this actually looks like for a developer.
-->

---
layout: default
class: px-10 py-6
---

# The Developer Journey


<DeveloperJourneyFlow :active="$clicks" class="mt-12 max-w-3xl mx-auto" />

<DeveloperJourneySteps :active="$clicks" class="mt-6 max-w-3xl mx-auto" />

<!--
This is the reality—multiple context switches, manual verification, and plenty of room for human error. Each step introduces friction and potential mistakes.
-->

---
layout: default
class: px-10 py-6
---

# The String Literal Problem

<div class="text-base opacity-70 mb-6">Manual flag management introduces runtime risk</div>

<div class="grid grid-cols-2 gap-6">

<div>

### Traditional Approach

<div class="mt-4" />

```typescript
const client = OpenFeature.getClient();

const showNewCheckout = client.getBooleanValue(
  'new-checkout-flow', // <-- string literal
  false
);
```

<div v-click="4" mt-6>
<div class="card-purple glow-purple-soft px-4 py-3">
  <div flex items-center gap-2>
    <div i-carbon:bot text-purple-bright text-xl />
    <span class="text-sm font-semibold">We could really use some automation...</span>
  </div>
</div>
</div>

</div>

<div v-click>

### Leads to Uncertainty

<div class="space-y-3 mt-4">

<div v-click="1">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:unknown text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">Does it exist?</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    No guarantee the flag exists in any management system
  </div>
</div>
</div>

<div v-click="2">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:type-pattern text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">Correct type?</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    Could be boolean, string, number, object—no way to know
  </div>
</div>
</div>

<div v-click="3">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:help text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">What's the intent?</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    No context on how the flag should be used or configured
  </div>
</div>
</div>

</div>

</div>

</div>

<!--
The string literal is the heart of the problem—no type safety, no validation, just hope. This happens multiple times per day in active development teams.
-->

---
layout: default
class: px-12 py-8
hide: true
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

<!--
When you're doing daily releases, these problems multiply exponentially—flag hygiene becomes critical for reliability
-->

---
layout: center
class: text-center
---

<div>

  <div class="text-3xl font-semibold">
    In Kubernetes, we can declare a desired state...
  </div>

  <div v-click class="mt-8 text-4xl font-semibold">
    Wouldn't it be nice if feature flags<br/>were also <span text-purple-400 v-mark="{ at: 1, color: '#ABABFF', type: 'underline' }">declarative</span>?
  </div>

</div>

<!--
KubeCon audience knows declarative config well—this should feel familiar and powerful
-->

---
layout: default
class: px-10 py-6
---

# Introducing the Flag Manifest

<div class="text-base opacity-70 mb-6">A single source of truth for your flag definitions in your repository, alongside your code</div>

<div class="grid grid-cols-2 gap-6">

<div>

### The Manifest

<div class="mt-4" />

```json {all|6|5|4|all}
// flags.json - checked into version control
{
  "flags": {
    "new-checkout-flow": {
      "type": "boolean",
      "description": "Enable new checkout experience",
      "defaultValue": false
    },
    "payment-provider": {
      "type": "string",
      "description": "Which payment provider to use",
      "defaultValue": "stripe"
    }
  }
}
```

<div v-click="4" mt-6>
<div class="card-purple glow-purple-soft px-4 py-3">
  <div flex items-center gap-2>
    <div i-carbon:idea text-purple-bright text-xl />
    <span class="text-sm font-semibold">Version-controlled, reviewable, and validated—just like Kubernetes manifests</span>
  </div>
</div>
</div>

</div>

<div v-click="1">

### What You Get

<div class="space-y-3 mt-4">

<div v-click="1">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:settings text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">Default Values</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    Safe fallbacks for all environments
  </div>
</div>
</div>

<div v-click="2">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:document text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">Self-Documenting</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    Human-readable descriptions
  </div>
</div>
</div>

<div v-click="3">
<div class="card-purple px-4 py-3">
  <div flex items-center gap-3 mb-2>
    <div 
      class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
      style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:type-pattern text-purple-bright" />
    </div>
    <span class="font-bold text-purple-light">Type Safety</span>
  </div>
  <div class="text-sm opacity-80 ml-11">
    boolean, string, number, object
  </div>
</div>
</div>

</div>

</div>

</div>

<!--
Like a Kubernetes manifest, this is version-controlled, reviewable, and can be validated. No more hunting through UIs—everything is in Git.
-->

---
layout: default
---

# Feature Flag Driven Development (FFDD)

<div class="text-xl opacity-80 mb-10">
Treat feature flags as first-class citizens in your SDLC
</div>

<div class="space-y-2 w-130">

<div v-click="1" class="card-purple glow-purple-soft px-1 py-1 transition-all duration-300">
<div flex items-center gap-4>
  <div 
    class="bg-gradient-purple w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
    style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
  >
    <div class="text-2xl font-bold text-purple-bright">1</div>
  </div>
  <div class="text-lg text-purple-light">Defining flags declaratively in version control</div>
</div>
</div>

<div v-click="2" class="card-purple glow-purple-soft px-1 py-1 transition-all duration-300">
<div flex items-center gap-4>
  <div 
    class="bg-gradient-purple w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
    style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
  >
    <div class="text-2xl font-bold text-purple-bright">2</div>
  </div>
  <div class="text-lg text-purple-light">Generating type-safe code from the manifest</div>
</div>
</div>

<div v-click="3" class="card-purple glow-purple-soft px-1 py-1 transition-all duration-300">
<div flex items-center gap-4>
  <div 
    class="bg-gradient-purple w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
    style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
  >
    <div class="text-2xl font-bold text-purple-bright">3</div>
  </div>
  <div class="text-lg text-purple-light">Validating flag configuration in CI</div>
</div>
</div>

<div v-click="4" class="card-purple glow-purple-soft px-1 py-1 transition-all duration-300">
<div flex items-center gap-4>
  <div 
    class="bg-gradient-purple w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
    style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
  >
    <div class="text-2xl font-bold text-purple-bright">4</div>
  </div>
  <div class="text-lg text-purple-light">Syncing flags to management systems via GitOps</div>
</div>
</div>

<div v-click="5" class="card-purple glow-purple-soft px-1 py-1 transition-all duration-300">
<div flex items-center gap-4>
  <div 
    class="bg-gradient-purple w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
    style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
  >
    <div class="text-2xl font-bold text-purple-bright">5</div>
  </div>
  <div class="text-lg text-purple-light">Promoting flags safely across environments</div>
</div>
</div>

</div>

---
layout: default
---

# Powered by OpenFeature

<div class="text-xl opacity-70 mb-6">The CNCF incubating project for feature flagging</div>

<div class="mt-14 max-w-4xl mx-auto">
<div class="card-purple glow-purple-soft px-12 py-6">
  <div class="text-2xl font-semibold mb-6">Why OpenFeature?</div>
  <div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-12 text-left">
    <div class="flex items-start gap-4">
      <div 
        class="bg-gradient-purple w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
      >
        <div class="i-carbon:partnership text-purple-bright text-xl" />
      </div>
      <div>
        <div class="font-semibold text-purple-light mb-1">Vendor Neutral</div>
        <div class="text-sm opacity-80">Switch providers without rewriting code</div>
      </div>
    </div>
    <div class="flex items-start gap-4">
      <div 
        class="bg-gradient-purple w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
      >
        <div class="i-carbon:connect text-purple-bright text-xl" />
      </div>
      <div>
        <div class="font-semibold text-purple-light mb-1">Interoperable</div>
        <div class="text-sm opacity-80">Works across languages and platforms</div>
      </div>
    </div>
    <div class="flex items-start gap-4">
      <div 
        class="bg-gradient-purple w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
      >
        <div class="i-carbon:user-multiple text-purple-bright text-xl" />
      </div>
      <div>
        <div class="font-semibold text-purple-light mb-1">Community-Driven</div>
        <div class="text-sm opacity-80">Vibrant, active community</div>
      </div>
    </div>
    <div class="flex items-start gap-4">
      <div 
        class="bg-gradient-purple w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
      >
        <div class="i-carbon:tool-box text-purple-bright text-xl" />
      </div>
      <div>
        <div class="font-semibold text-purple-light mb-1">Shared Tooling</div>
        <div class="text-sm opacity-80">CLI, SDKs, and ecosystem tools</div>
      </div>
    </div>
  </div>
</div>
</div>

<!--
OpenFeature provides the foundation for FFDD—vendor neutrality, cross-platform support, and shared tooling that works regardless of your flag provider
-->

---
layout: default
class: px-10 py-6
---

# The OpenFeature CLI

<div class="text-base opacity-80 mb-4">Your command-line companion for Feature Flag Driven Development</div>

<div class="grid grid-cols-2 gap-6">

<div>

### Core Commands

<div class="space-y-3 mt-4 text-sm">

<div v-click="1" class="card-purple px-4 py-3">
  <div class="flex items-center gap-2 mb-1">
    <div class="i-carbon:document-add text-purple-bright" />
    <code class="text-purple-light font-semibold">manifest add</code>
  </div>
  <div class="text-xs opacity-80">Add new flags to your manifest</div>
</div>

<div v-click="2" class="card-purple px-4 py-3">
  <div class="flex items-center gap-2 mb-1">
    <div class="i-carbon:code text-purple-bright" />
    <code class="text-purple-light font-semibold">generate</code>
  </div>
  <div class="text-xs opacity-80">Generate type-safe flag accessors</div>
</div>

<div v-click="3" class="card-purple px-4 py-3">
  <div class="flex items-center gap-2 mb-1">
    <div class="i-carbon:checkmark-outline text-purple-bright" />
    <code class="text-purple-light font-semibold">validate</code>
  </div>
  <div class="text-xs opacity-80">Validate manifest in CI/CD</div>
</div>

<div v-click="4" class="card-purple px-4 py-3">
  <div class="flex items-center gap-2 mb-1">
    <div class="i-carbon:sync-settings text-purple-bright" />
    <code class="text-purple-light font-semibold">push / pull</code>
  </div>
  <div class="text-xs opacity-80">Sync flags with your provider</div>
</div>

</div>

</div>

<div v-click="5">

### Installation

```bash
# One-line install
curl -fsSL https://openfeature.dev/scripts/install_cli.sh | sh
```

<div class="mt-4 text-md opacity-80">
✅ Cross-platform (Linux, macOS, Windows)<br/>
✅ Single binary, no dependencies<br/>
✅ Works with any OpenFeature provider
</div>

<div class="mt-6">
<div class="card-purple glow-purple-soft px-4 py-3">
  <div class="flex items-center gap-2">
    <div class="i-carbon:idea text-purple-bright text-xl" />
    <span class="text-sm font-semibold">Let's see it in action with SHOP-4287!</span>
  </div>
</div>
</div>

</div>

</div>

<!--
The CLI is the key enabler for FFDD—it automates the manual work and integrates flags into your existing workflows
-->

---
layout: default
---

# The Starting Point

<div class="text-lg opacity-80 mb-4">Every feature starts with a business requirement</div>

<div v-click="1">
<TicketCard
  ticketNumber="SHOP-4287"
  title="Add Free Shipping Promotion Banner"
  description="Display 'Free Shipping on Orders $50+' banner on ToggleShop homepage to promote current offer. Banner should be toggleable without redeployment for marketing flexibility."
  :acceptanceCriteria="[
    'Banner displays on homepage above product grid',
    'Shows for all users in production when enabled',
    'Can be toggled on/off without deployment',
    'Design matches marketing mockup'
  ]"
  priority="High"
/>
</div>

<div v-click="2" class="mt-4 text-center">
<div class="card-purple glow-purple-soft inline-flex items-center gap-2 px-4 py-2">
  <div class="i-carbon:user-avatar text-purple-bright text-xl" />
  <span class="text-base font-semibold text-purple-light">Developer accepts ticket → Let's implement with FFDD</span>
</div>
</div>

<!--
This is where every feature starts—with a business requirement. Let's follow this free shipping banner from ticket to production using the FFDD workflow.
-->

---
layout: center
class: text-center
hide: true
---

<div class="max-w-4xl mx-auto">

<div class="mb-8">
  <div class="text-5xl font-bold mb-4 text-gradient-purple">The FFDD Workflow</div>
  <div class="text-2xl opacity-70">From ticket to production in three parts</div>
</div>

<div v-click class="mt-16">
<div class="card-purple glow-purple-soft px-10 py-8">
  <div class="flex items-center justify-center gap-8">
    <div class="flex items-center gap-3">
      <div 
        class="bg-gradient-purple w-12 h-12 rounded-lg flex items-center justify-center"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.3);"
      >
        <div class="text-2xl font-bold text-purple-bright">1</div>
      </div>
      <div class="text-left">
        <div class="font-semibold text-purple-light">Define & Generate</div>
        <div class="text-sm opacity-70">Declare flags, generate code</div>
      </div>
    </div>
    <div class="text-purple-400 text-2xl">→</div>
    <div class="flex items-center gap-3">
      <div 
        class="bg-gradient-purple w-12 h-12 rounded-lg flex items-center justify-center"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.3);"
      >
        <div class="text-2xl font-bold text-purple-bright">2</div>
      </div>
      <div class="text-left">
        <div class="font-semibold text-purple-light">Validate & Sync</div>
        <div class="text-sm opacity-70">CI checks, sync to provider</div>
      </div>
    </div>
    <div class="text-purple-400 text-2xl">→</div>
    <div class="flex items-center gap-3">
      <div 
        class="bg-gradient-purple w-12 h-12 rounded-lg flex items-center justify-center"
        style="box-shadow: 0 2px 12px rgba(141,141,255,0.3);"
      >
        <div class="text-2xl font-bold text-purple-bright">3</div>
      </div>
      <div class="text-left">
        <div class="font-semibold text-purple-light">Promote</div>
        <div class="text-sm opacity-70">GitOps-driven rollout</div>
      </div>
    </div>
  </div>
</div>
</div>

</div>

<!--
Follow the free-shipping-banner feature from ticket to production
-->

---
layout: default
clicks: 1
---

# Define Your Flag

<div class="flex justify-center">
  <PresentationVideo
    src="/add-flag-to-manifest.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 18000, showCalloutsOnPause: ['circle-manifest-change'] }
    ]"
    width="100%"
    max-width="780px"
  >
    <VideoCallout
      id="circle-manifest-change"
      position="top-12 left-60"
      arrow-to="#presentation-video@(140,130)"
      arrow-arc="-0.1"
      arrow-color="#8D8DFF"
      :arrow-width="3"
    >
      <div class="card-purple glow-purple-soft px-4 py-3">
        <span class="text-sm font-semibold">The new flag is in the manifest</span>
      </div>
    </VideoCallout>
  </PresentationVideo>
</div>

---
layout: default
clicks: 2
---

# Generate Type-Safe Code

<div class="flex justify-center">
  <PresentationVideo
    src="/generate-type-safe-bindings.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 3800 },
      { click: 2, action: 'resume', pauseAfter: 4000, showCalloutsOnPause: ['circle-manifest-change'] },
    ]"
    width="100%"
    max-width="780px"
  >
   <VideoCallout
      id="circle-manifest-change"
      position="top-44 left-86"
      arrow-to="#presentation-video@(220,260)"
      arrow-arc="-0.1"
      arrow-color="#8D8DFF"
      :arrow-width="3"
    >
      <div class="card-purple glow-purple-soft px-4 py-3">
        <span class="text-sm font-semibold">Here's the generated React hook</span>
      </div>
    </VideoCallout>
  </PresentationVideo>
</div>

---
layout: default
clicks: 3
---

# Let's use it in our codebase!

<div class="flex justify-center">
  <PresentationVideo
    src="/use-generated-code.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 7200 },
      { click: 2, action: 'resume', pauseAfter: 5200 },
      { click: 3, action: 'resume' }
    ]"
    width="100%"
    max-width="780px"
  />
</div>

---
layout: default
clicks: 2
---

# Time to test the banner

<div class="flex justify-center">
  <PresentationVideo
    src="/testing-new-banner.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 7200, showCalloutsOnPause: ['enable-flag'] },
      { click: 2, action: 'resume', pauseAfter: 1400, showCalloutsOnPause: ['ship-it'] },
    ]"
    width="100%"
    max-width="780px"
  >
   <VideoCallout
      id="enable-flag"
      position="top-20 left-130"
    >
      <div class="card-purple glow-purple-soft px-4 py-3">
        <span class="text-sm font-semibold">Okay, let's <span class="font-italic">toggle</span> the flag</span>
      </div>
    </VideoCallout>
       <VideoCallout
      id="ship-it"
      position="top-20 left-130"
    >
      <div class="card-purple glow-purple-soft px-4 py-3">
        <span class="text-sm font-semibold">Looks good... ship it!</span>
      </div>
    </VideoCallout>
  </PresentationVideo>
</div>

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
layout: default
class: px-8 py-4
---

# Real World: TestifySec's Challenge

<div class="flex items-center justify-center gap-6 mb-3">
  <img src="/testifysec-logo.png" alt="TestifySec" class="h-8" />
  <div class="text-2xl text-purple-400">+</div>
  <img src="/open-feature-logo.svg" alt="OpenFeature" class="h-8" />
</div>

<div class="text-sm opacity-80 mb-3">
After implementing release-on-demand at our previous company, we brought feature flags to our cybersecurity platform at TestifySec.
</div>

<div class="grid grid-cols-2 gap-3">

<div v-click="1" class="card-purple glow-purple-soft px-3 py-2">
  <div class="flex items-start gap-2">
    <div class="i-carbon:warning-alt text-lg text-orange-300 flex-shrink-0" />
    <div>
      <div class="font-semibold text-sm mb-1">The Challenge</div>
      <div class="text-xs opacity-90">
        Dual deployment model:
        <span class="text-xs">• Public SaaS • Air-gapped on-prem</span>
      </div>
    </div>
  </div>
</div>

<div v-click="2" class="card-purple glow-purple-soft px-3 py-2">
  <div class="flex items-start gap-2">
    <div class="i-carbon:help text-lg text-blue-400 flex-shrink-0" />
    <div>
      <div class="font-semibold text-sm mb-1">The Question</div>
      <div class="text-xs opacity-90">
        Ship entire flag provider on-prem and over air gaps?
      </div>
    </div>
  </div>
</div>

<div v-click="3" class="card-purple glow-purple-soft px-3 py-2">
  <div class="flex items-start gap-2">
    <div class="i-carbon:idea text-lg text-yellow-400 flex-shrink-0" />
    <div>
      <div class="font-semibold text-sm mb-1">Initial Approach</div>
      <div class="text-xs opacity-90">
        Flat file config - simple but needs reliability work
      </div>
    </div>
  </div>
</div>

<div v-click="4" class="card-purple glow-purple-soft px-3 py-2">
  <div class="flex items-start gap-2">
    <div class="i-carbon:checkmark-filled text-lg text-green-400 flex-shrink-0" />
    <div>
      <div class="font-semibold text-sm mb-1">The Solution</div>
      <div class="text-xs opacity-90">
        OpenFeature CLI - declarative flags with safe defaults!
      </div>
    </div>
  </div>
</div>

</div>

<div v-click="5" class="mt-4">
<div class="text-sm font-semibold text-center mb-2 text-purple-bright">

✨ Result: One Approach, Two Deployment Models

</div>

<div class="grid grid-cols-2 gap-3">

<div class="card-purple glow-purple-soft px-3 py-2">
<div class="flex items-center gap-2 mb-1">
<div class="i-carbon:cloud text-base text-purple-400" />
<span class="font-semibold text-xs">Public SaaS</span>
</div>
<div class="text-xs opacity-80">
Dynamic provider with full management
</div>
</div>

<div class="card-purple glow-purple-soft px-3 py-2">
<div class="flex items-center gap-2 mb-1">
<div class="i-carbon:enterprise text-base text-blue-400" />
<span class="font-semibold text-xs">Air-gapped On-prem</span>
</div>
<div class="text-xs opacity-80">
Generated CLI client with defaults
</div>
</div>

</div>

<div class="text-xs opacity-70 mt-2 text-center">
Elegant solution with zero compromises
</div>
</div>

<!--
This real-world example shows how FFDD and OpenFeature CLI solve complex deployment challenges that many enterprise teams face. The declarative approach scales from simple to complex scenarios.
-->

---
layout: default
class: px-8 py-3
---

# Real World: Static Site Generation at Corewell Health

<div class="flex items-center justify-center gap-4 mb-2">
<div class="i-carbon:hospital text-3xl text-blue-400" />
<div class="text-xl text-purple-400">+</div>
<img src="/open-feature-logo.svg" alt="OpenFeature" class="h-6" />
</div>

<div class="text-xs opacity-80 mb-2">

Healthcare SSG: offline defaults + dynamic runtime flags

</div>

<div class="grid grid-cols-2 gap-2">

<div v-click="1" class="card-purple glow-purple-soft px-2 py-1.5">
<div class="flex items-start gap-2">
<div class="i-carbon:document-tasks text-base text-blue-400 flex-shrink-0" />
<div>
<div class="font-semibold text-xs mb-0.5">The Challenge</div>
<div class="text-xs opacity-90">

Atomic deploys with safe defaults + dynamic queries

</div>
</div>
</div>
</div>

<div v-click="2" class="card-purple glow-purple-soft px-2 py-1.5">
<div class="flex items-start gap-2">
<div class="i-carbon:tools text-base text-yellow-400 flex-shrink-0" />
<div>
<div class="font-semibold text-xs mb-0.5">Our Approach</div>
<div class="text-xs opacity-90">

Custom system for atomic shipping + runtime fallback

</div>
</div>
</div>
</div>

<div v-click="3" class="card-purple glow-purple-soft px-2 py-1.5">
<div class="flex items-start gap-2">
<div class="i-carbon:warning-hex text-base text-red-400 flex-shrink-0" />
<div>
<div class="font-semibold text-xs mb-0.5">The Pain</div>
<div class="text-xs opacity-90">

Wrong keys → build errors → deployment delays

</div>
</div>
</div>
</div>

<div v-click="4" class="card-purple glow-purple-soft px-2 py-1.5">
<div class="flex items-start gap-2">
<div class="i-carbon:checkmark-filled text-base text-green-400 flex-shrink-0" />
<div>
<div class="font-semibold text-xs mb-0.5">The Better Way</div>
<div class="text-xs opacity-90">

OpenFeature CLI: type safety + compile-time checks

</div>
</div>
</div>
</div>

</div>

<div v-click="5" class="mt-2 text-center">
<div class="text-xs text-purple-bright font-semibold">

✨ Type safety prevents build errors • Faster deploys • Compiler catches typos

</div>
<div class="text-xs opacity-60 mt-1">

Read more: kriscodeman.com/blog/ssg-with-feature-flags

</div>
</div>

<!--
Static site generation with feature flags is complex - you need offline defaults and runtime queries. OpenFeature CLI elegantly handles both with type safety.
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
