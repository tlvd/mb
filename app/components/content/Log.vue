<template>
  <UPageCard
    variant="outline"
  >
    <LazyUTimeline
      v-if="events"
      :items="events"
      orientation="vertical"
      default-value="latest"
      size="lg"
      color="primary"
      class="w-full"
    />
  </UPageCard>
</template>

<script setup lang="ts">
interface eventsItem {
  src: string
  title: string
}

defineProps<{
  events: eventsItem[]
}>()
</script>
