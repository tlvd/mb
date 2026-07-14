<script setup lang="ts">
// Fetch servants
const { data: servants } = await useAsyncData('home-servants', () => {
  return queryCollection('servants')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    .limit(10)
    .all()
})

// Fetch inquiries
const { data: inquiries } = await useAsyncData('home-inquiries', () => {
  return queryCollection('inquiries')
    .where('path', 'NOT LIKE', '%.yml')
    .where('path', 'NOT LIKE', '%.yaml')
    .where('path', 'NOT LIKE', '%.navigation')
    // .where('draft', 'IS NULL')
    .order('idate', 'DESC')
    .limit(10)
    .all()
})
</script>

<template>
  <div class="space-y-6 -mt-12 mb-24">
    <!-- Servants Marquee -->
    <div v-if="servants?.length">
      <Marquee
        :items="servants"
        class="[--gap:--spacing(6)] [--duration:32s]"
      />
    </div>

    <!-- Inquiries Marquee -->
    <div v-if="inquiries?.length">
      <Marquee
        reverse
        :items="inquiries"
        class="[--gap:--spacing(6)] [--duration:48s]"
      />
    </div>
  </div>
</template>
