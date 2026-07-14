<template>
  <UAlert
    color="neutral"
    variant="outline"
    title=""
    description="אנחנו מנהלים מאגר מידע שיתופי ופתוח של פניות ותוצאותיהן, במטרה לשפר את ההתנהלות מול אזרחים ולתעד הישגים. הדרך הכי טובה לעדכן אותנו - באמצעות הקבוצה הייעודית שלנו בטלגרם. אנא שלחו עדכון, תגובה רשמית, או כל התייחסות בקבוצה, לטובת כולם."
    icon="i-local-info"
    class="print:hidden"
    :actions="[
      {
        label: 'נשארים מעודכנים בטלגרם',
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
