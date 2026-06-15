<script setup lang="ts">
interface MarqueeItem {
  sid?: string
  iid?: string
  title: string
  description?: string
  photo?: string
  poster?: string
  path: string
}

defineProps<{
  items: MarqueeItem[]
}>()
</script>

<template>
  <UMarquee
    class="py-0 max-w-3xl mx-auto"
    pause-on-hover
  >
    <UUser
      v-for="item in items"
      :key="item.sid || item.iid"
      :name="item.title"
      :description="item.description"
      :avatar="{
        src: item.photo || item.poster || '',
        loading: 'lazy',
        class: item.poster ? 'rounded-sm' : ''
      }"
      :ui="{ name: 'line-clamp-1', description: 'line-clamp-1' }"
      :to="item.path"
      size="lg"
      class="max-w-80 border border-default"
    />
  </UMarquee>
</template>
