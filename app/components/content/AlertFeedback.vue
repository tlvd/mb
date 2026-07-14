<template>
  <UAlert
    color="neutral"
    variant="outline"
    title=""
    description="הדרך היעילה ביותר להגיב לפנייה זו היא באמצעות לחיצה על קישור הפנייה בקבוצת הטלגרם הייעודית שלנו, ולהגיב שם. תגובות ענייניות ומועילות יוצרפן לתוכן דף זה על ידי חברי הקהילה בכדי לשמור על דיון ממוקד, שקוף ומועיל לכולם. תודה על שיתוף הפעולה."
    icon="i-local-message-circle-more"
    class="print:hidden"
    :actions="[
      {
        label: 'מגיבים בקבוצת הדיון בטלגרם',
        to: to || defaultUrl,
        target: '_blank',
        variant: 'subtle',
        color: 'primary'
      }
    ]"
  />
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()

const defaultUrl = 'https://telegram.me/+alxq0yJzMNM1ZTlh'
</script>
