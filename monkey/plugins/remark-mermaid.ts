// Credit to https://github.com/paularmstrong/onerepo

import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '\n': '%0A',
}

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => escapeMap[c] ?? c)

export const mermaid: RemarkPlugin<[]> = () => (tree) => {
  visit(tree, 'code', (node) => {
    if (node.lang !== 'mermaid') return

    // @ts-ignore
    node.type = 'html'
    node.value = `
      <div class="mermaid" style="display: flex; align-items: center; justify-content: center;" data-content="${escapeHtml(node.value)}">
        <div class="breathing-loader">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    `
  })
}
