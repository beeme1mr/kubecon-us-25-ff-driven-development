<!--
  TicketCard Component

  Displays a task ticket resembling an issue tracker card (styled for presentations).
  Used to show the starting point of the FFDD workflow with a concrete feature request.

  Props:
    - ticketNumber: string - Ticket ID (e.g., "SHOP-4287")
    - title: string - Brief feature title
    - description: string - Detailed description of the work
    - acceptanceCriteria: string[] - List of requirements to meet
    - priority: 'Low' | 'Medium' | 'High' | 'Critical' - Priority level

  Styling:
    - Uses purple theme from uno.config.ts
    - Card-based layout with header, content, and criteria sections
    - Priority badge with color coding

  Usage:
    <TicketCard
      ticketNumber="SHOP-4287"
      title="Add Free Shipping Promotion Banner"
      description="Display banner on homepage..."
      :acceptanceCriteria="['Item 1', 'Item 2']"
      priority="High"
    />
-->
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  ticketNumber: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

const props = defineProps<Props>();

// Compute priority badge styling based on priority level
const priorityConfig = computed(() => {
  const configs = {
    Critical: {
      bgColor: 'bg-red-900/40',
      borderColor: 'border-red-600',
      textColor: 'text-red-300',
      icon: 'i-carbon:warning-alt'
    },
    High: {
      bgColor: 'bg-orange-900/40',
      borderColor: 'border-orange-600',
      textColor: 'text-orange-300',
      icon: 'i-carbon:arrow-up'
    },
    Medium: {
      bgColor: 'bg-blue-900/40',
      borderColor: 'border-blue-600',
      textColor: 'text-blue-300',
      icon: 'i-carbon:subtract'
    },
    Low: {
      bgColor: 'bg-green-900/40',
      borderColor: 'border-green-600',
      textColor: 'text-green-300',
      icon: 'i-carbon:arrow-down'
    }
  };

  return configs[props.priority] || configs.Medium;
});
</script>

<template>
  <div class="card-purple glow-purple-soft max-w-xl mx-auto overflow-hidden">
    <!-- Header with ticket number and priority -->
    <div class="flex items-center justify-between px-5 py-3 border-b border-purple-medium">
      <div class="flex items-center gap-3">
        <div
          class="bg-gradient-purple w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style="box-shadow: 0 2px 12px rgba(141,141,255,0.15);"
        >
          <div class="i-carbon:ticket text-purple-bright text-lg" />
        </div>
        <div>
          <div class="text-xs opacity-70 font-mono">{{ ticketNumber }}</div>
          <div class="text-lg font-semibold text-purple-light">{{ title }}</div>
        </div>
      </div>

      <!-- Priority badge -->
      <div
        :class="[
          priorityConfig.bgColor,
          priorityConfig.borderColor,
          priorityConfig.textColor,
          'border rounded px-2 py-1 flex items-center gap-1.5'
        ]"
      >
        <div :class="[priorityConfig.icon, 'text-sm']" />
        <span class="text-xs font-semibold">{{ priority }}</span>
      </div>
    </div>

    <!-- Description -->
    <div class="px-5 py-3 border-b border-purple-medium">
      <div class="text-xs opacity-70 mb-1.5 font-semibold">Description</div>
      <div class="text-sm opacity-90 leading-relaxed">{{ description }}</div>
    </div>

    <!-- Acceptance Criteria -->
    <div class="px-5 py-3">
      <div class="text-xs opacity-70 mb-2 font-semibold">Acceptance Criteria</div>
      <div class="space-y-1.5">
        <div
          v-for="(criterion, index) in acceptanceCriteria"
          :key="index"
          class="flex items-start gap-2"
        >
          <div
            class="bg-gradient-purple w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
            style="box-shadow: 0 1px 8px rgba(141,141,255,0.2);"
          >
            <div class="i-carbon:checkbox text-xs" />
          </div>
          <div class="text-xs opacity-85 leading-relaxed">{{ criterion }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
