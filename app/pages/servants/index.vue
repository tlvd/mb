<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()

// Query all servants excluding YAML and navigation files
const { data: servants } = await useAsyncData(route.path, () => {
  return queryCollection('servants')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    .order('sid', 'ASC')
    .all()
})

const title = 'המשרתים שלנו'
const description = 'הכירו את משרתי העם.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = 'ראשי'

defineOgImage('Docs.takumi', { title, description, headline })

// Sort servants by title/name alphabetically
// const sortedServants = computed(() => {
//   if (!servants.value?.length) return []

//   return [...servants.value].sort((a, b) => {
//     return (a.title || '').localeCompare(b.title || '', 'he')
//   })
// })

// Get unique offices for filter
// const offices = computed(() => {
//   if (!servants.value?.length) return []
//   const uniqueOffices = new Set(servants.value.map(s => s.office).filter(Boolean))
//   return Array.from(uniqueOffices).sort()
// })

// Filter by office
const selectedOffice = ref('')
const searchQuery = ref('')

const filteredServants = computed(() => {
  if (!servants.value?.length) return []

  return servants.value.filter((servant) => {
    const matchesSearch = !searchQuery.value
      || servant.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
      || servant.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
      // || servant.expertise?.some((exp: string) => exp.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesOffice = !selectedOffice.value || servant.office === selectedOffice.value

    return matchesSearch && matchesOffice
  }).sort((a, b) => {
    return (a.title || '').localeCompare(b.title || '', 'he')
  })
})
</script>

<template>
  <UPage>
    <UPageHeader>
      <h1 class="text-4xl font-bold tracking-tight font-sans">
        המשרתים שלנו
      </h1>
      <p class="text-muted mt-2">
        הכירו את משרתי העם. לחצו על כל משרת למידע נוסף ויצירת קשר.
      </p>
    </UPageHeader>

    <UPageBody>
      <!-- Filters -->
      <!-- <div class="flex flex-wrap gap-4 mb-8">
        <UInput
          v-model="searchQuery"
          placeholder="חיפוש עובדים..."
          icon="i-lucide-search"
          class="flex-1 min-w-[200px]"
        />

        <USelect
          v-model="selectedOffice"
          :options="[
            { label: 'כל המשרדים', value: '' },
            ...offices.map(office => ({ label: office, value: office }))
          ]"
          placeholder="משרד"
          class="w-48"
        />
      </div> -->

      <!-- Results count -->
      <div class="mb-4 text-sm text-dimmed">
        נמצאו {{ filteredServants.length }} משרתים
      </div>

      <!-- Grid of servant cards -->
      <section
        v-if="filteredServants.length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4"
      >
        <UPageCard
          v-for="servant in filteredServants"
          :key="servant.sid || servant.path"
          :to="servant.path"
          variant="subtle"
          class="flex justify-center overflow-hidden hover:shadow-lg transition-shadow duration-300"
          :ui="{
            container: 'p-4 sm:p-4'
          }"
        >
          <!-- <template #header>
            <div class="w-full mx-auto mt-2">

            </div>
          </template> -->

          <template #body>
            <div class="flex gap-4">
              <UAvatar
                :alt="servant.title"
                :src="servant.photo"
                class="mx-auto"
                size="4xl"
              />
              <div>
                <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                  {{ servant.title }}
                </h3>

                <p class="text-sm text-muted line-clamp-1">
                  {{ servant.description }}, {{ servant.office }}
                </p>

                <!-- <UBadge
                  :label="servant.office"
                  color="neutral"
                  size="sm"
                  variant="outline"
                  class="mt-4"
                /> -->
              </div>
            </div>
          </template>
          <!-- <template #footer>
            <div class="w-full --flex --flex-col --items-end">
              <UBadge
                :label="servant.office"
                color="neutral"
                size="sm"
                variant="outline"
              />
            </div>
          </template> -->
        </UPageCard>
      </section>
    </UPageBody>
  </UPage>
</template>
