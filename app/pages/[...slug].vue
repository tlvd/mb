<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs')
  .select('title', 'seo', 'description', 'body', 'links', 'path', 'stem', 'extension')
  .path(route.path)
  .first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description']
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImage('Docs.takumi', { title, description, headline: headline.value })

const links = computed(() => {
  const links = []
  if (toc?.bottom?.edit) {
    links.push({
      icon: 'i-lucide-external-link',
      label: 'ערוך דף',
      to: `${toc.bottom.edit}/${page?.value?.stem}.${page?.value?.extension}`,
      target: '_blank'
    })
  }

  return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})
</script>

<template>
  <UPage v-if="page">
    <div class="mt-6 bg-neutral-100 dark:bg-neutral-800/50 py-6 px-4 md:px-8 rounded-xl mb-8">
      <header class="flex">
        <div class="flex flex-col w-full mb-8">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-primary">
              {{ headline }}
            </h2>
            <UButton
              v-for="(link, index) in page.links"
              :key="index"
              v-bind="link"
            />
            <PageHeaderLinks class="hidden md:flex" />
          </div>
          <div class="flex items-center justify-between mt-4 mb-4">
            <!-- <div class="flex items-center"> -->
            <h1 class="text-4xl font-bold tracking-tight font-sans -mt-1 w-full">
              {{ page.title }}
            </h1>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-muted">
              {{ page.description }}
            </p>
          </div>
        </div>
      </header>
      <USeparator />

      <UPageBody class="pb-12">
        <ContentRenderer
          v-if="page"
          :value="page"
        />
      </UPageBody>
    </div>
    <UContentSurround :surround="surround" />

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '--mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
