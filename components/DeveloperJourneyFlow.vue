<!--
  DeveloperJourneyFlow Component
  
  Visual workflow diagram showing developer context switching between tools.
  Displays 4 workflow nodes (Ticket → Flag Tool → IDE → Pull Request) with
  animated progress indicators and context switch tracking.
  
  Props:
    - active?: number - Current step number (bind to $clicks for automatic progression)
  
  Features:
    - Grid-based horizontal layout with responsive nodes
    - Animated connectors showing workflow progress
    - Context switch badges appearing on transitions
    - Summary chip displaying total context switches
    - FancyArrow integration for loop-back visualization
  
  Performance Optimizations:
    - Stable computed `showArrow` prevents FancyArrow remounting (fixes animation jitter)
    - CSS `will-change` and `contain` for smooth animations
    - Memoized style calculations
    - Optimized transition timings
  
  Color Theme:
    - Purple (#8D8DFF): Active/visited states, brand color
    - Salmon (#FA8072): Context switch warnings
    - Golden Yellow (#FAD16E): Summary information
  
  Usage:
    <DeveloperJourneyFlow :active="$clicks" />
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{ active?: number }>();

interface HighlightRange {
  start: number;
  end: number;
}

interface FlowNode {
  id: string;
  label: string;
  description: string;
  icon: string;
  ranges: HighlightRange[];
  start: number;
}

interface FlowSegment {
  id: string;
  ranges: HighlightRange[];
  start: number;
  contextLabel?: string;
  badgeBelow?: boolean;
  badgePosition?: number;
  terminal?: boolean;
}

const TOTAL_FLOW_STEPS = 8;
const flowClickSteps = Array.from({ length: TOTAL_FLOW_STEPS }, (_, index) => index + 1);

const nodes: FlowNode[] = [
  {
    id: 'ticket',
    label: 'Ticket',
    description: 'Ticket assigned',
    icon: 'i-carbon:ticket',
    ranges: [{ start: 1, end: 1 }],
    start: 1,
  },
  {
    id: 'flag',
    label: 'Flag Tool',
    description: 'Create flag',
    icon: 'i-carbon:flag',
    ranges: [
      { start: 2, end: 3 },
      { start: 8, end: 8 },
    ],
    start: 2,
  },
  {
    id: 'ide',
    label: 'IDE',
    description: 'Copy key to code',
    icon: 'i-carbon:laptop',
    ranges: [{ start: 4, end: 5 }],
    start: 4,
  },
  {
    id: 'pr',
    label: 'Pull Request',
    description: 'PR review',
    icon: 'i-carbon:pull-request',
    ranges: [{ start: 6, end: 7 }],
    start: 6,
  },
];

const segments: FlowSegment[] = [
  {
    id: 'ticket-flag',
    ranges: [{ start: 2, end: 3 }],
    start: 2,
    contextLabel: '#1',
    badgePosition: 33,
  },
  {
    id: 'flag-ide',
    ranges: [{ start: 4, end: 5 }],
    start: 4,
    contextLabel: '#2',
    badgePosition: 60,
  },
  {
    id: 'ide-pr',
    ranges: [{ start: 6, end: 6 }],
    start: 6,
  },
  {
    id: 'pr-flag-back',
    ranges: [{ start: 8, end: 8 }],
    start: 8,
    contextLabel: '#3',
    badgeBelow: true,
    badgePosition: 82,
    terminal: true,
  },
];

const loopSegment = segments.find((segment) => segment.terminal);

// Optimized helper functions with memoization-friendly structure
const isActiveInRanges = (ranges: HighlightRange[], active: number) =>
  ranges.some((range) => active >= range.start && active <= range.end);

const hasBeenVisited = (start: number, active: number) => active >= start;

const activeValue = computed(() => props.active ?? 0);

const activeContextCount = computed(() => {
  const current = activeValue.value;
  if (current >= 8) return 3;
  if (current >= 4) return 2;
  if (current >= 2) return 1;
  return 0;
});

// Memoize badge style to prevent recalculation
const getBadgeStyle = (segment: FlowSegment) =>
  segment.badgePosition !== undefined ? { left: `${segment.badgePosition}%` } : undefined;

// Delayed arrow visibility to prevent flashing during node transitions
// The arrow should only appear after the target nodes have finished their 0.35s transition
const showArrowImmediate = computed(
  () => loopSegment && isActiveInRanges(loopSegment.ranges, activeValue.value),
);

const showArrow = ref(false);
let arrowTimeout: ReturnType<typeof setTimeout> | null = null;

watch(showArrowImmediate, (shouldShow) => {
  // Clear any pending timeout
  if (arrowTimeout) {
    clearTimeout(arrowTimeout);
    arrowTimeout = null;
  }

  if (shouldShow) {
    // Delay showing the arrow until after node transitions complete (350ms + small buffer)
    arrowTimeout = setTimeout(() => {
      showArrow.value = true;
    }, 400);
  } else {
    // Hide immediately when navigating away
    showArrow.value = false;
  }
});
</script>

<template>
  <div class="journey-flow">
    <div class="flow-track">
      <template v-for="(node, index) in nodes" :key="node.id">
        <div :data-id="`flow-node-${index}`" class="flow-node" :class="{
          'flow-node--active': isActiveInRanges(node.ranges, activeValue),
          'flow-node--visited': hasBeenVisited(node.start, activeValue),
        }">
          <div class="flow-node__icon" :class="node.icon" />
          <div>
            <div class="flow-node__label">{{ node.label }}</div>
            <div class="flow-node__description">{{ node.description }}</div>
          </div>
        </div>

        <div v-if="index < segments.length - 1" class="flow-segment-wrapper">
          <div class="flow-segment" :class="{
  'flow-segment--active': isActiveInRanges(segments[index].ranges, activeValue),
  'flow-segment--visited': hasBeenVisited(segments[index].start, activeValue),
  'flow-segment--terminal': segments[index].terminal,
}" />

          <Transition name="badge">
            <div v-if="segments[index].contextLabel && isActiveInRanges(segments[index].ranges, activeValue)"
              class="context-badge" :class="{ 'context-badge--flip': segments[index].badgeBelow }"
              :style="getBadgeStyle(segments[index])">
              Context switch {{ segments[index].contextLabel }}
            </div>
          </Transition>
        </div>
      </template>
    </div>

    <Transition name="summary">
      <div v-if="activeContextCount > 0" class="summary-chip">
        <span class="i-carbon:repeat flow-chip__icon" />
        <span>Context switches: {{ activeContextCount }}</span>
      </div>
    </Transition>

    <!-- Use v-show and stable computed to prevent FancyArrow remounting -->
    <FancyArrow v-show="showArrow" from="[data-id=flow-node-3]@bottom" to="[data-id=flow-node-1]@bottom" arc="0.1"
      :options="{ color: '#2563eb', strokeWidth: 3 }">
      <div class="context-badge">Context switch #3</div>
    </FancyArrow>

    <!-- Hidden click registrar for Slidev v-click integration -->
    <div class="click-registrar" aria-hidden="true">
      <span v-for="step in flowClickSteps" :key="`flow-step-${step}`" v-click="step" class="click-registrar__item" />
    </div>
  </div>
</template>

<style scoped>
/* CSS Custom Properties for consistent theming */
.journey-flow {
  --flow-ease: cubic-bezier(0.4, 0.15, 0.25, 1);
  --flow-bg-primary: rgba(54, 56, 85, 0.5);
    --flow-bg-secondary: rgba(24, 26, 38, 0.45);
    --flow-border-color: rgba(139, 140, 215, 0.28);
    --flow-purple-light: rgba(141, 141, 255, 0.8);
    --flow-purple-glow: rgba(109, 118, 255, 0.35);
    --flow-context-warning: rgba(250, 128, 114, 1);
      --flow-summary-color: rgba(250, 209, 110, 1);
    
      position: relative;
      padding: 1.65rem 1.85rem 1.25rem;
      border-radius: 0.95rem;
      background: linear-gradient(135deg, var(--flow-bg-primary), var(--flow-bg-secondary));
      border: 1px solid var(--flow-border-color);
      box-shadow: 0 32px 60px rgba(40, 44, 72, 0.35);
    }
    
    /* Grid-based flow track for responsive node layout */
        .flow-track {
          display: grid;
          grid-template-columns: repeat(11, minmax(0, 1fr));
          align-items: center;
          gap: 0.9rem;
        }
    
        /* Flow nodes - main workflow steps */
        .flow-node {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 7.2rem;
          padding: 0.62rem 0.78rem;
          border-radius: 0.75rem;
          background: rgba(24, 26, 38, 0.62);
          border: 1px solid rgba(122, 126, 160, 0.38);
          transition:
            border 0.35s var(--flow-ease),
            box-shadow 0.35s var(--flow-ease),
            background 0.35s var(--flow-ease),
            transform 0.35s var(--flow-ease);
          opacity: 0.45;
          grid-column: span 2;
          /* Optimize rendering performance */
          will-change: opacity, transform;
          contain: layout style;
        }
    
        .flow-node--visited {
          opacity: 0.7;
        }
    
        .flow-node--active {
          opacity: 1;
          border-color: var(--flow-purple-light);
          background: radial-gradient(circle at top,
              rgba(141, 141, 255, 0.25),
              rgba(30, 32, 50, 0.75));
          box-shadow: 0 0 25px var(--flow-purple-glow);
          transform: translateY(-2px);
        }
    
        .flow-node__icon {
          width: 1.9rem;
          height: 1.9rem;
          border-radius: 0.6rem;
          background: rgba(141, 141, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          color: #b7b9ff;
          flex-shrink: 0;
        }
    
        .flow-node__label {
          font-weight: 600;
          font-size: 0.8rem;
          line-height: 1.3;
          max-width: 7rem;
          white-space: normal;
        }
    
        .flow-node__description {
          font-size: 0.64rem;
          opacity: 0.65;
          max-width: 7rem;
          white-space: normal;
        }
    
        /* Segment connectors between nodes */
        .flow-segment-wrapper {
          position: relative;
          min-width: 2.4rem;
          grid-column: span 1;
        }
    
        .flow-segment {
          position: relative;
          height: 0.28rem;
          border-radius: 999px;
          background: rgba(88, 92, 128, 0.4);
          padding-right: 0.65rem;
          transition:
            background 0.35s var(--flow-ease),
            box-shadow 0.35s var(--flow-ease);
        }
    
        .flow-segment--visited {
          background: rgba(115, 119, 168, 0.55);
        }
    
        .flow-segment--active {
          background: linear-gradient(90deg, rgba(93, 93, 255, 0.8), rgba(171, 171, 255, 0.65));
          box-shadow: 0 0 18px rgba(141, 141, 255, 0.45);
        }
    
        /* Arrow indicators on segments */
        .flow-segment::after {
          content: '';
          position: absolute;
          right: -0.65rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 0.3rem solid transparent;
          border-bottom: 0.3rem solid transparent;
          border-left: 0.55rem solid rgba(115, 119, 168, 0.55);
          transition:
            border-left-color 0.35s var(--flow-ease),
            border-left-width 0.35s var(--flow-ease);
        }
    
        .flow-segment--visited::after {
          border-left-color: rgba(141, 141, 255, 0.55);
        }
    
        .flow-segment--active::after {
          border-left-color: rgba(171, 171, 255, 0.85);
          border-left-width: 0.65rem;
        }
    
        .flow-segment--terminal::after {
          display: none;
        }
    
        /* Context switch warning badges */
        .context-badge {
          position: absolute;
          top: -2.75rem;
          left: 50%;
          transform: translate(-50%, 0);
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          background: var(--flow-context-warning);
          border: 1px solid rgba(250, 128, 114, 0.75);
          z-index: 10;
          font-size: 0.6rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          transition:
            transform 0.35s var(--flow-ease),
            opacity 0.35s var(--flow-ease);
        }
    
        .context-badge--flip {
          top: auto;
          bottom: -1.55rem;
        }
    
        /* Summary chip showing total context switches */
        .summary-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          position: absolute;
          top: -0.9rem;
          right: 0.8rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: var(--flow-summary-color);
          border: 1px solid rgba(250, 209, 110, 0.45);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(46, 44, 44, 0.9);
          min-width: 10.5rem;
          justify-content: center;
          box-shadow: 0 12px 28px rgba(250, 209, 110, 0.18);
        }
    
        .flow-chip__icon {
          font-size: 1rem;
        }
    
        /* Hidden click registrar for Slidev integration */
        .click-registrar {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          display: flex;
        }
    
        .click-registrar__item {
          width: 0;
          height: 0;
        }
    
        /* Transition animations */
        .badge-enter-active,
        .badge-leave-active,
        .summary-enter-active,
        .summary-leave-active {
          transition:
            opacity 0.25s var(--flow-ease),
            transform 0.25s var(--flow-ease);
}

.badge-enter-from,
.badge-leave-to,
.summary-enter-from,
.summary-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
