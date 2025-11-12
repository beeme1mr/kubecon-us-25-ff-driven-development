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
  - slidev-addon-qrcode
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
class: px-10 py-6
---

# Real World: Corewell Health

<div class="text-base opacity-80 mb-8">Healthcare SSG: offline defaults + dynamic runtime flags</div>

<div class="grid grid-cols-3 gap-6">

<div v-click="1" class="flex">
  <div class="card-purple glow-purple-soft px-5 py-4 flex-1">
    <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">The Challenge</div>
    <div class="space-y-3">
      <div class="flex items-start gap-3">
        <div
          class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
        >
          <div class="i-carbon:deployment-unit-technical-execution text-purple-bright" />
        </div>
        <div>
          <div class="font-semibold text-purple-light">Atomic Deploys</div>
          <div class="text-sm opacity-70">Safe defaults + dynamic queries at runtime</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div v-click="2" class="flex">
  <div class="card-purple glow-purple-soft px-5 py-4 flex-1 flex flex-col">
    <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">The Solution</div>
    <div class="space-y-3 flex-1">
      <div class="flex items-start gap-3">
        <div
          class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
        >
          <div class="i-carbon:checkmark-outline text-purple-bright" />
        </div>
        <div>
          <div class="font-semibold text-purple-light">Custom System</div>
          <div class="text-sm opacity-70">Atomic shipping + Runtime fallback</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div v-click="3" class="flex">
  <div class="card-purple glow-purple-soft px-5 py-4 flex-1 flex flex-col">
    <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">The Limitations</div>
    <div class="space-y-3 flex-1">
      <div class="flex items-start gap-3">
        <div
          class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
        >
          <div class="i-carbon:warning text-purple-bright" />
        </div>
        <div>
          <div class="font-semibold text-purple-light">Build-Time Failures</div>
          <div class="text-sm opacity-70">Wrong keys → build errors → deployment delays</div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

<div v-click="4" class="mt-6">
  <div class="flex flex-col items-center gap-1">
    <div class="text-sm font-semibold">Read the full case study</div>
    <QRCode
      :width="140"
      :height="140"
      type="svg"
      data="https://kriscodeman.com/blog/ssg-with-feature-flags"
      :margin="2"
      :imageOptions="{ margin: 2 }"
      :dotsOptions="{ type: 'extra-rounded', color: '#FFFFFF' }"
    />
    <a href="https://kriscodeman.com/blog/ssg-with-feature-flags" class="text-xs text-purple-300 hover:text-purple-200">
      kriscodeman.com/blog/ssg-with-feature-flags
    </a>
  </div>
</div>

<!--
Corewell Health is one of the largest health systems in the US. Their static site generation workflow required flags at build time with runtime fallbacks—string literals caused build failures that delayed deployments. This is a perfect example of why we need declarative flags.
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

```json {all|7|6|5|all}
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

<div v-click="4" mt-6 max-w-2xl mx-auto>
  <div class="card-purple glow-purple-soft px-4 py-3">
    <div flex items-center gap-2>
      <div i-carbon:idea text-purple-bright text-xl />
      <span class="text-sm font-semibold">Version-controlled, reviewable, and validated... just like a Kubernetes manifest</span>
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
  <div class="text-lg text-purple-light">Syncing flags to management systems</div>
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
layout: default
clicks: 2
---

# Open a Pull Request

<div class="flex justify-center">
  <PresentationVideo
    src="/open-pr.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 11500 },
      { click: 2, action: 'resume', pauseAfter: 5500, showCalloutsOnPause: ['new-flag'] },
    ]"
    width="100%"
    max-width="780px"
  >
   <VideoCallout
      id="new-flag"
      position="top-50 left-120"
      arrow-to="#presentation-video@(280,370)"
      from-anchor="bottom"
      arrow-arc="0.1"
      arrow-color="#8D8DFF"
      :arrow-width="3"
    >
      <div class="card-purple glow-purple-soft px-4 py-3 text-center w-64">
        The free-shipping-banner will be created for us!
      </div>
    </VideoCallout>
  </PresentationVideo>
</div>

---
layout: default
clicks: 3
---

# Delegate Control

<div class="flex justify-center">
  <PresentationVideo
    src="/delegate-control.mp4"
    :segments="[
      { click: 1, action: 'play', pauseAfter: 1300, showCalloutsOnPause: ['recently-created'] },
      { click: 2, action: 'resume', pauseAfter: 1600 },
      { click: 3, action: 'resume' },
    ]"
    width="100%"
    max-width="780px"
  >
   <VideoCallout
      id="recently-created"
      position="top-50 left-110"
      arrow-to="#presentation-video@(680,170)"
      from-anchor="top"
      arrow-arc="-0.1"
      arrow-color="#8D8DFF"
      :arrow-width="3"
    >
      <div class="card-purple glow-purple-soft px-4 py-3 text-center w-64">
        We're now in sync with our provider!
      </div>
    </VideoCallout>
  </PresentationVideo>
</div>

---
layout: center
class: text-center px-16
---

# From Ticket to Production

<div class="grid grid-cols-3 gap-6 text-sm mt-12">

<div v-click="1" class="card-purple glow-purple-soft p-5">
  <div class="flex items-center gap-3 mb-3">
    <div i-carbon:application-web text-2xl text-purple-400 />
    <div class="font-semibold text-base">1. Define & Generate</div>
  </div>
  <div class="text-xs opacity-90">
    Declare flags in manifest → Generate type-safe code
  </div>
</div>

<div v-click="2" class="card-purple glow-purple-soft p-5">
  <div class="flex items-center gap-3 mb-3">
    <div i-carbon:code text-2xl text-green-400 />
    <div class="font-semibold text-base">2. Implement</div>
  </div>
  <div class="text-xs opacity-90">
    Use generated code → Test locally
  </div>
</div>

<div v-click="3" class="card-purple glow-purple-soft p-5">
  <div class="flex items-center gap-3 mb-3">
    <div i-carbon:cloud-upload text-2xl text-blue-400 />
    <div class="font-semibold text-base">3. Validate & Sync</div>
  </div>
  <div class="text-xs opacity-90">
    CI validates → Syncs to provider (delegates control)
  </div>
</div>

</div>

<!--
We've just walked through the complete FFDD workflow with the free-shipping-banner feature: defining it in the manifest, generating type-safe code, implementing and testing it locally, then opening a PR where CI validated everything and synced to our provider.
-->

---
layout: default
class: px-10 py-6
---

# Before & After

<div class="text-sm opacity-80 mb-4">

Let's compare the developer workflow:

</div>

<div class="mx-auto" style="width: 85%;">
<div class="card-purple glow-purple-soft p-4">

<table class="w-full text-xs">
<thead>
  <tr class="border-b-2 border-purple-500">
    <th class="text-left pb-3 pr-4 font-bold text-lg">Step</th>
    <th class="text-left pb-3 px-4 font-bold text-lg">
      <div class="flex items-center gap-2">
        <span>Before FFDD</span>
      </div>
    </th>
    <th class="text-left pb-3 pl-4 font-bold text-lg">
      <div class="flex items-center gap-2">
        <span>After FFDD</span>
      </div>
    </th>
  </tr>
</thead>
<tbody class="text-xs">
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Get ticket</td>
    <td class="py-2.5 px-4">Same</td>
    <td class="py-2.5 pl-4">Same</td>
  </tr>
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Create flag</td>
    <td class="py-2.5 px-4">Open flag UI <span class="text-red-400">(context switch)</span></td>
    <td class="py-2.5 pl-4"><code class="text-purple-300">openfeature manifest add</code> in CLI</td>
  </tr>
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Add to code</td>
    <td class="py-2.5 px-4">Type flag key manually <span class="text-red-400">(typo risk)</span></td>
    <td class="py-2.5 pl-4"><code class="text-purple-300">openfeature generate</code> → type-safe</td>
  </tr>
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Open PR</td>
    <td class="py-2.5 px-4">Same</td>
    <td class="py-2.5 pl-4">Same</td>
  </tr>
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Code review</td>
    <td class="py-2.5 px-4">Reviewer manually checks flag UI</td>
    <td class="py-2.5 pl-4">CI validates automatically</td>
  </tr>
  <tr class="border-b border-purple-800/30">
    <td class="py-2.5 pr-4 font-semibold">Merge</td>
    <td class="py-2.5 px-4">Hope flag exists in prod 🤞</td>
    <td class="py-2.5 pl-4">CI checks prod environment</td>
  </tr>
  <tr>
    <td class="py-2.5 pr-4 font-semibold">Deploy</td>
    <td class="py-2.5 px-4">Runtime errors if flag missing</td>
    <td class="py-2.5 pl-4">Compile-time errors caught early</td>
  </tr>
</tbody>
</table>

</div>
</div>

<!--
This isn't just about eliminating errors—it's about keeping developers in flow state.
-->

---
layout: default
class: px-10 py-6
---

# Just the Beginning

<div class="text-base opacity-90 mb-6">
FFDD is under active development and we need your feedback!
</div>

<div class="grid grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">

<div v-click="1">
<div class="card-purple glow-purple-soft px-5 py-4 h-full">
  <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">Future Direction</div>
  <div class="space-y-2">
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:data-structured text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Type-safe Context & Tracking</div>
        <div class="text-sm opacity-70">Evaluation context and tracking events with full type safety</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:laptop text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Local Flag Overrides</div>
        <div class="text-sm opacity-70">Built-in support for local development overrides</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:code text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Additional Languages</div>
        <div class="text-sm opacity-70">Expanding code generation beyond current language support</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:plug text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">MCP Server Integrations</div>
        <div class="text-sm opacity-70">Connect with Model Context Protocol servers</div>
      </div>
    </div>
  </div>
</div>
</div>

<div v-click="2">
<div class="card-purple glow-purple-soft px-5 py-4 h-full">
  <div class="text-xl font-bold text-gradient-purple mb-3 leading-normal">Join the Community</div>
  <div class="space-y-2">
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:logo-github text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Contribute on GitHub</div>
        <div class="text-sm opacity-70">Star the repo, open issues, submit PRs</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:chat text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Join the Conversation</div>
        <div class="text-sm opacity-70">CNCF Slack, community calls, discussions</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:idea text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Share Your Experience</div>
        <div class="text-sm opacity-70">Feedback, use cases, workflow pain points</div>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <div
        class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
      >
        <div class="i-carbon:collaborate text-purple-bright" />
      </div>
      <div>
        <div class="font-semibold text-purple-light">Build Together</div>
        <div class="text-sm opacity-70">Provider implementations, language generators, tooling</div>
      </div>
    </div>
  </div>
</div>
</div>

</div>


---
layout: center
class: text-center px-16
---

# Let's Build the Future Together

<div class="mt-12 text-xl leading-relaxed space-y-3">

<v-click>

Feature flags are too important to be an <span v-mark.underline.purple="1" class="text-purple-400">afterthought</span>.

</v-click>

<v-click>

They can <span v-mark.underline.blue="2" class="text-blue-400">fundamentally change</span> how we deliver software.

</v-click>

<v-click>

It's time to treat them that way.

</v-click>

</div>

<div v-click class="mt-16 text-3xl">
It's time for Feature Flag Driven Development
</div>

---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center h-full">

<h1 class="text-6xl font-bold mb-8">
  <span class="text-purple-400" style="text-shadow: 0 0 30px rgba(224, 224, 255, 0.5);">Thank You!</span>
</h1>

<div class="text-3xl text-purple-400 mb-12" style="text-shadow: 0 0 20px rgba(183, 185, 255, 0.4);">
  Questions?
</div>

<div class="text-lg text-purple-light opacity-90 mb-12">
  Find us after the talk or online:
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-3xl w-full px-8">

<div
  class="bg-gradient-card"
  border="1.5 solid purple-light"
  rounded-xl
  overflow-hidden
  style="box-shadow: 0 8px 32px 0 rgba(60,66,110,0.38), 0 0 0 2px rgba(141,141,255,0.08), 0 0 20px rgba(109, 118, 255, 0.25);"
>
  <div
    flex items-center
    px-5 py-4
    class="bg-gradient-purple"
  >
    <div
      class="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
      style="background: linear-gradient(135deg, rgba(141, 141, 255, 0.4), rgba(183, 185, 255, 0.25)); box-shadow: 0 2px 12px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:link text-purple-bright text-2xl" style="filter: drop-shadow(0 0 8px rgba(224, 224, 255, 0.6));" />
    </div>
    <h3 class="text-xl font-bold text-purple-bright">Resources</h3>
  </div>
  <div px-5 py-5>
    <div flex flex-col gap-4 text-base class="text-purple-light">
      <div flex items-center>
        <div class="i-carbon:flag mr-3 text-lg" />
        <span>openfeature.dev</span>
      </div>
      <div flex items-center>
        <div class="i-carbon:logo-github mr-3 text-lg" />
        <span class="text-sm">github.com/open-feature/cli</span>
      </div>
      <div flex items-center>
        <div class="i-carbon:logo-github mr-3 text-lg" />
        <span class="text-sm">github.com/open-feature/action</span>
      </div>
    </div>
  </div>
</div>

<div
  class="bg-gradient-card"
  border="1.5 solid purple-light"
  rounded-xl
  overflow-hidden
  style="box-shadow: 0 8px 32px 0 rgba(60,66,110,0.38), 0 0 0 2px rgba(141,141,255,0.08), 0 0 20px rgba(109, 118, 255, 0.25);"
>
  <div
    flex items-center
    px-5 py-4
    class="bg-gradient-purple"
  >
    <div
      class="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
      style="background: linear-gradient(135deg, rgba(141, 141, 255, 0.4), rgba(183, 185, 255, 0.25)); box-shadow: 0 2px 12px rgba(141,141,255,0.2);"
    >
      <div class="i-carbon:user-multiple text-purple-bright text-2xl" style="filter: drop-shadow(0 0 8px rgba(224, 224, 255, 0.6));" />
    </div>
    <h3 class="text-xl font-bold text-purple-bright">Connect</h3>
  </div>
  <div px-5 py-5>
    <div flex flex-col gap-4 text-base class="text-purple-light">
      <div flex items-center>
        <div class="i-carbon:logo-slack mr-3 text-lg" />
        <span>CNCF Slack: #openfeature</span>
      </div>
      <div flex items-center>
        <div class="i-carbon:chat mr-3 text-lg" />
        <span>OpenFeature Booth</span>
      </div>
      <div flex items-center>
        <div class="i-carbon:logo-twitter mr-3 text-lg" />
        <span>@openfeature</span>
      </div>
    </div>
  </div>
</div>

</div>

</div>