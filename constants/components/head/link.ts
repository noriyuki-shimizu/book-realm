import type { Link, MaybeComputedRef } from '@unhead/vue'

/** Application Main Head Link */
export const MAIN_HEAD_LINK: MaybeComputedRef<Link<object | undefined>[]> = [
  {
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
    href: '/favicon/favicon-16x16.ico'
  },
  {
    rel: 'icon',
    sizes: '24x24',
    type: 'image/png',
    href: '/favicon/favicon-24x24.ico'
  },
  {
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
    href: '/favicon/favicon-32x32.ico'
  },
  {
    rel: 'icon',
    sizes: '36x36',
    type: 'image/png',
    href: '/favicon/favicon-36x36.ico'
  },
  {
    rel: 'icon',
    sizes: '48x48',
    type: 'image/png',
    href: '/favicon/favicon-48x48.ico'
  },
  {
    rel: 'icon',
    sizes: '64x64',
    type: 'image/png',
    href: '/favicon/favicon-64x64.ico'
  },
  {
    rel: 'apple-touch-icon',
    sizes: '128x128',
    href: '/favicon/favicon-128x128.ico'
  }
]
