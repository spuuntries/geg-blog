declare module '@microflash/rehype-figure' {
  import type { Plugin } from 'unified'

  interface RehypeFigureOptions {
    /**
     * Optional class name to be applied to the figure element
     */
    className?: string
  }

  /**
   * A rehype plugin to wrap images with figures and their alt text as captions
   * @param options Configuration options
   * @returns A unified plugin
   */
  const rehypeFigure: (options?: RehypeFigureOptions) => Plugin

  export default rehypeFigure
}
