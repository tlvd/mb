import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md', '1.inquiries/**/*', '2.servants/**/*']
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),
      })
    }),
    inquiries: defineCollection({
      type: 'page',
      source: '1.inquiries/**/*',
      schema: z.object({
        draft: z.boolean().optional(),
        iid: z.string().optional(),
        idate: z.string().optional(),
        icon: z.string().optional(),
        office: z.string().optional(),
        author: z.string().optional(),
        poster: z.string().optional(),
        posterTitle: z.string().optional(),
        status: z.string().optional(),
        gallery: z.array(z.object({
          url: z.string(),
          title: z.string()
        })).optional(),
        events: z.array(z.object({
          date: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string(),
          value: z.string()
        })).optional(),
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),
        involved: z.array(z.string()).optional(),
        related: z.array(z.string()).optional(),
        telegram: z.string().optional()
      })
    }),
    servants: defineCollection({
      type: 'page',
      source: '2.servants/**/*',
      schema: z.object({
        sid: z.string().optional(), // servant id
        oid: z.string().optional(), // official id
        photo: z.string().optional(),
        icon: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        homepage: z.string().optional(),
        office: z.string().optional(),
        since: z.number().optional(),
        rank: z.string().optional(),
        roles: z.array(z.string()).optional(),
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),
      })
    })
  }
})