// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // baseURL: '/mb/',
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

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    // '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

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

  ssr: true,

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

  // mcp: {
  //   name: 'Docs template'
  // },

  ogImage: {
    zeroRuntime: true,
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
      ]
    }
  }
})
