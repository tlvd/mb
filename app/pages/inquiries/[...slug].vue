<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: inquiry } = await useAsyncData(route.path, () => queryCollection('inquiries').path(route.path).first())
if (!inquiry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('inquiries', route.path, {
    fields: ['description']
  }).where('draft', 'IS NULL')
})

const title = inquiry.value.seo?.title || inquiry.value.title
const description = inquiry.value.seo?.description || inquiry.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = inquiry.value.office ? inquiry.value.office : computed(() => findPageHeadline(navigation?.value, inquiry.value?.path))

defineOgImageComponent('Docs', {
  headline: headline
})

const links = computed(() => {
  const links = []
  if (toc?.bottom?.edit) {
    links.push({
      icon: 'i-lucide-external-link',
      label: 'ערוך דף',
      to: `${toc.bottom.edit}/${inquiry?.value?.stem}.${inquiry?.value?.extension}`,
      target: '_blank'
    })
  }

  return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case 'טיוטה': return 'info'
    case 'פתוח': return 'primary'
    case 'סגור': return 'success'
    default: return 'neutral'
  }
}

// Fetch ALL servants (you could cache this)
const { data: allServants } = await useAsyncData('all-servants', () =>
  queryCollection('servants').all()
)

// Compute the involved servants by matching paths or SIDs
const involved = computed(() => {
  if (!inquiry.value?.involved?.length || !allServants.value?.length) {
    return []
  }

  const servantSIDs = new Set(inquiry.value.involved)

  // Filter out .navigation files and ensure we have valid servants
  return allServants.value.filter((servant) => {
    // Skip navigation files
    if (servant.path?.includes('.navigation')) return false
    // Must have a SID and match
    return servant.sid && servantSIDs.has(servant.sid)
  })
})

// Fetch ALL inquiries for related lookups
const { data: allInquiries } = await useAsyncData('all-inquiries', () => {
  return queryCollection('inquiries')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    .all()
})

// Compute related inquiries by matching iids
const related = computed(() => {
  if (!inquiry.value?.related?.length || !allInquiries.value?.length) {
    return []
  }

  const relatedIIDs = new Set(inquiry.value.related)

  // Filter inquiries whose iid is in the related array
  return allInquiries.value.filter((inq) => {
    // Skip the current inquiry itself
    if (inq.iid === inquiry.value?.iid) return false
    // Match by iid
    return inq.iid && relatedIIDs.has(inq.iid)
  })
})
</script>

<template>
  <UPage v-if="inquiry">
    <main class="mt-6 bg-neutral-100 dark:bg-neutral-800/50 py-6 px-4 md:px-8 rounded-xl mb-8">
      <header class="flex">
        <div class="flex flex-col w-full">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-primary">
              {{ headline }}
            </h2>
            <UButton
              v-for="(link, index) in inquiry.links"
              :key="index"
              v-bind="link"
            />
            <PageHeaderLinks class="hidden md:flex" />
          </div>
          <div class="flex items-center justify-between mt-4 mb-4">
            <!-- <div class="flex items-center"> -->
            <h1 class="text-4xl font-bold tracking-tight font-sans -mt-1 --max-w-lg">
              {{ inquiry.title }}
            </h1>
            <!-- </div> -->
          </div>
          <div class="flex items-center justify-between mb-6">
            <p class="text-muted">
              {{ inquiry.description }}
            </p>
          </div>
        </div>
      </header>

      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-4 md:p-6 mb-2 bg-default rounded-lg border border-default"
      >
        <div
          class="group col-span-2 relative overflow-hidden rounded bg-neutral-50 dark:bg-neutral-900 border-2 border-default hover:border-accented transition-all duration-200"
        >
          <NuxtLink to="#תיעודים">
            <NuxtImg
              v-if="inquiry.poster"
              :src="inquiry.poster"
              :alt="inquiry.posterTitle"
              class="w-full aspect-video object-cover transition-all duration-200 group-hover:scale-105"
              loading="lazy"
              format="webp"
            />
            <UPlaceholder
              v-else
              class="aspect-video"
            >
              <UIcon
                name="i-lucide-image"
                class="size-24 text-neutral-200 dark:text-neutral-800"
              />
            </UPlaceholder>
          </NuxtLink>
        </div>
      </section>

      <!-- Inquiry Meta -->
      <section class="grid grid-cols-3 md:grid-cols-4 items-center bg-default rounded-lg border border-default">
        <!-- Col 1 -->
        <div class="px-3 pt-2 pb-3 relative border-l border-dotted border-accented">
          <p class="text-xs text-dimmed mb-3">
            פניה מספר
          </p>
          <UBadge
            :label="inquiry.iid"
            variant="outline"
            color="neutral"
            size="md"
            class="tracking-wider mb-1"
          />
        </div>

        <!-- Col 2 -->
        <div class="px-3 pt-2 pb-3 relative border-l border-dotted border-accented">
          <p class="text-xs text-dimmed mb-3">
            מתאריך
          </p>
          <UBadge
            :label="inquiry.idate"
            variant="outline"
            color="neutral"
            size="md"
            class="tracking-wide mb-1"
          />
        </div>

        <!-- Col 3 -->
        <div class="hidden md:block px-3 pt-2 pb-3 relative border-l border-dotted border-accented">
          <p class="text-xs text-dimmed mb-3">
            ע"י
          </p>
          <UButton
            :label="inquiry.author"
            color="primary"
            variant="subtle"
            size="xs"
            class="tracking-wide mb-1"
          />
        </div>

        <!-- Col 4 -->
        <div class="px-3 pt-2 pb-3">
          <p class="text-xs text-dimmed mb-3">
            מצב
          </p>
          <UButton
            :label="inquiry.status"
            :color="getStatusColor(inquiry.status)"
            variant="subtle"
            size="xs"
            class="tracking-wide mb-1"
            :to="inquiry.path"
          />
        </div>
        <!-- Meta Section -->
        <div class="flex col-span-4 border-t border-accented border-dotted px-3 pt-2 pb-3 w-full">
          <p class="text-xs text-dimmed">
            מעורבים&nbsp;
            <UBadge
              :label="involved.length"
              size="sm"
              variant="soft"
              color="neutral"
            />
          </p>
        </div>
        <div
          :class="related.length ? 'pb-4' : ''"
          class="grid md:grid-cols-2 col-span-4 gap-3 px-3"
        >
          <UUser
            v-for="servant in involved"
            :key="servant.sid"
            :name="servant.title"
            :description="servant.description"
            :avatar="{
              src: servant.photo || '',
              loading: 'lazy'
            }"
            :ui="{ description: 'line-clamp-1' }"
            :to="servant.path"
          />
          <div
            v-if="!involved.length"
            class="-mt-1"
          >
            <UBadge
              label="טרם התקבל מידע על מעורבים בפניה זו"
              variant="soft"
              color="neutral"
              size="md"
              class="tracking-wide"
            />
          </div>
        </div>

        <!-- Meta Section -->
        <div
          v-if="related.length"
          class="flex col-span-4 border-t border-accented border-dotted px-3 pt-2 pb-3 w-full"
        >
          <p class="text-xs text-dimmed">
            פניות קשורות&nbsp;
            <UBadge
              :label="related.length"
              size="sm"
              variant="soft"
              color="neutral"
            />
          </p>
        </div>
        <div class="grid col-span-4 gap-2 px-3 pb-4 w-full">
          <UUser
            v-for="relatedInquiry in related"
            :key="relatedInquiry.iid"
            :name="relatedInquiry.title"
            :description="relatedInquiry.description"
            :avatar="{
              src: relatedInquiry.poster || '',
              loading: 'lazy',
              class: 'rounded-md'
            }"
            :ui="{ name: 'line-clamp-1', description: 'line-clamp-1' }"
            :to="relatedInquiry.path"
          />
          <!-- <UPageCard
            v-for="relatedInquiry in related"
            :key="relatedInquiry.iid || relatedInquiry.path"
            :ui="{
              container: 'p-4 sm:p-3 lg:p-2'
            }"
            variant="subtle"
            orientation="horizontal"
            class="overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
          >
            <template #header>
              <NuxtLink
                :to="relatedInquiry.path"
                class="mb-3"
              >
                <NuxtImg
                  :src="relatedInquiry.poster"
                  :alt="relatedInquiry.posterTitle || relatedInquiry.title"
                  class="--aspect-video --object-cover rounded-lg"
                  loading="lazy"
                  format="webp"
                />
              </NuxtLink>
            </template>

            <template #title>
              <NuxtLink
                :to="relatedInquiry.path"
                class="group -mt-2"
              >
                <h3 class="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {{ relatedInquiry.title }}
                </h3>
              </NuxtLink>
            </template>

            <template #description>
              <p class="text-sm text-muted line-clamp-3">
                {{ relatedInquiry.description || 'אין תיאור זמין' }}
              </p>
            </template>

            <template #footer>
              <div class="flex items-center justify-between gap-2 w-full text-xs text-dimmed">
                <UBadge
                  :label="relatedInquiry.office"
                  color="neutral"
                  size="sm"
                  variant="outline"
                />
                <div class="flex gap-2">
                  <UBadge
                    :label="relatedInquiry.idate"
                    color="neutral"
                    size="sm"
                    variant="soft"
                  />
                  <UBadge
                    :label="relatedInquiry.status || 'טרם הוגש'"
                    :color="getStatusColor(relatedInquiry.status || 'neutral')"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </div>
            </template>
          </UPageCard> -->
        </div>
      </section>

      <!-- Inquiry Body (Markdown) -->
      <UPageBody>
        <ContentRenderer
          v-if="inquiry"
          :value="inquiry"
        />
        <!-- Log -->
        <!-- <UPageCard
          variant="outline"
        >
          <LazyUTimeline
            v-if="inquiry?.events?.length"
            :items="inquiry.events"
            orientation="vertical"
            default-value="latest"
            size="lg"
            color="primary"
            class="w-full"
          />
        </UPageCard> -->
      </UPageBody>
    </main>
    <!-- End Main -->
    <UContentSurround
      :surround="surround"
      class="print:hidden"
    />

    <template
      v-if="inquiry?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="inquiry.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '--mt-6': inquiry.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="inquiry.body?.toc?.links?.length"
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
