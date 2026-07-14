<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter class="print:hidden">
    <template #left>
      {{ footer.credits }}
    </template>

    <UNavigationMenu
      :items="footer.links"
      variant="link"
    />

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.icons">
        <UButton
          v-for="(link, index) of footer?.icons"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
