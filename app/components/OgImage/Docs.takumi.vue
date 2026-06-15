<script setup lang="ts">
defineOptions({
  inheritAttrs: true
})

defineProps<{
  headline?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="w-full h-full flex bg-neutral-950 relative overflow-hidden"
    data-theme="dark"
  >
    <div class="absolute top-0 left-0 w-1.5 h-full bg-primary-400" />

    <div class="flex flex-col justify-between flex-1 px-20 py-16">
      <div />

      <div class="flex flex-col gap-5">
        <span
          v-if="headline"
          class="text-2xl font-normal text-primary-400"
        >
          {{ headline }}
        </span>

        <h1
          v-if="title"
          class="text-6xl font-bold text-highlighted"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="text-3xl/11 text-muted"
          :style="{ lineClamp: 2, textOverflow: 'ellipsis' }"
        >
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00DC82"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="size-8"
        >
          <path
            d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
          />
        </svg>
        <div class="h-px flex-1 bg-border" />
        <span class="text-xl text-dimmed">משרתים בע"מ</span>
      </div>
    </div>
  </div>
</template>
