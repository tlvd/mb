<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <UPageCard class="my-6">
    <div v-if="id">
      <iframe

        :src="'https://www.youtube.com/embed/' + id + '?hl=he'"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="w-full rounded-lg aspect-video"
      />
      <UButton
        icon="i-lucide-link"
        size="sm"
        color="neutral"
        variant="soft"
        class="mt-4 w-full"
        :to="'https://www.youtube.com/watch?v=' + id"
        target="_blank"
      >
        {{ 'https://www.youtube.com/watch?v=' + id }}
      </UButton>
    </div>
    <UPlaceholder
      v-else
      class="min-h-24 aspect-video"
    >
      <UIcon
        name="i-lucide-video-off"
        class="size-20 md:size-32 bg-neutral-200 dark:bg-neutral-800"
      />
    </UPlaceholder>
  </UPageCard>
</template>
