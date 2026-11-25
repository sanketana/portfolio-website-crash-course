// [PASTE · step 5] Tools for defining a collection — ask: which of the three imports does the checking?
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// [PASTE · step 5] Where the write-ups live — ask: would a .txt file in that folder become a write-up?
const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  // [TYPE · step 5] The shape every write-up must have: a title (text), a date, and a summary (text)
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

// [PASTE · step 5] Register the collection under the name the pages will use
export const collections = { writeups };
