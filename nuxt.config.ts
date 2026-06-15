// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/mb/',
    // baseURL: process.env.NODE_ENV === 'production' 
    //   ? '/mb/'  // Replace with your repository name
    //   : '/',
    head: {
      title: 'משרתים בע"מ', // default fallback title
      htmlAttrs: {
        lang: 'he',
        dir: 'rtl'
      },
      // link: [
      //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // ],
    },
  },
  
  compatibilityDate: '2024-07-11',
  
  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  css: ['~/assets/css/main.css'],
  
  devtools: {
    enabled: true
  },
  
  experimental: {
    asyncContext: true
  },
  
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Noto Sans Hebrew', weights: [400, 700], global: true },
    ],
  },
  
  icon: {
    provider: 'iconify',
    customCollections: [{
      prefix: 'local',
      dir: './app/assets/icons'
    }]
  },

  llms: {
    domain: 'https://meshartim.co.il/',
    title: 'משרתים בע"מ',
    description: 'תושבים למען שקיפות ואחריות בשירות הציבורי. תיעוד, שיתוף ופנייה מסודרת מול עיריות, משטרה ומשרדי ממשלה.',
    full: {
      title: 'משרתים בע"מ – תיעוד, שקיפות, אחריות',
      description: 'מיזם אזרחי מבוסס קוד פתוח לקידום שקיפות ולקיחת אחריות בשירות הציבורי בישראל. תיעודים, דיונים, פניות רשמיות והישגים לפי ערים.'
    }
  },

  modules: [
      '@nuxt/eslint',
      '@nuxt/image',
      '@nuxt/ui',
      '@nuxt/content',
      'nuxt-og-image',
      'nuxt-llms',
      '@nuxt/fonts'
      // '@nuxtjs/mcp-toolkit'
    ],
  
  nitro: {
    preset: 'static',
    serveStatic: true,
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },
  
  ogImage: {
    zeroRuntime: true,
  },

  ssr: true,

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
      ]
    }
  }
})