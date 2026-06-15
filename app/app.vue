<script setup lang="ts">
import { he } from '@nuxt/ui/locale'

const { seo } = useAppConfig()

// Navigation for docs (filtered)
const { navigation } = useSiteNavigation()
// const { data: navigation } = await useAsyncData('navigation', () => {
//   return queryCollectionNavigation('docs').where('path', 'LIKE', '/info%')
// })
// Combined navigation for search - include all collections
const { data: searchNavigation } = await useAsyncData('searchNav', async () => {
  const [docsNav, inquiriesNav, servantsNav] = await Promise.all([
    queryCollection('docs').all(),
    queryCollection('inquiries').all(),
    queryCollection('servants').all()
  ])

  // Convert collection items to navigation items format
  const formatNavItems = (items: { title?: string, name?: string, path: string }[]) => {
    return items.map(item => ({
      title: item.title || item.name || item.path.split('/').pop(),
      path: item.path,
      children: []
    }))
  }

  // Combine all navigation items
  return [
    ...formatNavItems(docsNav),
    ...formatNavItems(inquiriesNav),
    ...formatNavItems(servantsNav)
  ]
})

// Combined search sections from all collections
const { data: files } = useLazyAsyncData('search', async () => {
  const [docsSections, inquiriesSections, servantsSections] = await Promise.all([
    queryCollectionSearchSections('docs'), // Correct. No .all()
    queryCollectionSearchSections('inquiries', {
      extraFields: ['iid']
    }), // Correct. No .all()
    queryCollectionSearchSections('servants', {
      extraFields: ['sid']
    }) // Correct. No .all()
  ])

  // Combine all search sections
  return [...docsSections, ...inquiriesSections, ...servantsSections]
}, {
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'משרתים בע"מ' }
  ],
  link: [
    { rel: 'icon', href: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  htmlAttrs: {
    lang: 'he',
    class: 'scroll-smooth'
  }
})

useSeoMeta({
  titleTemplate: `%s`,
  // titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp
    dir="rtl"
    :locale="he"
  >
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="searchNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
