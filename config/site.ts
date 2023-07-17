// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  previewImg: string
  localeDefault: string
  links: {
    discord: string
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://zksync-scaffoldera.vercel.app/'

export const siteConfig: SiteConfig = {
  name: 'ZKSync Scaffoldera',
  title: 'ZKSync Scaffoldera - Web3 App Template',
  emoji: '⚡',
  description: 'Web3 App Template built for ZKSync using Next.js, RainbowKit, SIWE, Disco, Paymaster and more!',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    discord: 'https://discord.gg/',
    twitter: 'https://twitter.com/holyaustin',
    github: 'https://github.com/holyaustin/',
  },
}

export const DEPLOY_URL =
  'https://zksync-scaffoldera.vercel.app/'
