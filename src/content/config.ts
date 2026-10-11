import { defineCollection, z } from 'astro:content';

const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    readTime: z.string().optional(),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    topic: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { poems, writing };
