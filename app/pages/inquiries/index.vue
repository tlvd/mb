<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { data: inquiries } = await useAsyncData(route.path, () => {
  return queryCollection('inquiries')
    .where('draft', 'IS NULL')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    .order('iid', 'DESC')
    .all()
})

const title = 'פניות התושבים'
const description = 'מאגר הפניות שלכם. כאן תוכלו לצפות בכל הפניות שהוגשו ולעקוב אחר התקדמות הטיפול בפניה.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = 'ראשי'

defineOgImage('Docs.takumi', { title, description, headline })

// Sort inquiries by date (newest first) if idate exists
const sortedInquiries = computed(() => {
  if (!inquiries.value?.length) return []

  return [...inquiries.value].sort((a, b) => {
    // Sort by idate if available, otherwise by title
    if (a.idate && b.idate) {
      return new Date(b.idate).getTime() - new Date(a.idate).getTime()
    }
    return (a.title || '').localeCompare(b.title || '')
  })
})

// Get status color for badges
const getStatusColor = (status: string) => {
  switch (status) {
    case 'טיוטה':
      return 'info'
    case 'פתוח':
      return 'primary'
    case 'סגור':
      return 'success'
    default:
      return 'neutral'
  }
}
</script>

<template>
  <UPage>
    <UPageHeader>
      <h1 class="text-4xl font-bold tracking-tight font-sans">
        פניות התושבים
      </h1>
      <p class="text-muted mt-2">
        ברוכים הבאים למאגר הפניות שלכם. כאן תוכלו לצפות בכל הפניות שהוגשו ולעקוב אחר התקדמות הטיפול בפניה.
      </p>
    </UPageHeader>

    <UPageBody>
      <!-- Grid of inquiry cards -->
      <div
        v-if="sortedInquiries.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <UPageCard
          v-for="inquiry in sortedInquiries"
          :key="inquiry.iid || inquiry.path"
          :ui="{
            container: 'p-4 sm:p-3 lg:p-2'
          }"
          variant="subtle"
          class="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Poster image -->
          <template #header>
            <NuxtLink
              :to="inquiry.path"
              class="block mb-3"
            >
              <NuxtImg
                :src="inquiry.poster"
                :alt="inquiry.posterTitle || inquiry.title"
                class="w-full max-w-full aspect-video object-cover rounded-t-lg"
                loading="lazy"
                format="webp"
              />
            </NuxtLink>
            <!-- <div class="flex items-center justify-between gap-2">
              <div class="flex gap-2">
                <UBadge
                  color="neutral"
                  size="sm"
                  variant="outline"
                >
                  {{ inquiry.idate }}
                </UBadge>
              </div>
              <UBadge
                :label="inquiry.status || 'טרם הוגש'"
                :color="getStatusColor(inquiry.status || 'neutral')"
                variant="subtle"
                size="sm"
              />
            </div> -->
          </template>

          <!-- Content -->
          <!-- Title -->
          <template #title>
            <NuxtLink
              :to="inquiry.path"
              class="block group -mt-2"
            >
              <h3 class="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                {{ inquiry.title }}
              </h3>
            </NuxtLink>
          </template>

          <template #description>
            <p class="text-sm text-muted line-clamp-3">
              {{ inquiry.description || 'אין תיאור זמין' }}
            </p>
          </template>

          <!-- Footer with link -->
          <template #footer>
            <div class="flex items-center justify-between gap-2 w-full text-xs text-dimmed">
              <UBadge
                :label="inquiry.office"
                color="neutral"
                size="sm"
                variant="outline"
              />
              <div class="flex --flex-row-reverse gap-2">
                <UBadge
                  :label="inquiry.idate"
                  color="neutral"
                  size="sm"
                  variant="soft"
                />
                <UBadge
                  :label="inquiry.status || 'טרם הוגש'"
                  :color="getStatusColor(inquiry.status || 'neutral')"
                  variant="subtle"
                  size="sm"
                />
              </div>
            </div>
          </template>
        </UPageCard>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-lucide-folder-open"
          class="w-16 h-16 mx-auto text-dimmed mb-4"
        />
        <h3 class="text-lg font-medium mb-2">
          אין פניות להצגה
        </h3>
        <p class="text-muted">
          אין פניות זמינות כרגע. בדוק שוב מאוחר יותר.
        </p>
      </div>
    </UPageBody>
  </UPage>
</template>
