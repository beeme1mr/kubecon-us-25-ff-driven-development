<!--
  VideoCallout Component

  A callout overlay component designed to work with PresentationVideo.
  Automatically shows/hides based on the parent video's active callout state.
  Optionally displays a FancyArrow pointing to elements in the video.

  Props:
    - id: string (required) - Unique identifier for this callout
    - position: string (optional) - CSS positioning classes (e.g., "top-40 left-80")
    - arrowTo: string (optional) - FancyArrow target selector
    - arrowArc: number (optional) - Arrow arc curvature (default: 0)
    - arrowColor: string (optional) - Arrow color (default: current theme color)
    - arrowWidth: number (optional) - Arrow stroke width (default: 3)

  Features:
    - Auto-registration with parent PresentationVideo via inject
    - Visibility controlled by parent's activeCallouts state
    - Optional FancyArrow integration for pointing annotations
    - Flexible positioning with UnoCSS classes
    - Slot for custom callout content

  Usage:
    <PresentationVideo src="/demo.mp4" :segments="[...]">
      <VideoCallout
        id="highlight"
        position="top-20 left-40"
        arrow-to="#presentation-video@(250,80)"
        arrow-arc="-0.3"
        arrow-color="#2563eb"
      >
        <div class="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Important point here!
        </div>
      </VideoCallout>
    </PresentationVideo>

  Position Helper:
    Use UnoCSS utility classes for positioning:
    - top-10, top-20, top-40, etc. (4px increments)
    - left-10, right-10, etc.
    - Combine multiple classes: "top-40 left-80"
-->
<script setup lang="ts">
import { inject, computed, Ref } from 'vue'

interface Props {
  id: string;
  position?: string;
  arrowTo?: string;
  arrowArc?: number;
  arrowColor?: string;
  arrowWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: '',
  arrowArc: 0,
  arrowWidth: 3
});

// Inject active callouts from parent PresentationVideo
const activeCallouts = inject<Ref<string[]>>('activeCallouts', { value: [] } as unknown as Ref<string[]>)

// Compute visibility based on whether this callout's ID is active
const isVisible = computed(() => {
  return activeCallouts.value.includes(props.id)
})

// Compute callout data-id for arrow targeting
const calloutDataId = computed(() => `callout-${props.id}`)

// Build arrow "from" selector
const arrowFrom = computed(() => `[data-id=${calloutDataId.value}]@left`)

// Compute arrow options
const arrowOptions = computed(() => ({
  color: props.arrowColor,
  strokeWidth: props.arrowWidth
}))
</script>

<template>
  <div v-if="isVisible" class="video-callout-wrapper">
    <!-- Callout content -->
    <div
      :data-id="calloutDataId"
      class="absolute"
      :class="position"
    >
      <slot />
    </div>

    <!-- Optional FancyArrow -->
    <FancyArrow
      v-if="arrowTo"
      :from="arrowFrom"
      :to="arrowTo"
      :arc="arrowArc"
      :options="arrowOptions"
    />
  </div>
</template>

<style scoped>
.video-callout-wrapper {
  pointer-events: none;
}

.video-callout-wrapper > * {
  pointer-events: auto;
}
</style>
