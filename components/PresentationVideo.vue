<!--
  PresentationVideo Component

  A flexible video player for Slidev presentations with click-controlled playback,
  timed pauses, and support for synchronized callout overlays.

  Props:
    - src: string (required) - Video source URL
    - segments: Array<Segment> - Playback control segments tied to clicks
    - width: string (optional) - Video width (default: "100%")
    - maxWidth: string (optional) - Maximum video width (default: "800px")
    - controls: boolean (optional) - Show native video controls (default: false)
    - muted: boolean (optional) - Mute video audio (default: false)
    - poster: string (optional) - Video poster/thumbnail image
    - resetOnExit: boolean (optional) - Reset video when leaving slide (default: true)

  Segment Configuration:
    Each segment controls video behavior at a specific click:
    - click: number - Which click number triggers this segment
    - action: 'play' | 'resume' | 'pause' - Playback action
    - pauseAfter: number (optional) - Milliseconds before auto-pausing
    - showCallouts: string[] (optional) - Array of callout IDs to show immediately
    - showCalloutsOnPause: string[] (optional) - Array of callout IDs to show when auto-pause occurs

  Features:
    - Integrates with Slidev's click system ($clicks)
    - Manages video playback state automatically
    - Provides activeCallouts state to VideoCallout children via provide/inject
    - Automatic cleanup of timeouts and state
    - Resets to initial state when navigating away from slide

  Usage:
    <PresentationVideo
      src="/demo.mp4"
      :segments="[
        { click: 1, action: 'play', pauseAfter: 2000, showCallouts: ['intro'] },
        { click: 2, action: 'resume', showCallouts: ['details'] }
      ]"
    >
      <VideoCallout id="intro" position="top-10 left-20">
        Introduction point
      </VideoCallout>
      <VideoCallout id="details" position="top-30 right-10">
        More details
      </VideoCallout>
    </PresentationVideo>
-->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, provide, computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Type augmentation for Vite environment variables
declare global {
  interface ImportMeta {
    env: {
      BASE_URL: string;
      [key: string]: any;
    }
  }
}

interface Segment {
  click: number;
  action: 'play' | 'resume' | 'pause';
  pauseAfter?: number;
  showCallouts?: string[];
  showCalloutsOnPause?: string[];
}

interface Props {
  src: string;
  segments?: Segment[];
  width?: string;
  maxWidth?: string;
  controls?: boolean;
  muted?: boolean;
  poster?: string;
  resetOnExit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  segments: () => [],
  width: '100%',
  maxWidth: '800px',
  controls: false,
  muted: false,
  resetOnExit: true
});

const slideContext = useSlideContext()
const videoRef = ref<HTMLVideoElement | null>(null)
const activeCallouts = ref<string[]>([])
let pauseTimeout: NodeJS.Timeout | null = null

// Provide activeCallouts to child VideoCallout components
provide('activeCallouts', activeCallouts)
provide('videoElementId', 'presentation-video')

// Find segment for current click
const getSegmentForClick = (clickValue: number): Segment | undefined => {
  return props.segments.find(s => s.click === clickValue)
}

// Reset video to initial state
const resetVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
  activeCallouts.value = []

  // Clear any pending timeout
  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
    pauseTimeout = null
  }
}

// Handle playback for a segment
const handleSegment = (segment: Segment) => {
  if (!videoRef.value) return

  // Clear any existing timeout
  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
    pauseTimeout = null
  }

  // Update active callouts
  if (segment.showCallouts) {
    activeCallouts.value = [...segment.showCallouts]
  } else {
    activeCallouts.value = []
  }

  // Execute action
  switch (segment.action) {
    case 'play':
      videoRef.value.currentTime = 0
      videoRef.value.play()
      break
    case 'resume':
      videoRef.value.play()
      break
    case 'pause':
      videoRef.value.pause()
      break
  }

  // Set up auto-pause if configured
  if (segment.pauseAfter && segment.action !== 'pause') {
    pauseTimeout = setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.pause()
      }
      // Show callouts on pause if configured
      if (segment.showCalloutsOnPause) {
        activeCallouts.value = [...segment.showCalloutsOnPause]
      }
      pauseTimeout = null
    }, segment.pauseAfter)
  }
}

// Watch for click changes
watch(() => slideContext.$clicks.value, (newVal) => {
  if (newVal === 0) {
    // Reset to initial state when returning to start
    resetVideo()
  } else {
    const segment = getSegmentForClick(newVal)
    if (segment) {
      handleSegment(segment)
    }
  }
})

// Lifecycle hooks
onMounted(() => {
  resetVideo()
})

onUnmounted(() => {
  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
  }
})

// Compute video style
const videoStyle = computed(() => ({
  width: props.width,
  maxWidth: props.maxWidth
}))

// Compute video source with base URL
const videoSrc = computed(() => {
  const base = import.meta.env.BASE_URL || '/'
  // Remove trailing slash from base and leading slash from src to avoid double slashes
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
  const cleanSrc = props.src.startsWith('/') ? props.src : `/${props.src}`
  return `${cleanBase}${cleanSrc}`
})
</script>

<template>
  <div class="relative presentation-video-container">
    <video ref="videoRef" :id="'presentation-video'" class="rounded-lg glow-purple-soft" :style="videoStyle"
      :controls="controls" :muted="muted" :poster="poster">
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Callout slot for child VideoCallout components -->
    <slot />
  </div>
</template>

<style scoped>
.presentation-video-container {
  display: inline-block;
}

video {
  display: block;
}
</style>
