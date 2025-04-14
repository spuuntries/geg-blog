export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: "kek's thoughts",
  DESCRIPTION: 'A space where kek keeps their thoughts. ☁',
  EMAIL: 'kek@spuun.art',
  NUM_POSTS_ON_HOMEPAGE: 3,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://spuun.art',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/spuuntries', label: 'GitHub' },
  { href: 'https://x.com/spuunistrying', label: 'Twitter' },
  { href: 'kek@spuun.art', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
