<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
    <LazyUModal
      v-for="(image, index) in images"
      :key="index"
      :title="image.title"
      :ui="{
        title: 'pe-8'
      }"
    >
      <!-- Trigger: The gallery item -->
      <div class="overflow-hidden bg-default border-2 border-default rounded-md cursor-pointer group">
        <div class="w-full aspect-video object-cover rounded-t-md overflow-hidden">
          <LazyNuxtImg
            v-if="image.src"
            :src="image.src"
            :alt="image.title"
            class=" group-hover:scale-105 transition-all duration-150 ease-in-out group-hover:mix-blend-luminosity group-hover:opacity-30"
            loading="lazy"
            format="webp"
          />
          <UPlaceholder
            v-else
            class="scale-90 mt-1"
          >
            <UIcon
              name="i-lucide-image-off"
              class="size-12 bg-neutral-200 dark:bg-neutral-800"
            />
          </UPlaceholder>
        </div>

        <p class="text-xs font-medium text-default p-3">
          {{ image.title }}
        </p>
      </div>

      <!-- Modal content: Full-resolution image -->
      <template #body>
        <div class="relative bg-default">
          <LazyNuxtImg
            v-if="image.src"
            :src="image.src"
            :alt="image.title"
            class="w-auto h-auto max-w-full max-h-[90vh] mx-auto"
            loading="lazy"
            scrollable
          />
          <UPlaceholder
            v-else
            class="w-full h-64"
          >
            <UIcon
              name="i-lucide-image-off"
              class="size-12 bg-neutral-200 dark:bg-neutral-800"
            />
          </UPlaceholder>
          <!-- <div class="p-4 text-center border-t border-default">
            <p class="text-default font-medium">
              {{ image.title }}
            </p>
          </div> -->
        </div>
      </template>
    </LazyUModal>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  title: string
}

defineProps<{
  images: GalleryImage[]
}>()
</script>
