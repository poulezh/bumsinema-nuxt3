// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const paths = {
  icons: path.resolve(process.cwd(), 'assets/icons')
}
export default defineNuxtConfig({
  app: {
    rootTag: 'body',
    rootId: "body",
    head: {
      htmlAttrs: {
        lang: "ru"
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg", sizes: "any" },
        { rel: "icon", type: "image/png", href: "/fav_48.png", sizes: "48x48" },
        { rel: "icon", type: "image/png", href: "/fav_196.png", sizes: "196x196" },
        { rel: "icon", type: "image/png", href: "/fav_512.png", sizes: "512x512" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180×180" },
        { rel: "mask-icon", type: "image/svg+xml", href: "/favicon.svg", color: "#00E099" }
      ],
    }
  },
  devServer: {
    host: process.env.LOCAL_HOST || 'localhost'
  },
  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    'nuxt-basic-auth',
  ],
  css: [
    '@/assets/sass/app.sass'
  ],
  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [paths.icons],
        symbolId: 'i_[name]',
        customDomId: 'page__icons'
      }),
    ],
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
                    @import "@/assets/sass/vars/index"
                  `,
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  basicAuth: {
    username: 'ezh',
    password: 'ezh',
    enabled: process.env.WEB_AUTH_ENABLED === 'true'
  },
})
