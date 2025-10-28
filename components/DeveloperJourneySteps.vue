<!--
  DeveloperJourneySteps Component
  
  Detailed step-by-step walkthrough panel showing individual workflow stages
  with descriptions. Displays one active step at a time with smooth transitions.
  
  Props:
    - active?: number - Current step number (bind to $clicks for automatic progression)
  
  Features:
    - 8 predefined workflow steps with detailed descriptions
    - Single panel display with smooth enter/leave transitions
    - Icon-based step identification using Carbon icons
    - HTML content support in step descriptions (inline code, etc.)
    - Step counter in panel heading
  
  Performance Optimizations:
    - Simplified computed properties (removed unused helper functions)
    - Bounds checking in currentStep calculation
    - CSS `will-change` and `contain` for panel animations
    - Optimized transition timing (0.3s with custom easing)
  
  Color Theme:
    - Purple (#8D8DFF): Icon backgrounds, borders
    - Light purple text: Step titles and content
    - Dark gradients: Panel background
  
  Usage:
    <DeveloperJourneySteps :active="$clicks" />
-->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ active?: number }>();

interface JourneyStep {
  id: string;
  icon: string;
  title: string;
  detail?: string;
  contextColor?: string;
}

const steps: JourneyStep[] = [
  {
    id: 'ticket',
    icon: 'i-carbon:ticket',
    title: 'Ticket arrives in your queue',
    detail: 'Add feature flag for the new checkout flow—seems simple enough.',
  },
  {
    id: 'flag-tool',
    icon: 'i-carbon:flag',
    title: 'Open the flag management UI',
    detail: 'Leave your IDE to create a new flag before you can even start coding.',
    contextColor: 'var(--switch-color)',
  },
  {
    id: 'create-flag',
    icon: 'i-carbon:add',
    title: 'Create the flag manually',
    detail: 'Enter metadata, variants, and defaults for `new-checkout-flow` by hand.',
  },
  {
    id: 'ide',
    icon: 'i-carbon:laptop',
    title: 'Jump back to your IDE',
    detail: 'Refocus on code after a tool switch. Hope you remember that flag key.',
    contextColor: 'var(--switch-color)',
  },
  {
    id: 'type-flag',
    icon: 'i-carbon:keyboard',
    title: 'Use the flag in code',
    detail:
      'Was it <code>new_checkout_flow</code> or <code>new-checkout-flow</code>? Copy-paste and memory rule the day.',
  },
  {
    id: 'open-pr',
    icon: 'i-carbon:document-add',
    title: 'Open a pull request',
    detail: 'Share changes for review, flag key and all.',
  },
  {
    id: 'reviewer',
    icon: 'i-carbon:user-avatar',
    title: 'Reviewer flags a concern',
    detail:
      '"Does this flag exist yet?" Extra review time checking something the compiler can\'t validate.',
  },
  {
    id: 'context-switch',
    icon: 'i-carbon:view-mode-2',
    title: 'Back to the flag tool again',
    detail: 'Break review flow to confirm the flag exists and matches the code.',
    contextColor: 'var(--switch-color)',
  },
];

// Optimized computed properties
const activeIndex = computed(() => (props.active ?? 0) - 1);
const currentStep = computed(() =>
  activeIndex.value >= 0 && activeIndex.value < steps.length
    ? steps[activeIndex.value]
    : undefined,
);
</script>

<template>
  <div class="journey-steps">
    <Transition name="panel">
      <div v-if="currentStep" class="journey-steps__panel">
        <div class="journey-steps__panel-icon" :class="currentStep.icon" />
        <div class="journey-steps__panel-body">
          <div class="journey-steps__panel-heading">
            <span class="journey-steps__panel-step">Step {{ activeIndex + 1 }}</span>
            <span class="journey-steps__panel-title">{{ currentStep.title }}</span>
          </div>
          <div v-if="currentStep.detail" class="journey-steps__panel-detail" v-html="currentStep.detail" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* CSS Custom Properties for developer journey theming */
:root {
  --switch-color: #f97373;
  --steps-bg-primary: rgba(54, 56, 85, 0.4);
    --steps-bg-secondary: rgba(26, 28, 44, 0.55);
    --steps-border-color: rgba(141, 141, 255, 0.35);
    --steps-purple-light: rgba(183, 185, 255, 0.95);
    --steps-ease: cubic-bezier(0.4, 0.15, 0.25, 1);
  }
  
  .journey-steps {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  
  /* Current step panel - main display */
  .journey-steps__panel {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.85rem;
    align-items: start;
    padding: 0.75rem 0.85rem;
    border-radius: 0.95rem;
    border: 1px solid var(--steps-border-color);
    background: linear-gradient(135deg, var(--steps-bg-primary), var(--steps-bg-secondary));
    box-shadow: 0 20px 42px rgba(60, 66, 110, 0.28);
    /* Optimize rendering */
    will-change: opacity, transform;
    contain: layout style;
  }
  
  .journey-steps__panel-icon {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.85rem;
    background: rgba(141, 141, 255, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--steps-purple-light);
    flex-shrink: 0;
  }
  
  .journey-steps__panel-body {
    min-width: 0;
  }
  
  .journey-steps__panel-heading {
    display: flex;
    gap: 0.75rem;
    align-items: baseline;
    flex-wrap: wrap;
  }
  
  .journey-steps__panel-step {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(214, 215, 255, 0.7);
    flex-shrink: 0;
  }
  
  .journey-steps__panel-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(241, 241, 255, 0.95);
    line-height: 1.3;
  }
  
  .journey-steps__panel-detail {
    margin-top: 0.35rem;
    font-size: 0.78rem;
    line-height: 1.5;
    color: rgba(217, 218, 255, 0.85);
  }
  
  .journey-steps__panel-detail :deep(code) {
    font-size: 0.75rem;
    padding: 0.05rem 0.35rem;
    background: rgba(52, 54, 78, 0.85);
    border-radius: 0.35rem;
    font-family: 'Fira Code', monospace;
  }
  
  /* Transition animations */
  .panel-enter-active,
  .panel-leave-active {
    transition:
      opacity 0.3s var(--steps-ease),
      transform 0.3s var(--steps-ease);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
