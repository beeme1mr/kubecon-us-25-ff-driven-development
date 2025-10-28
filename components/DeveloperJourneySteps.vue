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
    gap: 1.1rem;
    align-items: start;
    padding: 1.15rem 1.35rem;
    border-radius: 1.15rem;
    border: 1.5px solid #a3a3ff;
    background: linear-gradient(135deg, rgba(54,56,85,0.82), rgba(26,28,44,0.92));
    box-shadow: 0 8px 32px 0 rgba(60,66,110,0.38), 0 0 0 2px rgba(141,141,255,0.08);
    will-change: opacity, transform;
    contain: layout style;
    transition: box-shadow 0.3s var(--steps-ease), background 0.3s var(--steps-ease);
  }
  
  .journey-steps__panel-icon {
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(141,141,255,0.32), rgba(183,185,255,0.18));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    color: #e0e0ff;
    flex-shrink: 0;
    box-shadow: 0 2px 12px rgba(141,141,255,0.12);
  }
  
  .journey-steps__panel-body {
    min-width: 0;
  }
  
  .journey-steps__panel-heading {
    display: flex;
    gap: 0.85rem;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: 0.15rem;
  }

  .journey-steps__panel-step {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #b7b9ff;
    flex-shrink: 0;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(141,141,255,0.18);
  }

  .journey-steps__panel-title {
    font-size: 1.18rem;
    font-weight: 700;
    color: #f3f3ff;
    line-height: 1.32;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 8px rgba(141,141,255,0.12);
  }

  .journey-steps__panel-detail {
    margin-top: 0.45rem;
    font-size: 0.92rem;
    line-height: 1.6;
    color: #e3e4ff;
    text-shadow: 0 1px 4px rgba(141,141,255,0.08);
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  .journey-steps__panel-detail :deep(code) {
    font-size: 0.85rem;
    padding: 0.08rem 0.45rem;
    background: rgba(52, 54, 78, 0.95);
    border-radius: 0.35rem;
    font-family: 'Fira Code', monospace;
    color: #ffd700;
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(141,141,255,0.08);
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
