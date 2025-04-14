import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import rehypeCitation from 'rehype-citation'
import rehypeFigure from '@microflash/rehype-figure'
import sectionize from '@hbsnow/rehype-sectionize'
import { mermaid } from './monkey/plugins/remark-mermaid'
import icon from 'astro-icon'
import path from 'path'

const root = process.cwd()

// https://astro.build/config
export default defineConfig({
  site: 'https://keks-thoughts.vercel.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    react(),
    icon(),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      rehypeFigure,
      sectionize,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
      [
        rehypeCitation,
        {
          path: path.join(root, 'src', 'content', 'bibs'),
          showTooltips: true,
          csl: path.join('ieee.csl'),
        },
      ],
    ],
    remarkPlugins: [remarkGfm, remarkToc, mermaid, remarkMath, remarkEmoji],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
})
