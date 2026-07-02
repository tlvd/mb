<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()

const mdPath = `/mb/raw${route.path}.md`

const items = [
  {
    label: 'העתק קישור לכיתוב',
    icon: 'i-lucide-link',
    onSelect() {
      const fullUrl = import.meta.client ? window.location.origin + mdPath : mdPath
      copy(fullUrl)
      toast.add({
        title: 'הקישור הועתק',
        icon: 'i-lucide-check-circle'
      })
    }
  },
  {
    label: 'הצג כיתוב',
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: mdPath
  }
]

async function copyPage() {
  try {
    const content = await $fetch<string>(mdPath)
    copy(content)
    toast.add({
      title: 'התוכן הועתק',
      icon: 'i-lucide-check-circle'
    })
  } catch {
    toast.add({
      title: 'שגיאה בטעינת התוכן',
      icon: 'i-lucide-alert-circle',
      color: 'error'
    })
  }
}
</script>

<template>
  <UFieldGroup>
    <UButton
      label="העתק מידע"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      size="sm"
      variant="outline"
      :ui="{
        leadingIcon: [copied ? 'text-primary' : 'text-neutral', 'size-3.5']
      }"
      @click="copyPage"
    />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: '--w-48'
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        aria-label="Open copy actions menu"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
