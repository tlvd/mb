export default defineAppConfig({
  ui: {
    avatar: {
      variants: {
        size: {
          '4xl': {
            root: 'size-16 text-2xl'
          },
          '5xl': {
            root: 'size-20 text-3xl'
          },
          '6xl': {
            root: 'size-24 text-4xl'
          }
        }
      }
    },
    colors: {
      neutral: 'slate',
      primary: 'emerald',
      secondary: 'indigo'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    },
    page: {
      slots: {
        root: 'max-w-screen-2xl mx-auto mb-6'
      }
    },
    pageCard: {
      slots: {
        footer: 'w-full'
        // container: 'px-6',
      },
      variants: {
        variant: {
          outline: {
            // root: 'bg-default/50'
          }
        }
      }
    },
    pageGrid: {
      base: 'gap-6'
    },
    prose: {
      callout: {
        slots: {
          externalIcon: [
            // '--left-2 --right-auto --scale-x-[-1]',
            'hidden'
          ]
        }
      },
      td: {
        defaultVariants: {
          align: 'right'
        }
      },
      th: {
        defaultVariants: {
          align: 'right'
        }
      },
      tr: {
        base: '[&:first-child>th:first-child]:rounded-tl-none [&:first-child>th:first-child]:rounded-tr-md [&:first-child>th:last-child]:rounded-tr-none [&:first-child>th:last-child]:rounded-tl-md [&:last-child>td:first-child]:rounded-bl-none [&:last-child>td:first-child]:rounded-br-md [&:last-child>td:last-child]:rounded-br-none [&:last-child>td:last-child]:rounded-bl-md'
      }
    },
    user: {
      slots: {
        root: 'relative group/user p-4 rounded-lg bg-accented/20 hover:bg-accented/50 transition-colors'
      },
      variants: {
        to: {
          true: {
            avatar: 'group-hover/user:scale-none group-has-focus-visible/user:scale-none'
          }
        }
      }
    }
  },
  seo: {
    siteName: 'משרתים בע"מ'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true
    // links: [{
    //   'icon': 'i-simple-icons-github',
    //   'to': 'https://github.com/nuxt-ui-templates/docs',
    //   'target': '_blank',
    //   'aria-label': 'GitHub'
    // }]
  },
  footer: {
    // credits: `משרתים בע"מ © ${new Date().getFullYear()}`,
    credits: `כל הזכויות שמורות לעם`,
    colorMode: false,
    icons: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://tlvd.github.io/mb/',
        'target': '_blank',
        'aria-label': 'משרתים בע"מ בגיטהב'
      },
      {
        'icon': 'i-simple-icons-telegram',
        'to': 'https://t.me/+bp3Mk116lO8xZWFh',
        'target': '_blank',
        'aria-label': 'משרתים בע"מ בטלגרם'
      },
    ],
    links: [
      {
        'label': 'משרתים בע"מ',
        'to': '/',
      },
      {
        'label': 'תנאי שימוש',
        'to': '/info/terms',
      },
    ]
  },
  toc: {
    title: 'תוכן דף',
    bottom: {
      title: 'קהילה',
      edit: 'https://github.com/tlvd/mb/edit/main/content/',
      links: [{
        icon: 'i-lucide-star',
        label: 'סמן כוכב',
        to: 'https://github.com/tlvd/mb',
        target: '_blank'
      }, {
        icon: 'i-lucide-message-circle',
        label: 'קבוצת דיון',
        to: '#',
        target: '_blank'
      }]
    }
  }
})
