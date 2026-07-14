// composables/useSiteNavigation.ts
import type { ContentNavigationItem } from '@nuxt/content'

export const useSiteNavigation = () => {
  const { data: docsNavigation } = useAsyncData('docs-navigation', () => {
    return queryCollectionNavigation('docs').where('path', 'LIKE', '/info%')
  })
  
  const siteNavigation = computed<ContentNavigationItem[]>(() => {
    const nav: ContentNavigationItem[] = [
      {
        title: 'פניות',
        // icon: 'i-lucide-folder-open',
        icon: 'i-lucide-folder',
        path: '/inquiries',
        children: []
      },
      {
        title: 'משרתים',
        icon: 'i-lucide-users-round',
        path: '/servants',
        children: []
      }
    ]
    
    if (docsNavigation.value?.length) {
      nav.push(...docsNavigation.value)
    }
    
    return nav
  })
  
  return { navigation: siteNavigation }
}