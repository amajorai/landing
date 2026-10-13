import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod/v4";

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastModified: z.coerce.date().optional(),
    authors: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export const pages = defineCollections({
  type: "doc",
  dir: "content/pages",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      // Lets the MDX `code` component tell fenced blocks from inline code,
      // and gives code block headers their language label.
      addLanguageClass: true,
    },
  },
});
