<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: servant } = await useAsyncData(route.path, () => queryCollection('servants').path(route.path).first())
if (!servant.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('servants', route.path, {
    fields: ['description']
  })
})

// Fetch related inquiries
const { data: allInquiries } = await useAsyncData(`${route.path}-inquiries`, () => {
  return queryCollection('inquiries')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    .all()
})

const servantData = servant.value

const servantInquiries = computed(() => {
  if (!allInquiries.value?.length || !servantData.sid) return []

  return allInquiries.value.filter(inquiry =>
    inquiry.involved?.includes(servantData.sid!)
  ).sort((a, b) => {
    if (a.idate && b.idate) {
      return new Date(b.idate).getTime() - new Date(a.idate).getTime()
    }
    return 0
  })
})

const title = servant.value.seo?.title || servant.value.title
const description = servant.value.seo?.description || servant.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = servant.value.office ? servant.value.office : computed(() => findPageHeadline(navigation?.value, servant.value?.path))

defineOgImage('Docs.takumi', { title, description, headline: headline })

const links = computed(() => {
  const links = []
  if (toc?.bottom?.edit) {
    links.push({
      icon: 'i-lucide-external-link',
      label: 'ערוך דף',
      to: `${toc.bottom.edit}/${servant?.value?.stem}.${servant?.value?.extension}`,
      target: '_blank'
    })
  }

  return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})
</script>

<template>
  <UPage v-if="servant">
    <div class="mt-6 bg-neutral-100 dark:bg-neutral-800/50 py-6 px-4 md:px-8 rounded-xl mb-8">
      <header class="flex">
        <UAvatar
          :alt="servant.title"
          :src="servant.photo"
          class="me-6 mt-3"
          size="6xl"
        />
        <div class="flex flex-col w-full mb-8">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-primary">
              {{ headline }}
            </h2>
            <UButton
              v-for="(link, index) in servant.links"
              :key="index"
              v-bind="link"
            />
            <PageHeaderLinks class="hidden md:flex" />
          </div>
          <div class="flex items-center justify-between mt-4 mb-4">
            <!-- <div class="flex items-center"> -->
            <h1 class="text-4xl font-bold tracking-tight font-sans -mt-1 w-full">
              {{ servant.title }}
            </h1>
            <!-- </div> -->
          </div>
          <div class="flex items-center justify-between">
            <p class="text-muted">
              {{ servant.description }}
            </p>
          </div>
        </div>
      </header>

      <!-- Servant Meta -->
      <section class="grid grid-cols-3 md:grid-cols-6 items-start bg-default rounded-lg border border-default">
        <!-- Col 1 -->
        <div class="px-3 pt-2 pb-3 col-span-1 relative border-l border-dotted border-accented h-full">
          <p class="text-xs text-dimmed mb-3">
            מספר משרת
          </p>
          <UBadge
            v-if="servant.oid"
            :label="servant.oid"
            variant="outline"
            color="neutral"
            size="md"
            class="tracking-wider mb-1"
          />
          <p
            v-else
            class="text-dimmed"
          >
            --
          </p>
        </div>

        <!-- Col 2 -->
        <div class="px-3 pt-2 pb-3 col-span-1 relative border-l border-dotted border-accented h-full">
          <p class="text-xs text-dimmed mb-3">
            משנת
          </p>
          <UBadge
            v-if="servant.since"
            :label="servant.since"
            variant="outline"
            color="neutral"
            size="md"
            class="tracking-wide mb-1"
          />
          <p
            v-else
            class="text-dimmed"
          >
            --
          </p>
        </div>

        <!-- Col 3 -->
        <div class="px-3 pt-2 pb-3 col-span-1 relative md:border-l md:border-dotted md:border-accented h-full">
          <p class="text-xs text-dimmed mb-3">
            טלפון
          </p>
          <UButton
            v-if="servant.phone"
            :label="'0' + servant.phone"
            :to="servant.phone ? 'tel:+972' + servant.phone : ''"
            color="primary"
            variant="subtle"
            size="xs"
            class="tracking-wide mb-1"
          />
          <p
            v-else
            class="text-dimmed"
          >
            --
          </p>
        </div>

        <!-- Col 4 -->
        <div class="px-3 pt-2 pb-3 col-span-6 md:col-span-3 border-t border-dotted border-accented md:border-t-0">
          <p class="text-xs text-dimmed mb-3">
            דוא"ל
          </p>
          <UButton
            v-if="servant.email"
            :label="servant.email"
            variant="subtle"
            size="xs"
            class="tracking-wide mb-1"
            :to="'mailto:' + servant.email"
          />
          <p
            v-else
            class="text-dimmed"
          >
            --
          </p>
        </div>

        <!-- Inquiries -->
        <div class="flex col-span-6 border-t border-accented border-dotted px-3 pt-2 pb-3 w-full">
          <p class="text-xs text-dimmed">
            פניות&nbsp;
            <UBadge
              :label="servantInquiries.length"
              size="sm"
              variant="soft"
              color="neutral"
            />
          </p>
        </div>
        <div class="grid md:grid-cols-2 col-span-6 gap-2 px-3 pb-4">
          <UUser
            v-for="inquiry in servantInquiries"
            :key="inquiry.iid"
            :name="inquiry.title"
            :description="inquiry.description"
            :avatar="{
              src: inquiry.poster || '',
              loading: 'lazy',
              class: 'rounded-md'
            }"
            :ui="{ name: 'line-clamp-1', description: 'line-clamp-1' }"
            :to="inquiry.path"
          />
          <div
            v-if="!servantInquiries.length"
            class="-mt-1"
          >
            <UBadge
              label="טרם התקבלו פניות"
              variant="soft"
              color="neutral"
              size="md"
              class="tracking-wide"
            />
          </div>
        </div>
      </section>

      <UPageBody>
        <ContentRenderer
          v-if="servant"
          :value="servant"
        />
      </UPageBody>
    </div>
    <UContentSurround
      :surround="surround"
      class="print:hidden"
    />

    <template
      v-if="servant?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="servant.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '--mt-6': servant.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="servant.body?.toc?.links?.length"
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
